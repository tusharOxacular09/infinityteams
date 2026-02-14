import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, DollarSign, Clock, TrendingUp } from "lucide-react";

export interface ProfessionalData {
  years_experience: number;
  level: "Junior" | "Medior" | "Senior" | "Lead";
  availability: "Immediately" | "2 weeks" | "1 month" | "2+ months" | "Not available";
  salary_expectation: number | null;
  preferred_work_type: "Remote" | "Hybrid" | "On-site" | "Any";
  linkedin_url: string;
}

interface ProfessionalStepProps {
  data: ProfessionalData;
  onUpdate: (data: Partial<ProfessionalData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ProfessionalStep({ data, onUpdate, onNext, onBack }: ProfessionalStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    // No required fields for this step
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Professional Details</CardTitle>
        <CardDescription>
          Tell us about your work preferences and experience level
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Years of Experience */}
          <div className="space-y-2">
            <Label htmlFor="years_experience">Total Years of Experience</Label>
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="years_experience"
                type="number"
                min="0"
                max="50"
                placeholder="5"
                value={data.years_experience || ""}
                onChange={(e) => onUpdate({ years_experience: parseInt(e.target.value) || 0 })}
                className="pl-10"
              />
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <Label htmlFor="level">Experience Level</Label>
            <Select 
              value={data.level} 
              onValueChange={(value: ProfessionalData["level"]) => onUpdate({ level: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Junior">Junior (0-2 years)</SelectItem>
                <SelectItem value="Medior">Medior (2-5 years)</SelectItem>
                <SelectItem value="Senior">Senior (5-10 years)</SelectItem>
                <SelectItem value="Lead">Lead (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label htmlFor="availability">Availability / Notice Period</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Select 
                value={data.availability} 
                onValueChange={(value: ProfessionalData["availability"]) => onUpdate({ availability: value })}
              >
                <SelectTrigger className="w-full pl-10">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Immediately">Immediately Available</SelectItem>
                  <SelectItem value="2 weeks">2 Weeks Notice</SelectItem>
                  <SelectItem value="1 month">1 Month Notice</SelectItem>
                  <SelectItem value="2+ months">2+ Months Notice</SelectItem>
                  <SelectItem value="Not available">Not Currently Looking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preferred Work Type */}
          <div className="space-y-2">
            <Label htmlFor="preferred_work_type">Preferred Work Type</Label>
            <Select 
              value={data.preferred_work_type || "Any"} 
              onValueChange={(value: ProfessionalData["preferred_work_type"]) => onUpdate({ preferred_work_type: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Remote">Remote Only</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="On-site">On-site</SelectItem>
                <SelectItem value="Any">Any / Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Salary Expectation */}
        <div className="space-y-2">
          <Label htmlFor="salary_expectation">Expected Monthly Salary (INR)</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="salary_expectation"
              type="number"
              min="0"
              placeholder="100000"
              value={data.salary_expectation || ""}
              onChange={(e) => onUpdate({ salary_expectation: parseInt(e.target.value) || null })}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground">Your expected CTC will be visible to companies</p>
        </div>

        {/* LinkedIn URL */}
        <div className="space-y-2">
          <Label htmlFor="linkedin_url">LinkedIn Profile URL (Optional)</Label>
          <Input
            id="linkedin_url"
            placeholder="https://linkedin.com/in/yourprofile"
            value={data.linkedin_url}
            onChange={(e) => onUpdate({ linkedin_url: e.target.value })}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} variant="cta" size="lg">
            Next: Skills
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
