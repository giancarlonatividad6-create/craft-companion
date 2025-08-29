import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  projectCount: number;
  onClick?: () => void;
}

const CategoryCard = ({ 
  title, 
  description, 
  icon: Icon, 
  image, 
  projectCount,
  onClick 
}: CategoryCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card-diy overflow-hidden cursor-pointer group"
    >
      <div className="relative h-32 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Icon */}
        <div className="absolute top-3 left-3 p-2 bg-card/90 backdrop-blur-sm rounded-radius shadow-soft">
          <Icon size={20} className="text-primary" />
        </div>

        {/* Project Count */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-card/90 backdrop-blur-sm rounded-sm text-xs font-medium text-card-foreground">
          {projectCount} projects
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-card-foreground mb-1">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        
        <motion.div 
          className="mt-3 text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
          whileHover={{ x: 2 }}
        >
          Explore projects →
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;