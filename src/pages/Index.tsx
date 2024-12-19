import { Header } from "@/components/Header";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Link } from "react-router-dom";

const fetchLatestContent = async () => {
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

  return {
    guides: guides || [],
    reviews: reviews || []
  };
};

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["latest-content"],
    queryFn: fetchLatestContent,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div>Error loading content</div>
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-24 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Your Trusted Source
          <br />
          for Tech Reviews
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          In-depth reviews, expert analysis, and the latest insights on technology products that matter to you.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/reviews">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Browse Reviews
            </Button>
          </Link>
          <Link to="/guides">
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              Read Our Guides
            </Button>
          </Link>
        </div>
      </section>

      {/* Latest Reviews Section */}
      <section className="container mx-auto px-4 pb-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Reviews</h2>
          <Link to="/reviews" className="text-purple-600 hover:text-purple-700 font-medium">
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

        <div className="mt-12">
          <ArticleGrid
            articles={otherArticles.map(article => ({
              id: article.id,
              title: article.title,
              excerpt: article.excerpt,
              imageUrl: article.image_url || "/placeholder.svg",
              category: article.category,
              author: article.author,
              date: new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              readTime: article.read_time,
              href: `/${article.rating ? 'reviews' : 'guides'}/${article.id}`
            }))}
          />
        </div>
      </section>
    </div>
  );
};

export default Index;