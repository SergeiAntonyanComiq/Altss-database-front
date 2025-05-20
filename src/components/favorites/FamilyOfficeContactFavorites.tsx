import React from "react";
import { Briefcase, Building2, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { FavoriteContactType } from "@/services/savedFiltersService.ts";

export interface FamilyOfficeContactFavoritesProps {
  contact: FavoriteContactType;
  handleView: (id: string, path: string) => void;
  removeFavorite: (
    id: string,
    name: string,
    type: "family_office_contacts"
  ) => void;
}

export const FamilyOfficeContactFavorites = ({
  contact,
  handleView,
  removeFavorite,
}: FamilyOfficeContactFavoritesProps) => (
  <div key={contact.id} className="p-4 hover:bg-gray-50 transition-colors">
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center">
          <div
            className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer"
            onClick={() =>
              handleView(contact.item_id, "familyofficescontactsprofile")
            }
          >
            {contact.data.full_name}
          </div>
          <div className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
            Favorited
          </div>
        </div>

        <div className="mt-2 space-y-1">
          {contact.data.title && (
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
              {contact.data.title}
            </div>
          )}
          {contact.data.company_id && (
            <div className="flex items-center text-sm text-gray-600">
              <Building2 className="h-4 w-4 mr-2 text-gray-400" />
              {contact.data.company_id}
            </div>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            Added on {new Date(contact.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handleView(contact.item_id, "familyofficescontactsprofile")
          }
        >
          Profile
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() =>
            removeFavorite(
              contact.item_id,
              contact.data.full_name,
              "family_office_contacts"
            )
          }
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);
