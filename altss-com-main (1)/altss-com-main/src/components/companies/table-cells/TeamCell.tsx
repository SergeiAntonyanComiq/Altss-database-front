
import React from "react";

interface TeamCellProps {
  staffCount: string | null | undefined;
}

const TeamCell = ({ staffCount }: TeamCellProps) => (
  <div className="flex min-h-11 w-full items-center gap-2.5 px-4">
    {staffCount ? (
      <div className="bg-[rgba(0,126,96,0.1)] gap-2 px-3 py-1.5 rounded-[30px] flex items-center overflow-hidden">
        <span className="truncate block w-full text-sm">{staffCount}</span>
      </div>
    ) : (
      <span className="flex items-center text-sm">N/A</span>
    )}
  </div>
);

export default TeamCell;
