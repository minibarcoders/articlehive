import { Header } from "@/components/Header";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { ReviewHero } from "@/components/review/ReviewHero";
import { ReviewContent } from "@/components/review/ReviewContent";
import { ReviewQuickTake } from "@/components/review/ReviewQuickTake";
import { ReviewSummary } from "@/components/review/ReviewSummary";
import { useEffect, useState } from "react";

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
  const [showQuickTake, setShowQuickTake] = useState(true);
  const { data: review, isLoading, error } = useQuery({
    queryKey: ["review", id],
    queryFn: () => fetchReview(id!),
    enabled: !!id,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const contentStart = document.getElementById('review-content')?.offsetTop ?? 0;
      const threshold = contentStart + window.innerHeight;
      
      setShowQuickTake(scrollPosition < threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              Review not found
            </h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
            <div id="review-content" className="lg:col-span-2">
              <ReviewContent 
                content={review.content} 
                imageUrl={review.image_url} 
                tags={review.tags}
              />
            </div>
            <div className="space-y-6">
              <div className={`lg:sticky lg:top-32 space-y-6 transition-opacity duration-300 ${showQuickTake ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <ReviewQuickTake
                  title={review.title}
                  excerpt={review.excerpt}
                  rating={review.rating}
                />
                <ReviewSummary
                  summary="Our team was thoroughly impressed with this product's innovative features and solid build quality. While there's room for improvement in some areas, it stands out as a strong contender in its category, offering excellent value for its price point."
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ReviewDetail;