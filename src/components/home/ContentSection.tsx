import { Link } from "react-router-dom";
import { Feed } from "@/components/Feed";

interface ContentSectionProps {
  feedItems: any[];
  popularItems: any[];
}

export const ContentSection = ({ feedItems, popularItems }: ContentSectionProps) => {
  return (
    <section className="relative bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed Column */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Latest Updates</h2>
                <p className="text-foreground/90 dark:text-gray-300">Stay up to date with our latest content</p>
              </div>
            </div>
            
            {feedItems && <Feed items={feedItems} />}
          </div>

          {/* Popular Items Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Popular Reviews</h2>
              <div className="space-y-4">
                {popularItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/reviews/${item.id}`}
                    className="block p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors duration-200"
                  >
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Rating: {item.rating}/5</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};