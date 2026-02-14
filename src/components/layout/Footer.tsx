import { FooterCTA } from "./footer/FooterCTA";
import { FooterNavigation } from "./footer/FooterNavigation";
import { FooterGlobalPresence } from "./footer/FooterGlobalPresence";
import { FooterCopyright } from "./footer/FooterCopyright";

export function Footer() {
  return (
    <footer>
      {/* Layer 1 — Primary CTA */}
      <FooterCTA />

      {/* Layer 2 — Navigation + Legal + Trust + Social */}
      <FooterNavigation />

      {/* Layer 3 — Global Presence & Contact */}
      <FooterGlobalPresence />

      {/* Layer 4 — Copyright & Disclaimer */}
      <FooterCopyright />
    </footer>
  );
}
