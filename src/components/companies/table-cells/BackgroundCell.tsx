import React from "react";

interface BackgroundCellProps {
  background: string | undefined;
}

const BackgroundCell: React.FC<BackgroundCellProps> = ({ background }) => {
  return (
    <div className="text-sm text-[#637381] truncate max-w-full overflow-hidden whitespace-nowrap">
      {background || 'N/A'}
    </div>
  );
};

export default BackgroundCell;
