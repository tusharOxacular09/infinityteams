import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { MailCheck, RefreshCw, ArrowRight, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompanyEmailVerificationStepProps {
  email: string;
  onNext: () => void;
  onBack?: () => void;
  testMode?: boolean;
}

export function CompanyEmailVerificationStep({ email, onNext, onBack, testMode }: CompanyEmailVerificationStepProps) {
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyOtp = () => {
    if (testMode) {
      setIsVerified(true);
      toast({
        title: "Test Mode ✅",
        description: "Skipping OTP verification in test mode.",
      });
      return;
    }

    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit code sent to your email.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast({
        title: "Email Verified! ✅",
        description: "Your email has been verified successfully.",
      });
    }, 1500);
  };

  const handleResendOtp = () => {
    if (testMode) {
      toast({ title: "Test Mode", description: "OTP resend skipped in test mode." });
      setCountdown(60);
      return;
    }
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      toast({
        title: "OTP Resent! 📧",
        description: "A new verification code has been sent to your email.",
      });
      setCountdown(60);
      setOtp("");
    }, 1000);
  };

  const handleContinue = () => {
    if (isVerified || testMode) {
      onNext();
    } else {
      toast({
        title: "Email Not Verified",
        description: "Please verify your email before continuing.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>We've sent a 6-digit verification code to your email</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <Alert className={isVerified ? "border-primary/50 bg-primary/10" : "border-accent/50 bg-accent/10"}>
          {isVerified ? (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          ) : (
            <MailCheck className="h-4 w-4 text-accent" />
          )}
          <AlertTitle className={isVerified ? "text-primary" : "text-accent"}>
            {isVerified ? "Email Verified!" : "Check Your Inbox"}
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {isVerified ? (
              <>Your email <span className="font-medium text-foreground">{email}</span> has been verified. You can now continue.</>
            ) : (
              <>We've sent a verification code to <span className="font-medium text-foreground">{email}</span>. Enter the 6-digit code below.</>
            )}
          </AlertDescription>
        </Alert>

        {!isVerified && (
          <div className="flex flex-col items-center gap-6">
            <div className="space-y-3 text-center">
              <p className="text-sm font-medium text-foreground">Enter Verification Code</p>
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              onClick={handleVerifyOtp}
              variant="cta"
              size="lg"
              className="w-full max-w-xs"
              disabled={isVerifying || (otp.length !== 6 && !testMode)}
            >
              {isVerifying ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</>
              ) : (
                <><CheckCircle2 className="mr-2 h-4 w-4" /> Verify Email</>
              )}
            </Button>

            <Button
              onClick={handleResendOtp}
              variant="ghost"
              size="sm"
              disabled={isResending || countdown > 0}
              className="text-muted-foreground"
            >
              {isResending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
              ) : countdown > 0 ? (
                <><RefreshCw className="mr-2 h-4 w-4" /> Resend code in {countdown}s</>
              ) : (
                <><RefreshCw className="mr-2 h-4 w-4" /> Resend Verification Code</>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Didn't receive the code? Check your spam folder or click resend above.
            </p>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {onBack ? (
            <Button onClick={onBack} variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : <div />}
          {isVerified && (
            <Button onClick={handleContinue} variant="cta" size="lg">
              Continue to Company Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
