<<<<<<< Updated upstream
import { useState } from 'react';
import type { MetaFunction } from "@remix-run/node";
=======
// import { useState } from 'react';
>>>>>>> Stashed changes

// // Sample list of videos from the 'media' folder (this would normally be dynamic)
// const videos = [
//   'sample.mp4'
// ];

// export default function MainPage() {
//   const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
//   const [chatInput, setChatInput] = useState<string>(''); // Input field for chat
//   const [messages, setMessages] = useState<string[]>([]); // Messages sent in the chat

//   // Function to strip the .mp4 extension from the video name
//   const getVideoName = (video: string) => video.replace('.mp4', '');

//   const handleVideoClick = (video: string) => {
//     setSelectedVideo(`/media/${video}`);
//   };

//   const handleSendMessage = () => {
//     if (chatInput.trim() !== '') {
//       setMessages([...messages, chatInput]);
//       setChatInput(''); // Clear input after sending
//     }
//   };

//   // Handle Enter key press in the chat input
//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-950 overflow-auto">
//       <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg mb-8">
//         Welcome to Sobremesa
//       </h1>

//       <div className="mb-4">
//         <h2 className="text-3xl font-bold mb-4">Available Videos:</h2>
//         <div className="grid grid-cols-3 gap-4">
//           {videos.map((video, index) => (
//             <div key={index} className="flex flex-col items-center space-y-2">
//               {/* Video thumbnail */}
//               <video
//                 width="200"
//                 height="120"
//                 className="cursor-pointer"
//                 onClick={() => handleVideoClick(video)}
//                 muted
//               >
//                 <source src={`/media/${video}`} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               {/* Display video name without the .mp4 extension */}
//               <span className="text-lg text-gray-800 dark:text-gray-200">
//                 {getVideoName(video)}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedVideo && (
//         <>
//           <div className="w-full max-w-3xl mt-8">
//             <video controls className="w-full">
//               <source src={selectedVideo} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>

//           {/* Chat Box Section */}
//           <div className="w-full max-w-3xl mt-8">
//             <h3 className="text-2xl font-bold mb-4">Chat</h3>
//             <div className="border border-gray-300 p-4 mb-4 h-60 overflow-y-scroll bg-gray-100 dark:bg-gray-800">
//               {/* Display chat messages */}
//               {messages.map((message, index) => (
//                 <div key={index} className="mb-2">
//                   <span className="text-gray-900 dark:text-gray-100">
//                     {message}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Input field to type chat messages */}
//             <div className="flex space-x-4">
//               <input
//                 type="text"
//                 className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-100"
//                 placeholder="Type a message..."
//                 value={chatInput}
//                 onChange={(e) => setChatInput(e.target.value)}
//                 onKeyPress={handleKeyPress} // Add key press event
//               />
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                 onClick={handleSendMessage}
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from 'react';

const videos = ['sample.mp4'];

export const meta: MetaFunction = () => {
  return [
    { title: "Sobremesa" },
  ];
};

export default function MainPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState<string>(''); // Input field for chat
  const [messages, setMessages] = useState<string[]>([]); // Messages sent in the chat
  const [darkMode, setDarkMode] = useState<boolean>(false); // Dark mode state

  // Handle theme toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply the dark mode class to the body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Function to strip the .mp4 extension from the video name
  const getVideoName = (video: string) => video.replace('.mp4', '');

  const handleVideoClick = (video: string) => {
    setSelectedVideo(`/media/${video}`);
  };

  const handleSendMessage = () => {
    if (chatInput.trim() !== '') {
      setMessages([...messages, chatInput]);
      setChatInput(''); // Clear input after sending
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`flex flex-col justify-start items-center min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'} overflow-auto pt-12`}>
      {/* Toggle switch for light/dark mode */}
      <div className="absolute top-4 right-4">
        <button
          className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-2 rounded-full focus:outline-none"
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg mb-8 mt-4">
        Welcome to Sobremesa
      </h1>

      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-4">Available Videos:</h2>
        <div className="grid grid-cols-3 gap-4">
          {videos.map((video, index) => (
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
              <span className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {getVideoName(video)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="flex flex-row w-full max-w-5xl mt-8" style={{ minHeight: '600px' }}>
          {/* Video Section */}
          <div className="flex-1 pr-10">
            <video controls className="w-full h-96">
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Chat Box Section */}
          <div className="flex-1">
            {/* Reduce the heading size and adjust the margin */}
            <h3 className="text-xl font-semibold mb-7">Chat</h3>
            <div
              className={`border p-4 mb-4 h-80 overflow-y-scroll rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 max-w-xs rounded-full ${darkMode ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} w-fit`}
                >
                  <span>{message}</span>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <input
                type="text"
                className={`w-full p-2 border rounded-full ${darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-black border-gray-300'}`}
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
