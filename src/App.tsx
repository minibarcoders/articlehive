import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Reviews from "./pages/Reviews";
import ReviewDetail from "./pages/ReviewDetail";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import About from "./pages/About";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark">
      <TooltipProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/reviews/:id" element={<ReviewDetail />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:id" element={<GuideDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;