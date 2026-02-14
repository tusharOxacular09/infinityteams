import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Search, Building2, Briefcase, Users, Heart, User, LogOut } from "lucide-react";
import infinityTeamsLogo from "@/assets/infinity-teams-logo.png";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DesktopNav } from "./navbar/DesktopNav";

const mobileNavLinks = [
  { name: "Find Talent", href: "/candidates", icon: Search },
  { name: "For Companies", href: "/for-companies", icon: Building2 },
  { name: "For Candidates", href: "/for-candidates", icon: Briefcase },
  { name: "Pricing", href: "/pricing", icon: Users },
  { name: "About Us", href: "/about", icon: Building2 },
  { name: "Sustainability", href: "/sustainability", icon: Briefcase },
  { name: "Contact Us", href: "/contact", icon: Briefcase },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass border-b border-border/50">
        <div className="container-hero">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src={infinityTeamsLogo} 
                alt="Infinity Teams" 
                className="h-20 lg:h-24 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Link to="/favorites" className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className={`h-5 w-5 ${favorites.length > 0 ? "text-cta fill-cta" : ""}`} />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-cta text-cta-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Button>
              </Link>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden xl:inline max-w-[120px] truncate">
                        {user.email?.split("@")[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer text-destructive">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="default">
                      Log In
                    </Button>
                  </Link>
                  <div
                    className="relative"
                    onMouseEnter={() => setGetStartedOpen(true)}
                    onMouseLeave={() => setGetStartedOpen(false)}
                  >
                    <Button variant="cta" size="default" className="flex items-center gap-1">
                      Get Started
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${getStartedOpen ? "rotate-180" : ""}`} />
                    </Button>
                    <AnimatePresence>
                      {getStartedOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-1.5 w-64 rounded-md border bg-popover text-popover-foreground shadow-lg overflow-hidden"
                        >
                          <div className="p-1">
                            <Link
                              to="/company-registration"
                              onClick={() => setGetStartedOpen(false)}
                              className="flex items-start gap-3 p-3 rounded-md hover:bg-accent/10 transition-colors"
                            >
                              <Building2 className="h-5 w-5 text-accent mt-0.5" />
                              <div>
                                <div className="font-medium text-sm">I'm Hiring</div>
                                <div className="text-xs text-muted-foreground">Find top talent for your team</div>
                              </div>
                            </Link>
                            <Link
                              to="/candidate-registration"
                              onClick={() => setGetStartedOpen(false)}
                              className="flex items-start gap-3 p-3 rounded-md hover:bg-accent/10 transition-colors"
                            >
                              <User className="h-5 w-5 text-accent mt-0.5" />
                              <div>
                                <div className="font-medium text-sm">I'm a Candidate</div>
                                <div className="text-xs text-muted-foreground">Find international opportunities</div>
                              </div>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border/50 bg-background"
            >
              <div className="container-hero py-4 space-y-2">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActiveLink(link.href)
                        ? "bg-accent/10 text-accent"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
                <Link
                  to="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActiveLink("/favorites")
                      ? "bg-accent/10 text-accent"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${favorites.length > 0 ? "text-cta fill-cta" : ""}`} />
                  <span className="font-medium">Favorites</span>
                  {favorites.length > 0 && (
                    <span className="ml-auto bg-cta text-cta-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </Link>
                <div className="pt-4 space-y-2 border-t border-border/50">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="cta" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
