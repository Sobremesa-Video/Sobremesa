package video

import (
	"errors"
	"github.com/pion/webrtc/v4"
	"github.com/pion/webrtc/v4/pkg/media"
	"github.com/pion/webrtc/v4/pkg/media/ivfreader"
	"io"
	"os"
	"time"
)

type Stream struct {
	trackName string
	playing   bool
	track     *webrtc.TrackLocalStaticSample
}

func getStream(trackName string) *Stream {
	return &Stream{
		trackName: trackName,
		playing:   true,
		track:     nil,
	}
}

func (stream *Stream) StreamRoutine() {

	// Open a IVF file and start reading using our IVFReader
	file, ivfErr := os.Open(stream.trackName)
	if ivfErr != nil {
		panic(ivfErr)
	}

	ivf, header, ivfErr := ivfreader.NewWith(file)
	if ivfErr != nil {
		panic(ivfErr)
	}

	// Send our video file frame at a time. Pace our sending so we send it at the same speed it should be played back as.
	// This isn't required since the video is timestamped, but we will such much higher loss if we send all at once.
	//
	// It is important to use a time.Ticker instead of time.Sleep because
	// * avoids accumulating skew, just calling time.Sleep didn't compensate for the time spent parsing the data
	// * works around latency issues with Sleep (see https://github.com/golang/go/issues/44343)
	ticker := time.NewTicker(time.Millisecond * time.Duration((float32(header.TimebaseNumerator)/float32(header.TimebaseDenominator))*1000))
	defer ticker.Stop()
	for {
		ivf.ResetReader(func(_ int64) io.Reader {
			file, err := os.Open(stream.trackName) // nolint
			if err != nil {
				panic(err)
			}
			if _, err = file.Seek(32, io.SeekStart); err != nil {
				panic(err)
			}
			return file
		})

		for ; true; <-ticker.C {

			if stream.playing {
				frame, _, ivfErr := ivf.ParseNextFrame()
				if errors.Is(ivfErr, io.EOF) {
					break
				}

				if ivfErr != nil {
					panic(ivfErr)
				}

				if ivfErr = stream.track.WriteSample(media.Sample{Data: frame, Duration: time.Second}); ivfErr != nil {
					panic(ivfErr)
				}
			}
		}
	}
}
