import { Link } from "react-router-dom";
import { Shield, CheckCircle, Linkedin, Twitter } from "lucide-react";
const navigationColumns = [{
  title: "Company",
  links: [{
    name: "About Infinity Teams",
    href: "/about"
  }, {
    name: "How It Works",
    href: "/how-it-works"
  }, {
    name: "Pricing",
    href: "/pricing"
  }, {
    name: "Industries",
    href: "/industries"
  }, {
    name: "Sustainability",
    href: "/sustainability"
  }, {
    name: "Contact Us",
    href: "/contact"
  }]
}, {
  title: "For Companies",
  links: [{
    name: "Hire Talent",
    href: "/for-companies"
  }, {
    name: "Browse Candidates",
    href: "/candidates"
  }, {
    name: "Cost Calculator",
    href: "/pricing"
  }, {
    name: "Case Studies",
    href: "/case-studies",
    badge: "Coming Soon"
  }, {
    name: "FAQs",
    href: "/faq"
  }]
}, {
  title: "For Candidates",
  links: [{
    name: "Apply as Candidate",
    href: "/candidate-registration"
  }, {
    name: "Candidate Login",
    href: "/login"
  }, {
    name: "Career Opportunities",
    href: "/careers"
  }, {
    name: "How We Work",
    href: "/how-it-works"
  }, {
    name: "FAQs for Candidates",
    href: "/candidate-faq"
  }]
}];
const legalLinks = [{
  name: "Terms of Service",
  href: "/terms"
}, {
  name: "Privacy Policy",
  href: "/privacy"
}, {
  name: "GDPR Compliance",
  href: "/gdpr"
}, {
  name: "Cookie Policy",
  href: "/cookies"
}, {
  name: "Data Security",
  href: "/data-security"
}, {
  name: "IP & Ownership Policy",
  href: "/ip-policy"
}];
const trustSignals = ["Transparent Pricing Model", "No Hidden Fees", "One-Month Exit Policy", "Full IP Ownership"];
const socialLinks = [{
  name: "LinkedIn",
  icon: Linkedin,
  href: "https://linkedin.com"
}, {
  name: "Twitter / X",
  icon: Twitter,
  href: "https://twitter.com"
}];
export function FooterNavigation() {
  return <section className="bg-primary text-primary-foreground">
      <div className="container-hero py-12 md:py-16 pb-[25px]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Navigation columns */}
          {navigationColumns.map(column => <div key={column.title}>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground/50 mb-5">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map(link => <li key={link.name}>
                    <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-2">
                      {link.name}
                      {link.badge && <span className="text-[10px] font-semibold uppercase tracking-wider bg-accent/20 text-accent px-1.5 py-0.5 rounded">
                          {link.badge}
                        </span>}
                    </Link>
                  </li>)}
              </ul>
            </div>)}

          {/* Legal & Trust column (replaces Resources) */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Shield className="h-4 w-4 text-accent" />
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground/50">
                Legal
              </h4>
            </div>
            <ul className="space-y-3">
              {legalLinks.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Trust Signals + Social bar */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 flex flex-wrap items-center justify-between gap-y-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-display font-semibold text-xs uppercase tracking-wider text-primary-foreground/50 flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-accent" />
              Trust
            </span>
            {trustSignals.map(signal => <div key={signal} className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
                <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>{signal}</span>
              </div>)}
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map(social => <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-accent text-primary-foreground hover:text-accent-foreground transition-colors" aria-label={social.name}>
                <social.icon className="h-4 w-4" />
              </a>)}
          </div>
        </div>
      </div>
    </section>;
}