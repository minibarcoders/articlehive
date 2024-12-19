import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CategoryPill } from "./CategoryPill";
import { MessageSquare, Star, BookOpen } from "lucide-react";

interface FeedItem {
  id: string;
  type: 'review' | 'guide' | 'post';
  title: string;
  content: string;
  category?: string;
  rating?: number;
  author: string;
  date: string;
  imageUrl?: string;
}

export const Feed = ({ items }: { items: FeedItem[] }) => {
  const getIcon = (type: FeedItem['type']) => {
    switch (type) {
      case 'review':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'guide':
        return <BookOpen className="w-5 h-5 text-purple-500" />;
      case 'post':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gradient-to-br from-background via-background to-accent/10 dark:from-gray-900 dark:via-gray-900/95 dark:to-purple-900/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border/5"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">{getIcon(item.type)}</div>
            <div className="flex-grow space-y-3">
              <div className="flex items-center gap-3">
                {item.category && <CategoryPill name={item.category} />}
                <span className="text-sm text-muted-foreground">{item.author}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <time className="text-sm text-muted-foreground">{item.date}</time>
              </div>
              
              {item.type === 'post' ? (
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-foreground/90 dark:text-gray-300 mt-2">
                    {item.content}
                  </p>
                </div>
              ) : (
                <Link to={`/${item.type}s/${item.id}`} className="block group">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-foreground/90 dark:text-gray-300 mt-2 line-clamp-2">
                    {item.content}
                  </p>
                </Link>
              )}

              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="rounded-lg mt-4 w-full h-48 object-cover"
                />
              )}

              {item.type === 'review' && item.rating && (
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.rating!)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {item.rating} / 5
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};