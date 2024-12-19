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
    <div className="bg-[#5600FF] bg-gradient-to-br from-[#5600FF] to-[#7F00FF] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between text-sm">
            <time className="text-white/90">{format(new Date(date), "MMM d, yyyy 'at' h:mm a")}</time>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 text-white"
                onClick={handleCopyLink}
              >
                <Link2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 text-white"
                onClick={handleShareFacebook}
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20 text-white">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="uppercase tracking-wider text-sm font-medium text-white/90 bg-white/10 w-fit px-4 py-1 rounded-full">
            {category}
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight text-white">{title}</h1>
            <blockquote className="text-2xl font-serif italic text-white/90 border-l-4 border-white/30 pl-6">
              "{excerpt}"
            </blockquote>
          </div>

          <div className="text-sm text-white/90">
            By <span className="font-medium text-white">{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};