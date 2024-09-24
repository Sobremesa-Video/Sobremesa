// app/components/LargeButton.tsx

import React, { useState } from 'react';
import { Link } from '@remix-run/react';
import '../components/LargeButton.css';

interface LargeButtonProps {
  href: string;
  label: string;
}

const LargeButton: React.FC<LargeButtonProps> = ({ href, label }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  return (
    <Link to={href} className={`large-button ${isClicked ? 'clicked' : ''}`} 
    onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      {label}
    </Link>
  );
};

export default LargeButton;