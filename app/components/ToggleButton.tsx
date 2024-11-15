import React from 'react';

interface ToggleButtonProps {
  label: string;
  isChecked: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, isChecked, onToggle }) => (
  <label>
    <input type="checkbox" checked={isChecked} onChange={() => onToggle(!isChecked)} />
    {label}
  </label>
);

export default ToggleButton;
