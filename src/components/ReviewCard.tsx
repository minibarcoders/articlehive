import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { CategoryPill } from "./CategoryPill";
import { Link } from "react-router-dom";

interface ReviewCardProps {
  id?: number;
  title: string;
  excerpt: string;
  category: string;
  rating: number;
  imageUrl: string;
  date: string;
  author: string;
  readTime: string;
}

export const ReviewCard = ({
  id = 1,
  title,
  excerpt,
  category,
  rating,
  imageUrl,
  date,
  author,
  readTime,
}: ReviewCardProps) => {
  return (
    <Link to={`/reviews/${id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      >
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <CategoryPill name={category} />
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900">{rating}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight group-hover:text-purple-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 line-clamp-2">{excerpt}</p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span>{author}</span>
              <span>•</span>
              <time>{date}</time>
            </div>
            <span>{readTime}</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};