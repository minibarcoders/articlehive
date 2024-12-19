import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { CategoryPill } from "@/components/CategoryPill";

const guides = {
  1: {
    title: "Complete Guide to Home Office Setup",
    content: `
      Setting up the perfect home office is crucial for productivity and comfort. Here's a comprehensive guide to help you create an optimal workspace.

      ## Essential Equipment
      - A height-adjustable desk for ergonomic comfort
      - An ergonomic chair with proper lumbar support
      - External monitor(s) for expanded screen real estate
      - Quality webcam and microphone for virtual meetings

      ## Lighting Considerations
      Natural light is ideal for your workspace. Position your desk near a window, but avoid direct glare on your screens. Supplement with adjustable task lighting for darker hours.

      ## Ergonomic Setup
      - Monitor at arm's length, top of screen at eye level
      - Keyboard and mouse at elbow height
      - Feet flat on floor or footrest
      - Chair supporting lower back

      ## Technology Requirements
      - Reliable high-speed internet connection
      - UPS for power backup
      - Proper cable management system
      - Adequate power outlets and surge protection
    `,
    category: "Productivity",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "March 16, 2024",
    author: "Alex Chen",
    readTime: "15 min read"
  },
  2: {
    title: "Mastering iPhone Photography",
    content: `
      Your iPhone is a powerful camera capable of stunning photography. Here's how to make the most of it.

      ## Basic Camera Settings
      - HDR: Enable Smart HDR for better dynamic range
      - Grid: Turn on the grid for better composition
      - Formats: Choose between High Efficiency and Most Compatible

      ## Composition Techniques
      - Rule of Thirds: Place key elements along grid lines
      - Leading Lines: Use natural lines to guide viewer's eye
      - Symmetry: Create balanced, eye-catching images
      - Framing: Use natural frames to highlight subjects

      ## Advanced Features
      - Portrait Mode: Create professional-looking depth effects
      - Night Mode: Capture clear photos in low light
      - ProRAW: Maximum editing flexibility (iPhone 12 Pro and newer)

      ## Post-Processing
      Learn to use the built-in editing tools for:
      - Exposure adjustment
      - Color correction
      - Cropping and straightening
      - Selective adjustments
    `,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: "March 15, 2024",
    author: "Sarah Wong",
    readTime: "12 min read"
  },
  3: {
    title: "Cybersecurity Essentials",
    content: `
      Protect your digital life with these essential cybersecurity practices.

      ## Password Management
      - Use unique, complex passwords for each account
      - Implement a password manager
      - Enable two-factor authentication wherever possible

      ## Network Security
      - Secure your home Wi-Fi with WPA3 encryption
      - Use a VPN when on public networks
      - Regularly update router firmware

      ## Device Protection
      - Keep software and operating systems updated
      - Install reputable antivirus software
      - Enable device encryption
      - Regular data backups

      ## Safe Browsing Habits
      - Verify website security (HTTPS)
      - Be cautious with downloads
      - Recognize phishing attempts
      - Use private browsing when necessary
    `,
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    date: "March 14, 2024",
    author: "Michael Torres",
    readTime: "10 min read"
  }
} as const;

const GuideDetail = () => {
  const { id } = useParams();
  const guide = id ? guides[Number(id) as keyof typeof guides] : null;

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Guide not found</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <article className="max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <CategoryPill name={guide.category} />
              <h1 className="text-4xl font-bold">{guide.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <span>{guide.author}</span>
                <span>•</span>
                <time>{guide.date}</time>
                <span>•</span>
                <span>{guide.readTime}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="aspect-video rounded-lg overflow-hidden"
          >
            <img
              src={guide.imageUrl}
              alt={guide.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            {guide.content.split('\n\n').map((paragraph, index) => (
              <div key={index}>
                {paragraph.startsWith('##') ? (
                  <h2 className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.replace('##', '').trim()}
                  </h2>
                ) : paragraph.includes('- ') ? (
                  <ul className="list-disc pl-6 my-4">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="my-2">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="my-4">{paragraph}</p>
                )}
              </div>
            ))}
          </motion.div>
        </article>
      </main>
    </div>
  );
};

export default GuideDetail;