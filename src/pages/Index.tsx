import { Header } from "@/components/Header";
import { FeaturedArticle } from "@/components/FeaturedArticle";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredArticle = {
    id: 1,
    title: "Complete Guide to Home Office Setup",
    excerpt:
      "Everything you need to know about creating the perfect productive workspace at home.",
    category: "Productivity",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "March 16, 2024",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="mb-12">
          <Link to={`/guides/${featuredArticle.id}`}>
            <FeaturedArticle {...featuredArticle} />
          </Link>
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