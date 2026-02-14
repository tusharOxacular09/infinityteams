import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SkillCatalogItem {
  id: string;
  name: string;
  industry: string;
  skill_group: string;
  subcategory: string;
  skill_type: string;
}

export function useSkillCatalog() {
  const [catalog, setCatalog] = useState<SkillCatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      const { data, error } = await supabase
        .from("skill_catalog")
        .select("*")
        .order("industry")
        .order("skill_group")
        .order("subcategory")
        .order("name");

      if (!error && data) {
        setCatalog(data as unknown as SkillCatalogItem[]);
      }
      setIsLoading(false);
    };
    fetchCatalog();
  }, []);

  const industries = useMemo(() => {
    const set = new Set(catalog.map((s) => s.industry));
    return Array.from(set).sort();
  }, [catalog]);

  const getSkillGroups = (industry?: string) => {
    const filtered = industry
      ? catalog.filter((s) => s.industry === industry)
      : catalog;
    const set = new Set(filtered.map((s) => s.skill_group));
    return Array.from(set).sort();
  };

  const getSubcategories = (industry?: string, skillGroup?: string) => {
    const filtered = catalog.filter(
      (s) =>
        (!industry || s.industry === industry) &&
        (!skillGroup || s.skill_group === skillGroup)
    );
    const set = new Set(filtered.map((s) => s.subcategory));
    return Array.from(set).sort();
  };

  const getSkills = (industry?: string, skillGroup?: string, subcategory?: string) => {
    return catalog.filter(
      (s) =>
        (!industry || s.industry === industry) &&
        (!skillGroup || s.skill_group === skillGroup) &&
        (!subcategory || s.subcategory === subcategory)
    );
  };

  const searchSkills = (query: string) => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return catalog.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 20);
  };

  return {
    catalog,
    industries,
    getSkillGroups,
    getSubcategories,
    getSkills,
    searchSkills,
    isLoading,
  };
}
