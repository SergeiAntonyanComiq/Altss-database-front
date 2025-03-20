
import React, { useState } from "react";
import { Linkedin, Mail, Phone, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactType } from "@/types/contact";

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

  const hiddenEmail = contact.email ? contact.email.replace(/(.{2})(.*)(@.*)/, '$1••••••$3') : '••••••••••••@••.•••';

  return (
    <section>
      <h2 className="text-xl font-medium mb-4">Contacts</h2>
      <div className="space-y-4">
        {contact.linkedin && (
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <Linkedin className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-blue-600 hover:underline">
              <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                {contact.linkedin}
              </a>
            </span>
          </div>
        )}
        
        {contact.email && (
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <span className="flex items-center">
              <span className="mr-2">
                {showEmails.work ? contact.email : hiddenEmail}
              </span>
              <Button 
                variant="ghost" 
                onClick={() => toggleEmailVisibility('work')}
                className="h-8 w-8 p-0"
              >
                {showEmails.work ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </span>
          </div>
        )}
        
        {!contact.email && (
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <span>{"no personal email data"}</span>
          </div>
        )}
        
        {contact.tel && (
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <span>{contact.tel}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileContactsSection;
