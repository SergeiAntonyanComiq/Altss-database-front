import { withTooltipRenderer } from "@/components/ui/withTooltipRenderer.tsx";

export interface FavoriteSidebarListProps {
  id: string;
  name: string;
  title: string | string[];
  type: "office" | "contact";
  handleNavigateToFavorite: (id: string, type: "office" | "contact") => void;
}

export const FavoriteSidebarList = ({
  id,
  name,
  title,
  type,
  handleNavigateToFavorite,
}: FavoriteSidebarListProps) => {
  const modifiedTitle = Array.isArray(title) ? title[0] : title;

  return (
    <div
      onClick={() => handleNavigateToFavorite(id, type)}
      className="flex items-center gap-2 py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-100 text-[#637381]"
    >
      <div className="truncate">
        {withTooltipRenderer(<span>{name}</span>, name)}
      </div>

      {title && (
        <div className="truncate">
          {withTooltipRenderer(
            <span className="text-xs text-gray-400">{modifiedTitle}</span>,
            modifiedTitle
          )}
        </div>
      )}
    </div>
  );
};
