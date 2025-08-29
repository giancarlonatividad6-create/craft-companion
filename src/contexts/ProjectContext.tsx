import { createContext, useContext, useReducer, ReactNode } from "react";
import { Project } from "../components/ProjectCard";

// Import images
import projectMacrame from "../assets/project-macrame.jpg";
import codingProjects from "../assets/coding-projects.jpg";
import homeFixes from "../assets/home-fixes.jpg";
import heroCrafts from "../assets/hero-crafts.jpg";

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  image?: string;
  tips?: string[];
  materials?: string[];
}

export interface DetailedProject extends Project {
  steps: ProjectStep[];
  materials: string[];
  tools: string[];
  tags: string[];
  views: number;
  likes: number;
  completions: number;
  createdAt: string;
}

interface ProjectState {
  projects: DetailedProject[];
  savedProjects: string[];
  completedSteps: Record<string, string[]>; // projectId -> stepIds
  currentStep: Record<string, number>; // projectId -> current step index
}

type ProjectAction = 
  | { type: 'TOGGLE_SAVE_PROJECT'; payload: string }
  | { type: 'COMPLETE_STEP'; payload: { projectId: string; stepId: string } }
  | { type: 'SET_CURRENT_STEP'; payload: { projectId: string; stepIndex: number } }
  | { type: 'ADD_PROJECT'; payload: DetailedProject }
  | { type: 'LIKE_PROJECT'; payload: string }
  | { type: 'INCREMENT_VIEWS'; payload: string };

