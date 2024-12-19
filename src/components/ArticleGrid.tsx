import { ArticleCard } from "./ArticleCard";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 2,
    title: "Mastering iPhone Photography",
    excerpt:
      "Pro tips and tricks to take your mobile photography to the next level.",
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: "March 15, 2024",
  },
  {
    id: 3,
    title: "Cybersecurity Essentials",
    excerpt:
      "A comprehensive guide to protecting your digital life in 2024.",
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    date: "March 14, 2024",
  },
  {
    id: 1,
    title: "The Future of AI in Consumer Tech",
    excerpt:
      "Exploring how artificial intelligence is reshaping our daily interactions with technology",
    category: "AI & Tech",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    date: "March 13, 2024",
  },
];

export const ArticleGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Link key={article.id} to={`/guides/${article.id}`}>
          <ArticleCard {...article} />
        </Link>
      ))}
    </div>
  );
};