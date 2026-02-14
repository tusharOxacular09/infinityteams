import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  GraduationCap, 
  Calendar,
  BookOpen
} from "lucide-react";

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  grade: string;
  description: string;
}

interface EducationStepProps {
  data: EducationEntry[];
  onUpdate: (data: EducationEntry[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const emptyEntry: Omit<EducationEntry, "id"> = {
  institution: "",
  degree: "",
  field_of_study: "",
  start_date: "",
  end_date: "",
  grade: "",
  description: "",
};

export function EducationStep({ data, onUpdate, onNext, onBack }: EducationStepProps) {
  const [entries, setEntries] = useState<EducationEntry[]>(
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

  const updateEntry = (id: string, field: keyof EducationEntry, value: string) => {
    const newEntries = entries.map((e) => 
      e.id === id ? { ...e, [field]: value } : e
    );
    setEntries(newEntries);
    onUpdate(newEntries);
  };

  const handleNext = () => {
    const validEntries = entries.filter(
      (e) => e.institution.trim() && e.degree.trim()
    );
    onUpdate(validEntries);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Education</h2>
        <p className="text-muted-foreground">Add your educational qualifications</p>
      </div>

      <div className="space-y-6">
        {entries.map((entry) => (
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
                {/* Institution */}
                <div className="space-y-2">
                  <Label>Institution Name *</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="University of Mumbai"
                      value={entry.institution}
                      onChange={(e) => updateEntry(entry.id, "institution", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Degree */}
                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Bachelor of Technology"
                      value={entry.degree}
                      onChange={(e) => updateEntry(entry.id, "degree", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Field of Study */}
                <div className="space-y-2">
                  <Label>Field of Study / Major</Label>
                  <Input
                    placeholder="Computer Science"
                    value={entry.field_of_study}
                    onChange={(e) => updateEntry(entry.id, "field_of_study", e.target.value)}
                  />
                </div>

                {/* Grade */}
                <div className="space-y-2">
                  <Label>Grade / CGPA</Label>
                  <Input
                    placeholder="8.5/10 or First Class"
                    value={entry.grade}
                    onChange={(e) => updateEntry(entry.id, "grade", e.target.value)}
                  />
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <Label>Start Year</Label>
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
                  <Label>End Year (or Expected)</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="month"
                      value={entry.end_date}
                      onChange={(e) => updateEntry(entry.id, "end_date", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 mt-4">
                <Label>Activities & Achievements (Optional)</Label>
                <Textarea
                  placeholder="List relevant coursework, projects, awards, or extracurricular activities..."
                  value={entry.description}
                  onChange={(e) => updateEntry(entry.id, "description", e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addEntry} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Another Education
      </Button>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleNext} variant="cta" size="lg">
          Next: Certifications
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
