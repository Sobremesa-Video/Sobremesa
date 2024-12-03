package video

import (
	"errors"
	"fmt"
	"github.com/pion/webrtc/v4"
	"github.com/pion/webrtc/v4/pkg/media"
	"github.com/pion/webrtc/v4/pkg/media/ivfreader"
	"github.com/pion/webrtc/v4/pkg/media/oggreader"
	"io"
	"os"
	"time"
)

type Stream struct {
	trackName  string
	playing    bool
	videoTrack *webrtc.TrackLocalStaticSample
	audioTrack *webrtc.TrackLocalStaticSample
}

func (stream *Stream) TogglePlaying() {
	stream.playing = !stream.playing
}

func (stream *Stream) getVideoTrackName() string {
	return stream.trackName + ".ivf"
}

func (stream *Stream) getAudioTrackName() string {
	return stream.trackName + ".ogg"
}

func GetStream(trackName string) *Stream {
	return &Stream{
		trackName:  trackName,
		playing:    false,
		videoTrack: createVideoTrack(trackName + ".ivf"),
		audioTrack: createAudioTrack(trackName + ".ogg"),
	}
}

func createVideoTrack(path string) *webrtc.TrackLocalStaticSample {
	_, err := os.Stat(path)
	if os.IsNotExist(err) {
		panic("File does not exist")
	}

	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}

	_, header, err := ivfreader.NewWith(file)
	if err != nil {
		panic(err)
	}

	// Determine video codec
	var trackCodec string
	switch header.FourCC {
	case "AV01":
		trackCodec = webrtc.MimeTypeAV1
	case "VP90":
		trackCodec = webrtc.MimeTypeVP9
	case "VP80":
		trackCodec = webrtc.MimeTypeVP8
	default:
		panic(fmt.Sprintf("Unable to handle FourCC %s", header.FourCC))
	}

	// Create a video videoTrack
	videoTrack, videoTrackErr := webrtc.NewTrackLocalStaticSample(webrtc.RTPCodecCapability{MimeType: trackCodec}, "video", "pion")
	if videoTrackErr != nil {
		panic(videoTrackErr)
	}

	return videoTrack
}

func createAudioTrack(path string) *webrtc.TrackLocalStaticSample {
	_, err := os.Stat(path)
	if os.IsNotExist(err) {
		panic("File does not exist")
	}

	_, err = os.Open(path)
	if err != nil {
		panic(err)
	}

	audioTrack, audioTrackErr := webrtc.NewTrackLocalStaticSample(webrtc.RTPCodecCapability{MimeType: webrtc.MimeTypeOpus}, "audio", "pion")
	if audioTrackErr != nil {
		panic(audioTrackErr)
	}

	return audioTrack
}

const oggPageDuration = time.Millisecond * 20

func (stream *Stream) StreamRoutine() {

	// Open a IVF vidFile and start reading using our IVFReader
	vidFile, ivfErr := os.Open(stream.getVideoTrackName())
	if ivfErr != nil {
		panic(ivfErr)
	}

	ivf, header, ivfErr := ivfreader.NewWith(vidFile)
	if ivfErr != nil {
		panic(ivfErr)
	}

	go func() {
		// Send our video vidFile frame at a time. Pace our sending so we send it at the same speed it should be played back as.
		// This isn't required since the video is timestamped, but we will such much higher loss if we send all at once.
		//
		// It is important to use a time.Ticker instead of time.Sleep because
		// * avoids accumulating skew, just calling time.Sleep didn't compensate for the time spent parsing the data
		// * works around latency issues with Sleep (see https://github.com/golang/go/issues/44343)
		videoTicker := time.NewTicker(time.Millisecond * time.Duration((float32(header.TimebaseNumerator)/float32(header.TimebaseDenominator))*1000))
		defer videoTicker.Stop()
		for {

			ivf.ResetReader(func(_ int64) io.Reader {
				if _, err := vidFile.Seek(32, io.SeekStart); err != nil {
					panic(err)
				}
				return vidFile
			})

			for ; true; <-videoTicker.C {
				if stream.playing {
					frame, _, ivfErr := ivf.ParseNextFrame()
					if errors.Is(ivfErr, io.EOF) {
						break
					}

					if ivfErr != nil {
						panic(ivfErr)
					}

					if ivfErr = stream.videoTrack.WriteSample(media.Sample{Data: frame, Duration: time.Second}); ivfErr != nil {
						panic(ivfErr)
					}
				}
			}

		}
	}()

	audioFile, openErr := os.Open(stream.getAudioTrackName())
	if openErr != nil {
		panic(openErr)
	}

	ogg, _, oggErr := oggreader.NewWith(audioFile)
	if oggErr != nil {
		panic(oggErr)
	}

	go func() {

		// Keep track of last granule, the difference is the amount of samples in the buffer
		var lastGranule uint64

		// It is important to use a time.Ticker instead of time.Sleep because
		// * avoids accumulating skew, just calling time.Sleep didn't compensate for the time spent parsing the data
		// * works around latency issues with Sleep (see https://github.com/golang/go/issues/44343)
		ticker := time.NewTicker(oggPageDuration)
		defer ticker.Stop()

		for {

			for ; true; <-ticker.C {

				ogg.ResetReader(func(_ int64) io.Reader {
					if _, err := audioFile.Seek(0, io.SeekStart); err != nil {
						panic(err)
					}
					return audioFile
				})

				if stream.playing {

					pageData, pageHeader, oggErr := ogg.ParseNextPage()
					if errors.Is(oggErr, io.EOF) {
						break
					}

					if oggErr != nil {
						panic(oggErr)
					}

					// The amount of samples is the difference between the last and current timestamp
					sampleCount := float64(pageHeader.GranulePosition - lastGranule)
					lastGranule = pageHeader.GranulePosition
					sampleDuration := time.Duration((sampleCount/48000)*1000) * time.Millisecond

					if oggErr = stream.audioTrack.WriteSample(media.Sample{Data: pageData, Duration: sampleDuration}); oggErr != nil {
						panic(oggErr)
					}
				}
			}

		}
	}()

	select {}
}
