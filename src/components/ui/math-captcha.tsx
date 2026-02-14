import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCw, ShieldCheck, ShieldAlert } from "lucide-react";

interface MathCaptchaProps {
  onVerified: (verified: boolean) => void;
  disabled?: boolean;
}

function generateChallenge() {
  const operators = ["+", "−", "×"] as const;
  const op = operators[Math.floor(Math.random() * operators.length)];
  let a: number, b: number, answer: number;

  switch (op) {
    case "+":
      a = Math.floor(Math.random() * 20) + 1;
      b = Math.floor(Math.random() * 20) + 1;
      answer = a + b;
      break;
    case "−":
      a = Math.floor(Math.random() * 20) + 5;
      b = Math.floor(Math.random() * a);
      answer = a - b;
      break;
    case "×":
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      answer = a * b;
      break;
  }

  return { question: `${a} ${op} ${b}`, answer };
}

export function MathCaptcha({ onVerified, disabled }: MathCaptchaProps) {
  const [challenge, setChallenge] = useState(generateChallenge);
  const [userAnswer, setUserAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const refresh = useCallback(() => {
    setChallenge(generateChallenge());
    setUserAnswer("");
    setStatus("idle");
    onVerified(false);
  }, [onVerified]);

  useEffect(() => {
    if (userAnswer === "") {
      setStatus("idle");
      return;
    }
    const parsed = parseInt(userAnswer, 10);
    if (isNaN(parsed)) {
      setStatus("idle");
      return;
    }
    if (parsed === challenge.answer) {
      setStatus("correct");
      onVerified(true);
    } else {
      setStatus("wrong");
      onVerified(false);
    }
  }, [userAnswer, challenge.answer, onVerified]);

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {status === "correct" ? (
          <ShieldCheck className="h-4 w-4 text-primary" />
        ) : (
          <ShieldAlert className="h-4 w-4 text-muted-foreground" />
        )}
        Bot Protection
      </Label>
      <div
        className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
          status === "correct"
            ? "border-primary/50 bg-primary/5"
            : status === "wrong" && userAnswer.length > 0
              ? "border-destructive/50 bg-destructive/5"
              : "border-border bg-muted/30"
        }`}
      >
        <span className="font-mono text-lg font-semibold text-foreground whitespace-nowrap select-none">
          {challenge.question} =
        </span>
        <Input
          type="number"
          inputMode="numeric"
          placeholder="?"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-20 text-center font-mono text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          disabled={disabled || status === "correct"}
          aria-label="CAPTCHA answer"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={refresh}
          disabled={disabled}
          className="shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="New challenge"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        {status === "correct" && (
          <span className="text-sm font-medium text-primary whitespace-nowrap">Verified ✓</span>
        )}
      </div>
      {status === "wrong" && userAnswer.length > 0 && (
        <p className="text-sm text-destructive">Incorrect answer, please try again.</p>
      )}
    </div>
  );
}
