import React from "react";

export const EmptyDetailsPage = ({ pageName }: { pageName: string }) => (
  <div className="flex items-center justify-center h-full">
    <div className="bg-gray-50 p-6 rounded-lg text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{pageName}</h3>
      <div className="flex items-center justify-center text-sm text-gray-500">
        <span className="h-3 w-3 mr-2 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
        Enrichment in progress — check back soon.
      </div>
    </div>
  </div>
);
