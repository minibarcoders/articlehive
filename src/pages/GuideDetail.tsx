import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { CategoryPill } from "@/components/CategoryPill";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";

const fetchGuide = async (id: string) => {
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

const GuideDetail = () => {
  const { id } = useParams();
  const { data: guide, isLoading, error } = useQuery({
    queryKey: ["guide", id],
    queryFn: () => fetchGuide(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-gray-200 rounded-xl" />
            <div className="h-8 bg-gray-200 w-1/3 rounded" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 w-full rounded" />
              <div className="h-4 bg-gray-200 w-5/6 rounded" />
              <div className="h-4 bg-gray-200 w-4/6 rounded" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-600">Guide not found</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="space-y-4 mb-8">
              <CategoryPill name={guide.category} />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {guide.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <span>{guide.author}</span>
                <span>•</span>
                <time>{new Date(guide.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</time>
                <span>•</span>
                <span>{guide.read_time}</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden mb-8"
            >
              <img
                src={guide.image_url || "https://via.placeholder.com/1200x600"}
                alt={guide.title}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg max-w-none prose-headings:text-purple-600 prose-a:text-blue-600"
            >
              {guide.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <motion.h2
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-2xl font-bold mt-8 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                    >
                      {paragraph.replace('##', '').trim()}
                    </motion.h2>
                  );
                }
                
                if (paragraph.includes('- ')) {
                  return (
                    <motion.ul
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="list-none space-y-3 my-6"
                    >
                      {paragraph.split('\n').map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mt-2.5" />
                          <span className="text-gray-700">{item.replace('- ', '')}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  );
                }

                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="my-6 text-gray-700 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                );
              })}
            </motion.div>
          </motion.div>
        </article>
      </main>
    </div>
  );
};

export default GuideDetail;