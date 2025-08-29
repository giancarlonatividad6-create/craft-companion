import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Filter } from "lucide-react";
import { useState } from "react";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../contexts/ProjectContext";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { state } = useProjects();
  const [sortBy, setSortBy] = useState("popular");

  const categoryMap: Record<string, string> = {
    'crafts': 'Arts & Crafts',
    'home-fixes': 'Home Fixes',
    'coding': 'Coding Projects'
  };

  const categoryName = categoryMap[category || ''] || 'Unknown Category';
  
  const filteredProjects = state.projects
    .filter(project => project.category === categoryName)
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.views - a.views;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'easiest':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - 
                 difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
        default:
          return 0;
      }
    });

  const getCategoryDescription = (cat: string) => {
    switch (cat) {
      case 'Arts & Crafts':
        return 'Creative projects for artistic expression and home decoration';
      case 'Home Fixes':
        return 'Practical solutions for common household repairs and improvements';
      case 'Coding Projects':
        return 'Tech projects to build your programming skills and create useful tools';
      default:
        return 'Discover amazing DIY projects in this category';
    }
  };

  return (
    <Layout>
      <div className="container-diy">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pt-6 pb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="p-2 rounded-radius bg-card border border-border/50 text-muted-foreground hover:text-primary"
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                {categoryName}
              </h1>
              <p className="text-muted-foreground text-sm">
                {getCategoryDescription(categoryName)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </p>
            
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-card border border-border/50 rounded-radius px-3 py-1 text-foreground"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="easiest">Easiest First</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid gap-4 pb-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <ProjectCard 
                project={project} 
                onClick={() => navigate(`/project/${project.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="card-diy p-8">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                No projects yet
              </h3>
              <p className="text-muted-foreground">
                Be the first to add a project in this category!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;