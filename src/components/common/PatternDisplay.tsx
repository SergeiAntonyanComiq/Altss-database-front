import { Dots, EyeIcon } from "@/components/ui/icons";

export const PatternDisplay = ({ handleShow }: { handleShow: () => void }) => (
  <div className="flex space-x-2 items-center justify-between">
    <Dots />
    <div className="cursor-pointer" onClick={handleShow}>
      <EyeIcon />
    </div>
  </div>
);
