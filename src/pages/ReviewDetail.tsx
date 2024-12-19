import { Header } from "@/components/Header";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { ReviewHero } from "@/components/review/ReviewHero";
import { ReviewContent } from "@/components/review/ReviewContent";
import { ReviewQuickTake } from "@/components/review/ReviewQuickTake";

const fetchReview = async (id: string) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

const ReviewDetail = () => {
  const { id } = useParams();
  const { data: review, isLoading, error } = useQuery({
    queryKey: ["review", id],
    queryFn: () => fetchReview(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-600">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-600">
              Review not found
            </h1>
          </div>
        </main>
      </div>
    );
  }

  // Mock ratings for demonstration - in production these would come from the review data
  const ratings = {
    overall: Math.round(review.rating * 2), // Convert 5-star to 10-point scale
    design: 9,
    features: 8,
    performance: 10,
    value: 8,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <article className="pt-20">
        <ReviewHero
          title={review.title}
          excerpt={review.excerpt}
          date={review.date}
          author={review.author}
          category={review.category}
        />
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReviewContent 
                content={review.content} 
                imageUrl={review.image_url} 
                tags={review.tags}
              />
            </div>
            <div className="lg:sticky lg:top-24 h-fit">
              <ReviewQuickTake
                title={review.title}
                excerpt={review.excerpt}
                ratings={ratings}
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ReviewDetail;