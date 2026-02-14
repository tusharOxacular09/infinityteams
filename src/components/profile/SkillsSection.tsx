import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Pencil, X, Code2, Search, ChevronRight, Briefcase } from "lucide-react";
import { CandidateSkill } from "@/hooks/useCandidateProfile";
import { useSkillCatalog } from "@/hooks/useSkillCatalog";

interface SkillsSectionProps {
  skills: CandidateSkill[];
  onAdd: (data: Omit<CandidateSkill, 'id' | 'profile_id'>) => Promise<{ error: Error | null }>;
  onUpdate: (id: string, data: Partial<CandidateSkill>) => Promise<{ error: Error | null }>;
  onDelete: (id: string) => Promise<{ error: Error | null }>;
}

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const proficiencyToProgress: Record<string, number> = {
  Beginner: 25,
  Intermediate: 50,
  Advanced: 75,
  Expert: 100,
};

const proficiencyColors: Record<string, string> = {
  Beginner: "bg-muted text-muted-foreground",
  Intermediate: "bg-accent/10 text-accent",
  Advanced: "bg-primary/10 text-primary",
  Expert: "bg-success/10 text-success",
};

export function SkillsSection({ skills, onAdd, onUpdate, onDelete }: SkillsSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [proficiency, setProficiency] = useState<string>("Intermediate");
  const [yearsExp, setYearsExp] = useState(0);
  const [customSkillName, setCustomSkillName] = useState("");

  const { catalog, industries, getSubcategories, getSkills, searchSkills, isLoading: catalogLoading } = useSkillCatalog();

  const existingSkillNames = useMemo(() => new Set(skills.map(s => s.skill_name.toLowerCase())), [skills]);

  const technicalSkills = skills.filter(s => s.skill_type === "technical");
  const softSkills = skills.filter(s => s.skill_type === "soft");

  // Group technical skills by industry
  const groupedSkills = useMemo(() => {
    const groups: Record<string, CandidateSkill[]> = {};
    technicalSkills.forEach(s => {
      const key = s.industry || "Other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(s);
    });
    return groups;
  }, [technicalSkills]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchSkills(searchQuery).filter(s => !existingSkillNames.has(s.name.toLowerCase()));
  }, [searchQuery, searchSkills, existingSkillNames]);

  const browseSkills = useMemo(() => {
    if (!selectedIndustry) return [];
    return getSkills(selectedIndustry, selectedSubcategory || undefined)
      .filter(s => !existingSkillNames.has(s.name.toLowerCase()));
  }, [selectedIndustry, selectedSubcategory, getSkills, existingSkillNames]);

  const handleAddFromCatalog = async (catalogSkill: { name: string; industry: string; subcategory: string; skill_type: string }) => {
    setIsLoading(true);
    await onAdd({
      skill_name: catalogSkill.name,
      skill_type: catalogSkill.skill_type as "technical" | "soft",
      proficiency: proficiency as CandidateSkill["proficiency"],
      years_of_experience: yearsExp,
      industry: catalogSkill.industry,
      subcategory: catalogSkill.subcategory,
    });
    setIsLoading(false);
  };

  const handleAddCustom = async () => {
    if (!customSkillName.trim()) return;
    setIsLoading(true);
    await onAdd({
      skill_name: customSkillName.trim(),
      skill_type: "technical",
      proficiency: proficiency as CandidateSkill["proficiency"],
      years_of_experience: yearsExp,
      industry: selectedIndustry,
      subcategory: selectedSubcategory,
    });
    setCustomSkillName("");
    setIsLoading(false);
  };

  const handleOpenEdit = (item: CandidateSkill) => {
    setProficiency(item.proficiency);
    setYearsExp(item.years_of_experience);
    setEditingId(item.id);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    setIsLoading(true);
    await onUpdate(editingId, {
      proficiency: proficiency as CandidateSkill["proficiency"],
      years_of_experience: yearsExp,
    });
    setIsLoading(false);
    setEditingId(null);
  };

  const SkillCard = ({ skill }: { skill: CandidateSkill }) => {
    const isEditing = editingId === skill.id;

    if (isEditing) {
      return (
        <div className="p-3 rounded-lg border-2 border-accent/30 bg-accent/5">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-medium text-sm">{skill.skill_name}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Proficiency</Label>
              <Select value={proficiency} onValueChange={setProficiency}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Years</Label>
              <Input type="number" min="0" className="h-8 text-xs" value={yearsExp} onChange={e => setYearsExp(parseInt(e.target.value) || 0)} />
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="default" className="h-7 text-xs" onClick={handleSaveEdit} disabled={isLoading}>Save</Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingId(null)}>Cancel</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 group hover:bg-muted/50 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm truncate">{skill.skill_name}</span>
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${proficiencyColors[skill.proficiency] || ""}`}>
              {skill.proficiency}
            </Badge>
          </div>
          <Progress value={proficiencyToProgress[skill.proficiency] || 50} className="h-1.5" />
          {skill.years_of_experience > 0 && (
            <span className="text-xs text-muted-foreground mt-1 block">
              {skill.years_of_experience} year{skill.years_of_experience > 1 ? "s" : ""} exp.
            </span>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleOpenEdit(skill)}>
            <Pencil className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onDelete(skill.id)}>
            <X className="h-3 w-3 text-destructive" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-display">
          <Code2 className="h-5 w-5 text-accent" />
          Skills
          {skills.length > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">{skills.length}</Badge>
          )}
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setSearchQuery("");
            setSelectedIndustry(null);
            setSelectedSubcategory(null);
            setCustomSkillName("");
          }
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Skills
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh]">
            <DialogHeader>
              <DialogTitle>Add Skills from Catalog</DialogTitle>
            </DialogHeader>

            {/* Default proficiency & years for batch adding */}
            <div className="grid grid-cols-2 gap-3 pb-3 border-b">
              <div>
                <Label className="text-xs text-muted-foreground">Default Proficiency</Label>
                <Select value={proficiency} onValueChange={setProficiency}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Default Years of Experience</Label>
                <Input type="number" min="0" className="h-9" value={yearsExp} onChange={e => setYearsExp(parseInt(e.target.value) || 0)} />
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills across all industries..."
                className="pl-9"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSelectedIndustry(null); setSelectedSubcategory(null); }}
              />
            </div>

            <ScrollArea className="h-[400px] pr-2">
              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="space-y-1">
                  {searchResults.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">No matching skills found</p>
                  ) : (
                    searchResults.map(skill => (
                      <button
                        key={skill.id}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-accent/5 transition-colors text-left group"
                        onClick={() => handleAddFromCatalog(skill)}
                        disabled={isLoading}
                      >
                        <div>
                          <span className="font-medium text-sm">{skill.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{skill.industry} › {skill.subcategory}</span>
                        </div>
                        <Plus className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* Browse by Industry */}
              {!searchQuery.trim() && !selectedIndustry && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Browse by Industry</p>
                  {industries.map(ind => (
                    <button
                      key={ind}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      onClick={() => setSelectedIndustry(ind)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Briefcase className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <span className="font-medium text-sm">{ind}</span>
                          <span className="text-xs text-muted-foreground block">
                            {catalog.filter(s => s.industry === ind).length} skills
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}

              {/* Subcategories */}
              {!searchQuery.trim() && selectedIndustry && !selectedSubcategory && (
                <div className="space-y-1">
                  <button
                    className="text-xs text-accent hover:underline mb-2 flex items-center gap-1"
                    onClick={() => setSelectedIndustry(null)}
                  >
                    ← All Industries
                  </button>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{selectedIndustry}</p>
                  {getSubcategories(selectedIndustry).map(sub => (
                    <button
                      key={sub}
                      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      onClick={() => setSelectedSubcategory(sub)}
                    >
                      <span className="font-medium text-sm">{sub}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {getSkills(selectedIndustry, sub).filter(s => !existingSkillNames.has(s.name.toLowerCase())).length} skills
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Skills in Subcategory */}
              {!searchQuery.trim() && selectedIndustry && selectedSubcategory && (
                <div className="space-y-1">
                  <button
                    className="text-xs text-accent hover:underline mb-2 flex items-center gap-1"
                    onClick={() => setSelectedSubcategory(null)}
                  >
                    ← {selectedIndustry}
                  </button>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{selectedSubcategory}</p>
                  {browseSkills.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4 text-center">All skills in this category already added! 🎉</p>
                  ) : (
                    browseSkills.map(skill => (
                      <button
                        key={skill.id}
                        className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-accent/5 transition-colors text-left group"
                        onClick={() => handleAddFromCatalog(skill)}
                        disabled={isLoading}
                      >
                        <span className="font-medium text-sm">{skill.name}</span>
                        <Plus className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Custom skill entry */}
            <div className="border-t pt-3">
              <Label className="text-xs text-muted-foreground">Can't find a skill? Add it manually</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  placeholder="Enter custom skill name"
                  value={customSkillName}
                  onChange={e => setCustomSkillName(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleAddCustom} disabled={isLoading || !customSkillName.trim()}>
                  Add
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {skills.length === 0 ? (
          <div className="text-center py-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
              <Code2 className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No skills added yet</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Browse our catalog to showcase your expertise</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Technical skills grouped by industry */}
            {Object.entries(groupedSkills).map(([industry, industrySkills]) => (
              <div key={industry}>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5" />
                  {industry}
                  <Badge variant="outline" className="text-[10px]">{industrySkills.length}</Badge>
                </h4>
                <div className="grid gap-2">
                  {industrySkills.map(skill => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
            {/* Soft skills */}
            {softSkills.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">Soft Skills</h4>
                <div className="grid gap-2">
                  {softSkills.map(skill => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
