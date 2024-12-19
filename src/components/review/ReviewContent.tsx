import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { TagList } from "../TagList";

interface ReviewContentProps {
  content: string;
  imageUrl?: string;
  tags?: string[];
  excerpt?: string;
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-xl max-w-none prose-headings:text-[#5600FF] prose-a:text-[#5600FF] prose-strong:text-black mt-8"
        >
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="text-xl leading-relaxed text-gray-800 mb-8">
                  {children}
                </p>
              ),
              h2: ({ children }) => (
                <h2 className="text-4xl font-bold mt-12 mb-6 text-[#5600FF]">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-3xl font-bold mt-8 mb-4 text-[#5600FF]">
                  {children}
                </h3>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-[#5600FF] underline decoration-2 hover:text-purple-700 transition-colors"
                >
                  {children}
                </a>
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