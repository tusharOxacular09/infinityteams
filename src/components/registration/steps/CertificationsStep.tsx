import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Award, 
  Building2,
  Calendar,
  Link as LinkIcon
} from "lucide-react";

export interface CertificationEntry {
  id: string;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date: string;
  credential_id: string;
  credential_url: string;
}

interface CertificationsStepProps {
  data: CertificationEntry[];
  onUpdate: (data: CertificationEntry[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const emptyEntry: Omit<CertificationEntry, "id"> = {
  name: "",
  issuing_organization: "",
  issue_date: "",
  expiry_date: "",
  credential_id: "",
  credential_url: "",
};

const suggestedCertifications = [
  { name: "AWS Solutions Architect", org: "Amazon Web Services" },
  { name: "Google Cloud Professional", org: "Google" },
  { name: "Microsoft Azure Administrator", org: "Microsoft" },
  { name: "PMP", org: "PMI" },
  { name: "Scrum Master", org: "Scrum Alliance" },
  { name: "Kubernetes Administrator (CKA)", org: "CNCF" },
];

export function CertificationsStep({ data, onUpdate, onNext, onBack }: CertificationsStepProps) {
  const [entries, setEntries] = useState<CertificationEntry[]>(data);

  const addEntry = (suggestion?: { name: string; org: string }) => {
    const newEntry = suggestion 
      ? { ...emptyEntry, id: generateId(), name: suggestion.name, issuing_organization: suggestion.org }
      : { ...emptyEntry, id: generateId() };
    
    const newEntries = [...entries, newEntry];
    setEntries(newEntries);
    onUpdate(newEntries);
  };

  const removeEntry = (id: string) => {
    const newEntries = entries.filter((e) => e.id !== id);
    setEntries(newEntries);
    onUpdate(newEntries);
  };

  const updateEntry = (id: string, field: keyof CertificationEntry, value: string) => {
    const newEntries = entries.map((e) => 
      e.id === id ? { ...e, [field]: value } : e
    );
    setEntries(newEntries);
    onUpdate(newEntries);
  };

  const handleNext = () => {
    const validEntries = entries.filter(
      (e) => e.name.trim() && e.issuing_organization.trim()
    );
    onUpdate(validEntries);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Certifications & Awards</h2>
        <p className="text-muted-foreground">Add your professional certifications and achievements (optional)</p>
      </div>

      {/* Quick Add Suggestions */}
      {entries.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-6">
            <p className="text-sm text-muted-foreground mb-4">Quick add popular certifications:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedCertifications.map((cert) => (
                <Button 
                  key={cert.name}
                  variant="outline" 
                  size="sm"
                  onClick={() => addEntry(cert)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {cert.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {entries.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No certifications added yet</p>
            <Button variant="outline" onClick={() => addEntry()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Certification
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <Card key={entry.id} className="relative">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    Certification {index + 1}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeEntry(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Certification Name */}
                  <div className="space-y-2">
                    <Label>Certification Name *</Label>
                    <Input
                      placeholder="AWS Solutions Architect"
                      value={entry.name}
                      onChange={(e) => updateEntry(entry.id, "name", e.target.value)}
                    />
                  </div>

                  {/* Issuing Organization */}
                  <div className="space-y-2">
                    <Label>Issuing Organization *</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Amazon Web Services"
                        value={entry.issuing_organization}
                        onChange={(e) => updateEntry(entry.id, "issuing_organization", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Issue Date */}
                  <div className="space-y-2">
                    <Label>Issue Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="month"
                        value={entry.issue_date}
                        onChange={(e) => updateEntry(entry.id, "issue_date", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Expiry Date */}
                  <div className="space-y-2">
                    <Label>Expiry Date (if applicable)</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="month"
                        value={entry.expiry_date}
                        onChange={(e) => updateEntry(entry.id, "expiry_date", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Credential ID */}
                  <div className="space-y-2">
                    <Label>Credential ID</Label>
                    <Input
                      placeholder="ABC123XYZ"
                      value={entry.credential_id}
                      onChange={(e) => updateEntry(entry.id, "credential_id", e.target.value)}
                    />
                  </div>

                  {/* Credential URL */}
                  <div className="space-y-2">
                    <Label>Verification URL</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="https://verify.credential.com/..."
                        value={entry.credential_url}
                        onChange={(e) => updateEntry(entry.id, "credential_url", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {entries.length > 0 && (
        <Button variant="outline" onClick={() => addEntry()} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Another Certification
        </Button>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleNext} variant="cta" size="lg">
          Next: CV Upload
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
