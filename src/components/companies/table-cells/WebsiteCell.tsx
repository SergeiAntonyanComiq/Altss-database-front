import React from "react";

interface WebsiteCellProps {
  website: string | undefined;
}

const WebsiteCell: React.FC<WebsiteCellProps> = ({ website }) => {
  if (!website) return <div className="text-sm text-[#637381]">N/A</div>;

  return (
    <div className="text-sm text-[#637381] truncate w-full overflow-hidden">
      <a 
        href={website.startsWith('http') ? website : `https://${website}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600 hover:underline truncate block w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {website}
      </a>
    </div>
  );
};

export default WebsiteCell;