const initialState: ProjectState = {
  projects: [
    {
      id: "1",
      title: "Macrame Wall Hanging",
      description: "Create a beautiful boho-style wall decoration using simple macrame knots and natural cotton cord.",
      image: projectMacrame,
      difficulty: "Easy",
      estimatedTime: "2-3 hours",
      rating: 4.8,
      author: "Sarah M.",
      category: "Arts & Crafts",
      saved: false,
      materials: ["Cotton cord (4mm)", "Wooden dowel (12 inches)", "Scissors", "Comb", "Measuring tape"],
      tools: ["Scissors", "Comb", "Measuring tape"],
      tags: ["boho", "macrame", "wall-art", "beginner-friendly"],
      views: 1247,
      likes: 89,
      completions: 156,
      createdAt: "2024-01-15",
      steps: [
        {
          id: "step-1",
          title: "Prepare Your Materials",
          description: "Cut 8 pieces of cotton cord, each 3 feet long. Attach them to the wooden dowel using lark's head knots.",
          materials: ["Cotton cord (4mm)", "Wooden dowel", "Scissors"],
          tips: ["Make sure all cords are the same length for an even pattern"]
        },
        {
          id: "step-2", 
          title: "Create the Base Pattern",
          description: "Work square knots in rows to create a diamond pattern. Start with the center cords and work outward.",
          tips: ["Keep tension consistent", "Count your knots to maintain symmetry"]
        },
        {
          id: "step-3",
          title: "Add Fringe Details",
          description: "Comb out the bottom ends to create a flowing fringe effect. Trim to desired length.",
          tips: ["Comb gently to avoid breaking fibers", "Trim gradually for best results"]
        }
      ]
    },
    {
      id: "2",
      title: "Smart Garden Monitor",
      description: "Build an Arduino-based IoT system to monitor your plants' soil moisture, temperature, and light levels.",
      image: codingProjects,
      difficulty: "Medium",
      estimatedTime: "4-6 hours",
      rating: 4.6,
      author: "Alex K.",
      category: "Coding Projects",
      saved: false,
      materials: ["Arduino Uno", "Soil moisture sensor", "DHT22 sensor", "Breadboard", "Jumper wires", "LCD display"],
      tools: ["Soldering iron", "Wire strippers", "Computer", "Arduino IDE"],
      tags: ["arduino", "iot", "gardening", "sensors"],
      views: 892,
      likes: 67,
      completions: 43,
      createdAt: "2024-01-20",
      steps: [
        {
          id: "step-1",
          title: "Set Up Arduino IDE",
          description: "Install Arduino IDE and necessary libraries for sensors and WiFi connectivity.",
          materials: ["Computer", "Arduino IDE"],
          tips: ["Make sure to install the DHT sensor library"]
        },
        {
          id: "step-2",
          title: "Wire the Sensors", 
          description: "Connect the soil moisture sensor, temperature sensor, and LCD display to the Arduino.",
          tips: ["Double-check connections before powering on", "Use breadboard for prototyping"]
        },
        {
          id: "step-3",
          title: "Write the Code",
          description: "Program the Arduino to read sensor data and display it on the LCD screen.",
          tips: ["Test each sensor individually first", "Add delay between readings"]
        },
        {
          id: "step-4",
          title: "Add WiFi Connectivity",
          description: "Enable the device to send data to a cloud service for remote monitoring.",
          tips: ["Secure your WiFi credentials", "Consider using MQTT for communication"]
        }
      ]
    },
    {
      id: "3",
      title: "Kitchen Cabinet Repair",
      description: "Fix loose hinges and replace worn cabinet doors with professional techniques and tools.",
      image: homeFixes,
      difficulty: "Medium",
      estimatedTime: "3-4 hours",
      rating: 4.3,
      author: "Mike D.",
      category: "Home Fixes",
      saved: false,
      materials: ["Cabinet hinges", "Wood screws", "Wood filler", "Sandpaper", "Wood stain", "Cabinet doors"],
      tools: ["Drill", "Screwdriver", "Level", "Measuring tape", "Chisel"],
      tags: ["kitchen", "cabinet", "repair", "woodworking"],
      views: 1156,
      likes: 78,
      completions: 94,
      createdAt: "2024-01-18",
      steps: [
        {
          id: "step-1",
          title: "Remove Old Hardware",
          description: "Carefully remove old hinges and handles. Mark positions for reference.",
          tips: ["Take photos before removing for reference", "Save screws in labeled containers"]
        },
        {
          id: "step-2",
          title: "Repair and Prep",
          description: "Fill screw holes with wood filler, sand smooth, and prepare surfaces for new hardware.",
          tips: ["Let wood filler dry completely before sanding"]
        },
        {
          id: "step-3",
          title: "Install New Hardware",
          description: "Mount new hinges and adjust doors for proper alignment and operation.",
          tips: ["Use a level to ensure doors hang straight", "Test operation before final tightening"]
        }
      ]
    },
    {
      id: "4",
      title: "Terrarium Garden",
      description: "Create a miniature ecosystem in a glass container with succulents and decorative elements.",
      image: heroCrafts,
      difficulty: "Easy",
      estimatedTime: "1-2 hours",
      rating: 4.7,
      author: "Emma L.",
      category: "Arts & Crafts",
      saved: false,
      materials: ["Glass container", "Succulents", "Potting soil", "Activated charcoal", "Decorative stones"],
      tools: ["Small spoon", "Tweezers", "Spray bottle"],
      tags: ["terrarium", "succulents", "gardening", "decorative"],
      views: 934,
      likes: 102,
      completions: 187,
      createdAt: "2024-01-22",
      steps: [
        {
          id: "step-1",
          title: "Layer the Base",
          description: "Add drainage layer of stones, then activated charcoal, followed by potting soil.",
          tips: ["Charcoal prevents odors and improves drainage"]
        },
        {
          id: "step-2",
          title: "Plant Succulents",
          description: "Carefully arrange and plant your succulents, leaving space for growth.",
          tips: ["Use tweezers for delicate placement", "Don't overcrowd plants"]
        },
        {
          id: "step-3",
          title: "Add Finishing Touches",
          description: "Decorate with stones, moss, or miniature figurines. Mist lightly.",
          tips: ["Less is more with watering", "Place in bright, indirect light"]
        }
      ]
    }
  ],
  savedProjects: [],
  completedSteps: {},
  currentStep: {}
};

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case 'TOGGLE_SAVE_PROJECT':
      return {
        ...state,
        savedProjects: state.savedProjects.includes(action.payload)
          ? state.savedProjects.filter(id => id !== action.payload)
          : [...state.savedProjects, action.payload]
      };
    
    case 'COMPLETE_STEP':
      const { projectId, stepId } = action.payload;
      return {
        ...state,
        completedSteps: {
          ...state.completedSteps,
          [projectId]: [
            ...(state.completedSteps[projectId] || []),
            stepId
          ].filter((id, index, arr) => arr.indexOf(id) === index)
        }
      };
    
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: {
          ...state.currentStep,
          [action.payload.projectId]: action.payload.stepIndex
        }
      };
    
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    
    case 'LIKE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload
            ? { ...project, likes: project.likes + 1 }
            : project
        )
      };
    
    case 'INCREMENT_VIEWS':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload
            ? { ...project, views: project.views + 1 }
            : project
        )
      };
    
    default:
      return state;
  }
}

const ProjectContext = createContext<{
  state: ProjectState;
  dispatch: React.Dispatch<ProjectAction>;
} | null>(null);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};