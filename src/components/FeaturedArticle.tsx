import { motion } from "framer-motion";
import { CategoryPill } from "./CategoryPill";

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
}

export const FeaturedArticle = ({
  title,
  excerpt,
  category,
  imageUrl,
  date,
}: FeaturedArticleProps) => {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative group cursor-pointer overflow-hidden rounded-xl"
    >
      <div className="relative aspect-[21/9] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <CategoryPill name={category} className="bg-white/20 text-white mb-3" />
        <h2 className="text-3xl font-bold mb-2 group-hover:text-gray-200 transition-colors">
          {title}
        </h2>
        <p className="text-gray-200 mb-2 line-clamp-2">{excerpt}</p>
        <time className="text-sm text-gray-300">{date}</time>
      </div>
    </motion.article>
  );
};