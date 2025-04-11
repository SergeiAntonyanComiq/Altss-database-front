
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CompanyNotFound: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center mt-16">
      <h1 className="text-2xl font-semibold mb-4">Company Not Found</h1>
      <p className="text-gray-600 mb-8">
        We couldn't find the company you're looking for. It may have been removed or the ID is incorrect.
      </p>
      <Button asChild>
        <Link to="/companies">
          Return to Companies
        </Link>
      </Button>
    </div>
  );
};

export default CompanyNotFound;
