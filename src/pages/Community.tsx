import { motion } from "framer-motion";
import { Users, Heart, Star, Share } from "lucide-react";
import Layout from "../components/Layout";
import ProjectCard, { Project } from "../components/ProjectCard";

// Import images
import projectMacrame from "../assets/project-macrame.jpg";
import codingProjects from "../assets/coding-projects.jpg";
import homeFixes from "../assets/home-fixes.jpg";

const Community = () => {
  const communityProjects: Project[] = [
    {
      id: "1",
      title: "Macrame Wall Hanging",
      description: "My first attempt at macrame! Turned out better than expected.",
      image: projectMacrame,
      difficulty: "Easy",
      estimatedTime: "2-3 hours",
      rating: 4.8,
      author: "Sarah M.",
      category: "Arts & Crafts",
      saved: true
    },
    {
      id: "2",
      title: "Smart Garden Monitor",
      description: "Finally finished my plant monitoring system. It works perfectly!",
      image: codingProjects,
      difficulty: "Medium",
      estimatedTime: "4-6 hours",
      rating: 4.6,
      author: "Alex K.",
      category: "Coding Projects",
    },
    {
      id: "3",
      title: "Kitchen Cabinet Makeover",
      description: "Gave my old cabinets a fresh new look with some paint and new hardware.",
      image: homeFixes,
      difficulty: "Medium",
      estimatedTime: "6-8 hours",
      rating: 4.5,
      author: "Mike D.",
      category: "Home Fixes",
    }
  ];

  return (
    <Layout>
      <div className="container-diy">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pt-6 pb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users size={24} className="text-primary" />
            <h1 className="text-2xl font-bold text-gradient">
              Community
            </h1>
          </div>
          <p className="text-muted-foreground">
            See what amazing projects our community is creating
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="card-diy p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">1,247</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="card-diy p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">456</div>
            <div className="text-sm text-muted-foreground">Makers</div>
          </div>
          <div className="card-diy p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">89%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Recent Projects</h2>
          </div>

          <div className="space-y-4">
            {communityProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                <ProjectCard project={project} />
                
                {/* Community Actions */}
                <div className="absolute top-4 right-16 flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-card/90 backdrop-blur-sm rounded-radius text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Heart size={16} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-card/90 backdrop-blur-sm rounded-radius text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Share size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-hero p-6 text-center mb-8"
        >
          <Users size={32} className="text-primary mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            Join Our Community
          </h3>
          <p className="text-muted-foreground mb-4">
            Share your projects, get inspired, and help others with their DIY journey
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-diy"
          >
            Share Your Project
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Community;