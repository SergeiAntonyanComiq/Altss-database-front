import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface InvestorsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFirmTypes: string[];
  onApplyFilters: (filters: {
    firmTypes: string[];
    firmName: string;
    city: string;
    country: string;
    region: string;
  }) => void;
}

const firmTypeOptions = [
  "Pension Fund",
  "Sovereign Wealth Fund",
  "Fund of Funds",
  "Family Office",
  "Insurance Company",
  "Bank / Private Bank",
  "Corporate Investor",
  "Endowment",
  "Foundation",
];

const FilterInput = ({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder: string; }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-medium">
      {label}
    </Label>
    <div className="relative">
      <Input id={id} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="pl-10 pr-10" />
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      {value && (
        <button onClick={() => onChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  </div>
);

const InvestorsFilterModal: React.FC<InvestorsFilterModalProps> = ({ isOpen, onClose, selectedFirmTypes, onApplyFilters }) => {
  const [firmNameFilter, setFirmNameFilter] = React.useState("");
  const [cityFilter, setCityFilter] = React.useState("");
  const [countryFilter, setCountryFilter] = React.useState("");
  const [regionFilter, setRegionFilter] = React.useState("");
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>(selectedFirmTypes || []);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredFirmTypes = firmTypeOptions.filter((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((x) => x !== type) : [...prev, type]));
  };

  const handleApply = () => {
    onApplyFilters({
      firmTypes: selectedTypes,
      firmName: firmNameFilter.trim(),
      city: cityFilter.trim(),
      country: countryFilter.trim(),
      region: regionFilter.trim(),
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedTypes([]);
    setFirmNameFilter("");
    setCityFilter("");
    setCountryFilter("");
    setRegionFilter("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Filter Investors</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="create" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="create" className="flex-1">Create Filter</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="flex-1 overflow-auto flex flex-col mt-4">
            <ScrollArea className="flex-1 px-1 pr-4 max-h-[calc(85vh-180px)] overflow-y-auto overflow-x-hidden">
              <div className="space-y-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <FilterInput id="firmName" label="Filter by Investor Name" value={firmNameFilter} onChange={setFirmNameFilter} placeholder="Search by name..." />
                  <FilterInput id="city" label="Filter by City" value={cityFilter} onChange={setCityFilter} placeholder="Search by city..." />
                  <FilterInput id="country" label="Filter by Country" value={countryFilter} onChange={setCountryFilter} placeholder="Search by country..." />
                  <FilterInput id="region" label="Filter by Region" value={regionFilter} onChange={setRegionFilter} placeholder="Search by region..." />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Filter by Investor Type</h3>
                    {selectedTypes.length > 0 && <span className="text-xs text-gray-500">{selectedTypes.length} selected</span>}
                  </div>
                  <div className="relative">
                    <Input placeholder="Search types..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-10" />
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    {searchTerm && <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
                  </div>
                  <ScrollArea className="h-[150px] border rounded-md p-2 overflow-y-auto overflow-x-hidden">
                    <div className="space-y-2">
                      {filteredFirmTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={`type-${type}`} checked={selectedTypes.includes(type)} onCheckedChange={() => toggleType(type)} />
                          <label htmlFor={`type-${type}`} className="text-sm font-medium leading-none">
                            {type}
                          </label>
                        </div>
                      ))}
                      {filteredFirmTypes.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No types match.</p>}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <DialogFooter className="pt-4 sm:justify-between">
          <Button variant="outline" onClick={handleClear}>Clear All</Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleApply}>Apply Filters</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvestorsFilterModal; 