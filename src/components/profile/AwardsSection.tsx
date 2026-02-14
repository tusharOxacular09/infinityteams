import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Trophy, Calendar } from "lucide-react";
import { Award } from "@/hooks/useCandidateProfile";
import { format } from "date-fns";

interface AwardsSectionProps {
  awards: Award[];
  onAdd: (data: Omit<Award, 'id' | 'profile_id'>) => Promise<{ error: Error | null }>;
  onUpdate: (id: string, data: Partial<Award>) => Promise<{ error: Error | null }>;
  onDelete: (id: string) => Promise<{ error: Error | null }>;
}

const initialFormData = {
  title: "",
  issuing_organization: "",
  date_received: "",
  description: "",
};

export function AwardsSection({ awards, onAdd, onUpdate, onDelete }: AwardsSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleOpenAdd = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item: Award) => {
    setFormData({
      title: item.title,
      issuing_organization: item.issuing_organization || "",
      date_received: item.date_received || "",
      description: item.description || "",
    });
    setEditingId(item.id);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const data = {
      ...formData,
      issuing_organization: formData.issuing_organization || null,
      date_received: formData.date_received || null,
      description: formData.description || null,
    };

    if (editingId) {
      await onUpdate(editingId, data);
    } else {
      await onAdd(data);
    }
    setIsLoading(false);
    setIsDialogOpen(false);
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this award?")) {
      await onDelete(id);
    }
  };

  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-display">
          <Trophy className="h-5 w-5 text-accent" />
          Awards & Achievements
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleOpenAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Award
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Award" : "Add Award"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Award Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Employee of the Year"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuing_organization">Issuing Organization</Label>
                <Input
                  id="issuing_organization"
                  placeholder="e.g. Google, Hackathon Name"
                  value={formData.issuing_organization}
                  onChange={(e) => setFormData({ ...formData, issuing_organization: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_received">Date Received</Label>
                <Input
                  id="date_received"
                  type="date"
                  value={formData.date_received}
                  onChange={(e) => setFormData({ ...formData, date_received: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the award..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading || !formData.title}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {awards.length === 0 ? (
          <div className="text-center py-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
              <Trophy className="h-6 w-6 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No awards added yet</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Showcase your achievements and recognitions</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {awards.map((award) => (
              <div key={award.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex gap-3 items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Trophy className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{award.title}</h4>
                    {award.issuing_organization && (
                      <p className="text-sm text-muted-foreground">{award.issuing_organization}</p>
                    )}
                    {award.date_received && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(award.date_received), "MMM yyyy")}
                      </span>
                    )}
                    {award.description && (
                      <p className="text-xs text-muted-foreground mt-1">{award.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(award)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(award.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}