import { format } from "date-fns";
import { Facebook, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface ReviewHeroProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
}

export const ReviewHero = ({ title, excerpt, date, author, category }: ReviewHeroProps) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard.",
    });
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  };

  return (
    <div className="bg-[#5600FF] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between text-sm">
            <time>{format(new Date(date), "MMM d, yyyy 'at' h:mm a")}</time>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20"
                onClick={handleCopyLink}
              >
                <Link2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20"
                onClick={handleShareFacebook}
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="uppercase tracking-wider text-sm font-medium">
            {category}
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight">{title}</h1>
            <p className="text-xl text-white/80">{excerpt}</p>
          </div>

          <div className="text-sm">
            By <span className="font-medium">{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};