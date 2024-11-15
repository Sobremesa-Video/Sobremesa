import React, { useState } from 'react';

const ReadAloudButton: React.FC = () => {
  const [isReading, setIsReading] = useState(false);

  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      if (isReading) {
        window.speechSynthesis.cancel();
        setIsReading(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(
          'This is an example text for the Read Aloud function.'
        );
        window.speechSynthesis.speak(utterance);
        setIsReading(true);
        utterance.onend = () => setIsReading(false);
      }
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  return (
    <button onClick={handleReadAloud} className={isReading ? 'big-buttons' : ''}>
      {isReading ? 'Stop Reading' : 'Read Aloud'}
    </button>
  );
};

export default ReadAloudButton;
