import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Phone, MapPin, Globe, Briefcase, ArrowRight, ArrowLeft, MailCheck } from "lucide-react";
import type { EmploymentEntry } from "./EmploymentStep";
import type { EducationEntry } from "./EducationStep";
import type { SkillEntry } from "./SkillsStep";
import type { ProjectEntry } from "./ProjectsStep";
import type { CertificationEntry } from "./CertificationsStep";

export interface PersonalInfoData {
  full_name: string;
  email: string;
  phone: string;
  title: string;
  summary: string;
  location: string;
  country: string;
  years_experience?: number;
  level?: "Junior" | "Medior" | "Senior" | "Lead";
  availability?: "Immediately" | "2 weeks" | "1 month" | "2+ months" | "Not available";
  salary_expectation?: number | null;
  linkedin_url?: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onUpdate: (data: Partial<PersonalInfoData>) => void;
  onNext: () => void;
  onBack?: () => void;
  showEmailVerificationReminder?: boolean;
  pendingEmail?: string | null;
  testMode?: boolean;
  onCVParsed?: (parsed: {
    personal: Partial<PersonalInfoData>;
    employment: EmploymentEntry[];
    education: EducationEntry[];
    skills: SkillEntry[];
    projects: ProjectEntry[];
    certifications: CertificationEntry[];
  }) => void;
}

const countries = [
  "India", "United States", "United Kingdom", "Germany", "Netherlands", 
  "France", "Canada", "Australia", "Singapore", "UAE", "Other"
];

const indianCities = [
  "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Delhi NCR", 
  "Kolkata", "Ahmedabad", "Noida", "Gurgaon", "Other"
];

export function PersonalInfoStep({ data, onUpdate, onNext, onBack, showEmailVerificationReminder, pendingEmail, testMode, onCVParsed }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Invalid email format";
    if (!data.phone.trim()) newErrors.phone = "Phone number is required";
    if (!data.title.trim()) newErrors.title = "Job title is required";
    if (!data.country) newErrors.country = "Country is required";
    if (!data.location.trim()) newErrors.location = "City is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (testMode || validate()) {
      onNext();
    }
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
        <CardDescription>
          Tell us about yourself and your contact details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {/* Email Verification Reminder */}
        {showEmailVerificationReminder && (
          <Alert className="border-accent/50 bg-accent/10">
            <MailCheck className="h-4 w-4 text-accent" />
            <AlertTitle className="text-accent">Verify Your Email</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              We've sent a verification link to <span className="font-medium text-foreground">{pendingEmail}</span>. 
              Please check your inbox and click the link to verify your account. You can continue filling out your profile while you wait.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="full_name"
                placeholder="John Doe"
                value={data.full_name}
                onChange={(e) => onUpdate({ full_name: e.target.value })}
                className="pl-10"
              />
            </div>
            {errors.full_name && <p className="text-sm text-destructive">{errors.full_name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                value={data.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
                className="pl-10"
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={data.phone}
                onChange={(e) => onUpdate({ phone: e.target.value })}
                className="pl-10"
              />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Current Job Title *</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="title"
                placeholder="Senior Software Engineer"
                value={data.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                className="pl-10"
              />
            </div>
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Select value={data.country} onValueChange={(value) => onUpdate({ country: value })}>
              <SelectTrigger className="w-full">
                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="location">City *</Label>
            {data.country === "India" ? (
              <Select value={data.location} onValueChange={(value) => onUpdate({ location: value })}>
                <SelectTrigger className="w-full">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {indianCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Your city"
                  value={data.location}
                  onChange={(e) => onUpdate({ location: e.target.value })}
                  className="pl-10"
                />
              </div>
            )}
            {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary (Optional)</Label>
          <Textarea
            id="summary"
            placeholder="Write a brief summary of your professional background, skills, and career goals..."
            value={data.summary}
            onChange={(e) => onUpdate({ summary: e.target.value })}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            {data.summary.length}/500 characters
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          {onBack ? (
            <Button onClick={onBack} variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button onClick={handleNext} variant="cta" size="lg">
            Next: Professional Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
