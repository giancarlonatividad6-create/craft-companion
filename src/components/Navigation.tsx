import { motion } from "framer-motion";
import { Home, Search, Plus, Users, Heart } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Plus, label: "Add", path: "/add-project" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: Heart, label: "Saved", path: "/saved" },
  ];

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 z-50"
    >
      <div className="container-diy py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center py-2 px-3 transition-all duration-300"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-radius transition-all duration-300 ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-glow" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                  }`}
                >
                  <Icon size={20} />
                </motion.div>
                
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.7, 
                    y: 0,
                    scale: isActive ? 1.05 : 1
                  }}
                  className={`text-xs mt-1 font-medium transition-all duration-300 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </motion.span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 w-1 h-1 bg-primary rounded-full transform -translate-x-1/2"
                  />
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;