
import React, { useState } from "react";
import { Linkedin, Twitter, Mail, Phone, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactType } from "@/types/contact";
import { useToast } from "@/components/ui/use-toast";

interface ProfileContactsSectionProps {
  contact: ContactType;
}

const ProfileContactsSection: React.FC<ProfileContactsSectionProps> = ({ contact }) => {
  const [showEmails, setShowEmails] = useState({
    work: false,
    personal: false
  });
  const { toast } = useToast();

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

  const hiddenEmail = contact.email ? contact.email.replace(/(.{2})(.*)(@.*)/, '$1••••••••••$3') : '•••••••••••@••.•••';

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Contacts</h2>
      <hr className="mb-6" />
      <div className="grid grid-cols-[180px_auto] gap-x-8 gap-y-6 text-base">
        <span className="flex items-center text-gray-600">
          <Linkedin className="h-4 w-4 mr-2 text-blue-600" /> LinkedIn
        </span>
        {contact.linkedin ? (
          <a 
            href={`https://${contact.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {contact.linkedin}
          </a>
        ) : (
          <span>no data</span>
        )}
        
        <span className="flex items-center text-gray-600">
          <Twitter className="h-4 w-4 mr-2 text-gray-600" /> X (Twitter)
        </span>
        {contact.twitter ? (
          <a 
            href={`https://x.com/${contact.twitter}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {`x.com/${contact.twitter}`}
          </a>
        ) : (
          <span>no data</span>
        )}
        
        <span className="flex items-center text-gray-600">
          <Mail className="h-4 w-4 mr-2 text-gray-600" /> Work Emails
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
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <span>no data</span>
        )}
        
        <span className="flex items-center text-gray-600">
          <Mail className="h-4 w-4 mr-2 text-gray-600" /> Personal Email
        </span>
        <span>no data</span>
        
        <span className="flex items-center text-gray-600">
          <Phone className="h-4 w-4 mr-2 text-gray-600" /> Phone number
        </span>
        {contact.tel ? (
          <span>{contact.tel}</span>
        ) : (
          <span>no data</span>
        )}
      </div>
    </section>
  );
};

export default ProfileContactsSection;
