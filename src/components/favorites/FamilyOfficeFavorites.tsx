import { Building2, DollarSign, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import React from "react";
import { FavoriteFamilyOfficeType } from "@/services/savedFiltersService.ts";

export interface FamilyOfficeFavoritesProps {
  office: FavoriteFamilyOfficeType;
  handleView: (id: string, path: string) => void;
  removeFavorite: (id: string, name: string, type: "family_office") => void;
}

export const FamilyOfficeFavorites = ({
  office,
  handleView,
  removeFavorite,
}: FamilyOfficeFavoritesProps) => {
  return (
    <div
      key={office.item_id}
      className="p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <div
              className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer"
              onClick={() => handleView(office.item_id, "familyoffices")}
            >
              {office.data.firm_name}
            </div>
            <div className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
              Favorited
            </div>
          </div>

          <div className="mt-2 space-y-1">
            {office.data.firm_type && (
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                {office.data.firm_type}
              </div>
            )}
            {office.data.aum && (
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                AUM: {office.data.aum}
              </div>
            )}
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              Added on {new Date(office.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleView(office.item_id, "familyoffices")}
          >
            Profile
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() =>
              removeFavorite(
                office.item_id,
                office.data.firm_name,
                "family_office"
              )
            }
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
