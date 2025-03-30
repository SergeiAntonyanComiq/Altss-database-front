
import React from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, InfoIcon, AlertCircle, ArrowRight, ChevronRight } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col items-center justify-center mb-12">
          <Badge className="mb-2">Components Demo</Badge>
          <h1 className="text-4xl font-bold text-center mb-4">
            Test Page
          </h1>
          <p className="text-muted-foreground text-center max-w-lg">
            A showcase of various UI components and design elements from the Shadcn UI library integrated with Tailwind CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Buttons */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Interactive Components</CardTitle>
              <CardDescription>
                Explore different toast notifications by clicking the buttons below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button onClick={handleButtonClick} className="group">
                  Show Toast
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => toast({
                    title: "Information",
                    description: "This is an informational message",
                    variant: "default",
                  })}
                  className="group"
                >
                  Info Toast
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button
                  variant="destructive"
                  onClick={() => toast({
                    title: "Warning",
                    description: "This action cannot be undone",
                    variant: "destructive",
                  })}
                  className="group"
                >
                  Warning Toast
                  <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              
              <div className="rounded-lg border p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Click any button above to see toast notifications appear at the bottom right corner of your screen.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Accordion */}
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Accordion Example</CardTitle>
              <CardDescription>Expandable content sections</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Shadcn UI?</AccordionTrigger>
                  <AccordionContent>
                    Shadcn UI is a collection of reusable components built with Radix UI and Tailwind CSS. It provides accessible, customizable components that are easy to integrate.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How to get started?</AccordionTrigger>
                  <AccordionContent>
                    Install the components and use them in your React application. Each component can be styled and customized according to your needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it free to use?</AccordionTrigger>
                  <AccordionContent>
                    Yes, Shadcn UI is completely free and open source. You can use it in personal and commercial projects without any restrictions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Feature section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Feature Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Responsive Design",
                description: "All components are fully responsive and work on any screen size.",
                icon: <CheckCircle className="h-6 w-6 text-green-500" />
              },
              {
                title: "Accessible Components",
                description: "Built with accessibility in mind using Radix UI primitives.",
                icon: <InfoIcon className="h-6 w-6 text-blue-500" />
              },
              {
                title: "Easy Integration",
                description: "Simple to integrate into existing React applications.",
                icon: <AlertCircle className="h-6 w-6 text-amber-500" />
              }
            ].map((feature, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="font-medium mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Aspect ratio demo */}
        <Card className="shadow-md hover:shadow-lg transition-shadow mb-12">
          <CardHeader>
            <CardTitle>Aspect Ratio Demo</CardTitle>
            <CardDescription>Maintain consistent proportions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border">
              <AspectRatio ratio={16 / 9}>
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100">
                  <div className="text-center">
                    <p className="text-lg font-medium text-gray-700">16:9 Aspect Ratio Container</p>
                    <p className="text-sm text-gray-500">Ensures consistent sizing across different screen sizes</p>
                  </div>
                </div>
              </AspectRatio>
            </div>
          </CardContent>
        </Card>

        {/* Documentation section */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Components and usage information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>
                This test page demonstrates various UI components from the Shadcn UI library integrated with Tailwind CSS.
                It includes:
              </p>
              <ul className="space-y-1 list-disc pl-5">
                <li>Button components with different variants and hover effects</li>
                <li>Toast notifications system for user feedback</li>
                <li>Card layouts for organized content presentation</li>
                <li>Accordion for collapsible sections of content</li>
                <li>Feature highlight cards with icons</li>
                <li>AspectRatio component for maintaining consistent proportions</li>
                <li>Responsive layout using Tailwind CSS grid system</li>
              </ul>
              
              <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <h3 className="flex items-center text-sm font-medium text-blue-800 mb-2">
                  <InfoIcon className="h-4 w-4 mr-2" />
                  Pro Tip
                </h3>
                <p className="text-sm text-blue-700">
                  All components can be customized by adjusting their props or using Tailwind utility classes.
                  Check the Shadcn UI documentation for more detailed information on each component.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Call to action */}
        <div className="mt-12 text-center">
          <Button className="group" size="lg">
            Explore More Components
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Test;
