import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useProjects, DetailedProject, ProjectStep } from "../contexts/ProjectContext";
import { Button } from "./ui/button";

interface StepTrackerProps {
  project: DetailedProject;
}

const StepTracker = ({ project }: StepTrackerProps) => {
  const { state, dispatch } = useProjects();
  const [showAllSteps, setShowAllSteps] = useState(false);
  
  const currentStepIndex = state.currentStep[project.id] || 0;
  const completedSteps = state.completedSteps[project.id] || [];
  const currentStep = project.steps[currentStepIndex];

  const nextStep = () => {
    if (currentStepIndex < project.steps.length - 1) {
      dispatch({
        type: 'SET_CURRENT_STEP',
        payload: { projectId: project.id, stepIndex: currentStepIndex + 1 }
      });
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      dispatch({
        type: 'SET_CURRENT_STEP',
        payload: { projectId: project.id, stepIndex: currentStepIndex - 1 }
      });
    }
  };

  const toggleStepComplete = (stepId: string) => {
    dispatch({
      type: 'COMPLETE_STEP',
      payload: { projectId: project.id, stepId }
    });
  };

  const isStepCompleted = (stepId: string) => completedSteps.includes(stepId);
  const progressPercentage = (completedSteps.length / project.steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-diy p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-card-foreground">Progress</h3>
          <button
            onClick={() => setShowAllSteps(!showAllSteps)}
            className="text-sm text-primary hover:text-primary-glow"
          >
            {showAllSteps ? 'Hide' : 'Show'} All Steps
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-muted rounded-radius mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-radius"
          />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {completedSteps.length} of {project.steps.length} steps completed
          </span>
          <span className="text-primary font-medium">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </motion.div>

      {/* All Steps Overview */}
      {showAllSteps && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="card-diy p-4"
        >
          <h3 className="font-semibold text-card-foreground mb-4">All Steps</h3>
          <div className="space-y-3">
            {project.steps.map((step, index) => (
              <motion.div
                key={step.id}
                whileHover={{ scale: 1.01 }}
                className={`flex items-center gap-3 p-3 rounded-radius border transition-all duration-300 cursor-pointer ${
                  isStepCompleted(step.id)
                    ? 'bg-secondary/20 border-secondary-accent'
                    : currentStepIndex === index
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-muted/20 border-border/30 hover:border-border'
                }`}
                onClick={() => dispatch({
                  type: 'SET_CURRENT_STEP',
                  payload: { projectId: project.id, stepIndex: index }
                })}
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStepComplete(step.id);
                  }}
                  className={`p-1 rounded-radius border-2 transition-all duration-300 ${
                    isStepCompleted(step.id)
                      ? 'bg-secondary border-secondary-accent text-secondary-foreground'
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {isStepCompleted(step.id) ? <Check size={14} /> : <div className="w-3.5 h-3.5" />}
                </motion.button>
                
                <div className="flex-1">
                  <div className="font-medium text-card-foreground">
                    Step {index + 1}: {step.title}
                  </div>
                  {currentStepIndex === index && (
                    <div className="text-xs text-primary font-medium">Current Step</div>
                  )}
                </div>
                
                {isStepCompleted(step.id) && (
                  <CheckCircle2 size={16} className="text-secondary-accent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Current Step Detail */}
      <motion.div
        key={currentStepIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card-diy p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-card-foreground">
              Step {currentStepIndex + 1}
            </h2>
            <h3 className="text-lg text-primary font-semibold">
              {currentStep.title}
            </h3>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleStepComplete(currentStep.id)}
            className={`p-3 rounded-radius border-2 transition-all duration-300 ${
              isStepCompleted(currentStep.id)
                ? 'bg-secondary border-secondary-accent text-secondary-foreground'
                : 'border-border hover:border-primary'
            }`}
          >
            {isStepCompleted(currentStep.id) ? <Check size={20} /> : <div className="w-5 h-5" />}
          </motion.button>
        </div>

        <p className="text-card-foreground leading-relaxed mb-4">
          {currentStep.description}
        </p>

        {/* Materials for this step */}
        {currentStep.materials && currentStep.materials.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-card-foreground mb-2">Materials needed:</h4>
            <div className="flex flex-wrap gap-2">
              {currentStep.materials.map((material, index) => (
                <span key={index} className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-radius text-sm">
                  {material}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {currentStep.tips && currentStep.tips.length > 0 && (
          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-radius">
            <h4 className="font-medium text-primary mb-2">💡 Tips:</h4>
            <ul className="space-y-1">
              {currentStep.tips.map((tip, index) => (
                <li key={index} className="text-sm text-card-foreground">
                  • {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} />
            <span>{project.estimatedTime}</span>
          </div>

          <Button
            onClick={nextStep}
            disabled={currentStepIndex === project.steps.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </motion.div>

      {/* Completion Message */}
      {currentStepIndex === project.steps.length - 1 && isStepCompleted(currentStep.id) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-diy p-6 text-center bg-gradient-to-br from-secondary/20 to-primary/10"
        >
          <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-card-foreground mb-2">
            Congratulations! 🎉
          </h3>
          <p className="text-muted-foreground">
            You've completed this project! Share your creation with the community.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StepTracker;