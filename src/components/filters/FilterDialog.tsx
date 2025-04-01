
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanyTypes, setSelectedCompanyTypes] = useState<string[]>([]);
  
  const companyTypes = [
    "Private Equity",
    "Family Office",
    "VC Fund",
    "Venture Studios",
    "Incubator", 
    "Accelerators",
    "Private Debt",
    "Hedge Funds",
    "Real Estate",
    "Infrastructure",
    "Digital Assets",
    "IP & Royalties"
  ];

  const handleCompanyTypeToggle = (type: string) => {
    if (selectedCompanyTypes.includes(type)) {
      setSelectedCompanyTypes(selectedCompanyTypes.filter(item => item !== type));
    } else {
      setSelectedCompanyTypes([...selectedCompanyTypes, type]);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle submit
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Select Filters. Step {currentStep}/3.</DialogTitle>
          <div className="flex justify-center mt-2 mb-3">
            <div className="w-24 h-1 bg-blue-500 rounded"></div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1 */}
          {currentStep === 1 && (
            <>
              <p className="text-lg font-medium">Just type what you are looking for, or select filters bellow...</p>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="I need all Funds of Funds VC, that are founded by ex-startups founders after 2020 and have AUM more then $20B with investment focus in..."
                className="w-full h-20 p-4 text-base"
              />
            </>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <>
              <p className="text-lg font-medium mb-4">Select all company types you are looking for</p>
              <div className="flex flex-wrap gap-2">
                {companyTypes.map((type) => (
                  <Badge 
                    key={type} 
                    variant={selectedCompanyTypes.includes(type) ? "default" : "outline"}
                    className={`text-base cursor-pointer py-2 px-4 rounded-full ${
                      selectedCompanyTypes.includes(type) 
                        ? "bg-blue-600 hover:bg-blue-700" 
                        : "bg-white hover:bg-gray-100 text-blue-600 border-blue-600"
                    }`}
                    onClick={() => handleCompanyTypeToggle(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                  <p className="text-lg font-medium mb-3">Founding Period</p>
                  <Input 
                    placeholder="Type here.. from 2022 until December 2024.." 
                    className="w-full"
                  />
                </div>
                <div>
                  <p className="text-lg font-medium mb-3">HQ Location</p>
                  <Input 
                    placeholder="Type here.. North America, but exclude.." 
                    className="w-full"
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 3 - You can add more content for step 3 here */}
          {currentStep === 3 && (
            <div className="min-h-[250px] flex items-center justify-center">
              <p>Step 3 content would go here...</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 1}
            className="rounded-full px-8"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            className="rounded-full px-8 bg-gray-200 text-gray-600 hover:bg-gray-300"
          >
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
