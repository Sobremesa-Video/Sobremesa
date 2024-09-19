// app/components/LargeButton.tsx

import React from 'react';
import { Link } from '@remix-run/react';

interface LargeButtonProps {
  href: string;
  label: string;
}

const LargeButton: React.FC<LargeButtonProps> = ({ href, label }) => {
  return (
    <Link to={href} className="bg-white text-gray-800 border border-gray-300 rounded-lg px-6 py-3 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition">
      {label}
    </Link>
  );
};

export default LargeButton;