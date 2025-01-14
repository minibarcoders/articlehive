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
        <div className="max-w-4xl mx-auto">
          <div>
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold text-primary mb-4">Latest Updates</h2>
                <p className="text-xl text-foreground/90 dark:text-gray-300">Stay up to date with our latest content</p>
              </div>
            </div>
            
            {feedItems && <Feed items={feedItems} />}
          </div>
        </div>
      </div>
    </section>
  );
};