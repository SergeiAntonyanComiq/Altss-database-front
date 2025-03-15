
import React from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <g className="opacity-40">
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${100 + i * 60} C300 ${50 + i * 60} 700 ${150 + i * 60} 1440 ${80 + i * 60}`}
              className="wave"
              stroke="rgba(51, 65, 146, 0.4)"
              strokeWidth="2"
              fill="none"
              style={{
                animation: `wave ${8 + i * 0.5}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </g>
        <style jsx>{`
          @keyframes wave {
            0% {
              d: path("M0 ${100} C300 ${50} 700 ${150} 1440 ${80}");
            }
            50% {
              d: path("M0 ${120} C350 ${90} 650 ${110} 1440 ${95}");
            }
            100% {
              d: path("M0 ${95} C400 ${120} 600 ${80} 1440 ${110}");
            }
          }
          .wave {
            animation: wave 8s ease-in-out infinite alternate;
          }
        `}</style>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
