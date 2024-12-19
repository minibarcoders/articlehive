import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { motion } from "framer-motion";

const guides = [
  {
    title: "Complete Guide to Home Office Setup",
    excerpt: "Everything you need to know about creating the perfect productive workspace at home.",
    category: "Productivity",
    imageUrl: "/placeholder.svg",
    date: "March 16, 2024",
  },
  {
    title: "Mastering iPhone Photography",
    excerpt: "Pro tips and tricks to take your mobile photography to the next level.",
    category: "Photography",
    imageUrl: "/placeholder.svg",
    date: "March 15, 2024",
  },
  {
    title: "Cybersecurity Essentials",
    excerpt: "A comprehensive guide to protecting your digital life in 2024.",
    category: "Security",
    imageUrl: "/placeholder.svg",
    date: "March 14, 2024",
  },
];

const Guides = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Tech Guides</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <ArticleCard key={index} {...guide} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Guides;