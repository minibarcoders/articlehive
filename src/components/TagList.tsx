import { Link } from "react-router-dom";

interface TagListProps {
  tags: string[];
  baseUrl: string;
}

export const TagList = ({ tags, baseUrl }: TagListProps) => {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`${baseUrl}?tag=${encodeURIComponent(tag)}`}
          className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
};