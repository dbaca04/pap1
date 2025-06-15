# Data Shapes & Type Definitions (`types.ts`)

This document contains the complete and finalized TypeScript type definitions used by the AIPAP1 frontend. It serves as the primary data contract between the frontend and backend. The backend team should use these interfaces to design database schemas and structure API response payloads.

```typescript
export enum View {
  Dashboard = 'DASHBOARD',
  PRDWizard = 'PRD_WIZARD', // Will be part of ProjectWorkspace
  TaskAgent = 'TASK_AGENT', // Will be part of ProjectWorkspace
  ProjectWorkspace = 'PROJECT_WORKSPACE', // New view for active project
}

export interface Project {
  id: string;
  name: string;
  description:string;
  status: ProjectStatus;
  prdMarkdown: string;
  prdVersion: string;
  tasks: Task[];
  devOpsConfig: DevOpsConfig;
  uploadedFileContext: string; 
  prdSectionsContent: Record<PRDSectionName, PRDSectionData>;
  techStack: Technology[];
  lastModifiedDate: string; 
}

export enum ProjectStatus {
  Idea = "Idea", // Default for new, PRD tab
  PRDDefinition = "PRD Definition", // User actively working on PRD, PRD tab
  RequirementsComplete = "Requirements Complete", // PRD wizard finished, Tasks tab
  TasksGenerated = "Tasks Generated", // Tasks exist, Tasks tab
  TasksSynced = "Tasks Synced", // Tasks synced, Tasks tab
  Archived = "Archived",
}

export interface UserPersona {
  id: string;
  roleName: string;
  description: string;
}

export interface UserFlow {
  id: string;
  flowName: string;
  steps: string; // Could be markdown or plain text list
}

export type PRDSectionCompletionStatus = 'blue' | 'red' | 'yellow' | 'green';

export interface PRDSectionData {
  title: string;
  content: string; // Main text content for the section
  quickNotes: string[];
  wasInitiallyAIDrafted?: boolean; 
  userModifiedSinceAIDraft?: boolean; // New flag to track if user edited an AI draft
  // Specific structured data for certain sections
  userStories?: UserStory[]; 
  personas?: UserPersona[]; // For TargetUsers section
  themeKeywords?: string[]; // For UIUXVision section
  themeInspirations?: string; // For UIUXVision section
  keyFlows?: UserFlow[]; // For UserFlows section
}

export enum PRDSectionName {
  ExecutiveSummary = "Executive Summary",
  ProblemStatement = "Problem Statement",
  GoalsObjectives = "Goals & Objectives",
  TargetUsers = "Target Users", // Will include UserPersonas
  Features = "Features", // Will include UserStories
  TechnologyStack = "Technology Stack",
  NonFunctionalRequirements = "Non-Functional Requirements (NFRs)",
  OutOfScope = "Out of Scope",
  // New sections for "Users & Flows" Step
  UIUXVision = "UI/UX Vision", // Conceptual Theme & Aesthetic
  UserFlows = "Key User Flows", // User Journeys
  DesignPrinciples = "Design Principles & Accessibility", // Core Principles
}

export interface UserStory {
  id: string;
  role: string;
  action: string;
  benefit: string;
  acceptanceCriteria: AcceptanceCriterion[];
}

export interface AcceptanceCriterion {
  id: string;
  text: string; 
}

export interface Technology {
  id: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Other';
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string; 
  details: string; 
  testStrategy: string; 
  status: TaskStatus;
  priority: TaskPriority;
  dependencies: string[]; 
  tags: string[];
  subTasks: Task[];
  phase?: TaskPhase | string; // Allow string for flexibility if new phases come from API
  assignee?: string; 
  estimatedHours?: number; 
}

export enum TaskStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done",
  Blocked = "Blocked",
}

export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
}

export enum TaskPhase {
    Foundation = "Project Foundation",
    Architecture = "Architecture & Design",
    FeatureDevelopment = "Feature Development",
    Testing = "Testing", // Example, might be part of feature dev or separate
    Deployment = "Deployment", // Example
    CrossCutting = "Cross-Cutting Concern", // For NFRs etc.
    // Add other common phases as needed
}


export interface DevOpsConfig {
  platform: 'Azure DevOps' | 'GitHub' | 'None';
  projectUrl?: string; 
  patToken?: string; 
}

export type Theme = 'light' | 'dark';

export interface UserSettings {
  devOpsPlatform: 'Azure DevOps' | 'GitHub' | 'None';
  azureDevOpsOrg?: string;
  azureDevOpsProject?: string;
  githubRepo?: string;
  taskGranularity: 'High-level' | 'Detailed' | 'Very Granular';
  theme: Theme;
}

export interface PRDSection {
  name: PRDSectionName;
  prompt: string; 
  allowsUserStories?: boolean; 
  // Add other metadata if needed per section for the wizard
}

export interface GeneratedTaskHierarchy {
  foundationTasks: Task[];
  architectureTasks: Task[];
  featureTasks: Task[];
  nfrTasks: Task[];
}

export interface GeminiFeatureAnalysis {
  name: string;
  description: string;
  userStories?: { role: string; action: string; benefit: string; acceptanceCriteria: string[] }[];
}
export interface GeminiPRDAnalysisResult {
  objectives: string[];
  userRoles: string[];
  features: GeminiFeatureAnalysis[];
  techStack: { category: string; name: string }[];
  nfrs: { name: string; description: string }[];
}
```
