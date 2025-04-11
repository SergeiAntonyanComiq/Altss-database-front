
import React from "react";
import { Construction } from "lucide-react";

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
      <Construction className="w-16 h-16 text-blue-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Page Under Construction</h1>
      <p className="text-gray-600 text-lg max-w-md mb-6">
        We're working hard to build this feature for you. Please check back later.
      </p>
      <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
      </div>
    </div>
  );
};

export default UnderConstruction;
