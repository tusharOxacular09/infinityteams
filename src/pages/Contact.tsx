import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building2,
  MessageSquare,
  ArrowRight,
  Linkedin,
  Globe,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  company: z
    .string()
    .trim()
    .max(150, "Company name must be less than 150 characters")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(1, "Please select a subject"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjects = [
  "I want to hire talent",
  "I want to apply as a candidate",
  "Pricing & billing question",
  "Partnership inquiry",
  "Media & press",
  "General question",
];

const offices = [
  {
    country: "Netherlands",
    label: "European HQ",
    address: "Amsterdam, Netherlands",
    email: "info@infinityteams.com",
  },
  {
    country: "India — Mumbai",
    label: "Operations Office",
    address: "Mumbai, Maharashtra, India",
    email: "mumbai@infinityteams.com",
  },
  {
    country: "India — Bangalore",
    label: "Tech Hub",
    address: "Bangalore, Karnataka, India",
    email: "bangalore@infinityteams.com",
  },
  {
    country: "India — Hyderabad",
    label: "Engineering Centre",
    address: "Hyderabad, Telangana, India",
    email: "hyderabad@infinityteams.com",
  },
];

const quickLinks = [
  {
    icon: HelpCircle,
    title: "FAQs",
    description: "Find answers to common questions",
    href: "/faq",
  },
  {
    icon: Globe,
    title: "Browse Candidates",
    description: "Explore our vetted talent pool",
    href: "/candidates",
  },
  {
    icon: Building2,
    title: "For Companies",
    description: "Learn how we help businesses scale",
    href: "/for-companies",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    toast({
      title: "Message sent!",
      description:
        "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

        <div className="container-hero relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <MessageSquare className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Get in Touch
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              We'd Love to Hear From You
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Whether you're looking to hire talent, join our network, or simply
              have a question — our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="pb-16 md:pb-20">
        <div className="container-hero">
          <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              className="lg:col-span-3 bg-card rounded-2xl p-6 md:p-8 border border-border"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@company.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your company (optional)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {subjects.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us how we can help..."
                            rows={5}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              </Form>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {/* Direct Contact */}
              <div className="bg-card rounded-2xl p-6 border border-border space-y-5">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Direct Contact
                </h3>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a
                      href="mailto:info@infinityteams.com"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      info@infinityteams.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      +31 (0) 20 123 4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Business Hours
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mon – Fri, 9:00 – 18:00 CET
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Linkedin className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      LinkedIn
                    </p>
                    <a
                      href="https://linkedin.com/company/infinityteams"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      Follow us on LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Promise */}
              <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 text-center">
                <p className="font-display text-2xl font-bold text-accent mb-1">
                  &lt; 24h
                </p>
                <p className="text-sm text-muted-foreground">
                  Average response time for all inquiries
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border hover:border-accent/30 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-muted group-hover:bg-accent/10 transition-colors">
                      <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {link.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container-hero max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Our Offices
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Reach out to the office nearest to you, or contact our European HQ
              for global inquiries.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offices.map((office) => (
              <motion.div
                key={office.country}
                className="bg-card rounded-xl p-5 border border-border text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <MapPin className="h-5 w-5 text-accent mx-auto mb-3" />
                <h3 className="font-display text-base font-bold text-foreground mb-0.5">
                  {office.country}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {office.label}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {office.address}
                </p>
                <a
                  href={`mailto:${office.email}`}
                  className="text-xs text-accent hover:underline"
                >
                  {office.email}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
