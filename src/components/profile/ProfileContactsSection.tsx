
import React, { useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactType } from "@/types/contact";
import { toast } from "@/components/ui/use-toast";

interface ProfileContactsSectionProps {
  contact: ContactType;
}

const ProfileContactsSection: React.FC<ProfileContactsSectionProps> = ({ contact }) => {
  const [showEmails, setShowEmails] = useState({
    work: false,
    personal: false
  });

  const toggleEmailVisibility = (emailType: 'work' | 'personal') => {
    setShowEmails(prev => ({
      ...prev,
      [emailType]: !prev[emailType]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Email address copied to clipboard",
      });
    });
  };

  const hiddenEmail = contact.email ? contact.email.replace(/(.{2})(.*)(@.*)/, '$1••••••$3') : '••••••••••••@••.•••';

  return (
    <section>
      <h2 className="text-xl font-bold mb-2">Contacts</h2>
      <hr className="mb-4" />
      <div className="grid grid-cols-[180px_auto] gap-x-8 gap-y-4 text-base">
        {contact.linkedin && (
          <>
            <span className="flex items-center gap-1.5 text-gray-600 font-medium">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/beb16618d740a2aa8ec04b177ad0bb8cbdc7b395" 
                alt="LinkedIn" 
                className="w-4 h-4 object-contain"
              />
              LinkedIn
            </span>
            <a 
              href={`https://${contact.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {contact.linkedin}
            </a>
          </>
        )}
        
        {contact.twitter && (
          <>
            <span className="flex items-center gap-1.5 text-gray-600 font-medium">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/bb26636b166183963917f2201fbb87cba7d39a94" 
                alt="X (Twitter)" 
                className="w-4 h-4 object-contain"
              />
              X (Twitter)
            </span>
            <a 
              href={`https://x.com/${contact.twitter}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {`x.com/${contact.twitter}`}
            </a>
          </>
        )}
        
        <span className="flex items-center gap-1.5 text-gray-600 font-medium">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f13c2f94dec5b3082859425931633350f34b7a54" 
            alt="Email" 
            className="w-4 h-4 object-contain"
          />
          Work Emails
        </span>
        {contact.email ? (
          <div>
            <span className="mr-2">{showEmails.work ? contact.email : hiddenEmail}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 p-0" 
              onClick={() => copyToClipboard(contact.email || "")}
            >
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/b68eb65475b5dddf5cba016b221934f4ba784c1c" 
                alt="Copy" 
                className="w-5 h-5 object-contain"
              />
            </Button>
          </div>
        ) : (
          <span>no data</span>
        )}
        
        <span className="flex items-center gap-1.5 text-gray-600 font-medium">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/f13c2f94dec5b3082859425931633350f34b7a54" 
            alt="Email" 
            className="w-4 h-4 object-contain"
          />
          Personal Email
        </span>
        <span>no data</span>
        
        {contact.tel && (
          <>
            <span className="flex items-center gap-1.5 text-gray-600 font-medium">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/5a26cf0f3dd36a935ed5a7cefbff69240744cd7b" 
                alt="Phone" 
                className="w-4 h-4 object-contain"
              />
              Phone number
            </span>
            <span>{contact.tel}</span>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileContactsSection;
