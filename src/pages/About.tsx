import { Header } from "@/components/Header";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-card rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            About FixedorCustom
          </h1>
          <div className="prose prose-lg">
            <p className="text-foreground dark:text-gray-300 mb-6">
              Welcome to FixedorCustom, your trusted source for in-depth technology reviews, guides, and insights. Our team of experts is dedicated to bringing you the most comprehensive and unbiased coverage of the latest tech products and trends.
            </p>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Our Mission
            </h2>
            <p className="text-foreground dark:text-gray-300 mb-6">
              We believe that technology should enhance people's lives. Our mission is to help you make informed decisions about the tech products and services you use, through thorough testing, detailed analysis, and clear, honest reporting.
            </p>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Our Team
            </h2>
            <p className="text-foreground dark:text-gray-300 mb-6">
              Our writers and reviewers bring years of tech industry experience to every article. We're passionate about technology and committed to helping our readers stay informed about the latest developments in the tech world.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default About;