
import React from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import BlurredShape from "@/components/ui/BlurredShape";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { InfoIcon, AlertCircle } from "lucide-react";

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
      <BlurredShape color="green" size="md" className="top-60 right-40" />
      
      <div className="z-10 max-w-5xl w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 space-y-10">
        <div className="text-center">
          <Badge className="mb-4">Components Demo</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Test Page</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A showcase of various UI components and design elements from the Shadcn UI library integrated with Tailwind CSS.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Components</CardTitle>
                <CardDescription>
                  Explore different toast notifications by clicking the buttons below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Accordion Example</CardTitle>
                <CardDescription>Expandable content sections</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is Shadcn UI?</AccordionTrigger>
                    <AccordionContent>
                      Shadcn UI is a collection of reusable components built with Radix UI and Tailwind CSS.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How to get started?</AccordionTrigger>
                    <AccordionContent>
                      Install the components and use them in your React application.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aspect Ratio Demo</CardTitle>
                <CardDescription>Maintain consistent proportions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <AspectRatio ratio={16 / 9}>
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-100 to-purple-100">
                      <p className="text-lg font-medium text-gray-700">16:9 Aspect Ratio Container</p>
                    </div>
                  </AspectRatio>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational alert that provides helpful context.
                </AlertDescription>
              </Alert>
              
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  This action cannot be undone. Please proceed with caution.
                </AlertDescription>
              </Alert>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">Product Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documentation</h2>
          <div className="prose max-w-none">
            <p>
              This test page demonstrates various UI components from the Shadcn UI library integrated with Tailwind CSS.
              It includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Button components with different variants</li>
              <li>Toast notifications system</li>
              <li>Card layouts for organized content</li>
              <li>Accordion for collapsible sections</li>
              <li>Alert components for different message types</li>
              <li>Avatar component for user representation</li>
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
