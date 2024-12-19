import { Link } from "react-router-dom";
import { FeaturedArticle } from "@/components/FeaturedArticle";

interface FeaturedSectionProps {
  featuredArticle: any;
}

export const FeaturedSection = ({ featuredArticle }: FeaturedSectionProps) => {
  if (!featuredArticle) return null;

  return (
    <section className="relative bg-accent py-24">
      <div className="container mx-auto px-4">
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
          href={`/${featuredArticle.rating ? 'reviews' : 'guides'}/${featuredArticle.id}`}
        />
      </div>
    </section>
  );
};