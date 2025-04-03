
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CompanyType } from "@/types/company";

interface CompanyHistorySectionProps {
  company: CompanyType;
}

const historyEvents = [
  {
    id: "1",
    year: "2005",
    title: "Company Founding",
    description: "COMPANY_NAME was founded by John Smitty in San Francisco, California."
  },
  {
    id: "2",
    year: "2010",
    title: "Series A Funding",
    description: "Secured $10M in Series A funding to expand product development."
  },
  {
    id: "3",
    year: "2015",
    title: "International Expansion",
    description: "Opened offices in London, Tokyo, and Sydney to support global operations."
  },
  {
    id: "4",
    year: "2018",
    title: "IPO",
    description: "Successfully completed an initial public offering on NASDAQ."
  },
  {
    id: "5",
    year: "2022",
    title: "Major Acquisition",
    description: "Acquired TechSolutions Inc. to enhance product portfolio."
  }
];

const CompanyHistorySection: React.FC<CompanyHistorySectionProps> = ({ company }) => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-medium mb-4">Company Timeline</h2>
        <div className="relative">
          <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {historyEvents.map((event, index) => (
              <div key={event.id} className="flex gap-6">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm z-10 relative">
                    {event.year}
                  </div>
                </div>
                <Card className="flex-1 shadow-sm border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg">{event.title}</h3>
                    <p className="text-gray-600 mt-1">
                      {event.description.replace("COMPANY_NAME", company.firm_name || company.name || "")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyHistorySection;
