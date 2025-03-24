
import React from "react";
import { CompanyType } from "@/types/company";

interface CompanyNewsSectionProps {
  company: CompanyType;
}

const newsItems = [
  {
    id: "1",
    logo: "TC",
    color: "#f43f5e",
    textColor: "#ffffff",
    content: "TechCrunch reports that " + "ACME Long Name Super Long Inc. " + "has secured a $50M Series C funding round led by Sequoia Capital.",
    date: "2023-05-15"
  },
  {
    id: "2",
    logo: "FT",
    color: "#3b82f6",
    textColor: "#ffffff",
    content: "Financial Times announces " + "ACME Long Name Super Long Inc. " + "expansion into European markets with new offices in London and Berlin.",
    date: "2023-04-22"
  },
  {
    id: "3",
    logo: "WSJ",
    color: "#10b981",
    textColor: "#ffffff",
    content: "Wall Street Journal covers " + "ACME Long Name Super Long Inc. " + "latest product innovation that's disrupting the industry.",
    date: "2023-03-10"
  }
];

const CompanyNewsSection: React.FC<CompanyNewsSectionProps> = ({ company }) => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-medium mb-4">Company News</h2>
        <div className="space-y-4">
          {newsItems.map(item => (
            <div key={item.id} className="flex gap-4">
              <div 
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-xl font-bold rounded-md"
                style={{ backgroundColor: item.color, color: item.textColor }}
              >
                {item.logo}
              </div>
              <div className="flex-1">
                <p className="text-gray-700">{item.content.replace("ACME Long Name Super Long Inc.", company.firm_name || company.name || "")}</p>
                <div className="flex justify-between mt-1">
                  <a href="#" className="text-blue-600 hover:underline inline-block">Read more</a>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompanyNewsSection;
