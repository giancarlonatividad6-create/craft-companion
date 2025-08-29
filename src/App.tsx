import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "./contexts/ProjectContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import AddProject from "./pages/AddProject";
import Community from "./pages/Community";
import ProjectDetail from "./pages/ProjectDetail";
import CategoryPage from "./pages/CategoryPage";
import SavedProjects from "./pages/SavedProjects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProjectProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/community" element={<Community />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/saved" element={<SavedProjects />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProjectProvider>
  </QueryClientProvider>
);

export default App;
