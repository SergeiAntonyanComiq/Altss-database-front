import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { fetchFamilyOfficeContacts, FamilyOfficeContact } from "@/services/familyOfficeContactsService";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TABS = [
  { key: "general", label: "General" },
  { key: "contact", label: "Contact Details" },
  { key: "notes", label: "Notes" },
  { key: "other", label: "Other Info" },
];

const FamilyOfficesContactsProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<FamilyOfficeContact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    const fetchContact = async () => {
      setIsLoading(true);
      try {
        const res = await fetchFamilyOfficeContacts({ contact_id: id });
        setContact(res.data[0] || null);
      } catch (error) {
        setContact(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchContact();
  }, [id]);

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <div className="flex-1 bg-gray-100 flex items-center justify-center">
            <p>Loading contact profile...</p>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (!contact) {
    return (
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          <div className="flex-1 bg-gray-100 flex items-center justify-center">
            <p>Contact not found.</p>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex-1 bg-gray-100 overflow-auto p-8">
          <section className="bg-white shadow w-full rounded-lg px-6 pt-4 pb-4">
            <ProfileHeader
              contact={{
                id: 0,
                firm_id: Number(contact.company_id) || 0,
                contact_id: 0,
                investor: "",
                firm_type: "",
                title: contact.title,
                name: contact.full_name,
                alternative_name: "",
                role: "",
                job_title: contact.title,
                asset_class: "",
                email: contact.email,
                tel: contact.phone,
                city: "",
                state: "",
                country_territory: "",
                zip_code: "",
                linkedin: contact.linkedin,
                favorite: false,
              }}
            />
            <ProfileTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <div className="w-full mt-4 px-6 pb-4">
              {activeTab === "general" && (
                <Card className="p-6 mb-4">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                      {(() => {
                        let avatar = contact.avatar_filename;
                        let other = contact.other_fields;
                        if (!avatar) {
                          if (typeof other === "string") {
                            try {
                              other = JSON.parse(other);
                            } catch {
                              other = {};
                            }
                          }
                          if (other && other.avatar_filename) {
                            avatar = other.avatar_filename;
                          }
                        }
                        if (avatar) {
                          return (
                            <AvatarImage
                              src={`https://sinerg.blob.core.windows.net/main/img/avatars/${avatar}`}
                              alt={contact.full_name}
                              onError={e => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                          );
                        }
                        return (
                          <AvatarFallback>
                            {contact.full_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </AvatarFallback>
                        );
                      })()}
                    </Avatar>
                    <div>
                      <div className="text-2xl font-bold">{contact.full_name}</div>
                      <div className="text-gray-500">{contact.title}</div>
                      {/* Display office_tag and family_office if present */}
                      {(() => {
                        let other = contact.other_fields;
                        if (typeof other === "string") {
                          try {
                            other = JSON.parse(other);
                          } catch {
                            other = {};
                          }
                        }
                        return (
                          <>
                            {other && other.office_tag && (
                              <div className="text-sm text-gray-700 mt-1">
                                <span className="font-medium">Office Tag:</span> {other.office_tag}
                              </div>
                            )}
                            {other && other.family_office && (
                              <div className="text-sm text-gray-700">
                                <span className="font-medium">Family Office:</span> {other.family_office}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </Card>
              )}
              {activeTab === "contact" && (
                <Card className="p-6 mb-4">
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    <a href={`mailto:${contact.email}`} className="text-blue-600">{contact.email}</a>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Phone:</span>{" "}
                    <span>{contact.phone}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">LinkedIn:</span>{" "}
                    {contact.linkedin ? (
                      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                        {contact.linkedin}
                      </a>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Company ID:</span>{" "}
                    <span>{contact.company_id}</span>
                  </div>
                </Card>
              )}
              {activeTab === "notes" && (
                <Card className="p-6 mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Notes:</span>
                    <div className="mt-2 text-gray-800 whitespace-pre-line">{contact.notes || "—"}</div>
                  </div>
                </Card>
              )}
              {activeTab === "other" && (
                <Card className="p-6 mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Other Info:</span>
                    {(() => {
                      let other = contact.other_fields;
                      if (typeof other === "string") {
                        try {
                          other = JSON.parse(other);
                        } catch {
                          // leave as string
                        }
                      }
                      if (other && typeof other === "object") {
                        // Display tags if present
                        if (Array.isArray(other.tags) && other.tags.length > 0) {
                          return (
                            <div className="mt-2 mb-2 flex flex-wrap gap-2">
                              {other.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="inline-block bg-[#F3F6F9] text-[#2665F0] text-xs font-medium px-2 py-0.5 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          );
                        }
                        // Display other fields
                        const keys = Object.keys(other).filter(k => k !== "tags");
                        if (keys.length > 0) {
                          return (
                            <div className="mt-2">
                              {keys.map((key) => (
                                <div key={key} className="mb-1">
                                  <span className="font-medium text-gray-600">{key}:</span>{" "}
                                  <span className="text-gray-800">{JSON.stringify(other[key])}</span>
                                </div>
                              ))}
                            </div>
                          );
                        }
                        // If only tags or empty
                        return <div className="mt-2 text-gray-500">—</div>;
                      }
                      // Fallback: show as string or dash
                      return (
                        <pre className="mt-2 text-gray-800 bg-gray-50 rounded p-2 overflow-x-auto">
                          {other ? String(other) : "—"}
                        </pre>
                      );
                    })()}
                  </div>
                </Card>
              )}
            </div>
          </section>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FamilyOfficesContactsProfile;
