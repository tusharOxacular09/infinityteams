import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, MapPin, Mail, Phone, Briefcase, DollarSign, Clock, CheckCircle2, Star, Zap } from "lucide-react";
import { CandidateProfile } from "@/hooks/useCandidateProfile";

interface ProfileHeaderProps {
  profile: CandidateProfile;
  onUpdate: (data: Partial<CandidateProfile>) => Promise<{ error: Error | null }>;
}

type ExperienceLevel = "Junior" | "Medior" | "Senior" | "Lead";
type AvailabilityStatus = "Immediately" | "2 weeks" | "1 month" | "2+ months" | "Not available";

const experienceLevels: ExperienceLevel[] = ["Junior", "Medior", "Senior", "Lead"];
const availabilityOptions: AvailabilityStatus[] = ["Immediately", "2 weeks", "1 month", "2+ months", "Not available"];

const availabilityColorMap: Record<string, string> = {
  "Immediately": "bg-success/10 text-success border-success/20",
  "2 weeks": "bg-success/10 text-success border-success/20",
  "1 month": "bg-warning/10 text-warning border-warning/20",
  "2+ months": "bg-muted text-muted-foreground border-border",
  "Not available": "bg-destructive/10 text-destructive border-destructive/20",
};

export function ProfileHeader({ profile, onUpdate }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile.full_name,
    title: profile.title || "",
    email: profile.email,
    phone: profile.phone || "",
    location: profile.location || "",
    country: profile.country || "India",
    summary: profile.summary || "",
    years_experience: profile.years_experience || 0,
    level: (profile.level || "Junior") as ExperienceLevel,
    hourly_rate: profile.hourly_rate || 0,
    salary_expectation: profile.salary_expectation || 0,
    availability: (profile.availability || "Immediately") as AvailabilityStatus,
  });

  const handleSave = async () => {
    setIsLoading(true);
    const { error } = await onUpdate(formData);
    setIsLoading(false);
    if (!error) setIsEditing(false);
  };

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <Card className="overflow-hidden border-border/40 shadow-sm">
      {/* Hero Banner with mesh gradient */}
      <div className="relative h-36 md:h-44 hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.08)_0%,_transparent_50%)]" />
        
        {/* Edit button on banner */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-sm text-xs"
            >
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <ProfileEditDialog
            formData={formData}
            setFormData={setFormData}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            isLoading={isLoading}
          />
        </Dialog>
      </div>

      {/* Profile Content */}
      <CardContent className="px-6 md:px-8 pb-6 -mt-14 md:-mt-16 relative">
        {/* Avatar */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
          <Avatar className="h-24 w-24 md:h-28 md:w-28 flex-shrink-0 border-4 border-background shadow-lg ring-2 ring-border/20">
            <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name} />
            <AvatarFallback className="text-2xl md:text-3xl font-bold bg-accent text-accent-foreground font-display">
              {getInitials(profile.full_name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {profile.full_name}
              </h1>
              {profile.is_verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Verified
                </span>
              )}
            </div>
            {profile.title && (
              <p className="text-base md:text-lg text-muted-foreground mt-0.5">{profile.title}</p>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Briefcase className="h-4.5 w-4.5 text-primary" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground leading-none">{profile.years_experience || 0}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Years Exp.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <Zap className="h-4.5 w-4.5 text-accent" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground leading-none">{profile.level || "—"}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Level</p>
            </div>
          </div>
          {profile.hourly_rate ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cta/10">
                <DollarSign className="h-4.5 w-4.5 text-cta" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-foreground leading-none">${profile.hourly_rate}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Per Hour</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cta/10">
                <DollarSign className="h-4.5 w-4.5 text-cta" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-foreground leading-none">—</p>
                <p className="text-xs text-muted-foreground mt-0.5">Per Hour</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
              <Clock className="h-4.5 w-4.5 text-success" />
            </div>
            <div>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 font-medium border ${availabilityColorMap[profile.availability || "Not available"] || ""}`}>
                {profile.availability || "Not set"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-0.5">Availability</p>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mt-5 pt-5 border-t border-border/40">
          {profile.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent/70 flex-shrink-0" />
              {profile.location}{profile.country ? `, ${profile.country}` : ""}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Mail className="h-4 w-4 text-accent/70 flex-shrink-0" />
            <span className="truncate">{profile.email}</span>
          </span>
          {profile.phone && (
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-accent/70 flex-shrink-0" />
              {profile.phone}
            </span>
          )}
        </div>

        {/* Summary */}
        {profile.summary && (
          <div className="mt-5 pt-5 border-t border-border/40">
            <h3 className="text-sm font-semibold text-foreground mb-2">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {profile.summary}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ── Edit Dialog ── */

function ProfileEditDialog({
  formData,
  setFormData,
  onSave,
  onCancel,
  isLoading,
}: {
  formData: Record<string, any>;
  setFormData: (fn: any) => void;
  onSave: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const update = (field: string, value: any) =>
    setFormData((prev: any) => ({ ...prev, [field]: value }));

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-display text-xl">Edit Profile</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input id="full_name" value={formData.full_name} onChange={(e) => update("full_name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input id="title" placeholder="e.g. Senior Software Engineer" value={formData.title} onChange={(e) => update("title", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">City</Label>
            <Input id="location" placeholder="e.g. Mumbai" value={formData.location} onChange={(e) => update("location", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" value={formData.country} onChange={(e) => update("country", e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea id="summary" placeholder="Tell us about yourself..." rows={4} value={formData.summary} onChange={(e) => update("summary", e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="years_experience">Years of Experience</Label>
            <Input id="years_experience" type="number" min="0" value={formData.years_experience} onChange={(e) => update("years_experience", parseInt(e.target.value) || 0)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Experience Level</Label>
            <Select value={formData.level} onValueChange={(v) => update("level", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {experienceLevels.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hourly_rate">Hourly Rate (USD)</Label>
            <Input id="hourly_rate" type="number" min="0" step="0.01" value={formData.hourly_rate} onChange={(e) => update("hourly_rate", parseFloat(e.target.value) || 0)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salary_expectation">Monthly Salary (USD)</Label>
            <Input id="salary_expectation" type="number" min="0" value={formData.salary_expectation} onChange={(e) => update("salary_expectation", parseFloat(e.target.value) || 0)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <Select value={formData.availability} onValueChange={(v) => update("availability", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant="cta" onClick={onSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </DialogContent>
  );
}
