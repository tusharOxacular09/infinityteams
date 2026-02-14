import { Link } from "react-router-dom";
import { Shield, CheckCircle } from "lucide-react";

const legalLinks = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "GDPR Compliance", href: "/gdpr" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Data Security", href: "/data-security" },
  { name: "IP & Ownership Policy", href: "/ip-policy" },
];

const trustSignals = [
  "Transparent Pricing Model",
  "No Hidden Fees",
  "One-Month Exit Policy",
  "Full IP Ownership",
];

export function FooterLegalTrust() {
  return (
    <section className="bg-primary border-t border-primary-foreground/10">
      <div className="container-hero py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Legal */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-4 w-4 text-accent" />
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground/50">
                Legal
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Signals */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-4 w-4 text-accent" />
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground/50">
                Trust Signals
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {trustSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center gap-2 text-sm text-primary-foreground/70"
                >
                  <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
