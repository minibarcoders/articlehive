import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  className?: string;
}

export const CategoryPill = ({ name, className }: CategoryPillProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 transition-all hover:bg-gray-200",
        className
      )}
    >
      {name}
    </span>
  );
};