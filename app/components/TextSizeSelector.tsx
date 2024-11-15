import React from 'react';

interface TextSizeSelectorProps {
  textSize: string;
  setTextSize: React.Dispatch<React.SetStateAction<string>>;
}

const TextSizeSelector: React.FC<TextSizeSelectorProps> = ({ textSize, setTextSize }) => (
  <div>
    <span>Text Size:</span>
    <select value={textSize} onChange={(e) => setTextSize(e.target.value)}>
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="big">Big</option>
    </select>
  </div>
);

export default TextSizeSelector;
