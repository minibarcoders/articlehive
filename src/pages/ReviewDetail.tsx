import { Header } from "@/components/Header";
import { ReviewHeader } from "@/components/ReviewHeader";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const reviews = {
  1: {
    title: "MacBook Pro M3 Max Review: The Ultimate Creator's Laptop",
    content: `
      Apple's latest MacBook Pro with M3 Max represents a significant leap forward in mobile computing power. Here's our detailed analysis.

      ## Performance
      The M3 Max chip delivers unprecedented performance in both single and multi-core tasks:
      - Up to 40% faster than M2 Max in video rendering
      - Improved neural engine for AI tasks
      - Better thermal management under load
      - Exceptional battery efficiency despite increased power

      ## Display Quality
      The Mini LED display continues to impress:
      - 1600 nits peak brightness
      - True HDR support
      - ProMotion 120Hz refresh rate
      - P3 wide color gamut

      ## Build Quality
      Premium construction that justifies the price point:
      - Robust aluminum unibody
      - Improved keyboard mechanism
      - Force Touch trackpad refinements
      - Better port selection
    `,
    category: "Laptops",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "March 15, 2024",
    author: "Sarah Chen",
    readTime: "12 min read",
    pros: [
      "Exceptional performance for creative tasks",
      "Outstanding battery life",
      "Beautiful Mini LED display",
      "Premium build quality"
    ],
    cons: [
      "High price point",
      "Limited upgradeability",
      "Port selection might not satisfy all users"
    ]
  }
} as const;

const ReviewDetail = () => {
  const { id } = useParams();
  const review = id ? reviews[Number(id) as keyof typeof reviews] : null;

  if (!review) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <ReviewHeader
              title={review.title}
              author={review.author}
              date={review.date}
              category={review.category}
              rating={review.rating}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden my-8"
            >
              <img
                src={review.imageUrl}
                alt={review.title}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg max-w-none prose-headings:text-purple-600 prose-a:text-blue-600"
            >
              {review.content.split('\n\n').map((paragraph, index) => {
                // Handle headings
                if (paragraph.startsWith('##')) {
                  return (
                    <motion.h2
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-2xl font-bold mt-8 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                    >
                      {paragraph.replace('##', '').trim()}
                    </motion.h2>
                  );
                }
                
                // Handle bullet points
                if (paragraph.includes('- ')) {
                  return (
                    <motion.ul
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="list-none space-y-3 my-6"
                    >
                      {paragraph.split('\n').map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5" />
                          <span className="text-gray-700">{item.replace('- ', '')}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  );
                }

                // Handle regular paragraphs
                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="my-6 text-gray-700 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-600">Pros</h3>
                <ul className="space-y-2">
                  {review.pros.map((pro, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start space-x-2 text-gray-700"
                    >
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{pro}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-600">Cons</h3>
                <ul className="space-y-2">
                  {review.cons.map((con, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start space-x-2 text-gray-700"
                    >
                      <span className="text-red-500 mt-1">×</span>
                      <span>{con}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </article>
      </main>
    </div>
  );
};

export default ReviewDetail;