import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from 'react';
import VideoPlayer from '~/components/videoPlayer';
import fs from 'fs';
import path from 'path';
import Chat from "~/components/chat";

/// TODO for frontend people
  // - Make chat visibility work
  // - alter chat.tsx so that when a video is selected, it'll call constructSocket() of chat.tsx
    // Note: I don't really care if it's that function specifically, but its behavior needs to be performed.

// Define the type of the loader data
type LoaderData = {
  videoFiles: string[];
};

export const meta: MetaFunction = () => {
  return [
    { title: "Sobremesa" },
  ];
};

// Loader function to read video files
export const loader: LoaderFunction = async () => {
  const mediaPath = path.resolve('public', 'media'); // Loads videos in public -> media
  const files = fs.readdirSync(mediaPath);

  // Filter for video files with '.mp4' extension
  const videoFiles = files.filter(file => file.endsWith('.mp4'));

  // Return the video files to the loader
  return { videoFiles };
};

export default function MainPage() {
  // Use the loader data and provide the correct type
  const { videoFiles } = useLoaderData<LoaderData>(); // Explicitly define the type
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false); // State for chatbox visibility

  // Handle video selection
  const handleVideoClick = (video: string) => {
    setSelectedVideo(`/media/${video}`);
  };

  // Toggle dark/light mode
  // Handle theme toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark or light mode by setting class on body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);


  return (
    <div className={`flex flex-col justify-start items-center min-h-screen pt-12 transition-colors ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Title */}
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg mb-8 mt-4">
        Welcome to Sobremesa
      </h1>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="bg-gray-800 text-white py-2 px-4 rounded-full mb-4 hover:bg-gray-700 transition-colors"
      >
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>

      {/* Video Player */}
      {selectedVideo && <VideoPlayer videoSrc={selectedVideo} isDarkMode={isDarkMode} />}

      {/* Video Selection */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-4">Available Videos:</h2>
        <div className="grid grid-cols-3 gap-4">
          {videoFiles.map((video: string, index: number) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <video
                width="200"
                height="120"
                className="cursor-pointer"
                onClick={() => handleVideoClick(video)}
                muted
              >
                <source src={`/media/${video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <span className="text-lg">{video.replace('.mp4', '')}</span>
            </div>
          ))}
        </div>
      </div>

      {isChatVisible && (
      <div className="chatbox absolute bottom-0 right-0 w-1/3 h-1/3 bg-transparent border border-gray-500">
      {/* Chatbox content */}
      <p className="text-white">Chat is active</p>
      </div>
    )}
    <Chat />
    </div>
  );
}
