import { Link } from "react-router-dom";
import { FeaturedArticle } from "@/components/FeaturedArticle";

interface FeaturedSectionProps {
  featuredArticle: any;
  popularGuide?: any;
}

export const FeaturedSection = ({ featuredArticle, popularGuide }: FeaturedSectionProps) => {
  if (!featuredArticle && !popularGuide) return null;

  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featuredArticle && (
            <div className="bg-[#F1F0FB] dark:bg-gray-800/90 rounded-2xl p-8 transition-all duration-300">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Featured Reviews</h2>
                  <p className="text-gray-600 dark:text-gray-300">Our most recent in-depth tech reviews</p>
                </div>
                <Link to="/reviews" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium">
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
            <div className="bg-[#E5F6FF] dark:bg-gray-800/80 rounded-2xl p-8 transition-all duration-300">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Most Read Guides</h2>
                  <p className="text-gray-600 dark:text-gray-300">Popular tech guides and tutorials</p>
                </div>
                <Link to="/guides" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
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
      </div>
    </section>
  );
};