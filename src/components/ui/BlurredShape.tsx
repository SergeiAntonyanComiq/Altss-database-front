
import React from 'react';
import { cn } from "@/lib/utils";

interface BlurredShapeProps {
  color: 'blue' | 'orange' | 'green';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const BlurredShape: React.FC<BlurredShapeProps> = ({ 
  color, 
  className, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-40 h-40',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[30rem] h-[30rem]',
  };
  
  const colorClasses = {
    blue: 'bg-altss-blue',
    orange: 'bg-altss-orange',
    green: 'bg-altss-green',
  };
  
  return (
    <div 
      className={cn(
        'absolute rounded-full blur-[100px] opacity-20 z-0',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      aria-hidden="true"
    />
  );
};

export default BlurredShape;
