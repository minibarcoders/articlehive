import { Header } from "@/components/Header";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const reviews = {
  1: {
    title: "MacBook Pro M3 Max Review: The Ultimate Creator's Laptop",
    content: `
      <p class="text-lg leading-relaxed mb-6">
        Apple's latest MacBook Pro with the M3 Max chip represents a significant leap forward in mobile computing power. This isn't just an incremental update - it's a revolutionary device that redefines what professionals can expect from a laptop.
      </p>

      <h2 class="text-2xl font-bold mb-4">Performance That Breaks Boundaries</h2>
      <p class="text-lg leading-relaxed mb-6">
        The M3 Max chip delivers unprecedented performance, handling complex tasks like 8K video editing and 3D rendering with remarkable ease. In our testing, it showed up to 40% faster performance compared to the M2 Max in real-world scenarios.
      </p>

      <h2 class="text-2xl font-bold mb-4">Display and Design</h2>
      <p class="text-lg leading-relaxed mb-6">
        The Liquid Retina XDR display continues to impress with its mini-LED technology, offering exceptional brightness and contrast. The new Space Black color option is stunning and remarkably resistant to fingerprints.
      </p>

      <h2 class="text-2xl font-bold mb-4">Battery Life</h2>
      <p class="text-lg leading-relaxed mb-6">
        Despite its powerful performance, the MacBook Pro M3 Max maintains excellent battery life, lasting up to 14 hours in our web browsing test. This is particularly impressive given the performance capabilities of this machine.
      </p>
    `,
    category: "Laptops",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "March 15, 2024",
    author: "Sarah Chen",
    readTime: "12 min read",
    pros: [
      "Exceptional performance for professional workflows",
      "Beautiful Liquid Retina XDR display",
      "Excellent battery life",
      "Premium build quality",
      "Advanced thermal management"
    ],
    cons: [
      "Premium price point",
      "Limited upgradeability",
      "Port selection might not satisfy all users"
    ]
  }
} as const;

type ReviewId = keyof typeof reviews;

const ReviewDetail = () => {
  const { id } = useParams();
  const review = id ? reviews[Number(id) as ReviewId] : null;

  if (!review) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24">
          <h1 className="text-2xl font-bold">Review not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-gray-900">{review.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>{review.author}</span>
              <span>•</span>
              <time>{review.date}</time>
              <span>•</span>
              <span>{review.readTime}</span>
            </div>
          </div>

          <div className="relative aspect-[16/9] mb-8 rounded-xl overflow-hidden">
            <img
              src={review.imageUrl}
              alt={review.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                {review.category}
              </span>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">{review.rating}</span>
              </div>
            </div>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: review.content }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-green-50 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-green-800 mb-4">Pros</h2>
              <ul className="space-y-2">
                {review.pros.map((pro, index) => (
                  <li key={index} className="flex items-center text-green-700">
                    <span className="mr-2">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-red-50 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold text-red-800 mb-4">Cons</h2>
              <ul className="space-y-2">
                {review.cons.map((con, index) => (
                  <li key={index} className="flex items-center text-red-700">
                    <span className="mr-2">×</span>
                    {con}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.article>
      </main>
    </div>
  );
};

export default ReviewDetail;