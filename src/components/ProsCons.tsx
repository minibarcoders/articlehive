import { motion } from "framer-motion";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export const ProsCons = ({ pros, cons }: ProsConsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-green-600">Pros</h2>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-600">✓</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Cons</h2>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-red-600">✗</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};