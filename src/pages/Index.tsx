import { Header } from "@/components/Header";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleGrid } from "@/components/ArticleGrid";

const Index = () => {
  const featuredArticle = {
    title: "The Evolution of Quantum Computing",
    excerpt:
      "A comprehensive look at how quantum computing is transforming the technology landscape and what it means for the future of computing.",
    category: "Emerging Tech",
    imageUrl: "/placeholder.svg",
    date: "March 16, 2024",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="mb-12">
          <FeaturedArticle {...featuredArticle} />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          <ArticleGrid />
        </section>
      </main>
    </div>
  );
};

export default Index;