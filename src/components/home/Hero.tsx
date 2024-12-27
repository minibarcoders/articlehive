import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Your Trusted Source
          <br />
          for Tech Reviews
        </h1>
        <p className="text-xl text-foreground dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          In-depth reviews, expert analysis, and the latest insights on technology products that matter to you.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/reviews">
            <Button size="lg">Browse Reviews</Button>
          </Link>
          <Link to="/guides">
            <Button size="lg" variant="outline">
              Read Our Guides
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};