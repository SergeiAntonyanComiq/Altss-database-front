
import React, { useState } from "react";
import { Linkedin, Twitter, Mail, Phone, Copy } from "lucide-react";
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
      <h2 className="text-xl font-bold mb-4">Contacts</h2>
      <div className="border-t border-gray-200"></div>
      <div className="pt-4 grid grid-cols-[180px_auto] gap-x-8 gap-y-4 text-base">
        {contact.linkedin && (
          <>
            <span className="flex items-center gap-1.5 text-gray-600 font-medium">
              <Linkedin className="h-4 w-4" />LinkedIn
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
              <Twitter className="h-4 w-4" />X (Twitter)
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
          <Mail className="h-4 w-4" />Work Emails
        </span>
        {contact.email ? (
          <div className="flex items-center">
            <span className="mr-2">{showEmails.work ? contact.email : hiddenEmail}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 p-0" 
              onClick={() => copyToClipboard(contact.email || "")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <span>no data</span>
        )}
        
        <span className="flex items-center gap-1.5 text-gray-600 font-medium">
          <Mail className="h-4 w-4" />Personal Email
        </span>
        <span>no data</span>
        
        {contact.tel && (
          <>
            <span className="flex items-center gap-1.5 text-gray-600 font-medium">
              <Phone className="h-4 w-4" />Phone number
            </span>
            <span>{contact.tel}</span>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileContactsSection;
