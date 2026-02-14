import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Globe, MapPin, Loader2, Phone, User, ShieldCheck, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const industries = [
  "Technology", "Finance & Banking", "Healthcare", "E-commerce & Retail",
  "Manufacturing", "Education", "Real Estate", "Media & Entertainment",
  "Logistics & Supply Chain", "Energy & Utilities", "Other",
];

const companySizes = [
  "1-10 employees", "11-50 employees", "51-200 employees",
  "201-500 employees", "501-1000 employees", "1000+ employees",
];

const hiringNeeds = [
  "1-5 hires", "6-15 hires", "16-50 hires", "50+ hires",
];

export function CompanyDetailsForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    website: "",
    industry: "",
    companySize: "",
    location: "",
    hiringNeed: "",
    description: "",
  });
  const [candidateDataConsent, setCandidateDataConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your company details have been saved successfully.",
      });
    }, 800);
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Company Details</CardTitle>
        <CardDescription>Update your company information to help us match you with the best candidates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Name & Contact Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="profile-companyName">Company Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="profile-companyName"
                placeholder="Acme Inc."
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-contactName">Contact Person</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="profile-contactName"
                placeholder="John Doe"
                value={formData.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Phone & Website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="profile-phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="profile-phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profile-website">Company Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="profile-website"
                placeholder="https://company.com"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Industry & Company Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Industry</Label>
            <Select value={formData.industry} onValueChange={(v) => handleChange("industry", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(i => (
                  <SelectItem key={i} value={i}>{i}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Company Size</Label>
            <Select value={formData.companySize} onValueChange={(v) => handleChange("companySize", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Location & Hiring Need */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="profile-location">Headquarters Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="profile-location"
                placeholder="New York, USA"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Expected Hiring Needs</Label>
            <Select value={formData.hiringNeed} onValueChange={(v) => handleChange("hiringNeed", v)}>
              <SelectTrigger>
                <SelectValue placeholder="How many hires?" />
              </SelectTrigger>
              <SelectContent>
                {hiringNeeds.map(h => (
                  <SelectItem key={h} value={h}>{h}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="profile-description">About Your Company</Label>
          <Textarea
            id="profile-description"
            placeholder="Briefly describe your company, the types of roles you're hiring for, and any specific requirements..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
          />
        </div>

        {/* Candidate Data Consent */}
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="profile-consent"
              checked={candidateDataConsent}
              onCheckedChange={(checked) => setCandidateDataConsent(checked === true)}
              className="mt-0.5"
            />
            <Label htmlFor="profile-consent" className="text-sm leading-relaxed cursor-pointer font-normal">
              <ShieldCheck className="inline h-4 w-4 mr-1 text-accent align-text-bottom" />
              I agree not to share candidate data outside my organization. All candidate information
              accessed through this platform is confidential and must be used solely for recruitment purposes.
            </Label>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pt-2">
          <Button onClick={handleSave} variant="cta" size="lg" disabled={isLoading}>
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="mr-2 h-4 w-4" /> Save Changes</>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
