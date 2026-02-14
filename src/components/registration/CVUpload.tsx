import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText, X, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

interface CVUploadProps {
  onParsed: (data: ParsedCVData) => void;
  userId?: string;
}

export interface ParsedCVData {
  personal: {
    full_name: string;
    email: string | null;
    phone: string | null;
    location: string | null;
    country: string | null;
    title: string | null;
    summary: string | null;
    linkedin_url: string | null;
    years_experience: number;
  };
  employment: Array<{
    company_name: string;
    job_title: string;
    location: string | null;
    start_date: string | null;
    end_date: string | null;
    is_current: boolean;
    description: string | null;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field_of_study: string | null;
    start_date: string | null;
    end_date: string | null;
    grade: string | null;
  }>;
  skills: Array<{
    skill_name: string;
    skill_type: "technical" | "soft";
    proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    years_of_experience: number;
  }>;
  projects: Array<{
    title: string;
    description: string | null;
    technologies: string[];
    project_url: string | null;
    repo_url: string | null;
  }>;
  certifications: Array<{
    name: string;
    issuing_organization: string;
    issue_date: string | null;
    expiry_date: string | null;
    credential_id: string | null;
  }>;
}

type UploadStatus = "idle" | "uploading" | "parsing" | "success" | "error";

export function CVUpload({ onParsed, userId }: CVUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, Word document, or text file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    setStatus("idle");
    setErrorMessage("");
  };

  const removeFile = () => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    // For text files, read directly
    if (file.type === "text/plain") {
      return await file.text();
    }

    // For PDF and Word docs, we'll read as text/base64 and let the AI handle it
    // This is a simplified approach - in production you'd use a proper parser
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === "string") {
          // For PDF/Word, we send a note that it's binary and include the filename
          resolve(`[Document: ${file.name}]\n\nNote: This is a ${file.type} file. Please extract text content from it.\n\nRaw content hint: ${text.slice(0, 5000)}`);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const parseCV = async () => {
    if (!file) return;

    setStatus("uploading");
    setProgress(20);

    try {
      // Extract text from file
      const cvText = await extractTextFromFile(file);
      setProgress(40);
      setStatus("parsing");

      // Call the edge function to parse with AI
      const { data, error } = await supabase.functions.invoke("parse-cv", {
        body: { cvText },
      });

      setProgress(80);

      if (error) {
        throw new Error(error.message || "Failed to parse CV");
      }

      if (!data?.success) {
        throw new Error(data?.error || "Failed to parse CV");
      }

      setProgress(100);
      setStatus("success");

      toast({
        title: "CV Parsed Successfully! 🎉",
        description: "Your information has been extracted. Review and edit as needed.",
      });

      // Pass the parsed data to parent
      onParsed(data.data);

    } catch (error) {
      console.error("CV parsing error:", error);
      setStatus("error");
      const message = error instanceof Error ? error.message : "Failed to parse CV";
      setErrorMessage(message);
      toast({
        title: "Failed to parse CV",
        description: message,
        variant: "destructive",
      });
    }
  };

  const getFileIcon = () => {
    if (!file) return null;
    if (file.type.includes("pdf")) return "📄";
    if (file.type.includes("word")) return "📝";
    return "📃";
  };

  return (
    <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-accent/50 transition-colors">
      <CardContent className="p-6">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
          className="hidden"
          id="cv-upload"
        />

        {!file ? (
          <label
            htmlFor="cv-upload"
            className="flex flex-col items-center justify-center gap-4 cursor-pointer py-8"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-accent" />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">Upload your CV</p>
              <p className="text-sm text-muted-foreground mt-1">
                PDF, Word, or Text file (max 5MB)
              </p>
            </div>
            <Button type="button" variant="outline" className="mt-2">
              <FileText className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </label>
        ) : (
          <div className="space-y-4">
            {/* File Info */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getFileIcon()}</span>
                <div>
                  <p className="font-medium text-sm truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              {status === "idle" && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Progress */}
            {(status === "uploading" || status === "parsing") && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-center text-muted-foreground flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {status === "uploading" ? "Uploading..." : "AI is parsing your CV..."}
                </p>
              </div>
            )}

            {/* Success */}
            {status === "success" && (
              <div className="flex items-center justify-center gap-2 text-green-600 py-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">CV parsed successfully!</span>
              </div>
            )}

            {/* Error */}
            {status === "error" && (
              <div className="text-center py-2">
                <p className="text-sm text-destructive">{errorMessage}</p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    setStatus("idle");
                    setErrorMessage("");
                  }}
                >
                  Try again
                </Button>
              </div>
            )}

            {/* Parse Button */}
            {status === "idle" && (
              <Button
                onClick={parseCV}
                className="w-full"
                variant="cta"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Parse CV with AI
              </Button>
            )}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center mt-4">
          AI will extract your information and auto-fill the form. You can review and edit afterwards.
        </p>
      </CardContent>
    </Card>
  );
}
