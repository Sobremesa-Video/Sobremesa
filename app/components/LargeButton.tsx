// app/components/LargeButton.tsx

import React from 'react';
import styles from './LargeButton.module.css';

interface LargeButtonProps {
  href: string;
  label: string;
}

const LargeButton: React.FC<LargeButtonProps> = ({ href, label }) => {
  return (
    <a href={href} className={styles.button}>
      {label}
    </a>
  );
};

export default LargeButton;