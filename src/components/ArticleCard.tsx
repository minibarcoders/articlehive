import { motion } from "framer-motion";
import { CategoryPill } from "./CategoryPill";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
}

export const ArticleCard = ({
  title,
  excerpt,
  category,
  imageUrl,
  date,
}: ArticleCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg aspect-[16/9] mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2">
        <CategoryPill name={category} />
        <h3 className="text-xl font-semibold leading-tight group-hover:text-gray-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 line-clamp-2">{excerpt}</p>
        <time className="text-sm text-gray-500">{date}</time>
      </div>
    </motion.article>
  );
};