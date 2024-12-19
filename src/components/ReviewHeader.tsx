import { CategoryPill } from "./CategoryPill";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface ReviewHeaderProps {
  title: string;
  author: string;
  date: string;
  category: string;
  rating: number;
}

export const ReviewHeader = ({ title, author, date, category, rating }: ReviewHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <CategoryPill name={category} />
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <div className="flex items-center gap-4 text-gray-600">
        <span>{author}</span>
        <span>•</span>
        <time>{date}</time>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i < Math.floor(rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-2xl font-bold text-yellow-400">{rating}</span>
        <span className="text-gray-600">/ 5</span>
      </div>
    </motion.div>
  );
};