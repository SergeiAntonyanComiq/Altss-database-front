
import React from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import BlurredShape from "@/components/ui/BlurredShape";
import { useToast } from "@/hooks/use-toast";

const Test = () => {
  const { toast } = useToast();
  
  const handleButtonClick = () => {
    toast({
      title: "Action triggered",
      description: "You clicked the button successfully",
      variant: "default",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-background flex flex-col items-center justify-center p-6">
      {/* Background decorative elements */}
      <BlurredShape color="blue" size="xl" className="-top-40 -left-40" />
      <BlurredShape color="orange" size="lg" className="bottom-20 -right-20" />
      
      <div className="z-10 max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Interactive Components</h2>
            <p className="text-gray-600">
              This test page demonstrates various UI components and interactions.
              Click the buttons below to see different toast notifications.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={handleButtonClick}>
                Show Toast
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => toast({
                  title: "Information",
                  description: "This is an informational message",
                  variant: "default",
                })}
              >
                Info Toast
              </Button>
              
              <Button 
                variant="destructive"
                onClick={() => toast({
                  title: "Warning",
                  description: "This action cannot be undone",
                  variant: "destructive",
                })}
              >
                Warning Toast
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Aspect Ratio Demo</h2>
            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
              <AspectRatio ratio={16 / 9}>
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-100 to-purple-100">
                  <p className="text-lg font-medium text-gray-700">16:9 Aspect Ratio Container</p>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
        
        <div className="pt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documentation</h2>
          <div className="prose max-w-none">
            <p>
              This test page demonstrates various UI components from the Shadcn UI library integrated with Tailwind CSS.
              It includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Button components with different variants</li>
              <li>Toast notifications system</li>
              <li>AspectRatio component for maintaining proportions</li>
              <li>BlurredShape components for decorative backgrounds</li>
              <li>Responsive layout using Tailwind CSS grid system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
