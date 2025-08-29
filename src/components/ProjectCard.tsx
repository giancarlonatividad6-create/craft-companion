import { motion } from "framer-motion";
import { Clock, Star, Bookmark, User } from "lucide-react";
import { useState } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedTime: string;
  rating: number;
  author: string;
  category: string;
  saved?: boolean;
}

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  variant?: "default" | "compact";
}

const ProjectCard = ({ project, onClick, variant = "default" }: ProjectCardProps) => {
  const [isSaved, setIsSaved] = useState(project.saved || false);

  const difficultyColors = {
    Easy: "bg-secondary-accent text-secondary-foreground",
    Medium: "bg-accent text-accent-foreground", 
    Hard: "bg-destructive/10 text-destructive border border-destructive/20"
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="card-diy p-4 cursor-pointer"
      >
        <div className="flex gap-3">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-16 h-16 object-cover rounded-radius flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-card-foreground line-clamp-1">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {project.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs px-2 py-1 rounded-sm ${difficultyColors[project.difficulty]}`}>
                {project.difficulty}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star size={12} fill="currentColor" />
                <span>{project.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card-diy overflow-hidden cursor-pointer group"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Save Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleSave}
          className={`absolute top-3 right-3 p-2 rounded-radius backdrop-blur-sm transition-all duration-300 ${
            isSaved 
              ? "bg-primary text-primary-foreground shadow-glow" 
              : "bg-card/80 text-muted-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
        </motion.button>

        {/* Difficulty Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-radius text-xs font-medium backdrop-blur-sm ${difficultyColors[project.difficulty]}`}>
          {project.difficulty}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-1">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Project Meta */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock size={14} />
              <span>{project.estimatedTime}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star size={14} fill="currentColor" />
              <span>{project.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <User size={14} />
            <span>{project.author}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;