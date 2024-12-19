import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const guides = [
  {
    id: 1,
    title: "Complete Guide to Home Office Setup",
    excerpt: "Everything you need to know about creating the perfect productive workspace at home.",
    category: "Productivity",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "March 16, 2024",
  },
  {
    id: 2,
    title: "Mastering iPhone Photography",
    excerpt: "Pro tips and tricks to take your mobile photography to the next level.",
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: "March 15, 2024",
  },
  {
    id: 3,
    title: "Cybersecurity Essentials",
    excerpt: "A comprehensive guide to protecting your digital life in 2024.",
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
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
            {guides.map((guide) => (
              <Link key={guide.id} to={`/guides/${guide.id}`}>
                <ArticleCard {...guide} />
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Guides;