import { ArticleCard } from "./ArticleCard";

const articles = [
  {
    title: "The Future of AI in Consumer Tech",
    excerpt:
      "Exploring how artificial intelligence is reshaping our daily interactions with technology",
    category: "AI & Tech",
    imageUrl: "/placeholder.svg",
    date: "March 15, 2024",
  },
  {
    title: "Review: Latest MacBook Pro",
    excerpt:
      "A deep dive into Apple's newest professional laptop and its groundbreaking features",
    category: "Reviews",
    imageUrl: "/placeholder.svg",
    date: "March 14, 2024",
  },
  {
    title: "5G Revolution: What to Expect",
    excerpt:
      "Understanding the impact of 5G technology on future connectivity and innovation",
    category: "Networks",
    imageUrl: "/placeholder.svg",
    date: "March 13, 2024",
  },
];

export const ArticleGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <ArticleCard key={index} {...article} />
      ))}
    </div>
  );
};