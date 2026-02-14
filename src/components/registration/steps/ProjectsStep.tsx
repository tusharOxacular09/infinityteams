import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Link as LinkIcon,
  Github,
  Calendar,
  X
} from "lucide-react";

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  project_url: string;
  repo_url: string;
  start_date: string;
  end_date: string;
}

interface ProjectsStepProps {
  data: ProjectEntry[];
  onUpdate: (data: ProjectEntry[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const emptyEntry: Omit<ProjectEntry, "id"> = {
  title: "",
  description: "",
  technologies: [],
  project_url: "",
  repo_url: "",
  start_date: "",
  end_date: "",
};

export function ProjectsStep({ data, onUpdate, onNext, onBack }: ProjectsStepProps) {
  const [entries, setEntries] = useState<ProjectEntry[]>(
    data.length > 0 ? data : []
  );
  const [techInput, setTechInput] = useState<Record<string, string>>({});

  const addEntry = () => {
    const newEntries = [...entries, { ...emptyEntry, id: generateId() }];
    setEntries(newEntries);
    onUpdate(newEntries);
  };

  const removeEntry = (id: string) => {
    const newEntries = entries.filter((e) => e.id !== id);
    setEntries(newEntries);
    onUpdate(newEntries);
  };

  const updateEntry = (id: string, field: keyof ProjectEntry, value: string | string[]) => {
    const newEntries = entries.map((e) => 
      e.id === id ? { ...e, [field]: value } : e
    );
    setEntries(newEntries);
    onUpdate(newEntries);
  };

  const addTechnology = (projectId: string) => {
    const tech = techInput[projectId]?.trim();
    if (!tech) return;

    const project = entries.find(e => e.id === projectId);
    if (!project) return;

    if (!project.technologies.includes(tech)) {
      updateEntry(projectId, "technologies", [...project.technologies, tech]);
    }
    setTechInput({ ...techInput, [projectId]: "" });
  };

  const removeTechnology = (projectId: string, tech: string) => {
    const project = entries.find(e => e.id === projectId);
    if (!project) return;

    updateEntry(projectId, "technologies", project.technologies.filter(t => t !== tech));
  };

  const handleNext = () => {
    const validEntries = entries.filter(e => e.title.trim());
    onUpdate(validEntries);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Projects & Portfolio</h2>
        <p className="text-muted-foreground">Showcase your best work and personal projects (optional)</p>
      </div>

      {entries.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No projects added yet</p>
            <Button variant="outline" onClick={addEntry}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <Card key={entry.id} className="relative">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">Project {index + 1}</h3>
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
                  {/* Project Title */}
                  <div className="space-y-2 md:col-span-2">
                    <Label>Project Title *</Label>
                    <Input
                      placeholder="E-commerce Platform"
                      value={entry.title}
                      onChange={(e) => updateEntry(entry.id, "title", e.target.value)}
                    />
                  </div>

                  {/* Live URL */}
                  <div className="space-y-2">
                    <Label>Live Demo URL</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="https://myproject.com"
                        value={entry.project_url}
                        onChange={(e) => updateEntry(entry.id, "project_url", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Repo URL */}
                  <div className="space-y-2">
                    <Label>Repository URL</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="https://github.com/user/repo"
                        value={entry.repo_url}
                        onChange={(e) => updateEntry(entry.id, "repo_url", e.target.value)}
                        className="pl-10"
                      />
                    </div>
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
                      />
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-2 mt-4">
                  <Label>Technologies Used</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add technology (e.g., React, Node.js)"
                      value={techInput[entry.id] || ""}
                      onChange={(e) => setTechInput({ ...techInput, [entry.id]: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology(entry.id))}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => addTechnology(entry.id)}
                    >
                      Add
                    </Button>
                  </div>
                  {entry.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {entry.technologies.map(tech => (
                        <Badge key={tech} variant="secondary" className="gap-1">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(entry.id, tech)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2 mt-4">
                  <Label>Project Description</Label>
                  <Textarea
                    placeholder="Describe the project, your role, key features, and achievements..."
                    value={entry.description}
                    onChange={(e) => updateEntry(entry.id, "description", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {entries.length > 0 && (
        <Button variant="outline" onClick={addEntry} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Another Project
        </Button>
      )}

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
