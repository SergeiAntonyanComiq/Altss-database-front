import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProfileNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-6xl mx-auto text-center py-12">
      <h1 className="text-2xl font-bold mb-4">Contact Not Found</h1>
      <p className="text-gray-600 mb-6">We couldn't find the contact you're looking for.</p>
      <Button onClick={() => navigate("/cabinet3")}>
        Return to Contacts List
      </Button>
    </div>
  );
};

export default ProfileNotFound;
