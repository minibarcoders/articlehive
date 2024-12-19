import { Header } from "@/components/Header";
import { ReviewHeader } from "@/components/ReviewHeader";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Share2, Facebook, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard.",
    });
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

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
            <h1 className="text-2xl font-bold text-purple-600">Review not found</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <article>
        {/* Hero Section */}
        <div className="bg-[#5600FF] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm">
                <time>{format(new Date(review.date), "MMM d, yyyy 'at' h:mm a")}</time>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/20"
                    onClick={handleCopyLink}
                  >
                    <Link2 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/20"
                    onClick={handleShareFacebook}
                  >
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/20"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Category */}
              <div className="uppercase tracking-wider text-sm font-medium">
                {review.category}
              </div>

              {/* Title and Subtitle */}
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight">{review.title}</h1>
                <p className="text-xl text-white/80">{review.excerpt}</p>
              </div>

              {/* Author */}
              <div className="text-sm">
                By <span className="font-medium">{review.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl overflow-hidden mb-12"
            >
              <img
                src={review.image_url || "/placeholder.svg"}
                alt={review.title}
                className="w-full aspect-video object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="prose prose-lg max-w-none prose-headings:text-[#5600FF] prose-a:text-[#5600FF] prose-strong:text-black"
            >
              <ReactMarkdown>{review.content}</ReactMarkdown>
            </motion.div>

            {/* Pros and Cons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-xl"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-600">The Good</h3>
                <ul className="space-y-2">
                  {review.pros.map((pro: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-2 text-gray-700"
                    >
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{pro}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-600">The Bad</h3>
                <ul className="space-y-2">
                  {review.cons.map((con: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-2 text-gray-700"
                    >
                      <span className="text-red-500 mt-1">×</span>
                      <span>{con}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ReviewDetail;