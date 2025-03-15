
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import BlurredShape from "@/components/ui/BlurredShape";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const Hero: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (imageRef.current) {
        const image = imageRef.current;
        image.classList.add('opacity-0');
        
        // Wait for the image to load
        if (image.complete) {
          setTimeout(() => {
            image.classList.remove('opacity-0');
            image.classList.add('opacity-100');
          }, 300);
        } else {
          image.onload = () => {
            setTimeout(() => {
              image.classList.remove('opacity-0');
              image.classList.add('opacity-100');
            }, 300);
          };
        }
      }
    };

    loadImage();
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-altss-deep-blue/95 -z-20"></div>
      <AnimatedBackground />
      
      <BlurredShape color="blue" size="xl" className="-top-20 -right-20 opacity-10" />
      <BlurredShape color="orange" size="lg" className="-left-20 top-40 opacity-5" />
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <p className="sub-heading mb-4 opacity-0 animate-fade-in text-white/90" style={{animationDelay: '0.1s'}}>
              The Limited Partner Intelligence Hub
            </p>
            <h1 className="heading-xl mb-6 opacity-0 animate-fade-in text-white" style={{animationDelay: '0.3s'}}>
              Find your fund returners
            </h1>
            <p className="text-xl text-white/80 mb-8 md:mb-10 opacity-0 animate-fade-in" style={{animationDelay: '0.5s'}}>
              Data on limited partners, their allocations, and research on limited partners now allocating. Created by fund managers for fund managers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in" style={{animationDelay: '0.7s'}}>
              <Button asChild size="lg" className="bg-white text-altss-deep-blue hover:bg-white/90 transition-all duration-300 w-full sm:w-auto">
                <a href="#demo">Book a Demo</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
          
          <div className="w-full relative overflow-hidden rounded-lg border border-white/20 shadow-lg mt-8 opacity-0 animate-fade-in" style={{animationDelay: '0.9s'}}>
            <div className="aspect-[16/9] bg-gray-100">
              <img
                ref={imageRef}
                src="public/lovable-uploads/44bd3280-5f80-43d1-b2cd-fd82e9d73c34.png" 
                alt="Altss Platform Dashboard" 
                className="w-full h-full object-cover transition-opacity duration-700 opacity-0"
              />
            </div>
          </div>
          
          <div className="mt-16 md:mt-24">
            <p className="text-sm text-white/80 text-center mb-8">Trusted by leading fund managers</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-80">
              {Array.from({length: 6}).map((_, i) => (
                <div key={i} className="h-8 w-24 bg-white/10 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
