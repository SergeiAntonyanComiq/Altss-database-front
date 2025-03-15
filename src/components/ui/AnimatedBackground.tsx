
import React from 'react';
import './animatedBackground.css';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      <div className="wave-backdrop"></div>
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <g className="opacity-70">
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${100 + i * 60} C300 ${50 + i * 60} 700 ${150 + i * 60} 1440 ${80 + i * 60}`}
              className={`wave wave-${i}`}
              stroke="rgba(100, 140, 255, 0.5)"
              strokeWidth="3"
              fill="none"
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
