import { motion } from "framer-motion";
import { ArrowLeft, Clock, Star, User, Bookmark, Share, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";

// Import images
import projectMacrame from "../assets/project-macrame.jpg";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Mock project data
  const project = {
    id: "1",
    title: "Macrame Wall Hanging",
    description: "Create a beautiful boho-style wall decoration using simple macrame knots. This project is perfect for beginners and can be completed in a weekend. You'll learn basic macrame techniques while creating something beautiful for your home.",
    image: projectMacrame,
    difficulty: "Easy",
    estimatedTime: "2-3 hours",
    rating: 4.8,
    author: "Sarah M.",
    category: "Arts & Crafts",
    supplies: [
      "3mm cotton rope (50 feet)",
      "Wooden dowel (12 inches)",
      "Scissors",
      "Measuring tape",
      "Comb for fringing"
    ],
    steps: [
      {
        id: 1,
        title: "Prepare Your Materials",
        description: "Cut 8 pieces of rope, each 6 feet long. You'll also need one 2-foot piece for the hanging loop.",
        image: projectMacrame,
        estimatedTime: "10 minutes"
      },
      {
        id: 2,
        title: "Create the Hanging Loop",
        description: "Fold the 2-foot piece in half and tie it around the center of your dowel. This will be your hanging loop.",
        image: projectMacrame,
        estimatedTime: "5 minutes"
      },
      {
        id: 3,
        title: "Attach the Main Cords",
        description: "Fold each 6-foot cord in half and attach to the dowel using a lark's head knot. You should now have 16 working cords.",
        image: projectMacrame,
        estimatedTime: "15 minutes"
      },
      {
        id: 4,
        title: "Create the First Row of Knots",
        description: "Work from left to right, creating square knots with groups of 4 cords. You'll make 4 square knots total.",
        image: projectMacrame,
        estimatedTime: "20 minutes"
      },
      {
        id: 5,
        title: "Add the Diamond Pattern",
        description: "Leave 2 inches of space, then create another row of square knots, offsetting them to create a diamond pattern.",
        image: projectMacrame,
        estimatedTime: "25 minutes"
      },
      {
        id: 6,
        title: "Finish and Trim",
        description: "Create the fringe by combing out the ends of each cord, then trim to your desired length for a clean finish.",
        image: projectMacrame,
        estimatedTime: "15 minutes"
      }
    ]
  };

  const difficultyColors = {
    Easy: "bg-secondary-accent text-secondary-foreground",
    Medium: "bg-accent text-accent-foreground",
    Hard: "bg-destructive/10 text-destructive border border-destructive/20"
  };

  const toggleStepComplete = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter(step => step !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const nextStep = () => {
    if (currentStep < project.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Layout showNavigation={false}>
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
              onClick={() => navigate(-1)}
              className="p-2 bg-card border border-border/50 rounded-radius"
            >
              <ArrowLeft size={20} />
            </motion.button>
            
            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-card border border-border/50 rounded-radius"
              >
                <Share size={20} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-card border border-border/50 rounded-radius"
              >
                <Bookmark size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-56 object-cover rounded-radius-lg mb-4"
          />
          
          <div className="card-diy p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-radius text-sm font-medium ${difficultyColors[project.difficulty]}`}>
                {project.difficulty}
              </span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock size={14} />
                <span>{project.estimatedTime}</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-card-foreground mb-2">
              {project.title}
            </h1>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star size={14} fill="currentColor" />
                  <span>{project.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User size={14} />
                  <span>{project.author}</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="card-diy p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-card-foreground">Progress</h3>
              <span className="text-sm text-muted-foreground">
                {completedSteps.length}/{project.steps.length} completed
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedSteps.length / project.steps.length) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Current Step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="card-diy overflow-hidden">
            <img 
              src={project.steps[currentStep].image} 
              alt={project.steps[currentStep].title}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-primary">
                    Step {currentStep + 1} of {project.steps.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.steps[currentStep].estimatedTime}
                  </div>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleStepComplete(currentStep)}
                  className={`p-2 rounded-radius transition-all duration-300 ${
                    completedSteps.includes(currentStep)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <CheckCircle2 size={16} />
                </motion.button>
              </div>

              <h2 className="text-xl font-semibold text-card-foreground mb-3">
                {project.steps[currentStep].title}
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {project.steps[currentStep].description}
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="btn-secondary-diy flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  disabled={currentStep === project.steps.length - 1}
                  className="btn-diy flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === project.steps.length - 1 ? "Complete!" : "Next Step"}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Materials List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="card-diy p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              Materials Needed
            </h3>
            <ul className="space-y-2">
              {project.supplies.map((supply, index) => (
                <li key={index} className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  {supply}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;