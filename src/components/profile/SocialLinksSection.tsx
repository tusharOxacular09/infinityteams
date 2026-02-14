import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Link2, ExternalLink, Linkedin, Github, Globe, Twitter } from "lucide-react";
import { SocialLink } from "@/hooks/useCandidateProfile";

interface SocialLinksSectionProps {
  socialLinks: SocialLink[];
  onAdd: (data: Omit<SocialLink, 'id' | 'profile_id'>) => Promise<{ error: Error | null }>;
  onUpdate: (id: string, data: Partial<SocialLink>) => Promise<{ error: Error | null }>;
  onDelete: (id: string) => Promise<{ error: Error | null }>;
}

const platformOptions = [
  { value: "LinkedIn", icon: Linkedin },
  { value: "GitHub", icon: Github },
  { value: "Twitter", icon: Twitter },
  { value: "Portfolio", icon: Globe },
  { value: "Other", icon: Link2 },
];

const getPlatformIcon = (platform: string) => {
  const option = platformOptions.find(p => p.value === platform);
  return option?.icon || Link2;
};

const initialFormData = {
  platform: "LinkedIn",
  url: "",
};

export function SocialLinksSection({ socialLinks, onAdd, onUpdate, onDelete }: SocialLinksSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleOpenAdd = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: SocialLink) => {
    setFormData({
      platform: item.platform,
      url: item.url,
    });
    setEditingId(item.id);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (editingId) {
      await onUpdate(editingId, formData);
    } else {
      await onAdd(formData);
    }
    setIsLoading(false);
    setIsDialogOpen(false);
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await onDelete(id);
  };

  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-display">
          <Link2 className="h-5 w-5 text-accent" />
          Social Links
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleOpenAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Link" : "Add Link"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) => setFormData({ ...formData, platform: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {platformOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="h-4 w-4" />
                          {option.value}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading || !formData.url}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {socialLinks.length === 0 ? (
          <div className="text-center py-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
              <Link2 className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No social links added yet</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Connect your professional profiles</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => {
              const Icon = getPlatformIcon(link.platform);
              return (
                <div key={link.id} className="flex items-center gap-2 p-2 px-3 rounded-lg bg-muted/30 group">
                  <Icon className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">{link.platform}</span>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </a>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => handleOpenEdit(link)}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => handleDelete(link.id)}>
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
