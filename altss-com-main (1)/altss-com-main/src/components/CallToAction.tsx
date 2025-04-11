
import React from 'react';
import { Button } from "@/components/ui/button";
import BlurredShape from "@/components/ui/BlurredShape";

const CallToAction: React.FC = () => {
  return (
    <section id="demo" className="py-20 md:py-32 bg-altss-light-gray relative overflow-hidden">
      <BlurredShape color="green" size="md" className="bottom-10 right-10 opacity-5" />
      <BlurredShape color="blue" size="lg" className="-top-40 -left-40 opacity-5" />
      
      <div className="container px-4 md:px-6 mx-auto max-w-4xl relative z-10">
        <div className="glass-card rounded-2xl p-8 md:p-12 shadow-lg bg-white/90">
          <div className="text-center mb-10">
            <p className="sub-heading mb-3">Ready to optimize your deal sourcing?</p>
            <h2 className="heading-lg mb-6">Schedule your demo today</h2>
            <p className="text-lg text-altss-slate max-w-2xl mx-auto">
              See how Altss can help you identify the right limited partners, gain allocation insights, and streamline your fundraising process.
            </p>
          </div>
          
          <form className="max-w-md mx-auto space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-altss-blue/30 focus:border-altss-blue transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Work Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-altss-blue/30 focus:border-altss-blue transition-colors"
                  placeholder="john@yourcompany.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">Company</label>
                <input
                  id="company"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-altss-blue/30 focus:border-altss-blue transition-colors"
                  placeholder="Your Company"
                  required
                />
              </div>
            </div>
            
            <Button className="w-full bg-altss-deep-blue hover:bg-altss-blue transition-all duration-300">
              Book a Demo
            </Button>
            
            <p className="text-center text-sm text-altss-slate mt-4">
              We'll get back to you within 24 hours to schedule your personalized demo.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
