import { News } from "@/components/common";
import React from "react";
import { FamilyOfficeContact } from "@/services/familyOfficeContactsService.ts";

export const BioAndNews = ({ description, full_name }: FamilyOfficeContact) => (
  <div className="p-4">
    <div className="mb-6">
      <h2 className="font-semibold text-xl mb-2">Short Bio</h2>
      <hr className="border-t border-gray-200 mb-4" />
      <p className="w-[80%] leading-5 text-[#637381] text-left">
        {description || "No biography information available."}
      </p>
    </div>
    <News name={full_name} isContactNews={true} />
  </div>
);
