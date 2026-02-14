import { useState, useRef, useEffect, useMemo, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, X, Briefcase, MapPin, Clock, DollarSign, Sparkles, Search, Plus } from "lucide-react";
import { useSkillCatalog } from "@/hooks/useSkillCatalog";

interface HiringPreferencesStepProps {
  onNext: () => void;
  onBack: () => void;
  testMode?: boolean;
}

const experienceLevels = ["Junior", "Mid", "Senior", "Lead"];

const timeframes = [
  "Immediately",
  "Within 2 weeks",
  "Within 1 month",
  "Within 3 months",
  "Flexible / No rush",
];

const budgetRanges = [
  "$15–25/hr or $2,500–4,000/mo",
  "$25–50/hr or $4,000–8,000/mo",
  "$50–80/hr or $8,000–13,000/mo",
  "$80–120/hr or $13,000–20,000/mo",
  "$120+/hr or $20,000+/mo",
];

export function HiringPreferencesStep({ onNext, onBack, testMode }: HiringPreferencesStepProps) {
  const { industries, getSkillGroups, getSubcategories, getSkills, searchSkills, catalog } = useSkillCatalog();

  // Cascading filter state
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedSkillGroup, setSelectedSkillGroup] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Selected skills
  const [skills, setSkills] = useState<string[]>([]);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; industry: string; skill_group: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Other fields
  const [roles, setRoles] = useState<string[]>([]);
  const [roleInput, setRoleInput] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [budget, setBudget] = useState("");

  // Cascading options
  const skillGroupOptions = useMemo(() => selectedIndustry ? getSkillGroups(selectedIndustry) : [], [selectedIndustry, catalog]);
  const categoryOptions = useMemo(() => selectedSkillGroup ? getSubcategories(selectedIndustry || undefined, selectedSkillGroup) : [], [selectedIndustry, selectedSkillGroup, catalog]);
  const availableSkills = useMemo(() => {
    if (!selectedIndustry) return [];
    return getSkills(selectedIndustry || undefined, selectedSkillGroup || undefined, selectedCategory || undefined)
      .filter(s => !skills.includes(s.name));
  }, [selectedIndustry, selectedSkillGroup, selectedCategory, skills, catalog]);

  const handleIndustryChange = (v: string) => { setSelectedIndustry(v); setSelectedSkillGroup(""); setSelectedCategory(""); };
  const handleSkillGroupChange = (v: string) => { setSelectedSkillGroup(v); setSelectedCategory(""); };

  // Search autocomplete
  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      const results = searchSkills(searchQuery).filter(s => !skills.includes(s.name));
      setSuggestions(results.map(s => ({ name: s.name, industry: s.industry, skill_group: s.skill_group })));
      setShowSuggestions(results.length > 0);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, skills]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectSuggestion = (s: typeof suggestions[0]) => {
    if (!skills.includes(s.name)) setSkills(prev => [...prev, s.name]);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlightedIndex(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlightedIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (highlightedIndex >= 0) selectSuggestion(suggestions[highlightedIndex]); }
    else if (e.key === "Escape") setShowSuggestions(false);
  };

  const toggleExperience = (level: string) => {
    setExperienceLevel(prev => prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]);
  };

  const addTag = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    const trimmed = value.trim();
    if (trimmed) { setter(prev => prev.includes(trimmed) ? prev : [...prev, trimmed]); inputSetter(""); }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, value: string, setter: React.Dispatch<React.SetStateAction<string[]>>, inputSetter: React.Dispatch<React.SetStateAction<string>>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(value, setter, inputSetter); }
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="text-center pb-2">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-accent" />
          <CardTitle className="text-2xl font-bold">Hiring Preferences</CardTitle>
        </div>
        <CardDescription>
          Help us personalize candidate listings for you. You can skip this and set it up later in your company profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {/* Skill Search */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            Search Skills
          </Label>
          <div className="relative">
            <Input
              ref={inputRef}
              placeholder="Type to search skills across all industries..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              autoComplete="off"
            />
            {showSuggestions && (
              <div ref={suggestionsRef} className="absolute z-50 top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md">
                {suggestions.map((s, i) => (
                  <button
                    key={s.name + s.industry}
                    type="button"
                    className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-accent hover:text-accent-foreground ${i === highlightedIndex ? "bg-accent text-accent-foreground" : ""}`}
                    onMouseDown={e => { e.preventDefault(); selectSuggestion(s); }}
                  >
                    <div>
                      <span className="font-medium">{s.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{s.industry} › {s.skill_group}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Browse by Category - 4-level cascading */}
        <div className="space-y-3">
          <Label>Browse Skills by Category</Label>
          <div className="grid gap-3 sm:grid-cols-3">
            <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
              <SelectTrigger><SelectValue placeholder="Select Industry..." /></SelectTrigger>
              <SelectContent>
                {industries.map(ind => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedSkillGroup} onValueChange={handleSkillGroupChange} disabled={!selectedIndustry}>
              <SelectTrigger><SelectValue placeholder="Skill Group..." /></SelectTrigger>
              <SelectContent>
                {skillGroupOptions.map(sg => <SelectItem key={sg} value={sg}>{sg}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={!selectedSkillGroup}>
              <SelectTrigger><SelectValue placeholder="Skill Category..." /></SelectTrigger>
              <SelectContent>
                {categoryOptions.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {selectedIndustry && availableSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-2 rounded-lg border bg-muted/30">
              {availableSkills.map(skill => (
                <Badge
                  key={skill.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setSkills(prev => [...prev, skill.name])}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {skill.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Selected Skills */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <Label>Selected Skills ({skills.length})</Label>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill} variant="secondary" className="gap-1 pr-1.5">
                  {skill}
                  <button onClick={() => setSkills(prev => prev.filter(s => s !== skill))} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Roles Tag Input */}
        <div className="space-y-2">
          <Label>Roles You're Hiring For</Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="e.g. Frontend Developer, Data Analyst — press Enter to add"
              value={roleInput}
              onChange={e => setRoleInput(e.target.value)}
              onKeyDown={e => handleKeyDown(e, roleInput, setRoles, setRoleInput)}
              className="pl-10"
            />
          </div>
          {roles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {roles.map(role => (
                <Badge key={role} variant="secondary" className="gap-1 pr-1.5">
                  {role}
                  <button onClick={() => setRoles(prev => prev.filter(r => r !== role))} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Experience Level */}
        <div className="space-y-3">
          <Label>Experience Level Needed</Label>
          <div className="flex flex-wrap gap-2">
            {experienceLevels.map(level => (
              <Badge
                key={level}
                variant={experienceLevel.includes(level) ? "default" : "outline"}
                className="cursor-pointer select-none transition-colors px-3 py-1.5 text-sm"
                onClick={() => toggleExperience(level)}
              >
                {level}
              </Badge>
            ))}
          </div>
        </div>

        {/* Preferred Locations Tag Input */}
        <div className="space-y-2">
          <Label>Preferred Candidate Location(s)</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="e.g. Remote, Europe, USA — press Enter to add"
              value={locationInput}
              onChange={e => setLocationInput(e.target.value)}
              onKeyDown={e => handleKeyDown(e, locationInput, setLocations, setLocationInput)}
              className="pl-10"
            />
          </div>
          {locations.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {locations.map(loc => (
                <Badge key={loc} variant="secondary" className="gap-1 pr-1.5">
                  {loc}
                  <button onClick={() => setLocations(prev => prev.filter(l => l !== loc))} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Timeframe & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Expected Start Timeframe
            </Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger><SelectValue placeholder="When do you need them?" /></SelectTrigger>
              <SelectContent>
                {timeframes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Estimated Budget Range
            </Label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger><SelectValue placeholder="Select budget range" /></SelectTrigger>
              <SelectContent>
                {budgetRanges.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <div className="flex gap-3">
            <Button onClick={onNext} variant="ghost" size="lg">Skip for Now</Button>
            <Button onClick={onNext} variant="cta" size="lg">
              Save & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
