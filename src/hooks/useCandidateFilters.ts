import { useState, useMemo } from "react";
import { mockCandidates } from "@/data/candidates";
import type { FilterState } from "@/components/candidates/FilterPanel";

export function useCandidateFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedNoticePeriods, setSelectedNoticePeriods] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSkillGroups, setSelectedSkillGroups] = useState<string[]>([]);
  const [selectedSkillCategories, setSelectedSkillCategories] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([500, 5000]);
  const [hourlyRateRange, setHourlyRateRange] = useState([3.13, 31.25]);
  const [directlyAvailable, setDirectlyAvailable] = useState(false);

  const filteredCandidates = useMemo(() => {
    return mockCandidates.filter((candidate) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          candidate.name.toLowerCase().includes(query) ||
          candidate.title.toLowerCase().includes(query) ||
          candidate.skills.some(skill => skill.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      if (directlyAvailable && candidate.availability !== "Immediately") return false;

      if (selectedSkills.length > 0) {
        const hasSkill = selectedSkills.some(skill =>
          candidate.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        );
        if (!hasSkill) return false;
      }

      if (selectedLevels.length > 0 && !selectedLevels.includes(candidate.level)) return false;
      if (selectedAvailability.length > 0 && !selectedAvailability.includes(candidate.availability)) return false;
      if (selectedLocations.length > 0 && !selectedLocations.includes(candidate.location)) return false;
      if (selectedNoticePeriods.length > 0 && !selectedNoticePeriods.includes(candidate.noticePeriod)) return false;
      if (selectedIndustries.length > 0 && !selectedIndustries.includes(candidate.industry)) return false;

      if (selectedCertifications.length > 0) {
        const hasCert = selectedCertifications.some(cert =>
          candidate.certifications.some(c => c.toLowerCase().includes(cert.toLowerCase()))
        );
        if (!hasCert) return false;
      }

      if (selectedLanguages.length > 0) {
        const hasLang = selectedLanguages.some(lang => candidate.languages.includes(lang));
        if (!hasLang) return false;
      }

      if (candidate.salaryExpectation < salaryRange[0] || candidate.salaryExpectation > salaryRange[1]) return false;
      if (candidate.hourlyRate < hourlyRateRange[0] || candidate.hourlyRate > hourlyRateRange[1]) return false;

      return true;
    });
  }, [
    searchQuery, selectedSkills, selectedLevels, selectedAvailability,
    selectedLocations, selectedNoticePeriods, selectedIndustries,
    selectedSkillGroups, selectedSkillCategories,
    selectedCertifications, selectedLanguages, salaryRange, hourlyRateRange,
    directlyAvailable,
  ]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setSelectedLevels([]);
    setSelectedAvailability([]);
    setSelectedLocations([]);
    setSelectedNoticePeriods([]);
    setSelectedIndustries([]);
    setSelectedSkillGroups([]);
    setSelectedSkillCategories([]);
    setSelectedCertifications([]);
    setSelectedLanguages([]);
    setSalaryRange([500, 5000]);
    setHourlyRateRange([3.13, 31.25]);
    setDirectlyAvailable(false);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedSkills.length > 0 || selectedLevels.length > 0 ||
    selectedAvailability.length > 0 || selectedLocations.length > 0 ||
    selectedNoticePeriods.length > 0 || selectedIndustries.length > 0 ||
    selectedSkillGroups.length > 0 || selectedSkillCategories.length > 0 ||
    selectedCertifications.length > 0 || selectedLanguages.length > 0 ||
    salaryRange[0] > 500 || salaryRange[1] < 5000 ||
    hourlyRateRange[0] > 3.13 || hourlyRateRange[1] < 31.25 ||
    directlyAvailable;

  const filterState: FilterState = {
    selectedSkills,
    selectedLevels,
    selectedAvailability,
    selectedLocations,
    selectedNoticePeriods,
    selectedIndustries,
    selectedSkillGroups,
    selectedSkillCategories,
    selectedCertifications,
    selectedLanguages,
    salaryRange,
    hourlyRateRange,
    directlyAvailable,
  };

  return {
    searchQuery,
    setSearchQuery,
    filterState,
    setSelectedSkills,
    setSelectedLevels,
    setSelectedAvailability,
    setSelectedLocations,
    setSelectedNoticePeriods,
    setSelectedIndustries,
    setSelectedSkillGroups,
    setSelectedSkillCategories,
    setSelectedCertifications,
    setSelectedLanguages,
    setSalaryRange,
    setHourlyRateRange,
    setDirectlyAvailable,
    filteredCandidates,
    toggleSkill,
    toggleLevel,
    clearFilters,
    hasActiveFilters,
  };
}
