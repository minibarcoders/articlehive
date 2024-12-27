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
        return <BookOpen className="w-5 h-5 text-sky-500" />;
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
          className="group bg-gradient-to-br from-background via-background to-accent/10 dark:from-gray-900 dark:via-gray-900/95 dark:to-sky-900/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border/5 transform hover:-translate-y-1 hover:scale-[1.01]"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110">
              {getIcon(item.type)}
            </div>
            <div className="flex-grow space-y-3">
              <div className="flex items-center gap-3">
                {item.category && <CategoryPill name={item.category} />}
                <span className="text-sm text-muted-foreground">{item.author}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <time className="text-sm text-muted-foreground">{item.date}</time>
              </div>
              
              {item.type === 'post' ? (
                <div>
                  <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {item.title}
                  </h3>
                  <p className="text-foreground/90 dark:text-gray-300 mt-2">
                    {item.content}
                  </p>
                </div>
              ) : (
                <Link to={`/${item.type}s/${item.id}`} className="block">
                  <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                    {item.title}
                  </h3>
                  <p className="text-foreground/90 dark:text-gray-300 mt-2 line-clamp-2">
                    {item.content}
                  </p>
                </Link>
              )}

              {item.imageUrl && (
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="rounded-lg mt-4 w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {item.type === 'review' && item.rating && (
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-colors duration-300 ${
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