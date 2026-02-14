import { Link } from "react-router-dom";
import { Linkedin, Twitter } from "lucide-react";
import infinityTeamsLogo from "@/assets/infinity-teams-logo.png";

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Twitter / X", icon: Twitter, href: "https://twitter.com" },
];

export function FooterBrandSocial() {
  return (
    <section className="bg-primary border-t border-primary-foreground/10">
      <div className="container-hero py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Brand Block */}
          <div className="flex flex-col items-center md:items-start gap-3 max-w-sm">
            <Link to="/">
              <img
                src={infinityTeamsLogo}
                alt="Infinity Teams"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-primary-foreground/50 text-center md:text-left leading-relaxed">
              Building full-time global teams with radical transparency and cost-plus pricing.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-primary-foreground/10 hover:bg-accent text-primary-foreground hover:text-accent-foreground transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
