import React from "react";
import { Button } from "@/components/ui/button";

interface CompaniesErrorProps {
  errorMessage: string;
}

const CompaniesError = ({ errorMessage }: CompaniesErrorProps) => (
  <div className="bg-white rounded-lg shadow-sm p-6 text-center mt-10">
    <p className="text-red-500">{errorMessage}</p>
    <Button className="mt-4" onClick={() => window.location.reload()}>
      Retry
    </Button>
  </div>
);

export default CompaniesError;
