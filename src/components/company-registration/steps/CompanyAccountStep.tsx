import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { MathCaptcha } from "@/components/ui/math-captcha";
import { Link } from "react-router-dom";

interface CompanyAccountStepProps {
  onNext: (email: string) => void;
  testMode?: boolean;
}

export function CompanyAccountStep({ onNext, testMode }: CompanyAccountStepProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTos, setAcceptedTos] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptchaVerified = useCallback((verified: boolean) => {
    setCaptchaVerified(verified);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!acceptedTos) {
      newErrors.tos = "You must accept the Terms of Service";
    }
    if (!acceptedPrivacy) {
      newErrors.privacy = "You must accept the Privacy Policy";
    }
    if (!captchaVerified) {
      newErrors.captcha = "Please solve the CAPTCHA";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (testMode) {
      onNext(email || "test@company.com");
      return;
    }
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onNext(email);
    }, 1000);
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Create Your Company Account</CardTitle>
        <CardDescription>
          Enter your work email and create a password to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="company-email">Work Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="company-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="company-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="company-password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="company-confirm-password">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="company-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 pr-10"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
        </div>

        {/* Terms of Service & Privacy Policy */}
        <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="accept-tos"
              checked={acceptedTos}
              onCheckedChange={(checked) => {
                setAcceptedTos(checked === true);
                if (errors.tos) setErrors(prev => ({ ...prev, tos: "" }));
              }}
              disabled={isLoading}
              className="mt-0.5"
            />
            <Label htmlFor="accept-tos" className="text-sm leading-relaxed cursor-pointer font-normal">
              I accept the{" "}
              <a href="/terms" target="_blank" className="text-accent font-medium hover:underline">
                Terms of Service
              </a>
            </Label>
          </div>
          {errors.tos && <p className="text-sm text-destructive pl-7">{errors.tos}</p>}

          <div className="flex items-start gap-3">
            <Checkbox
              id="accept-privacy"
              checked={acceptedPrivacy}
              onCheckedChange={(checked) => {
                setAcceptedPrivacy(checked === true);
                if (errors.privacy) setErrors(prev => ({ ...prev, privacy: "" }));
              }}
              disabled={isLoading}
              className="mt-0.5"
            />
            <Label htmlFor="accept-privacy" className="text-sm leading-relaxed cursor-pointer font-normal">
              I accept the{" "}
              <a href="/privacy" target="_blank" className="text-accent font-medium hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>
          {errors.privacy && <p className="text-sm text-destructive pl-7">{errors.privacy}</p>}
        </div>

        {/* CAPTCHA */}
        <MathCaptcha onVerified={handleCaptchaVerified} disabled={isLoading} />
        {errors.captcha && <p className="text-sm text-destructive -mt-4">{errors.captcha}</p>}

        {/* Submit */}
        <Button onClick={handleSubmit} variant="cta" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account & Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
