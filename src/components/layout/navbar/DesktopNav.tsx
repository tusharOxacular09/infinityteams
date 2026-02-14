import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Search, Building2, Briefcase, Users, Globe, DollarSign, Calculator, FileText, UserPlus, LogIn, HelpCircle, BookOpen, Award, Factory, Code, Megaphone, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

const navItems = [
  {
    label: "Find Talent",
    href: "/candidates",
    submenu: [
      { title: "Browse Candidates", description: "Search our vetted talent pool", href: "/candidates", icon: Search },
      { title: "Featured Talent", description: "Top-rated professionals ready to start", href: "/candidates?featured=true", icon: Award },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    submenu: [
      { title: "All Industries", description: "Explore 12+ sectors we serve", href: "/industries", icon: Factory },
      { title: "IT & Software", description: "Developers, data scientists, DevOps", href: "/industries#it", icon: Code },
      { title: "Digital Marketing", description: "SEO, PPC, content & social media", href: "/industries#marketing", icon: Megaphone },
    ],
  },
  {
    label: "For Companies",
    href: "/for-companies",
    submenu: [
      { title: "Hire Talent", description: "Find top talent for your team", href: "/for-companies", icon: Building2 },
      { title: "How It Works", description: "Our streamlined hiring process", href: "/for-companies#how-it-works", icon: BookOpen },
      { title: "Cost Calculator", description: "Estimate your savings", href: "/pricing", icon: Calculator },
    ],
  },
  {
    label: "For Candidates",
    href: "/for-candidates",
    submenu: [
      { title: "Why Infinity Teams?", description: "Why candidates choose us", href: "/for-candidates", icon: Award },
      { title: "Apply as Candidate", description: "Join our global talent network", href: "/candidate-registration", icon: UserPlus },
      { title: "Candidate Login", description: "Access your profile dashboard", href: "/login", icon: LogIn },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
    submenu: [
      { title: "Pricing Plans", description: "Transparent, no hidden fees", href: "/pricing", icon: DollarSign },
      { title: "ROI Calculator", description: "Calculate your cost savings", href: "/pricing#calculator", icon: Calculator },
      { title: "FAQs", description: "Common questions answered", href: "/pricing#faq", icon: HelpCircle },
    ],
  },
  {
    label: "About",
    href: "/about",
    submenu: [
      { title: "About Us", description: "Our mission, vision & values", href: "/about", icon: Globe },
      { title: "Sustainability", description: "Our social impact initiatives", href: "/sustainability", icon: Leaf },
      { title: "Contact Us", description: "Get in touch with our team", href: "/contact", icon: Users },
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string; icon?: React.ElementType }
>(({ className, title, children, icon: Icon, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 focus:bg-accent/10 group",
            className
          )}
          {...props}
        >
          <div className="flex items-start gap-3">
            {Icon && (
              <div className="mt-0.5 rounded-md bg-accent/10 p-1.5 group-hover:bg-accent/20 transition-colors">
                <Icon className="h-4 w-4 text-accent" />
              </div>
            )}
            <div>
              <div className="text-sm font-semibold leading-none text-foreground">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1.5">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-0.5">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuTrigger className="bg-transparent text-foreground/80 hover:text-foreground hover:bg-muted data-[state=open]:bg-muted/80 h-10 px-4 text-base font-semibold">
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[280px] gap-1 p-2">
                {item.submenu.map((sub) => (
                  <ListItem key={sub.title} to={sub.href} title={sub.title} icon={sub.icon}>
                    {sub.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
