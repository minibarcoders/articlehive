import { motion } from "framer-motion";
import { Star, Check, X } from "lucide-react";
import { CategoryPill } from "./CategoryPill";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

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
  price?: string;
  pros?: string[];
  cons?: string[];
  authorTitle?: string;
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
  price,
  pros = [],
  cons = [],
  authorTitle = "Senior Tech Reviewer",
}: ReviewCardProps) => {
  return (
    <Link to={`/reviews/${id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group cursor-pointer bg-white rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500/50 transition-all duration-300"
      >
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-black/80 rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-medium">{rating}/5</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <time>{date}</time>
            <span>•</span>
            <span>{readTime}</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 line-clamp-2">{excerpt}</p>
          </div>

          <div className="space-y-2">
            {pros[0] && (
              <div className="flex items-center gap-2 text-gray-700">
                <Check className="w-4 h-4 text-green-500" />
                <span className="line-clamp-1">{pros[0]}</span>
              </div>
            )}
            {cons[0] && (
              <div className="flex items-center gap-2 text-gray-700">
                <X className="w-4 h-4 text-red-500" />
                <span className="line-clamp-1">{cons[0]}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-700 font-medium">{author[0]}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-900 font-medium">{author}</span>
                <span className="text-sm text-gray-500">{authorTitle}</span>
              </div>
            </div>
            {price && (
              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-bold">${price}</span>
                <Button 
                  variant="secondary"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  Check Price
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
};