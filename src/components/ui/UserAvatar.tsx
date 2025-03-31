
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  className?: string;
}

const UserAvatar = ({ name, className }: UserAvatarProps) => {
  const initials = name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <Avatar className={className}>
      <AvatarImage 
        src="/lovable-uploads/789cfd5d-d179-4c0b-8ee6-68da45fa9ff3.png" 
        alt={name} 
      />
      <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
