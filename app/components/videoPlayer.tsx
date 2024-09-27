import React, { useRef, useState, useEffect } from 'react';
import './videoPlayer.css';

interface VideoPlayerProps {
  videoSrc: string;
  isDarkMode: boolean;
}

export default function VideoPlayer({ videoSrc, isDarkMode }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
    if (videoRef.current) {
      if (!isFullScreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
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
    <div className={`video-container relative w-full max-w-4xl mx-auto mt-12 ${isDarkMode ? 'dark' : ''}`}>
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
          src={isFullScreen ? "/playerIcons/ExitFullScreen.png" : "/playerIcons/Fullscreen.png"}
          alt="Fullscreen Toggle"
        />
      </button>
    </div>
  );
}
