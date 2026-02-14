import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const cookieTypes = [
  {
    title: "1. Strictly Necessary Cookies",
    description: "These cookies are essential for the website to function and cannot be switched off.",
    purpose: "They are used to:",
    items: [
      "Enable account registration and login",
      "Maintain secure sessions",
      "Support form submissions",
      "Ensure platform security",
    ],
    footnote: "Without these cookies, some parts of the website will not work properly.",
  },
  {
    title: "2. Performance & Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website.",
    purpose: "They collect information such as:",
    items: [
      "Pages visited",
      "Time spent on the website",
      "Traffic sources",
      "Error messages",
    ],
    footnote: "This data is aggregated and anonymous and helps us improve website performance and usability.",
  },
  {
    title: "3. Functional Cookies",
    description: "These cookies allow the website to remember choices you make and provide enhanced functionality.",
    purpose: "Examples include:",
    items: [
      "Language selection",
      "Currency display based on location",
      "Region and country preferences",
      "Saved login preferences",
    ],
  },
  {
    title: "4. Marketing & Advertising Cookies",
    description: "",
    purpose: "These cookies may be used to:",
    items: [
      "Deliver relevant ads and content",
      "Measure the effectiveness of marketing campaigns",
      "Limit how often you see the same advertisement",
    ],
    footnote: "Marketing cookies may be set by us or by trusted third-party partners.",
  },
];

export default function Cookies() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container-hero max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Cookies Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-12">
            Last updated: February 2026
          </p>

          <div className="space-y-10">
            {/* Intro */}
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                This Cookies Policy explains how Infinity Teams ("we", "our", "us") uses cookies and similar technologies when you visit our website or use our platform.
              </p>
              <p>
                By continuing to browse or use our website, you agree to the use of cookies as described in this policy, unless you choose to disable them through your browser or cookie preferences.
              </p>
            </div>

            {/* What Are Cookies */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                What Are Cookies?
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Cookies are small text files that are stored on your device (computer, mobile, or tablet) when you visit a website. They help websites function properly, improve user experience, and provide information to website owners.
                </p>
                <p>Cookies may be:</p>
                <ul className="list-disc list-inside space-y-1.5">
                  <li>Session cookies (deleted when you close your browser)</li>
                  <li>Persistent cookies (stored on your device for a defined period)</li>
                </ul>
              </div>
            </div>

            {/* How We Use Cookies */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                How We Use Cookies
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Infinity Teams uses cookies to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
                <li>Ensure the website functions correctly</li>
                <li>Improve website performance and user experience</li>
                <li>Remember your preferences (such as language and region)</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Support security and fraud prevention</li>
                <li>Display relevant content based on your location and usage</li>
              </ul>
            </div>

            {/* Types of Cookies */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Types of Cookies We Use
              </h2>
              <div className="space-y-8">
                {cookieTypes.map((type) => (
                  <div key={type.title}>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {type.title}
                    </h3>
                    {type.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                        {type.description}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {type.purpose}
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground mb-2">
                      {type.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {type.footnote && (
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        {type.footnote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Third-Party Cookies */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                Third-Party Cookies
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Infinity Teams may use trusted third-party services (such as analytics or performance tools) that set cookies on our behalf.
                </p>
                <p>
                  These third parties may collect information about your online activities across different websites. We recommend reviewing their respective privacy and cookie policies for more information.
                </p>
              </div>
            </div>

            {/* Managing Preferences */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                Managing Your Cookie Preferences
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                You can control and manage cookies in several ways:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground mb-3">
                <li>Through our cookie consent banner</li>
                <li>By adjusting your browser settings to block or delete cookies</li>
                <li>By disabling specific cookie categories where available</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Please note that disabling certain cookies may affect the functionality and performance of the website.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                Changes to This Cookies Policy
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  We may update this Cookies Policy from time to time to reflect changes in technology, legal requirements, or how we operate.
                </p>
                <p>
                  Any updates will be posted on this page with a revised "Last updated" date.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-3">
                Contact Us
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                <p>
                  If you have any questions about our use of cookies or this Cookies Policy, please contact us at:
                </p>
                <p className="font-medium text-foreground">Infinity Teams</p>
                <p>
                  📧 Email:{" "}
                  <a
                    href="mailto:info@infinityteams.com"
                    className="underline hover:text-primary transition-colors text-foreground font-medium"
                  >
                    info@infinityteams.com
                  </a>
                </p>
                <p>
                  📍 Website:{" "}
                  <a
                    href="https://www.infinityteams.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary transition-colors text-foreground font-medium"
                  >
                    www.infinityteams.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
