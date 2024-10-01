import React, { useRef, useState, useEffect } from 'react';
import './videoPlayer.css';

interface VideoPlayerProps {
  videoSrc: string;
  isDarkMode: boolean;
}

export default function VideoPlayer({ videoSrc, isDarkMode }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the container
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(5); // Volume state (default is 5)
  const [isMuted, setIsMuted] = useState(false); // Track if the volume is muted
  const [showVolumeBar, setShowVolumeBar] = useState(false); // Show volume bar on hover

  // Play/Pause function
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle Mute/Unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = parseInt(e.target.value);
      setVolume(newVolume);
      videoRef.current.volume = newVolume / 10; // Convert volume to 0-1
      setIsMuted(newVolume === 0); // Automatically mute if volume is 0
    }
  };

  // Rewind function (back 5 seconds)
  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
    }
  };

  // Skip function (forward 5 seconds)
  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5);
    }
  };

  // Update current time and duration
  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, [videoSrc]);

  useEffect(() => {
    const updateTime = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        if (progressBarRef.current) {
          progressBarRef.current.value = (videoRef.current.currentTime / videoRef.current.duration * 100).toString();
        }
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', updateTime);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', updateTime);
      }
    };
  }, []);

  // Handle full-screen toggle
  const toggleFullScreen = () => {
    if (containerRef.current) {
      if (!isFullScreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullScreen(!isFullScreen);
    }
  };

  // Handle progress bar drag
  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  // Format time to mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Add a listener to track full-screen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div ref={containerRef} className={`video-container relative w-full max-w-4xl mx-auto mt-12 ${isDarkMode ? 'dark' : ''}`}>
      {/* Video Element */}
      <video ref={videoRef} className="video-player" src={videoSrc} />

      {/* Draggable Progress Bar */}
      <input
        type="range"
        ref={progressBarRef}
        className="progress-bar"
        min="0"
        max="100"
        step="0.1"
        onChange={handleProgressBarChange}
      />

      {/* Play/Pause Button */}
      <button className="play-pause-button" onClick={togglePlayPause}>
        <img src={isPlaying ? "/playerIcons/Pause.png" : "/playerIcons/Play.png"} alt="Play/Pause" />
      </button>

      {/* Rewind Button */}
      <button className="rewind-button" onClick={handleRewind}>
        <img src="/playerIcons/Rewind.png" alt="Rewind" />
      </button>

      {/* Skip Button */}
      <button className="skip-button" onClick={handleSkip}>
        <img src="/playerIcons/Skip.png" alt="Skip" />
      </button>

      {/* Timestamp */}
      <div className="timestamp">{formatTime(currentTime)}</div>

      {/* Fullscreen Toggle */}
      <button className="fullscreen-button" onClick={toggleFullScreen}>
        <img
          src={isFullScreen ? "/playerIcons/ExitFullscreen.png" : "/playerIcons/Fullscreen.png"}
          alt="Fullscreen Toggle"
        />
      </button>

      {/* Volume Button */}
      <div 
        className="volume-container" 
        onMouseEnter={() => setShowVolumeBar(true)} 
        onMouseLeave={() => setShowVolumeBar(false)}
      >
        <button className="volume-button" onClick={toggleMute}>
          <img src={isMuted || volume === 0 ? "/playerIcons/Muted.png" : "/playerIcons/Unmuted.png"} alt="Volume" />
        </button>

        {/* Volume Bar (Visible on hover) */}
        {showVolumeBar && (
          <input
            type="range"
            className="volume-bar"
            min="0"
            max="10"
            step="1"
            value={volume}
            onChange={handleVolumeChange}
            style={{ transform: 'rotate(-90deg)' }}
          />
        )}
      </div>
    </div>
  );
}