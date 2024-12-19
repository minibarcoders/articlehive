import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { TagList } from "../TagList";
import { TableOfContents } from "./TableOfContents";

interface ReviewContentProps {
  content: string;
  imageUrl?: string;
  tags?: string[];
}

export const ReviewContent = ({ content, imageUrl, tags = [] }: ReviewContentProps) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl overflow-hidden mb-12"
          >
            <img
              src={imageUrl}
              alt="Review featured image"
              className="w-full aspect-video object-cover"
            />
          </motion.div>
        )}

        <TagList tags={tags} baseUrl="/reviews" />

        <TableOfContents content={content} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-xl max-w-none prose-headings:text-[#7F00FF] prose-a:text-[#5600FF] prose-strong:text-foreground prose-p:text-foreground dark:prose-p:text-gray-300"
        >
          <ReactMarkdown
            components={{
              h2: ({ children }) => {
                const id = children
                  .toString()
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-');
                return (
                  <h2 id={id} className="text-4xl font-bold mt-12 mb-6 text-[#7F00FF] scroll-mt-24">
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const id = children
                  .toString()
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-');
                return (
                  <h3 id={id} className="text-3xl font-bold mt-8 mb-4 text-[#7F00FF] scroll-mt-24">
                    {children}
                  </h3>
                );
              },
              blockquote: ({ children }) => {
                const text = children.toString();
                if (text.toLowerCase().includes('verdict')) {
                  return (
                    <motion.blockquote
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="my-8 p-6 bg-gradient-to-br from-purple-600/10 to-blue-600/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-xl border-l-4 border-purple-600 dark:border-purple-400 shadow-lg backdrop-blur-sm"
                    >
                      <div className="font-serif italic text-2xl leading-relaxed text-foreground dark:text-gray-200">
                        {children}
                      </div>
                    </motion.blockquote>
                  );
                }
                return (
                  <blockquote className="border-l-4 border-gray-300 pl-4 italic">
                    {children}
                  </blockquote>
                );
              },
              p: ({ children }) => (
                <p className="text-xl leading-relaxed text-foreground dark:text-gray-300 mb-8">
                  {children}
                </p>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-[#5600FF] underline decoration-2 hover:text-[#7F00FF] transition-colors"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 space-y-2 text-foreground dark:text-gray-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 space-y-2 text-foreground dark:text-gray-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-foreground dark:text-gray-300">
                  {children}
                </li>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </motion.div>
      </div>
    </div>
  );
};