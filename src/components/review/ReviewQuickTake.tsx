import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ReviewQuickTakeProps {
  title: string;
  excerpt: string;
  rating: number;
}

export const ReviewQuickTake = ({ title, excerpt, rating }: ReviewQuickTakeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-purple-600">
            Quick Take
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{excerpt}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-bold text-yellow-400">{rating}</span>
            <span className="text-muted-foreground">/ 5</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};