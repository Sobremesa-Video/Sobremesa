import React, { useState } from 'react';
import './AccessibilityToggle.css';

const AccessibilityToggle = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleHandler = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <div
      className={`toggle-container ${isOn ? 'on' : 'off'}`}
      onClick={toggleHandler}
    >
      <div className={`toggle-slider ${isOn ? 'on' : 'off'}`}></div>
    </div>
  );
};

export default AccessibilityToggle;
