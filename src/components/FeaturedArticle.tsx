import { motion } from "framer-motion";
import { CategoryPill } from "./CategoryPill";
import { Link } from "react-router-dom";

export interface FeaturedArticleProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
  author: string;
  readTime: string;
  href: string;
}

export const FeaturedArticle = ({
  title,
  excerpt,
  category,
  imageUrl,
  date,
  author,
  readTime,
  href
}: FeaturedArticleProps) => {
  return (
    <Link to={href}>
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      >
        <div className="relative aspect-[21/9] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <CategoryPill name={category} className="bg-white/20 text-white" />
            <span className="text-sm text-sky-100">{readTime}</span>
          </div>
          <h2 className="text-4xl font-bold mb-3 transform transition-all duration-300 group-hover:translate-x-2 group-hover:text-sky-100">
            {title}
          </h2>
          <p className="text-lg text-sky-100 mb-3 line-clamp-2 max-w-3xl transform transition-all duration-300 group-hover:translate-x-2">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 text-sm text-sky-200 transform transition-all duration-300 group-hover:translate-x-2">
            <span>{author}</span>
            <span>•</span>
            <time>{date}</time>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};