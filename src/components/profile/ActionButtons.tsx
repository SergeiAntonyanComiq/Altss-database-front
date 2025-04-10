import React from "react";

interface ActionButtonsProps {
  onSave: () => void;
  onUndo: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onUndo }) => {
  return (
    <div className="flex w-full gap-6 text-base font-medium whitespace-nowrap text-center flex-wrap mt-6 justify-end max-md:max-w-full">
      <button 
        className="self-stretch bg-[rgba(38,101,240,1)] gap-2.5 text-white w-[150px] px-6 py-3 rounded-[50px] max-md:px-5"
        onClick={onSave}
      >
        Save
      </button>
      <button 
        className="self-stretch bg-white border gap-2.5 text-[rgba(38,101,240,1)] w-[150px] px-6 py-3 rounded-[50px] border-[rgba(38,101,240,1)] border-solid max-md:px-5"
        onClick={onUndo}
      >
        Undo
      </button>
    </div>
  );
};

export default ActionButtons; 