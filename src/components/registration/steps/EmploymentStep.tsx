import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Building2, 
  Calendar,
  MapPin
} from "lucide-react";

export interface EmploymentEntry {
  id: string;
  company_name: string;
  job_title: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
}

interface EmploymentStepProps {
  data: EmploymentEntry[];
  onUpdate: (data: EmploymentEntry[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const emptyEntry: Omit<EmploymentEntry, "id"> = {
  company_name: "",
  job_title: "",
  location: "",
  start_date: "",
  end_date: "",
  is_current: false,
  description: "",
};

export function EmploymentStep({ data, onUpdate, onNext, onBack }: EmploymentStepProps) {
  const [entries, setEntries] = useState<EmploymentEntry[]>(
    data.length > 0 ? data : [{ ...emptyEntry, id: generateId() }]
  );

  const addEntry = () => {
    const newEntries = [...entries, { ...emptyEntry, id: generateId() }];
    setEntries(newEntries);
    onUpdate(newEntries);
  };

  const removeEntry = (id: string) => {
    if (entries.length === 1) return;
    const newEntries = entries.filter((e) => e.id !== id);
    setEntries(newEntries);
    onUpdate(newEntries);
  };

  const updateEntry = (id: string, field: keyof EmploymentEntry, value: string | boolean) => {
    const newEntries = entries.map((e) => {
      if (e.id === id) {
        const updated = { ...e, [field]: value };
        if (field === "is_current" && value === true) {
          updated.end_date = "";
        }
        return updated;
      }
      return e;
    });
    setEntries(newEntries);
    onUpdate(newEntries);
  };

  const handleNext = () => {
    // Filter out empty entries
    const validEntries = entries.filter(
      (e) => e.company_name.trim() && e.job_title.trim()
    );
    onUpdate(validEntries);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Employment History</h2>
        <p className="text-muted-foreground">Add your work experience, starting with the most recent</p>
      </div>

      <div className="space-y-6">
        {entries.map((entry, index) => (
          <Card key={entry.id} className="relative">
            <CardContent className="pt-6">
              {entries.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => removeEntry(entry.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input
                    placeholder="Senior Software Engineer"
                    value={entry.job_title}
                    onChange={(e) => updateEntry(entry.id, "job_title", e.target.value)}
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label>Company Name *</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Acme Technologies"
                      value={entry.company_name}
                      onChange={(e) => updateEntry(entry.id, "company_name", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label>Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Mumbai, India"
                      value={entry.location}
                      onChange={(e) => updateEntry(entry.id, "location", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Currently Working */}
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox
                    id={`current-${entry.id}`}
                    checked={entry.is_current}
                    onCheckedChange={(checked) => updateEntry(entry.id, "is_current", !!checked)}
                  />
                  <Label htmlFor={`current-${entry.id}`} className="text-sm font-normal cursor-pointer">
                    I currently work here
                  </Label>
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="month"
                      value={entry.start_date}
                      onChange={(e) => updateEntry(entry.id, "start_date", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="month"
                      value={entry.end_date}
                      onChange={(e) => updateEntry(entry.id, "end_date", e.target.value)}
                      className="pl-10"
                      disabled={entry.is_current}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 mt-4">
                <Label>Job Description & Achievements</Label>
                <Textarea
                  placeholder="Describe your responsibilities, key achievements, and technologies used..."
                  value={entry.description}
                  onChange={(e) => updateEntry(entry.id, "description", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addEntry} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Another Position
      </Button>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleNext} variant="cta" size="lg">
          Next: Education
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
