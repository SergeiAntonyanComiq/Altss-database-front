import React from "react";
import { ContactType } from "@/types/contact";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface TeamMemberCardProps {
  contact: ContactType;
  isPrimary?: boolean;
}

const getAvatarFallback = (name: string) => {
  const nameParts = name.split(' ');
  return nameParts[0]?.charAt(0) + (nameParts[1]?.charAt(0) || '');
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ contact, isPrimary = false }) => {
  return (
    <div className={`flex items-start space-x-4 p-4 border border-[#DFE4EA] rounded-lg bg-white ${isPrimary ? 'border-blue-300 shadow-sm' : ''}`}>
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage 
          src="./images/placeholder.svg" 
          alt={contact.name} 
        />
        <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
          {getAvatarFallback(contact.name)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <Link to={`/profile/${contact.contact_id}`} className="font-medium text-blue-600 hover:underline">
              {contact.title} {contact.name}
            </Link>
            {isPrimary && (
              <Badge className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                Primary
              </Badge>
            )}
            <p className="text-sm text-gray-500">{contact.job_title || contact.role}</p>
          </div>
        </div>
        
        {contact.asset_class && (
          <div className="mt-2 flex flex-wrap gap-1">
            {contact.asset_class.split(',').map((asset, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs border-blue-100"
              >
                {asset.trim()}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="mt-2 text-sm text-gray-600">
          {contact.email && <p className="truncate">{contact.email}</p>}
          {contact.tel && <p>{contact.tel}</p>}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
