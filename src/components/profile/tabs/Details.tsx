import AccountInfo from "@/components/profile/AccountInfo.tsx";
import ActionButtons from "@/components/profile/ActionButtons.tsx";
import React, { ChangeEvent } from "react";
import { PasswordSection } from "./sections";
import { ProfileFormValues } from "@/pages/Profile.tsx";

export interface DetailsProps {
  formData: ProfileFormValues;
  handleInputChange: (value: ChangeEvent<HTMLInputElement>) => void;
  handleAvatarUpload: (file: File) => void;
  handleSave: () => void;
  handleUndo: () => void;
}

export const Details = ({
  formData,
  handleInputChange,
  handleAvatarUpload,
  handleSave,
  handleUndo,
}: DetailsProps) => (
  <>
    <AccountInfo
      formData={formData}
      onChange={handleInputChange}
      avatarUrl={formData.avatar_url}
      onAvatarUpload={handleAvatarUpload}
    />

    <PasswordSection formData={formData} onChange={handleInputChange} />

    <ActionButtons onSave={handleSave} onUndo={handleUndo} />
  </>
);
