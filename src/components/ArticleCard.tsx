import { motion } from "framer-motion";
import { CategoryPill } from "./CategoryPill";
import { Link } from "react-router-dom";
import type { Article } from "./ArticleGrid";

export const ArticleCard = ({
  title,
  excerpt,
  category,
  imageUrl,
  date,
  author,
  readTime,
  href,
}: Article) => {
  return (
    <Link to={href}>
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
          <div className="flex items-center gap-4">
            <CategoryPill name={category} />
            <span className="text-sm text-gray-500">{readTime}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight group-hover:text-purple-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 line-clamp-2">{excerpt}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{author}</span>
            <span>•</span>
            <time>{date}</time>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};