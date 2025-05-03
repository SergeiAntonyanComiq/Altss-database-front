import React from "react";

interface LocationCellProps {
  country?: string;
  address?: string;
  state?: string;
}

const LocationCell: React.FC<LocationCellProps> = ({
  country,
  address,
  state,
}) => (
  <div className="text-sm text-[#637381] w-full overflow-hidden">
    {address && (
      <div className="truncate w-full">
        <span className="font-medium">Address:</span> {address}
      </div>
    )}
    <div className="flex flex-row">
      {country && (
        <div className="truncate w-full">
          <span className="font-medium">Country:</span> {country}
        </div>
      )}
      {state && (
        <div className="truncate w-full">
          <span className="font-medium">State/County:</span> {state}
        </div>
      )}
    </div>
    {!country && !address && !state && (
      <div className="truncate w-full">N/A</div>
    )}
  </div>
);

export default LocationCell;
