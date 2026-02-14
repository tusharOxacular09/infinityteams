import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectFilterProps {
  label: string;
  icon?: React.ReactNode;
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelectFilter({
  label,
  icon,
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Search...",
}: MultiSelectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onSelectionChange(selectedValues.filter((v) => v !== option));
    } else {
      onSelectionChange([...selectedValues, option]);
    }
  };

  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectionChange(selectedValues.filter((v) => v !== option));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectionChange([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="mb-5" ref={containerRef}>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
        {icon}
        {label}
      </label>
      
      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full min-h-[42px] px-3 py-2 text-left text-sm rounded-lg border transition-colors",
            "bg-card border-border hover:border-accent/50",
            "focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent",
            isOpen && "border-accent ring-2 ring-accent/20"
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 flex flex-wrap gap-1.5">
              {selectedValues.length === 0 ? (
                <span className="text-muted-foreground">Select {label.toLowerCase()}...</span>
              ) : (
                selectedValues.slice(0, 2).map((value) => (
                  <span
                    key={value}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium"
                  >
                    {value}
                    <button
                      type="button"
                      onClick={(e) => removeOption(value, e)}
                      className="hover:bg-accent/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              )}
              {selectedValues.length > 2 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-medium">
                  +{selectedValues.length - 2} more
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {selectedValues.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="p-1 hover:bg-muted rounded-md transition-colors"
                >
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              )}
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </div>
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = selectedValues.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleOption(option)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors",
                        "hover:bg-accent/10",
                        isSelected && "bg-accent/5"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center h-4 w-4 rounded border transition-colors",
                          isSelected
                            ? "bg-accent border-accent text-accent-foreground"
                            : "border-border"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <span className={cn(isSelected && "font-medium text-accent")}>
                        {option}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Selected Count Footer */}
            {selectedValues.length > 0 && (
              <div className="px-3 py-2 border-t border-border bg-muted/50 text-xs text-muted-foreground">
                {selectedValues.length} selected
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
