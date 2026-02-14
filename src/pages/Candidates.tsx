import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Sparkles,
  Grid3X3,
  List,
  Lock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { FilterPanel } from "@/components/candidates/FilterPanel";
import { CandidatePagination } from "@/components/candidates/CandidatePagination";
import { mockCandidates } from "@/data/candidates";
import { useCandidateFilters } from "@/hooks/useCandidateFilters";
import { useAuth } from "@/contexts/AuthContext";

const CANDIDATES_PER_PAGE = 9;
const GUEST_CANDIDATE_LIMIT = 6;

export default function CandidatesPage() {
  const navigate = useNavigate();
  const isLoggedIn = true; // Open access for testing
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const {
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
  } = useCandidateFilters();

  const removeFilterTag = (type: string, value: string) => {
    switch (type) {
      case "skill": toggleSkill(value); break;
      case "level": toggleLevel(value); break;
      case "availability":
        setSelectedAvailability(filterState.selectedAvailability.filter(a => a !== value)); break;
      case "location":
        setSelectedLocations(filterState.selectedLocations.filter(l => l !== value)); break;
      case "noticePeriod":
        setSelectedNoticePeriods(filterState.selectedNoticePeriods.filter(n => n !== value)); break;
      case "industry":
        setSelectedIndustries(filterState.selectedIndustries.filter(i => i !== value)); break;
      case "skillGroup":
        setSelectedSkillGroups(filterState.selectedSkillGroups.filter(g => g !== value)); break;
      case "skillCategory":
        setSelectedSkillCategories(filterState.selectedSkillCategories.filter(c => c !== value)); break;
      case "certification":
        setSelectedCertifications(filterState.selectedCertifications.filter(c => c !== value)); break;
      case "language":
        setSelectedLanguages(filterState.selectedLanguages.filter(l => l !== value)); break;
    }
  };

  const activeFilterTags = [
    ...filterState.selectedSkills.map(v => ({ type: "skill", value: v, color: "bg-accent/10 text-accent" })),
    ...filterState.selectedLevels.map(v => ({ type: "level", value: v, color: "bg-primary/10 text-primary" })),
    ...filterState.selectedAvailability.map(v => ({ type: "availability", value: v, color: "bg-secondary text-secondary-foreground" })),
    ...filterState.selectedLocations.map(v => ({ type: "location", value: v, color: "bg-muted text-muted-foreground" })),
    ...filterState.selectedNoticePeriods.map(v => ({ type: "noticePeriod", value: v, color: "bg-accent/10 text-accent" })),
    ...filterState.selectedIndustries.map(v => ({ type: "industry", value: v, color: "bg-primary/10 text-primary" })),
    ...filterState.selectedSkillGroups.map(v => ({ type: "skillGroup", value: v, color: "bg-primary/10 text-primary" })),
    ...filterState.selectedSkillCategories.map(v => ({ type: "skillCategory", value: v, color: "bg-accent/10 text-accent" })),
    ...filterState.selectedCertifications.map(v => ({ type: "certification", value: v, color: "bg-accent/10 text-accent" })),
    ...filterState.selectedLanguages.map(v => ({ type: "language", value: v, color: "bg-secondary text-secondary-foreground" })),
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Find Your <span className="gradient-text">Perfect Match</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our database of {mockCandidates.length}+ verified professionals ready to join your team
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, skill, or job title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-base rounded-xl border-2 border-border focus:border-accent bg-card shadow-md"
              />
              <Button 
                variant="cta" 
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Search
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container-hero">
          <div className="flex gap-8">
            {/* Filters Sidebar - only for logged-in users */}
            {isLoggedIn && (
              <AnimatePresence>
                {showFilters && (
                  <FilterPanel
                    {...filterState}
                    setSelectedSkills={setSelectedSkills}
                    setSelectedLevels={setSelectedLevels}
                    setSelectedAvailability={setSelectedAvailability}
                    setSelectedLocations={setSelectedLocations}
                    setSelectedNoticePeriods={setSelectedNoticePeriods}
                    setSelectedIndustries={setSelectedIndustries}
                    setSelectedSkillGroups={setSelectedSkillGroups}
                    setSelectedSkillCategories={setSelectedSkillCategories}
                    setSelectedCertifications={setSelectedCertifications}
                    setSelectedLanguages={setSelectedLanguages}
                    setSalaryRange={setSalaryRange}
                    setHourlyRateRange={setHourlyRateRange}
                    setDirectlyAvailable={setDirectlyAvailable}
                    hasActiveFilters={hasActiveFilters}
                    clearFilters={clearFilters}
                  />
                )}
              </AnimatePresence>
            )}

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {isLoggedIn && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  )}
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{filteredCandidates.length}</span> candidates found
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Active Filters - only for logged-in users */}
              {isLoggedIn && activeFilterTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeFilterTags.map(({ type, value, color }) => (
                    <span
                      key={`${type}-${value}`}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${color}`}
                    >
                      {value}
                      <button onClick={() => removeFilterTag(type, value)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Candidate Grid */}
              {(() => {
                // For guests, show only GUEST_CANDIDATE_LIMIT candidates (2 rows)
                if (!isLoggedIn) {
                  const guestCandidates = filteredCandidates.slice(0, GUEST_CANDIDATE_LIMIT);

                  return (
                    <>
                      <div className={`grid gap-6 ${
                        viewMode === "grid" 
                          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                          : "grid-cols-1"
                      }`}>
                        {guestCandidates.map((candidate, index) => (
                          <CandidateCard 
                            key={candidate.id} 
                            candidate={candidate} 
                            index={index}
                          />
                        ))}
                      </div>

                      {/* Guest CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-center mt-10"
                      >
                        <Button
                          variant="cta"
                          size="lg"
                          onClick={() => navigate("/register")}
                          className="group"
                        >
                          <Lock className="h-4 w-4 mr-2 group-hover:hidden" />
                          <Sparkles className="h-4 w-4 mr-2 hidden group-hover:inline" />
                          Show All {mockCandidates.length}+ Candidates
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <p className="text-sm text-muted-foreground mt-3">
                          Sign up to access our full talent pool and detailed profiles
                        </p>
                      </motion.div>
                    </>
                  );
                }

                // Logged-in: full paginated view
                const totalPages = Math.max(1, Math.ceil(filteredCandidates.length / CANDIDATES_PER_PAGE));
                const safePage = Math.min(currentPage, totalPages);
                const startIdx = (safePage - 1) * CANDIDATES_PER_PAGE;
                const paginatedCandidates = filteredCandidates.slice(startIdx, startIdx + CANDIDATES_PER_PAGE);

                return (
                  <>
                    <div className={`grid gap-6 ${
                      viewMode === "grid" 
                        ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                        : "grid-cols-1"
                    }`}>
                      {paginatedCandidates.map((candidate, index) => (
                        <CandidateCard 
                          key={candidate.id} 
                          candidate={candidate} 
                          index={index}
                        />
                      ))}
                    </div>

                    <CandidatePagination
                      currentPage={safePage}
                      totalPages={totalPages}
                      totalCandidates={filteredCandidates.length}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  </>
                );
              })()}

              {filteredCandidates.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    No candidates found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button variant="accent" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
