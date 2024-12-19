import { CategoryPill } from "./CategoryPill";
import { motion } from "framer-motion";

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
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="flex items-center gap-4 text-gray-600">
        <span>By {author}</span>
        <span>•</span>
        <time>{date}</time>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">{rating}</span>
        <span className="text-gray-600">/ 5</span>
      </div>
    </motion.div>
  );
};