import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Globe, Users, MapPin, ArrowRight, ArrowLeft, Loader2, Phone, User, ShieldCheck } from "lucide-react";

interface CompanyDetailsStepProps {
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
  testMode?: boolean;
}

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

export function CompanyDetailsStep({ onNext, onSkip, onBack, testMode }: CompanyDetailsStepProps) {
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!formData.industry) newErrors.industry = "Please select an industry";
    if (!formData.companySize) newErrors.companySize = "Please select company size";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!candidateDataConsent) newErrors.consent = "You must agree to the data protection commitment";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (testMode) {
      onNext();
      return;
    }
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Company Details</CardTitle>
        <CardDescription>Tell us about your company so we can match you with the best talent. You can skip this and complete it later from your company profile.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {/* Company Name & Contact Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="companyName"
                placeholder="Acme Inc."
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className="pl-10"
              />
            </div>
            {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Person *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="contactName"
                placeholder="John Doe"
                value={formData.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                className="pl-10"
              />
            </div>
            {errors.contactName && <p className="text-sm text-destructive">{errors.contactName}</p>}
          </div>
        </div>

        {/* Phone & Website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Company Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
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
            <Label>Industry *</Label>
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
            {errors.industry && <p className="text-sm text-destructive">{errors.industry}</p>}
          </div>
          <div className="space-y-2">
            <Label>Company Size *</Label>
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
            {errors.companySize && <p className="text-sm text-destructive">{errors.companySize}</p>}
          </div>
        </div>

        {/* Location & Hiring Need */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Headquarters Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="New York, USA"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="pl-10"
              />
            </div>
            {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
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
          <Label htmlFor="description">Tell us about your company</Label>
          <Textarea
            id="description"
            placeholder="Briefly describe your company, the types of roles you're hiring for, and any specific requirements..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
          />
        </div>

        {/* Candidate Data Consent */}
        <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="candidate-data-consent"
              checked={candidateDataConsent}
              onCheckedChange={(checked) => {
                setCandidateDataConsent(checked === true);
                if (errors.consent) setErrors(prev => ({ ...prev, consent: "" }));
              }}
              className="mt-0.5"
            />
            <Label htmlFor="candidate-data-consent" className="text-sm leading-relaxed cursor-pointer font-normal">
              <ShieldCheck className="inline h-4 w-4 mr-1 text-accent align-text-bottom" />
              I agree not to share candidate data outside my organization. I understand that all candidate information
              accessed through this platform is confidential and must be used solely for recruitment purposes within my company.
            </Label>
          </div>
          {errors.consent && <p className="text-sm text-destructive pl-7">{errors.consent}</p>}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex gap-3">
            <Button onClick={onSkip} variant="ghost" size="lg">
              Skip for Now
            </Button>
            <Button onClick={handleSubmit} variant="cta" size="lg" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
              ) : (
                <>Save & Continue <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
