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
          className="prose prose-xl max-w-none prose-headings:text-[#7F00FF] prose-a:text-[#5600FF] prose-strong:text-white prose-p:text-gray-300"
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
              p: ({ children }) => (
                <p className="text-xl leading-relaxed text-gray-300 mb-8">
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
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 space-y-2 text-gray-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-300">
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