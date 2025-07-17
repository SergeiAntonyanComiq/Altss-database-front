import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addNewOffice,
  fetchIntegrationOfficeById,
  IntegrationOffice,
  updateOffice,
} from "@/services/integrationService";
import { Button } from "@/components/ui/button.tsx";
import AppSidebar from "@/components/AppSidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { GeneralInformation } from "@/components/integration/GeneralInformation.tsx";
import { FormProvider, useForm } from "react-hook-form";
import { Deals } from "@/components/integration/Deals.tsx";
import { InvestmentFocus } from "@/components/integration/InvestmentFocus.tsx";
import {
  prepareDealsForSave,
  prepareDefaultDeals,
  prepareFocusForSave,
} from "@/utils/integration.ts";
import { FocusData, RangeData } from "@/services/familyOfficesService.ts";
import { useToast } from "@/hooks";

const emptyState = {
  company_id: "new",
  firm_name: "",
  firm_type: "",
  city: "",
  country: "",
  region: "",
  aum: "",
  year_founded: "",
  website: "",
  linkedin_url: "",
  description: "",
  logo: "",
  twitter_url: "",
};

export default function IntegrationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isNew = id === "new";
  const [data, setData] = useState<IntegrationOffice | null>(null);
  const [isEditing, setIsEditing] = useState(isNew);
  const [loading, setLoading] = useState(!isNew);
  const [error, setError] = useState<string | null>(null);

  const defaultValues = useMemo(() => {
    if (isNew) {
      return { ...emptyState, deals: [] };
    }

    return {
      ...data,
      deals: prepareDefaultDeals(data?.deals),
      investment_focus:
        data?.investment_focus &&
        Object.prototype.hasOwnProperty.call(
          data?.investment_focus,
          "company_type"
        )
          ? {
              company_types: {},
              technological_focuses: {},
              regional_focuses: {},
              industry_focuses: {},
            }
          : data?.investment_focus ?? {},
    };
  }, [data, isNew]);

  const form = useForm<IntegrationOffice>({ defaultValues, mode: "onSubmit" });

  const { handleSubmit, reset } = form;

  const onEditClick = () => setIsEditing(true);
  const onCancelClick = () => {
    if (!id) return;

    if (isNew) {
      navigate("/integration"); // go back to list
      return;
    }

    reset();
    setIsEditing(false);
    setLoading(true);
    fetchIntegrationOfficeById(id)
      .then(setData)
      .finally(() => setLoading(false));
  };

  const onSaveClick = async (formValues: IntegrationOffice) => {
    const newData = {
      ...formValues,
      deals: prepareDealsForSave(formValues?.deals),
      investment_focus: prepareFocusForSave(formValues?.investment_focus),
    };

    try {
      if (isNew) {
        await addNewOffice(newData);
        navigate("/integration");
        toast({ title: "New office added successfully!" });
      } else {
        await updateOffice(id, newData);

        reset(newData);
        toast({ title: "Office updated successfully!" });
      }
      setIsEditing(false);
    } catch (error) {
      toast({ title: "An error occurred while saving." });
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (!id) return;

    if (isNew) {
      setData(emptyState);
      return;
    }

    setLoading(true);
    fetchIntegrationOfficeById(id)
      .then((fetchedData) => {
        setData(fetchedData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Failed to load data");
      })
      .finally(() => setLoading(false));
  }, [id, isNew]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-background">
        <AppSidebar />

        <main className="flex-1 bg-[#F6F6F7] p-6 overflow-auto">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSaveClick)}>
              <div className="w-full flex justify-end">
                {!isEditing ? (
                  <Button onClick={onEditClick}>Edit</Button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button onClick={onCancelClick} variant="secondary">
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </div>
                )}
              </div>
              <div className="my-10">
                <h1 className="my-10 font-semibold">Company Information</h1>

                <GeneralInformation
                  isEditing={isEditing}
                  hideCompanyId={isNew}
                />
              </div>

              <div className="my-10">
                <h1 className="my-10 font-semibold">Investment Focus</h1>
                <InvestmentFocus isEditing={isEditing} />
              </div>

              <Deals isEditing={isEditing} />
            </form>
          </FormProvider>
        </main>
      </div>
    </SidebarProvider>
  );
}
