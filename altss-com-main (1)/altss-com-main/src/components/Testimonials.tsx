
import React from 'react';
import BlurredShape from "@/components/ui/BlurredShape";

const testimonials = [
  {
    quote: "Altss has revolutionized our fundraising process. The data accuracy is exceptional, and we've been able to connect with the right LPs.",
    author: "Sarah Johnson",
    position: "Managing Partner, Venture Capital",
    stats: [
      { value: "400%", label: "ROI" },
      { value: "5x", label: "Faster sourcing" }
    ]
  },
  {
    quote: "The platform's LP insights helped us refine our targeting strategy. We've seen a dramatic improvement in our outreach success rate.",
    author: "Michael Chen",
    position: "Director of Investor Relations, Private Equity",
    stats: [
      { value: "50%", label: "Increase in meetings" },
      { value: "200+", label: "New connections" }
    ]
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden">
      <BlurredShape color="blue" size="lg" className="-top-20 -left-20 opacity-5" />
      
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="sub-heading mb-3">Success stories</p>
          <h2 className="heading-lg mb-6">From our clients</h2>
          <p className="text-lg text-altss-slate">
            See how fund managers are leveraging Altss to discover opportunities and streamline their fundraising process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-8 rounded-xl flex flex-col justify-between h-full"
            >
              <div>
                <p className="text-xl italic mb-8">"{testimonial.quote}"</p>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-altss-slate">{testimonial.position}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {testimonial.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="border border-gray-100 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-altss-deep-blue">{stat.value}</p>
                    <p className="text-sm text-altss-slate">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-altss-deep-blue text-white rounded-xl p-8 md:p-12 relative overflow-hidden">
          <BlurredShape color="orange" size="md" className="top-0 right-0 opacity-10" />
          
          <div className="md:flex items-center justify-between relative z-10">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <p className="text-sm font-medium uppercase tracking-wider text-blue-200 mb-3">Join our community</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Over 500+ fund managers trust Altss for LP intelligence
              </h3>
              <p className="text-blue-100">
                Access the most comprehensive limited partner database for alternative asset classes.
              </p>
            </div>
            <div className="md:w-1/3 text-center">
              <a href="#demo" className="inline-block bg-white text-altss-deep-blue font-medium rounded-lg px-6 py-3 hover:bg-blue-50 transition-colors duration-300">
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
