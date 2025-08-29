import { motion } from "framer-motion";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { useState } from "react";
import Layout from "../components/Layout";
import ProjectCard, { Project } from "../components/ProjectCard";
import { Input } from "../components/ui/input";

// Import images
import projectMacrame from "../assets/project-macrame.jpg";
import codingProjects from "../assets/coding-projects.jpg";
import homeFixes from "../assets/home-fixes.jpg";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const projects: Project[] = [
    {
      id: "1",
      title: "Macrame Wall Hanging",
      description: "Create a beautiful boho-style wall decoration using simple macrame knots.",
      image: projectMacrame,
      difficulty: "Easy",
      estimatedTime: "2-3 hours",
      rating: 4.8,
      author: "Sarah M.",
      category: "Arts & Crafts",
    },
    {
      id: "2",
      title: "Smart Garden Monitor",
      description: "Build an Arduino-based system to monitor your plants' soil moisture.",
      image: codingProjects,
      difficulty: "Medium",
      estimatedTime: "4-6 hours",
      rating: 4.6,
      author: "Alex K.",
      category: "Coding Projects",
    },
    {
      id: "3",
      title: "Kitchen Cabinet Repair",
      description: "Fix loose hinges and replace worn cabinet doors with this step-by-step guide.",
      image: homeFixes,
      difficulty: "Medium",
      estimatedTime: "3-4 hours",
      rating: 4.3,
      author: "Mike D.",
      category: "Home Fixes",
    }
  ];

  const categories = ["all", "Arts & Crafts", "Home Fixes", "Coding Projects"];
  const difficulties = ["all", "Easy", "Medium", "Hard"];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || project.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <Layout>
      <div className="container-diy">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pt-6 pb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gradient">
              Search Projects
            </h1>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 border rounded-radius transition-all duration-300 ${
                showFilters 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card border-border/50 text-muted-foreground hover:border-primary"
              }`}
            >
              <Filter size={20} />
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-border/50 rounded-radius"
            />
          </div>
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 card-diy p-4"
          >
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-radius text-sm transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary-accent"
                      }`}
                    >
                      {category === "all" ? "All Categories" : category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Difficulty
                </label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <motion.button
                      key={difficulty}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-4 py-2 rounded-radius text-sm transition-all duration-300 ${
                        selectedDifficulty === difficulty
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary-accent"
                      }`}
                    >
                      {difficulty === "all" ? "All Levels" : difficulty}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="space-y-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <ProjectCard project={project} variant="compact" />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="card-diy p-8">
                <SearchIcon size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  No projects found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Search;