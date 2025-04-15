import React from "react";

interface ContactCellProps {
  email?: string;
  tel?: string;
  fax?: string;
}

const ContactCell: React.FC<ContactCellProps> = ({ email, tel, fax }) => {
  return (
    <div className="text-sm text-[#637381] space-y-1 w-full overflow-hidden">
      {email && (
        <div className="truncate w-full">
          <span className="font-medium">Email:</span> {email}
        </div>
      )}
      {tel && (
        <div className="truncate w-full">
          <span className="font-medium">Tel:</span> {tel}
        </div>
      )}
      {fax && (
        <div className="truncate w-full">
          <span className="font-medium">Fax:</span> {fax}
        </div>
      )}
      {!email && !tel && !fax && <div className="truncate w-full">N/A</div>}
    </div>
  );
};

export default ContactCell;
