// app/components/LargeButton.tsx

import React from 'react';
import { Link } from '@remix-run/react';

interface LargeButtonProps {
  href: string;
  label: string;
}

const LargeButton: React.FC<LargeButtonProps> = ({ href, label }) => {
  return (
    <Link to={href} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg border border-gray-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-600 transition-transform duration-300 transform hover:scale-105">
      {label}
    </Link>
  );
};

export default LargeButton;