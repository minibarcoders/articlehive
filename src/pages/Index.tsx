import { Header } from "@/components/Header";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleGrid } from "@/components/ArticleGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12 space-y-12">
        {featuredArticle && (
          <FeaturedArticle
            title={featuredArticle.title}
            excerpt={featuredArticle.excerpt}
            imageUrl={featuredArticle.image_url || "/placeholder.svg"}
            category={featuredArticle.category}
            author={featuredArticle.author}
            date={featuredArticle.date}
            readTime={featuredArticle.read_time}
            href={`/${featuredArticle.rating ? 'reviews' : 'guides'}/${featuredArticle.id}`}
          />
        )}

        <section>
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <ArticleGrid
            articles={otherArticles.map(article => ({
              title: article.title,
              excerpt: article.excerpt,
              imageUrl: article.image_url || "/placeholder.svg",
              category: article.category,
              author: article.author,
              date: article.date,
              readTime: article.read_time,
              href: `/${article.rating ? 'reviews' : 'guides'}/${article.id}`
            }))}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;