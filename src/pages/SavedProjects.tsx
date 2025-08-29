import { motion } from "framer-motion";
import { Bookmark, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../contexts/ProjectContext";

const SavedProjects = () => {
  const navigate = useNavigate();
  const { state } = useProjects();
  
  const savedProjects = state.projects.filter(project => 
    state.savedProjects.includes(project.id)
  );

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
            <div className="p-2 bg-primary/10 rounded-radius">
              <Bookmark size={20} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">
              Saved Projects
            </h1>
          </div>
          <p className="text-muted-foreground">
            Your bookmarked DIY projects
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="card-diy p-4 text-center">
            <div className="text-2xl font-bold text-primary">{savedProjects.length}</div>
            <div className="text-sm text-muted-foreground">Saved Projects</div>
          </div>
          <div className="card-diy p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {Object.keys(state.completedSteps).length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {savedProjects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4 pb-8"
          >
            {savedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <ProjectCard 
                  project={{ ...project, saved: true }}
                  onClick={() => navigate(`/project/${project.id}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="card-diy p-8">
              <Heart size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                No saved projects yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start saving projects you'd like to try later!
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                className="btn-diy"
              >
                Explore Projects
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default SavedProjects;