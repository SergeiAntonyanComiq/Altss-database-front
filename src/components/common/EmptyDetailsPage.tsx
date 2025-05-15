import React from "react";

export const EmptyDetailsPage = ({ pageName }: { pageName: string }) => (
  <div className="bg-gray-50 p-6 rounded-lg">
    <h3 className="text-lg font-medium text-gray-900 mb-4">{pageName}</h3>
    <p className="text-sm text-gray-500">No data available.</p>
  </div>
);
