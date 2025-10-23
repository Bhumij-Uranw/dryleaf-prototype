import React from 'react';

export const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M21.5,13.2c-1.4,4-4.8,6.8-9,6.8c-4.4,0-8.1-3-9.2-7.1C1.8,7.6,4.4,2.2,9.6,0.7c3-0.8,6.1,0.2,8.4,2.5c2.8,2.7,3.4,6.7,1.5,10L21.5,13.2z" />
  </svg>
);
