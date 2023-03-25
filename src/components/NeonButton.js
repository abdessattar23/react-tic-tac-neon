import React from 'react';
import './NeonButton.css';

const NeonButton = ({ children, ...props }) => {
  return (
    <button className="neon-button" {...props}>
      <span />
      <span />
      <span />
      <span />
      {children}
    </button>
  );
};

export default NeonButton;
