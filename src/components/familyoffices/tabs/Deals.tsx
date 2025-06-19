import React, { useEffect, useState } from "react";
import { Deals, fetchDeals } from "@/services/familyOfficesService.ts";
import { DataTable } from "@/components/ui/DataTable.tsx";
import { dealsColumns } from "@/components/columns-bucket";
import { EmptyDetailsPage } from "@/components/common";
import { Loading } from "@/utils.tsx";

interface DealsProps {
  familyOfficeId: string;
}

const DealsTab = ({ familyOfficeId }: DealsProps) => {
  const [deals, setDeals] = useState<Deals[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDeals(familyOfficeId);

        setDeals(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await loadDeals();
    })();
  }, [familyOfficeId]);

  if ((!deals || deals.length === 0) && !isLoading) {
    return <EmptyDetailsPage pageName="Deals" />;
  }

  return (
    <div className="bg-white w-full h-full py-8 px-4 md:px-6 lg:px-8">
      <Loading show={isLoading} />
      <h1 className="text-2xl font-semibold mb-6">Deals</h1>

      <DataTable columns={dealsColumns} data={deals} />
    </div>
  );
};

export default DealsTab;
