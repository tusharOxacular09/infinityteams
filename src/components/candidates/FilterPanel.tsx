import { useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, DollarSign, Clock, Globe, Award, Building2, Bell, Zap, Code2, Layers } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { useSkillCatalog } from "@/hooks/useSkillCatalog";
import { 
  experienceLevels, 
  availabilityOptions,
  noticePeriodOptions,
  certificationOptions,
  languageOptions,
  locations 
} from "@/data/candidates";

export interface FilterState {
  selectedSkills: string[];
  selectedLevels: string[];
  selectedAvailability: string[];
  selectedLocations: string[];
  selectedNoticePeriods: string[];
  selectedIndustries: string[];
  selectedSkillGroups: string[];
  selectedSkillCategories: string[];
  selectedCertifications: string[];
  selectedLanguages: string[];
  salaryRange: number[];
  hourlyRateRange: number[];
  directlyAvailable: boolean;
}

interface FilterPanelProps extends FilterState {
  setSelectedSkills: (skills: string[]) => void;
  setSelectedLevels: (levels: string[]) => void;
  setSelectedAvailability: (availability: string[]) => void;
  setSelectedLocations: (locations: string[]) => void;
  setSelectedNoticePeriods: (periods: string[]) => void;
  setSelectedIndustries: (industries: string[]) => void;
  setSelectedSkillGroups: (groups: string[]) => void;
  setSelectedSkillCategories: (categories: string[]) => void;
  setSelectedCertifications: (certs: string[]) => void;
  setSelectedLanguages: (langs: string[]) => void;
  setSalaryRange: (range: number[]) => void;
  setHourlyRateRange: (range: number[]) => void;
  setDirectlyAvailable: (value: boolean) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

const HOURS_PER_MONTH = 160;

export function FilterPanel({
  selectedSkills,
  setSelectedSkills,
  selectedLevels,
  setSelectedLevels,
  selectedAvailability,
  setSelectedAvailability,
  selectedLocations,
  setSelectedLocations,
  selectedNoticePeriods,
  setSelectedNoticePeriods,
  selectedIndustries,
  setSelectedIndustries,
  selectedSkillGroups,
  setSelectedSkillGroups,
  selectedSkillCategories,
  setSelectedSkillCategories,
  selectedCertifications,
  setSelectedCertifications,
  selectedLanguages,
  setSelectedLanguages,
  salaryRange,
  setSalaryRange,
  hourlyRateRange,
  setHourlyRateRange,
  directlyAvailable,
  setDirectlyAvailable,
  hasActiveFilters,
  clearFilters,
}: FilterPanelProps) {
  const { catalog, industries: catalogIndustries, getSkillGroups, getSubcategories } = useSkillCatalog();

  // Dynamic industry options from catalog
  const industryOptions = useMemo(() => catalogIndustries, [catalogIndustries]);

  // Skill groups filtered by selected industries
  const skillGroupOptions = useMemo(() => {
    if (selectedIndustries.length === 0) {
      const set = new Set(catalog.map(s => s.skill_group));
      return Array.from(set).sort();
    }
    const set = new Set(
      catalog.filter(s => selectedIndustries.includes(s.industry)).map(s => s.skill_group)
    );
    return Array.from(set).sort();
  }, [catalog, selectedIndustries]);

  // Skill categories filtered by selected industries + skill groups
  const skillCategoryOptions = useMemo(() => {
    let filtered = catalog;
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(s => selectedIndustries.includes(s.industry));
    }
    if (selectedSkillGroups.length > 0) {
      filtered = filtered.filter(s => selectedSkillGroups.includes(s.skill_group));
    }
    const set = new Set(filtered.map(s => s.subcategory));
    return Array.from(set).sort();
  }, [catalog, selectedIndustries, selectedSkillGroups]);

