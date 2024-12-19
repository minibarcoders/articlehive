import { Header } from "@/components/Header";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Button } from "@/components/ui/button";
import { Feed } from "@/components/Feed";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Link } from "react-router-dom";

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["latest-content"],
    queryFn: async () => {
      const { data: guides, error: guidesError } = await supabase
        .from("guides")
        .select("*")
        .order("date", { ascending: false })
        .limit(3);

      const { data: reviews, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .order("date", { ascending: false })
        .limit(3);

      if (guidesError) throw guidesError;
      if (reviewsError) throw reviewsError;

      // Create feed items from guides and reviews
      const feedItems = [
        ...(reviews?.map(review => ({
          id: review.id,
          type: 'review' as const,
          title: review.title,
          content: review.excerpt,
          category: review.category,
          rating: review.rating,
          author: review.author,
          date: new Date(review.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          imageUrl: review.image_url,
        })) || []),
        ...(guides?.map(guide => ({
          id: guide.id,
          type: 'guide' as const,
          title: guide.title,
          content: guide.excerpt,
          category: guide.category,
          author: guide.author,
          date: new Date(guide.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          imageUrl: guide.image_url,
        })) || []),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      return {
        guides: guides || [],
        reviews: reviews || [],
        feedItems,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-foreground">Loading...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-foreground">Error loading content</div>
        </main>
      </div>
    );
  }

  const featuredArticle = data?.guides[0] || data?.reviews[0];
  const otherArticles = [
    ...(data?.guides.slice(1) || []),
    ...(data?.reviews.slice(0, 2) || [])
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-background pt-32 pb-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 text-foreground">
            Your Trusted Source
            <br />
            for Tech Reviews
          </h1>
          <p className="text-xl text-foreground dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            In-depth reviews, expert analysis, and the latest insights on technology products that matter to you.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/reviews">
              <Button size="lg">
                Browse Reviews
              </Button>
            </Link>
            <Link to="/guides">
              <Button size="lg" variant="outline">
                Read Our Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Reviews Section */}
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
          
          {featuredArticle && (
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
          )}
        </div>
      </section>

      {/* Feed Section */}
      <section className="relative bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Latest Updates</h2>
              <p className="text-foreground/90 dark:text-gray-300">Stay up to date with our latest content</p>
            </div>
          </div>
          
          {data?.feedItems && <Feed items={data.feedItems} />}
        </div>
      </section>
    </div>
  );
};

export default Index;