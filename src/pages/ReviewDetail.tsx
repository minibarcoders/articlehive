import { Header } from "@/components/Header";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { ReviewHero } from "@/components/review/ReviewHero";
import { ReviewContent } from "@/components/review/ReviewContent";

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
        <main className="container mx-auto px-4 pt-24 pb-12">
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
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-600">
              Review not found
            </h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <article>
        <ReviewHero
          title={review.title}
          excerpt={review.excerpt}
          date={review.date}
          author={review.author}
          category={review.category}
        />
        <ReviewContent content={review.content} imageUrl={review.image_url} />
      </article>
    </div>
  );
};

export default ReviewDetail;