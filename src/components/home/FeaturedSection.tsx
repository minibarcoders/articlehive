import { Link } from "react-router-dom";
import { FeaturedArticle } from "@/components/FeaturedArticle";

interface FeaturedSectionProps {
  featuredArticle: any;
  popularGuide?: any;
}

export const FeaturedSection = ({ featuredArticle, popularGuide }: FeaturedSectionProps) => {
  if (!featuredArticle && !popularGuide) return null;

  return (
    <section className="relative bg-accent py-24">
      <div className="container mx-auto px-4 space-y-24">
        {featuredArticle && (
          <div>
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Featured Reviews</h2>
                <p className="text-foreground dark:text-gray-300">Our most recent in-depth tech reviews</p>
              </div>
              <Link to="/reviews" className="text-foreground hover:text-foreground/80 font-medium">
                View all reviews →
              </Link>
            </div>
            
            <FeaturedArticle
              id={featuredArticle.id}
              title={featuredArticle.title}
              excerpt={featuredArticle.excerpt}
              imageUrl={featuredArticle.image_url || "/placeholder.svg"}
              category={featuredArticle.category}
              author={featuredArticle.author}
              date={new Date(featuredArticle.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              readTime={featuredArticle.read_time}
              href={`/reviews/${featuredArticle.id}`}
            />
          </div>
        )}

        {popularGuide && (
          <div>
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Most Read Guides</h2>
                <p className="text-foreground dark:text-gray-300">Popular tech guides and tutorials</p>
              </div>
              <Link to="/guides" className="text-foreground hover:text-foreground/80 font-medium">
                View all guides →
              </Link>
            </div>
            
            <FeaturedArticle
              id={popularGuide.id}
              title={popularGuide.title}
              excerpt={popularGuide.excerpt}
              imageUrl={popularGuide.image_url || "/placeholder.svg"}
              category={popularGuide.category}
              author={popularGuide.author}
              date={new Date(popularGuide.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              readTime={popularGuide.read_time}
              href={`/guides/${popularGuide.id}`}
            />
          </div>
        )}
      </div>
    </section>
  );
};