import { useState } from 'react';

// Sample list of videos from the 'media' folder (this would normally be dynamic)
const videos = [
  'sample.mp4'
];

export default function MainPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Function to strip the .mp4 extension from the video name
  const getVideoName = (video: string) => video.replace('.mp4', '');

  const handleVideoClick = (video: string) => {
    setSelectedVideo(`/media/${video}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-950">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg mb-8">
        Welcome to Sobremesa
      </h1>

      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-4">Available Videos:</h2>
        <div className="grid grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              {/* Video thumbnail */}
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
              {/* Display video name without the .mp4 extension */}
              <span className="text-lg text-gray-800 dark:text-gray-200">
                {getVideoName(video)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="w-full max-w-3xl mt-8">
          <video controls className="w-full">
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
