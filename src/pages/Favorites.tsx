import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useFavorites } from "@/contexts/FavoritesContext";
import { mockCandidates } from "@/data/candidates";

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();

  const favoriteCandidates = mockCandidates.filter((candidate) =>
    favorites.includes(candidate.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/candidates"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Candidates
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
                  <Heart className="h-8 w-8 text-cta fill-current" />
                  Saved Candidates
                </h1>
                <p className="text-muted-foreground mt-2">
                  {favoriteCandidates.length === 0
                    ? "No candidates saved yet"
                    : `${favoriteCandidates.length} candidate${favoriteCandidates.length !== 1 ? "s" : ""} saved`}
                </p>
              </div>

              {favoriteCandidates.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearFavorites}
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>
          </motion.div>

          {/* Empty State */}
          {favoriteCandidates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                No saved candidates
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start exploring our talent pool and save candidates you're interested in.
                They'll appear here for easy access.
              </p>
              <Link to="/candidates">
                <Button variant="accent" size="lg">
                  Browse Candidates
                </Button>
              </Link>
            </motion.div>
          ) : (
            /* Candidates Grid */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {favoriteCandidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
