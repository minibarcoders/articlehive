import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Header } from "@/components/Header";
import { Hero } from "@/components/home/Hero";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { ContentSection } from "@/components/home/ContentSection";

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

      const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order("date", { ascending: false })
        .limit(5);

      const { data: popularReviews, error: popularReviewsError } = await supabase
        .from("reviews")
        .select("*")
        .order("rating", { ascending: false })
        .limit(5);

      if (guidesError) throw guidesError;
      if (reviewsError) throw reviewsError;
      if (postsError) throw postsError;
      if (popularReviewsError) throw popularReviewsError;

      // Create feed items from guides, reviews, and posts
      const feedItems = [
        ...(posts?.map(post => ({
          id: post.id,
          type: 'post' as const,
          title: post.title,
          content: post.content,
          category: post.category,
          author: post.author,
          date: new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          imageUrl: post.image_url,
        })) || []),
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
        popularItems: popularReviews || [],
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedSection featuredArticle={featuredArticle} />
      <ContentSection 
        feedItems={data?.feedItems || []} 
        popularItems={data?.popularItems || []}
      />
    </div>
  );
};

export default Index;