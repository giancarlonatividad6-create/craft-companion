import { motion } from "framer-motion";
import { Palette, Wrench, Code, Search, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import CategoryCard from "../components/CategoryCard";
import ProjectCard, { Project } from "../components/ProjectCard";

// Import images
import heroCrafts from "../assets/hero-crafts.jpg";
import homeFixes from "../assets/home-fixes.jpg";
import codingProjects from "../assets/coding-projects.jpg";
import projectMacrame from "../assets/project-macrame.jpg";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "crafts",
      title: "Arts & Crafts",
      description: "Creative projects for all skill levels. From painting to jewelry making.",
      icon: Palette,
      image: heroCrafts,
      projectCount: 127
    },
    {
      id: "home-fixes",
      title: "Home Fixes",
      description: "Practical solutions for everyday household problems and improvements.",
      icon: Wrench,
      image: homeFixes,
      projectCount: 89
    },
    {
      id: "coding",
      title: "Coding Projects",
      description: "Learn programming through fun, hands-on projects and tutorials.",
      icon: Code,
      image: codingProjects,
      projectCount: 156
    }
  ];

  const featuredProjects: Project[] = [
    {
      id: "1",
      title: "Macrame Wall Hanging",
      description: "Create a beautiful boho-style wall decoration using simple macrame knots. Perfect for beginners!",
      image: projectMacrame,
      difficulty: "Easy",
      estimatedTime: "2-3 hours",
      rating: 4.8,
      author: "Sarah M.",
      category: "Arts & Crafts",
      saved: false
    },
    {
      id: "2", 
      title: "Smart Garden Monitor",
      description: "Build an Arduino-based system to monitor your plants' soil moisture and light levels.",
      image: codingProjects,
      difficulty: "Medium",
      estimatedTime: "4-6 hours",
      rating: 4.6,
      author: "Alex K.",
      category: "Coding Projects",
      saved: true
    }
  ];


  return (
    <Layout>
      <div className="container-diy">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="pt-6 pb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                DIY Projects
              </h1>
              <p className="text-muted-foreground">
                Discover, create, and share amazing projects
              </p>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/search")}
              className="p-3 bg-card border border-border/50 rounded-radius shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <Search size={20} className="text-primary" />
            </motion.button>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Palette size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Categories</h2>
          </div>
          
          <div className="space-y-4">
            {categories.map((category, index) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <CategoryCard
                  {...category}
                  onClick={() => navigate(`/category/${category.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Trending Projects</h2>
          </div>
          
          <div className="space-y-4">
            {featuredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => navigate(`/project/${project.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-8"
        >
          <div className="card-hero p-6 text-center">
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              Ready to create something amazing?
            </h3>
            <p className="text-muted-foreground mb-4">
              Share your own DIY project with the community
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/add-project")}
              className="btn-diy"
            >
              Add Your Project
            </motion.button>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default Home;