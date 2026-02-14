import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Plus, X, Code, Heart, Search } from "lucide-react";
import { useSkillCatalog } from "@/hooks/useSkillCatalog";

export interface SkillEntry {
  id: string;
  skill_name: string;
  skill_type: "technical" | "soft";
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  years_of_experience: number;
  industry?: string;
  skill_group?: string;
  subcategory?: string;
}

interface SkillsStepProps {
  data: SkillEntry[];
  onUpdate: (data: SkillEntry[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export function SkillsStep({ data, onUpdate, onNext, onBack }: SkillsStepProps) {
  const [skills, setSkills] = useState<SkillEntry[]>(data);
  const { catalog, industries, getSkillGroups, getSubcategories, getSkills, searchSkills, isLoading } = useSkillCatalog();

  // Cascading filter state
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedSkillGroup, setSelectedSkillGroup] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Search mode
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; skill_type: string; industry: string; skill_group: string; subcategory: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const [newSkillDefaults, setNewSkillDefaults] = useState({
    proficiency: "Intermediate" as SkillEntry["proficiency"],
    years_of_experience: 1,
  });

  // Cascading options
  const skillGroupOptions = useMemo(() => {
    return selectedIndustry ? getSkillGroups(selectedIndustry) : [];
  }, [selectedIndustry, catalog]);

  const categoryOptions = useMemo(() => {
    return selectedSkillGroup ? getSubcategories(selectedIndustry || undefined, selectedSkillGroup) : [];
  }, [selectedIndustry, selectedSkillGroup, catalog]);

  const availableSkills = useMemo(() => {
    if (!selectedIndustry) return [];
    return getSkills(
      selectedIndustry || undefined,
      selectedSkillGroup || undefined,
      selectedCategory || undefined
    ).filter(s => !skills.some(sk => sk.skill_name.toLowerCase() === s.name.toLowerCase()));
  }, [selectedIndustry, selectedSkillGroup, selectedCategory, skills, catalog]);

  // Reset child dropdowns when parent changes
  const handleIndustryChange = (v: string) => {
    setSelectedIndustry(v);
    setSelectedSkillGroup("");
    setSelectedCategory("");
  };

  const handleSkillGroupChange = (v: string) => {
    setSelectedSkillGroup(v);
    setSelectedCategory("");
  };

  // Search autocomplete
  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      const results = searchSkills(searchQuery);
      const filtered = results
        .filter(s => !skills.some(sk => sk.skill_name.toLowerCase() === s.name.toLowerCase()))
        .map(s => ({ name: s.name, skill_type: s.skill_type, industry: s.industry, skill_group: s.skill_group, subcategory: s.subcategory }));
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, skills]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addSkillFromCatalog = (item: { name: string; skill_type: string; industry: string; skill_group: string; subcategory: string }) => {
    if (skills.some(s => s.skill_name.toLowerCase() === item.name.toLowerCase())) return;
    const newEntry: SkillEntry = {
      id: generateId(),
      skill_name: item.name,
      skill_type: item.skill_type === "soft" ? "soft" : "technical",
      proficiency: newSkillDefaults.proficiency,
      years_of_experience: newSkillDefaults.years_of_experience,
      industry: item.industry,
      skill_group: item.skill_group,
      subcategory: item.subcategory,
    };
    const updated = [...skills, newEntry];
    setSkills(updated);
    onUpdate(updated);
  };

  const selectSuggestion = (s: typeof suggestions[0]) => {
    addSkillFromCatalog(s);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        selectSuggestion(suggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const removeSkill = (id: string) => {
    const updated = skills.filter(s => s.id !== id);
    setSkills(updated);
    onUpdate(updated);
  };

  const updateSkill = (id: string, field: keyof SkillEntry, value: string | number) => {
    const updated = skills.map(s => s.id === id ? { ...s, [field]: value } : s);
    setSkills(updated);
    onUpdate(updated);
  };

  const technicalSkills = skills.filter(s => s.skill_type === "technical");
  const softSkills = skills.filter(s => s.skill_type === "soft");

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case "Expert": return "bg-accent text-accent-foreground";
      case "Advanced": return "bg-primary text-primary-foreground";
      case "Intermediate": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Skills & Expertise</h2>
        <p className="text-muted-foreground">Browse by category or search to add your skills</p>
      </div>

      {/* Search Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Input
              ref={inputRef}
              placeholder="Type to search all skills across industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              autoComplete="off"
            />
            {showSuggestions && (
              <div
                ref={suggestionsRef}
                className="absolute z-50 top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md"
              >
                {suggestions.map((s, i) => (
                  <button
                    key={s.name + s.industry}
                    type="button"
                    className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-accent hover:text-accent-foreground ${
                      i === highlightedIndex ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onMouseDown={(e) => { e.preventDefault(); selectSuggestion(s); }}
                  >
                    <div>
                      <span className="font-medium">{s.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{s.industry} › {s.skill_group}</span>
                    </div>
                    <Badge variant="outline" className="text-xs ml-2">{s.skill_type}</Badge>
                  </button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Browse by Category - 4-level cascading */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Browse by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 mb-4">
            {/* Level 1: Industry */}
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
                <SelectTrigger><SelectValue placeholder="Select industry..." /></SelectTrigger>
                <SelectContent>
                  {industries.map(ind => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level 2: Skill Group */}
            <div className="space-y-2">
              <Label>Skill Group</Label>
              <Select
                value={selectedSkillGroup}
                onValueChange={handleSkillGroupChange}
                disabled={!selectedIndustry}
              >
                <SelectTrigger><SelectValue placeholder="Select group..." /></SelectTrigger>
                <SelectContent>
                  {skillGroupOptions.map(sg => (
                    <SelectItem key={sg} value={sg}>{sg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level 3: Skill Category */}
            <div className="space-y-2">
              <Label>Skill Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                disabled={!selectedSkillGroup}
              >
                <SelectTrigger><SelectValue placeholder="Select category..." /></SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Level 4: Available Skills */}
          {selectedIndustry && availableSkills.length > 0 && (
            <div>
              <Label className="mb-2 block">Available Skills ({availableSkills.length})</Label>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 rounded-lg border bg-muted/30">
                {availableSkills.map(skill => (
                  <Badge
                    key={skill.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => addSkillFromCatalog({
                      name: skill.name,
                      skill_type: skill.skill_type,
                      industry: skill.industry,
                      skill_group: skill.skill_group,
                      subcategory: skill.subcategory,
                    })}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {selectedIndustry && availableSkills.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-3">
              {skills.length > 0 ? "All skills in this selection already added" : "No skills found for this selection"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Added Skills */}
      {skills.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="h-5 w-5" />
                Technical Skills ({technicalSkills.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {technicalSkills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{skill.skill_name}</span>
                        <Badge className={getProficiencyColor(skill.proficiency)} variant="secondary">{skill.proficiency}</Badge>
                      </div>
                      {skill.industry && (
                        <span className="text-xs text-muted-foreground">{skill.industry} › {skill.skill_group}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Input type="number" min="0" max="30" value={skill.years_of_experience} onChange={(e) => updateSkill(skill.id, "years_of_experience", parseInt(e.target.value) || 0)} className="w-16 h-8 text-center" />
                      <span className="text-xs text-muted-foreground">yrs</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeSkill(skill.id)}><X className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
                {technicalSkills.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No technical skills added yet</p>}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Soft Skills ({softSkills.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {softSkills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="font-medium">{skill.skill_name}</span>
                      <Badge className={getProficiencyColor(skill.proficiency)} variant="secondary">{skill.proficiency}</Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeSkill(skill.id)}><X className="h-4 w-4" /></Button>
                  </div>
                ))}
                {softSkills.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No soft skills added yet</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} variant="cta" size="lg">
          Next: Experience
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
