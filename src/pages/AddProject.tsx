import { motion } from "framer-motion";
import { Plus, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";

interface ProjectStep {
  id: string;
  title: string;
  description: string;
  image?: string;
}

const AddProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [steps, setSteps] = useState<ProjectStep[]>([
    { id: "1", title: "", description: "" }
  ]);

  const categories = ["Arts & Crafts", "Home Fixes", "Coding Projects", "Gardening", "Electronics"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const addStep = () => {
    const newStep: ProjectStep = {
      id: Date.now().toString(),
      title: "",
      description: ""
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (stepId: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter(step => step.id !== stepId));
    }
  };

  const updateStep = (stepId: string, field: keyof ProjectStep, value: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, [field]: value } : step
    ));
  };

  const handleSubmit = () => {
    if (!title || !description || !category || !difficulty) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally submit to an API
    toast({
      title: "Project Created!",
      description: "Your DIY project has been added to the community.",
    });
    
    navigate("/");
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
          <h1 className="text-2xl font-bold text-gradient mb-2">
            Add Your Project
          </h1>
          <p className="text-muted-foreground">
            Share your DIY project with the community
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Basic Info */}
          <div className="card-diy p-6">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">
              Project Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Project Title *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., DIY Macrame Wall Hanging"
                  className="bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Description *
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project and what people will learn..."
                  rows={4}
                  className="bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Category *
                  </label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 bg-background border border-border rounded-radius text-foreground"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Difficulty *
                  </label>
                  <select 
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full p-3 bg-background border border-border rounded-radius text-foreground"
                  >
                    <option value="">Select difficulty</option>
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Estimated Time
                </label>
                <Input
                  value={estimatedTime}
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  placeholder="e.g., 2-3 hours"
                  className="bg-background"
                />
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="card-diy p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-card-foreground">
                Project Steps
              </h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addStep}
                className="btn-secondary-diy flex items-center gap-2"
              >
                <Plus size={16} />
                Add Step
              </motion.button>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-accent/20 rounded-radius border border-border/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-card-foreground">
                      Step {index + 1}
                    </h3>
                    {steps.length > 1 && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeStep(step.id)}
                        className="p-1 text-muted-foreground hover:text-destructive"
                      >
                        <X size={16} />
                      </motion.button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Input
                      value={step.title}
                      onChange={(e) => updateStep(step.id, "title", e.target.value)}
                      placeholder="Step title"
                      className="bg-background"
                    />
                    <Textarea
                      value={step.description}
                      onChange={(e) => updateStep(step.id, "description", e.target.value)}
                      placeholder="Describe what to do in this step..."
                      rows={3}
                      className="bg-background"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 pb-8"
          >
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex-1"
            >
              Cancel
            </Button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="btn-diy flex-1"
            >
              Publish Project
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AddProject;