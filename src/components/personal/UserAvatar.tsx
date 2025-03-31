
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";

interface UserAvatarProps {
  name: string;
  className?: string;
  fallbackClassName?: string;
}

const UserAvatar = ({ name, className, fallbackClassName }: UserAvatarProps) => {
  return (
    <Avatar className={className || "h-10 w-10"}>
      <AvatarFallback 
        className={`flex items-center justify-center text-gray-500 bg-gray-100 ${fallbackClassName || ""}`}
      >
        <UserRound className="h-5 w-5" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
