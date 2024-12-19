import { motion } from "framer-motion";

interface RatingItemProps {
  label: string;
  sublabel?: string;
  score: number;
  maxScore?: number;
}

const RatingItem = ({ label, sublabel, score, maxScore = 10 }: RatingItemProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div>
        <div className="font-medium text-foreground">{label}</div>
        {sublabel && <div className="text-sm text-muted-foreground">{sublabel}</div>}
      </div>
      <div className="font-bold text-lg text-foreground">{score}/{maxScore}</div>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <div 
        className="h-full bg-purple-600 rounded-full"
        style={{ width: `${(score / maxScore) * 100}%` }}
      />
    </div>
  </div>
);

interface ReviewQuickTakeProps {
  title: string;
  excerpt: string;
  ratings: {
    overall: number;
    design: number;
    features: number;
    performance: number;
    value: number;
  };
}

export const ReviewQuickTake = ({ title, excerpt, ratings }: ReviewQuickTakeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl p-6 shadow-lg space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Quick Take</h2>
        <p className="text-muted-foreground">{excerpt}</p>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Ratings</h3>
        
        <div className="space-y-6">
          <RatingItem 
            label="Overall" 
            sublabel="Final verdict"
            score={ratings.overall} 
          />
          
          <RatingItem 
            label="Design" 
            sublabel="Build quality & aesthetics"
            score={ratings.design} 
          />
          
          <RatingItem 
            label="Features" 
            sublabel="Functionality & capabilities"
            score={ratings.features} 
          />
          
          <RatingItem 
            label="Performance" 
            sublabel="Speed & reliability"
            score={ratings.performance} 
          />
          
          <RatingItem 
            label="Value" 
            sublabel="Price to performance ratio"
            score={ratings.value} 
          />
        </div>
      </div>
    </motion.div>
  );
};