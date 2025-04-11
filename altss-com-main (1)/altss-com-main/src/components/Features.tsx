
import React from 'react';
import { 
  Search, 
  BarChart3, 
  Users, 
  Mail, 
  Database, 
  TrendingUp 
} from 'lucide-react';
import BlurredShape from "@/components/ui/BlurredShape";

const features = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Find Limited Partners",
    description: "Comprehensive database of LP information with advanced search and filtering capabilities."
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Allocation Insights",
    description: "Detailed insights on LP allocations, preferences, and historical investment patterns."
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Active Allocators",
    description: "Real-time research on limited partners who are currently allocating capital."
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Verified Contacts",
    description: "Up-to-date contact information for key decision-makers at LP organizations."
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Data Accuracy",
    description: "Highly verified data through multi-source validation and regular updates."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Fund Manager Insights",
    description: "Platform created by fund managers to address the specific needs of the industry."
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-altss-light-gray relative overflow-hidden">
      <BlurredShape color="blue" size="lg" className="bottom-0 right-0 opacity-5" />
      <BlurredShape color="green" size="md" className="top-1/4 left-0 opacity-5" />
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <p className="sub-heading mb-3">Sourcing superpowers</p>
          <h2 className="heading-lg mb-6">Discover hidden gems</h2>
          <p className="text-lg text-altss-slate">
            Access comprehensive data and insights on limited partners to make informed investment decisions and build strategic relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-xl transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-5 inline-flex items-center justify-center bg-altss-deep-blue/5 p-3 rounded-lg">
                {React.cloneElement(feature.icon, { className: 'h-6 w-6 text-altss-deep-blue' })}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-altss-slate">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-24 relative overflow-hidden rounded-xl shadow-lg">
          <div className="aspect-[16/10] bg-gray-100">
            <img
              src="public/lovable-uploads/789cfd5d-d179-4c0b-8ee6-68da45fa9ff3.png"
              alt="Altss Platform Interface"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
