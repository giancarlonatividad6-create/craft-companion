import { motion } from "framer-motion";
import { ArrowLeft, Clock, Star, User, Bookmark, Heart, Share2, CheckCircle, Eye, ThumbsUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import StepTracker from "../components/StepTracker";
import { Button } from "../components/ui/button";
import { useProjects } from "../contexts/ProjectContext";
import { useToast } from "../hooks/use-toast";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useProjects();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'materials'>('overview');

  const project = state.projects.find(p => p.id === id);
  
  useEffect(() => {
    if (project) {
      // Increment view count when project is viewed
      dispatch({ type: 'INCREMENT_VIEWS', payload: project.id });
    }
  }, [project, dispatch]);

  if (!project) {
    return (
      <Layout>
        <div className="container-diy pt-12 text-center">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Project not found
          </h2>
          <Button onClick={() => navigate("/")} variant="outline">
            Go Home
          </Button>
        </div>
      </Layout>
    );
  }

  const isSaved = state.savedProjects.includes(project.id);
  const completedSteps = state.completedSteps[project.id] || [];
  const progressPercentage = (completedSteps.length / project.steps.length) * 100;

  const handleSave = () => {
    dispatch({ type: 'TOGGLE_SAVE_PROJECT', payload: project.id });
    toast({
      title: isSaved ? "Removed from saved" : "Saved!",
      description: isSaved ? "Project removed from your saved list" : "Project added to your saved list",
    });
  };

  const handleLike = () => {
    dispatch({ type: 'LIKE_PROJECT', payload: project.id });
    toast({
      title: "Liked!",
      description: "Thanks for your feedback!",
    });
  };

  return (
    <Layout>
      <div className="container-diy">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pt-6 pb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="p-2 bg-card border border-border/50 rounded-radius text-muted-foreground hover:text-primary"
            >
              <ArrowLeft size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-diy p-6 mb-6"
        >
          <div className="relative h-48 rounded-radius overflow-hidden mb-4">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-radius text-sm font-medium">
              {project.difficulty}
            </div>
            {progressPercentage > 0 && (
              <div className="absolute top-3 right-3 px-3 py-1 bg-primary/90 text-primary-foreground backdrop-blur-sm rounded-radius text-sm font-medium">
                {Math.round(progressPercentage)}% Complete
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-card-foreground mb-2">
            {project.title}
          </h1>
          
          <p className="text-muted-foreground mb-4">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-muted-foreground" />
              <span>{project.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={14} fill="currentColor" className="text-primary" />
              <span>{project.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={14} className="text-muted-foreground" />
              <span>{project.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-muted-foreground" />
              <span>{project.views.toLocaleString()} views</span>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-radius border transition-all duration-300 ${
                isSaved 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-card border-border hover:border-primary"
              }`}
            >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
              {isSaved ? "Saved" : "Save"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className="flex-1 flex items-center justify-center gap-2 p-3 rounded-radius border border-border bg-card hover:border-primary"
            >
              <ThumbsUp size={16} />
              <span>{project.likes}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-radius border border-border bg-card hover:border-primary"
            >
              <Share2 size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-1 mb-6 p-1 bg-muted rounded-radius"
        >
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'steps', label: 'Step-by-Step' },
            { id: 'materials', label: 'Materials' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 px-4 py-2 rounded-radius text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-card text-card-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-card-foreground'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="pb-8"
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Project Stats */}
              <div className="card-diy p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-4">
                  Project Stats
                </h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{project.completions}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{project.likes}</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{project.views.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="card-diy p-6">
                <h3 className="font-semibold text-card-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-radius text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'steps' && (
            <StepTracker project={project} />
          )}

          {activeTab === 'materials' && (
            <div className="card-diy p-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-4">
                What You'll Need
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-card-foreground mb-3">Materials</h3>
                  <div className="space-y-2">
                    {project.materials.map((material, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-secondary/10 rounded-radius">
                        <CheckCircle size={16} className="text-secondary-accent" />
                        <span className="text-card-foreground">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-card-foreground mb-3">Tools</h3>
                  <div className="space-y-2">
                    {project.tools.map((tool, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-accent/10 rounded-radius">
                        <CheckCircle size={16} className="text-accent-foreground" />
                        <span className="text-card-foreground">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;