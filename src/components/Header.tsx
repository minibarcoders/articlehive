import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            TechReview
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                location.pathname === "/" ? "text-gray-900 font-medium" : ""
              }`}
            >
              Latest
            </Link>
            <Link
              to="/reviews"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                location.pathname === "/reviews" ? "text-gray-900 font-medium" : ""
              }`}
            >
              Reviews
            </Link>
            <Link
              to="/guides"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                location.pathname === "/guides" ? "text-gray-900 font-medium" : ""
              }`}
            >
              Guides
            </Link>
            <Link
              to="/about"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                location.pathname === "/about" ? "text-gray-900 font-medium" : ""
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};