
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
        src="/lovable-uploads/34fdd9ea-188e-4001-8e0a-c89150b27c25.png" 
        alt={name} 
      />
      <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
