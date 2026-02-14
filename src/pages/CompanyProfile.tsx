import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Sparkles } from "lucide-react";
import { CompanyDetailsForm } from "@/components/company-profile/CompanyDetailsForm";
import { HiringPreferencesForm } from "@/components/company-profile/HiringPreferencesForm";

export default function CompanyProfile() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28 pb-16">
        <div className="container-hero max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Company Profile
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your company details and hiring preferences to get better candidate matches.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company Details
              </TabsTrigger>
              <TabsTrigger value="hiring" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Hiring Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <CompanyDetailsForm />
            </TabsContent>

            <TabsContent value="hiring">
              <HiringPreferencesForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
