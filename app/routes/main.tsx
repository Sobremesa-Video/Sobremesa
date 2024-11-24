import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from 'react';
import VideoPlayer from '~/components/videoPlayer';
import fs from 'fs';
import path from 'path';
import Chat from "~/components/chat";
import "~/components/main.css";
import useWebRTC from "~/components/webRTC";

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
  const mediaPath = path.resolve('public', 'media');
  const files = fs.readdirSync(mediaPath);
  const videoFiles = files.filter(file => file.endsWith('.mp4'));
  return { videoFiles };
};

export default function MainPage() {
  const { mediaStream, createOffer, setRemoteDescription } = useWebRTC();
  const { videoFiles } = useLoaderData<LoaderData>();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleVideoClick = (video: string) => {
    setSelectedVideo(`/media/${video}`);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`flex flex-col min-h-screen transition-colors ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header Section */}
      <header className="flex justify-between items-center w-full p-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Sobremesa
        </h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-700 transition-colors"
        >
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 px-4 mt-8 space-x-8">
        {/* Video Player and Chat Section */}
        <div className="flex-1 flex flex-col items-center">
          {/* Video Player */}
          {selectedVideo && <VideoPlayer mediaStream={mediaStream} isDarkMode={isDarkMode} />}

          {/* Signaling controls for testing */}
          {/*<button onClick={createOffer} className="bg-blue-600 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-500 transition-colors"> Create Offer </button>*/}
          {/*<textarea placeholder="Paste remote SDP here" className="w-full h-24 p-2 mt-4" onBlur={(e) => setRemoteDescription(e.target.value)}></textarea>*/}
          
          {/* Chatbox */}
          {isChatVisible && (
            <div className="w-full max-w-3xl mt-4 border-t border-gray-300 pt-4 flex justify-center">
              <div className="chatbox w-full h-64 bg-gray-800 text-white p-4">
                <p>Chat is active</p>
              </div>
            </div>
          )}
        </div>

        {/* Available Videos Section */}
        <div className="w-1/3">
          <h2 className="text-2xl font-bold mb-4">Available Videos:</h2>
          <div className="grid grid-cols-1 gap-4 h-[500px] overflow-y-scroll border border-gray-300 rounded-lg p-4">
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
      </div>

      {/* Hidden Chat Component (for handling state and events) */}
      <Chat />
    </div>
  );
}
