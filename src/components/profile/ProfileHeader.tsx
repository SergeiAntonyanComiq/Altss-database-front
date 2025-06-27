import React, { useState } from "react";
import { ContactType } from "@/types/contact";
import { FilledHeartIcon, OutlineHeartIcon } from "@/components/ui/icons";
import { updateFavoritesData } from "@/services/savedFiltersService.ts";
import { Badge } from "@/components/ui/badge.tsx";
import { planVariantMap } from "@/utils/users.ts";

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

  const [isFavorited, setIsFavorited] = useState(
    props.contact?.favorite ?? false
  );

  const displayName = isContactProfile ? props.contact.name : props.name;

  const displayPlan = isContactProfile ? "" : props.plan;
  const logoFilename = props.contact?.logo_filename;
  const logo = props.contact?.logo;

  const handleAddToFavorites = async () => {
    const newFavorite = !isFavorited;
    setIsFavorited(newFavorite);

    const data = {
      itemType: props.contact.itemType,
      itemIds: [props.contact.id.toString()],
      favorited: newFavorite,
    };

    await updateFavoritesData(data);
  };

  return (
    <div className="mb-5">
      <div className="p-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            {logoFilename || logo ? (
              <img
                src={
                  logoFilename
                    ? `https://sinerg.blob.core.windows.net/main/img/logo/${logoFilename}`
                    : logo?.startsWith("/9j")
                    ? `data:image/jpeg;base64,${logo}`
                    : logo || "/placeholder.svg"
                }
                alt="Logo"
                className="w-6 h-6 object-contain mr-2"
              />
            ) : null}
            <h1 className="text-[rgba(17,25,40,1)] text-2xl font-semibold leading-none">
              {displayName}
            </h1>

            {isContactProfile && (
              <button
                className="min-w-[200px] bg-white flex items-center gap-2 text-[#03887E] border-none font-medium text-center justify-center px-4 py-1 rounded-[50px]"
                onClick={handleAddToFavorites}
              >
                {isFavorited ? <FilledHeartIcon /> : <OutlineHeartIcon />}
                <span>Add to Favorites</span>
              </button>
            )}
          </div>

          {!isContactProfile && displayPlan && (
            <Badge variant={planVariantMap[displayPlan]}>
              {displayPlan.charAt(0).toUpperCase() + displayPlan.slice(1)}
            </Badge>
          )}

          {/*{isContactProfile && (*/}
          {/*  <div className="flex items-center gap-2.5">*/}
          {/*    <button className="min-w-[180px] max-h-[34px] bg-white border flex items-center gap-2 justify-center px-4 py-1.5 rounded-[50px] border-[rgba(223,228,234,1)] text-[rgba(99,115,129,1)] font-medium">*/}
          {/*      <img*/}
          {/*        src="https://cdn.builder.io/api/v1/image/assets/ce56428a1de541c0a66cfb597c694052/0bd597c769172697ba7e1f8d0385eb32afeed632"*/}
          {/*        className="w-[18px] h-[18px] object-contain"*/}
          {/*        alt="Enrich icon"*/}
          {/*      />*/}
          {/*      <span className="ml-1">Order Enrich</span>*/}
          {/*    </button>*/}

          {/*    <button className="min-w-[180px] max-h-[34px] bg-white border flex items-center gap-2 justify-center px-4 py-1.5 rounded-[50px] border-[rgba(223,228,234,1)] text-[rgba(99,115,129,1)] font-medium">*/}
          {/*      Claim a mistake*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
