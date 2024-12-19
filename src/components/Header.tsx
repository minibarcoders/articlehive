import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-[#222222]/90 backdrop-blur-md z-50 border-b border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/b1cc5754-becb-4c0c-a856-8ec74be03deb.png" 
              alt="Fixed Custom Logo" 
              className="h-10 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex space-x-2">
            {[
              { path: "/", label: "Latest" },
              { path: "/reviews", label: "Reviews" },
              { path: "/guides", label: "Guides" },
              { path: "/about", label: "About" },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-200 ${
                  isActiveLink(path)
                    ? "bg-white text-[#222222]"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};