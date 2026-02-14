import { MapPin, Phone, Globe } from "lucide-react";

const offices = [
  {
    country: "India",
    flag: "🇮🇳",
    label: "Operations & Talent",
    address: [
      "B Wing, Lumos Cowork, Vasudev Chamber,",
      "Crescent Grande, 5th Floor,",
      "Old Nagardas Rd, Andheri East,",
      "Mumbai, Maharashtra 400069",
    ],
    phone: "+91 77746 71788",
  },
  {
    country: "Netherlands",
    flag: "🇳🇱",
    label: "EU HQ",
    address: [
      "Isaäc Asscherpad 11,",
      "1096 BJ Amsterdam",
    ],
    phone: "+31 20 8080 486",
  },
  {
    country: "United States",
    flag: "🇺🇸",
    label: "Coming Soon",
    address: ["New Jersey"],
    phone: null,
    comingSoon: true,
  },
];

export function FooterGlobalPresence() {
  return (
    <section className="bg-primary border-t border-primary-foreground/10">
      <div className="container-hero py-10">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="h-4 w-4 text-accent" />
          <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground/50">
            Global Presence
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office) => (
            <div
              key={office.country}
              className={`rounded-lg border border-primary-foreground/10 p-5 ${
                office.comingSoon ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{office.flag}</span>
                <div>
                  <h5 className="font-display font-semibold text-primary-foreground text-sm">
                    {office.country}
                  </h5>
                  <span className="text-xs text-primary-foreground/50">
                    {office.label}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <p className="text-xs text-primary-foreground/60 leading-relaxed">
                    {office.address.join(" ")}
                  </p>
                </div>
                {office.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-accent shrink-0" />
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="text-xs text-primary-foreground/60 hover:text-accent transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                )}
                {office.comingSoon && (
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-accent/20 text-accent px-2 py-0.5 rounded mt-1">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