  // Skills filtered by selected industries + skill groups + categories
  const availableSkills = useMemo(() => {
    let filtered = catalog;
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(s => selectedIndustries.includes(s.industry));
    }
    if (selectedSkillGroups.length > 0) {
      filtered = filtered.filter(s => selectedSkillGroups.includes(s.skill_group));
    }
    if (selectedSkillCategories.length > 0) {
      filtered = filtered.filter(s => selectedSkillCategories.includes(s.subcategory));
    }
    return [...new Set(filtered.map(s => s.name))].sort();
  }, [catalog, selectedIndustries, selectedSkillGroups, selectedSkillCategories]);

  const salaryToHourly = (salary: number) => Math.round((salary / HOURS_PER_MONTH) * 100) / 100;
  const hourlyToSalary = (hourly: number) => Math.round(hourly * HOURS_PER_MONTH);

  const handleSalaryChange = (range: number[]) => {
    setSalaryRange(range);
    setHourlyRateRange([salaryToHourly(range[0]), salaryToHourly(range[1])]);
  };

  const handleHourlyRateChange = (range: number[]) => {
    setHourlyRateRange(range);
    setSalaryRange([hourlyToSalary(range[0]), hourlyToSalary(range[1])]);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-72 flex-shrink-0 hidden lg:block"
    >
      <div className="filter-panel sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-accent hover:underline">
              Clear all
            </button>
          )}
        </div>

        {/* Directly Available Toggle */}
        <div className="mb-5 flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
            <Zap className="h-4 w-4 text-success" />
            Directly Available
          </label>
          <Switch checked={directlyAvailable} onCheckedChange={setDirectlyAvailable} />
        </div>

        {/* Monthly Salary Range */}
        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
            <DollarSign className="h-4 w-4 text-accent" />
            Monthly Salary (EUR)
          </label>
          <Slider value={salaryRange} onValueChange={handleSalaryChange} min={500} max={5000} step={100} className="mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>€{salaryRange[0].toLocaleString()}</span>
            <span>€{salaryRange[1].toLocaleString()}</span>
          </div>
          <div className="mt-1 text-xs text-accent/70 text-center">
            ≈ €{salaryToHourly(salaryRange[0])}/hr - €{salaryToHourly(salaryRange[1])}/hr
          </div>
        </div>

        {/* Hourly Rate Range */}
        <div className="mb-5">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
            <Clock className="h-4 w-4 text-accent" />
            Hourly Rate (EUR)
          </label>
          <Slider value={hourlyRateRange} onValueChange={handleHourlyRateChange} min={3} max={32} step={0.5} className="mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>€{hourlyRateRange[0].toFixed(2)}</span>
            <span>€{hourlyRateRange[1].toFixed(2)}</span>
          </div>
          <div className="mt-1 text-xs text-accent/70 text-center">
            ≈ €{hourlyToSalary(hourlyRateRange[0]).toLocaleString()}/mo - €{hourlyToSalary(hourlyRateRange[1]).toLocaleString()}/mo
          </div>
        </div>

        {/* Level 1: Industry */}
        <MultiSelectFilter
          label="Industry"
          icon={<Building2 className="h-4 w-4 text-accent" />}
          options={industryOptions}
          selectedValues={selectedIndustries}
          onSelectionChange={setSelectedIndustries}
          placeholder="Search industries..."
        />

        {/* Level 2: Skill Group */}
        <MultiSelectFilter
          label="Skill Group"
          icon={<Layers className="h-4 w-4 text-accent" />}
          options={skillGroupOptions}
          selectedValues={selectedSkillGroups}
          onSelectionChange={setSelectedSkillGroups}
          placeholder="Search skill groups..."
        />

        {/* Level 3: Skill Category */}
        <MultiSelectFilter
          label="Skill Category"
          icon={<Code2 className="h-4 w-4 text-accent" />}
          options={skillCategoryOptions}
          selectedValues={selectedSkillCategories}
          onSelectionChange={setSelectedSkillCategories}
          placeholder="Search categories..."
        />

        {/* Level 4: Skills */}
        <MultiSelectFilter
          label="Skills"
          icon={<Code2 className="h-4 w-4 text-accent" />}
          options={availableSkills}
          selectedValues={selectedSkills}
          onSelectionChange={setSelectedSkills}
          placeholder="Search skills..."
        />

        {/* Experience Level */}
        <MultiSelectFilter
          label="Experience Level"
          icon={<Briefcase className="h-4 w-4 text-accent" />}
          options={experienceLevels}
          selectedValues={selectedLevels}
          onSelectionChange={setSelectedLevels}
          placeholder="Search levels..."
        />

        {/* Availability */}
        <MultiSelectFilter
          label="Availability"
          options={availabilityOptions}
          selectedValues={selectedAvailability}
          onSelectionChange={setSelectedAvailability}
          placeholder="Search availability..."
        />

        {/* Notice Period */}
        <MultiSelectFilter
          label="Notice Period"
          icon={<Bell className="h-4 w-4 text-accent" />}
          options={noticePeriodOptions}
          selectedValues={selectedNoticePeriods}
          onSelectionChange={setSelectedNoticePeriods}
          placeholder="Search notice periods..."
        />

        {/* Location */}
        <MultiSelectFilter
          label="Location"
          icon={<MapPin className="h-4 w-4 text-accent" />}
          options={locations}
          selectedValues={selectedLocations}
          onSelectionChange={setSelectedLocations}
          placeholder="Search locations..."
        />

        {/* Certifications */}
        <MultiSelectFilter
          label="Certifications"
          icon={<Award className="h-4 w-4 text-accent" />}
          options={certificationOptions}
          selectedValues={selectedCertifications}
          onSelectionChange={setSelectedCertifications}
          placeholder="Search certifications..."
        />

        {/* Language Proficiency */}
        <MultiSelectFilter
          label="Language Proficiency"
          icon={<Globe className="h-4 w-4 text-accent" />}
          options={languageOptions}
          selectedValues={selectedLanguages}
          onSelectionChange={setSelectedLanguages}
          placeholder="Search languages..."
        />
      </div>
    </motion.aside>
  );
}
