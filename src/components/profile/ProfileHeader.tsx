import React from "react";
import { ContactType } from "@/types/contact";

interface ProfileHeaderUserProps {
  name: string;
  plan: string;
  contact?: never;
}

interface ProfileHeaderContactProps {
  contact: ContactType;
  name?: never;
  plan?: never;
}

type ProfileHeaderProps = ProfileHeaderUserProps | ProfileHeaderContactProps;

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const isContactProfile = "contact" in props && props.contact !== undefined;

  const displayName = isContactProfile ? props.contact.name : props.name;

  const displayPlan = isContactProfile ? "" : props.plan;

  return (
    <div className="mb-5">
      <div className="p-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">
              {displayName}
            </h1>

            {isContactProfile && (
              <button className="min-w-[200px] bg-white flex items-center gap-2 text-[#03887E] border-none font-medium text-center justify-center px-4 py-1 rounded-[50px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/ca51bf083c87bb6765db009254de1b519ea4a3ec"
                  className="w-[18px] h-[18px] object-contain"
                  alt="Favorites icon"
                />
                <span>Add to Favorites</span>
              </button>
            )}
          </div>

          {!isContactProfile && displayPlan && (
            <div className="bg-green-50 text-green-700 px-4 py-1 rounded-full text-sm font-medium border border-green-100">
              {displayPlan}
            </div>
          )}

          {isContactProfile && (
            <div className="flex items-center gap-2.5">
              <button className="min-w-[180px] max-h-[34px] bg-white border flex items-center gap-2 justify-center px-4 py-1.5 rounded-[50px] border-[rgba(223,228,234,1)] text-[rgba(99,115,129,1)] font-medium">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/0bd597c769172697ba7e1f8d0385eb32afeed632"
                  className="w-[18px] h-[18px] object-contain"
                  alt="Enrich icon"
                />
                <span className="ml-1">Order Enrich</span>
              </button>

              <button className="min-w-[180px] max-h-[34px] bg-white border flex items-center gap-2 justify-center px-4 py-1.5 rounded-[50px] border-[rgba(223,228,234,1)] text-[rgba(99,115,129,1)] font-medium">
                Claim a mistake
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
