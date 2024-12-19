import { motion } from "framer-motion";
import { CategoryPill } from "./CategoryPill";
import { Link } from "react-router-dom";
import type { Article } from "./ArticleGrid";

export const ArticleCard = ({
  id,
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
        className="group cursor-pointer bg-card rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      >
        <div className="relative overflow-hidden aspect-[16/9]">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <CategoryPill name={category} />
            <span className="text-sm text-muted-foreground">{readTime}</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold leading-tight text-foreground group-hover:text-purple-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-foreground dark:text-gray-300 line-clamp-2">{excerpt}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{author}</span>
            <span>•</span>
            <time>{date}</time>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};