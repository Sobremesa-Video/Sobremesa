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
  const [isChatVisible, setIsChatVisible] = useState(false); // State for chatbox visibility
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(5); // Volume state (default is 5)
  const [isMuted, setIsMuted] = useState(false); // Track if the volume is muted
  const [showVolumeBar, setShowVolumeBar] = useState(false); // Show volume bar on hover
  const [isOverlayVisible, setIsOverlayVisible] = useState(true); // State to track overlay visibility

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
  // Reset progress bar and current time when a new video is loaded
  useEffect(() => {
    if (videoRef.current) {
      setCurrentTime(0);
      setDuration(videoRef.current.duration || 0);

      if (progressBarRef.current) {
        progressBarRef.current.value = '0'; // Reset progress bar to the left end
      }
    }
  }, [videoSrc]);

  // Reset player UI and states when a new video is selected
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause(); // Stop any playing video
      videoRef.current.currentTime = 0; // Reset video time
      setIsPlaying(false); // Reset play state
      setCurrentTime(0); // Reset current time
      setDuration(videoRef.current.duration || 0); // Reset video duration
      setIsOverlayVisible(true); // Show the overlay initially

      if (progressBarRef.current) {
        progressBarRef.current.value = '0'; // Reset progress bar to the left end
      }

      setVolume(5); // Reset volume to default
      setIsMuted(false); // Reset mute state
    }
  }, [videoSrc]);

  // Reset player UI and states when a new video is selected
useEffect(() => {
  if (videoRef.current) {
    videoRef.current.pause(); // Stop any playing video
    videoRef.current.currentTime = 0; // Reset video time to 0

    setIsPlaying(false); // Reset play state
    setCurrentTime(0); // Reset current time
    setDuration(videoRef.current.duration || 0); // Reset video duration
    setIsOverlayVisible(true); // Show the overlay initially
    setVolume(5); // Reset volume to default
    setIsMuted(false); // Reset mute state

    // Reset progress bar
    if (progressBarRef.current) {
      progressBarRef.current.value = '0'; // Reset progress bar to the left end
    }
  }
}, [videoSrc]);

// Update current time and progress bar as the video plays
useEffect(() => {
  const updateTime = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const progressPercentage = (time / duration) * 100; // Calculate the percentage

      setCurrentTime(time); // Update the state for the current time
      
      if (progressBarRef.current && !isNaN(duration)) {
        progressBarRef.current.value = progressPercentage.toString(); // Set progress bar value

        // Create the gradient and apply to the progress bar
        progressBarRef.current.style.background = `linear-gradient(90deg, blue ${progressPercentage}%, purple ${progressPercentage}%, #555 ${progressPercentage}%)`;
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

  // Handle Chatbox Toggle
  const toggleChat = () => {
    setIsChatVisible(!isChatVisible); // Toggle Chatbox visibility
  }

  // Handle progress bar drag
  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  // Format time to mm:ss, and handle NaN duration
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (videoRef.current) {
      const handleLoadedMetadata = () => {
        if (videoRef.current) {
          setDuration(videoRef.current.duration); // Set the video duration when metadata is loaded
        }
      };

      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, [videoSrc]);

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

  // Timer to hide the overlay after inactivity
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect(); // Get the player boundaries
        const cursorY = e.clientY - rect.top; // Get Y position relative to the player

        // Show the overlay only if the cursor is above a certain height
        if (cursorY < rect.height * 0.6) { // Tracks activity of the top 60% of video player
          setIsOverlayVisible(true);
          clearTimeout(timer);
          timer = setTimeout(() => {
            setIsOverlayVisible(false);
          }, 1000); // Hide after 1 second of inactivity
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timer);
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
        className={`progress-bar ${isOverlayVisible ? 'visible' : 'hidden'}`} // Hide or show with CSS
        min="0"
        max="100"
        step="0.1"
        onChange={handleProgressBarChange}
      />

      {/* Play/Pause Button */}
      <button className={`play-pause-button ${isOverlayVisible ? 'visible' : 'hidden'}`} onClick={togglePlayPause}>
        <img src={isPlaying ? "/playerIcons/Pause.png" : "/playerIcons/Play.png"} alt="Play/Pause" />
      </button>

      {/* Rewind Button */}
      <button className={`rewind-button ${isOverlayVisible ? 'visible' : 'hidden'}`} onClick={handleRewind}>
        <img src="/playerIcons/Rewind.png" alt="Rewind" />
      </button>

      {/* Skip Button */}
      <button className={`skip-button ${isOverlayVisible ? 'visible' : 'hidden'}`} onClick={handleSkip}>
        <img src="/playerIcons/Skip.png" alt="Skip" />
      </button>

      {/* Timestamp */}
      <div className={`timestamp ${isOverlayVisible ? 'visible' : 'hidden'}`}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      {/* Fullscreen Toggle */}
      <button className={`fullscreen-button ${isOverlayVisible ? 'visible' : 'hidden'}`} onClick={toggleFullScreen}>
        <img src={isFullScreen ? "/playerIcons/ExitFullscreen.png" : "/playerIcons/Fullscreen.png"} alt="Fullscreen Toggle" />
      </button>
    
      {/* Chatbox Toggle */}
      <div className={`chat-container ${isOverlayVisible ? 'visible' : 'hidden'}`}>
        <button className="chat-button" onClick={toggleChat}>
          <img src={isChatVisible ? "/playerIcons/ChatEnabled.png" : "/playerIcons/Chat_Disabled.png"} alt="Chat Toggle" />
        </button>
      </div>

      {/* Volume Button */}
      <div 
        className={`volume-container ${isOverlayVisible ? 'visible' : 'hidden'}`}
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
