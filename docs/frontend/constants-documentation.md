# Enumerated Constants & Key Type Aliases

This document lists key enumerated constants and type aliases primarily from `types.ts` (as `constants.tsx` mostly contains UI configuration data rather than data contract enums). These are crucial for the data contract between the frontend and backend. The backend needs to be aware of these possible string values for database constraints, business logic, and API consistency.

## ProjectStatus
Defines the possible statuses for a project.
```typescript
export enum ProjectStatus {
  Idea = "Idea",
  PRDDefinition = "PRD Definition",
  RequirementsComplete = "Requirements Complete",
  TasksGenerated = "Tasks Generated",
  TasksSynced = "Tasks Synced",
  Archived = "Archived",
}
```

## PRDSectionName
Defines the names for various sections within a Product Requirements Document.
```typescript
export enum PRDSectionName {
  ExecutiveSummary = "Executive Summary",
  ProblemStatement = "Problem Statement",
  GoalsObjectives = "Goals & Objectives",
  TargetUsers = "Target Users",
  Features = "Features",
  TechnologyStack = "Technology Stack",
  NonFunctionalRequirements = "Non-Functional Requirements (NFRs)",
  OutOfScope = "Out of Scope",
  UIUXVision = "UI/UX Vision",
  UserFlows = "Key User Flows",
  DesignPrinciples = "Design Principles & Accessibility",
}
```

## PRDSectionCompletionStatus (Type Alias)
Indicates the completion status of a PRD section, used for UI feedback in the PRD Wizard.
```typescript
export type PRDSectionCompletionStatus = 'blue' | 'red' | 'yellow' | 'green';
// 'blue': AI Drafted, untouched or minimally touched by user. Can also indicate user started but it's not yet green.
// 'red': Critically incomplete or placeholder content.
// 'yellow': Needs more detail, review, or partially filled.
// 'green': Considered sufficiently complete by frontend heuristics.
```

## TaskStatus
Defines the possible statuses for a task.
```typescript
export enum TaskStatus {
  ToDo = "To Do",
  InProgress = "In Progress",
  Done = "Done",
  Blocked = "Blocked",
}
```

## TaskPriority
Defines the priority levels for a task.
```typescript
export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
}
```

## TaskPhase
Defines common project phases that tasks can be associated with. The `Task['phase']` type also allows for `string` for flexibility if new phases are introduced by the AI/API not covered by this enum.
```typescript
export enum TaskPhase {
    Foundation = "Project Foundation",
    Architecture = "Architecture & Design",
    FeatureDevelopment = "Feature Development",
    Testing = "Testing",
    Deployment = "Deployment",
    CrossCutting = "Cross-Cutting Concern",
}
```

## Theme (User Setting)
Defines the UI theme options.
```typescript
export type Theme = 'light' | 'dark';
```

## Technology['category'] (Type Alias)
Defines categories for technologies within a project's tech stack.
```typescript
// From: export interface Technology { ... category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Other'; ... }
export type TechnologyCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Other';
```

## DevOpsConfig['platform'] & UserSettings['devOpsPlatform'] (Type Alias)
Defines the supported DevOps platforms.
```typescript
// From: export interface DevOpsConfig { platform: 'Azure DevOps' | 'GitHub' | 'None'; ... }
// From: export interface UserSettings { devOpsPlatform: 'Azure DevOps' | 'GitHub' | 'None'; ... }
export type DevOpsPlatform = 'Azure DevOps' | 'GitHub' | 'None';
```

## UserSettings['taskGranularity'] (Type Alias)
Defines the levels of detail for AI-generated tasks.
```typescript
// From: export interface UserSettings { ... taskGranularity: 'High-level' | 'Detailed' | 'Very Granular'; ... }
export type TaskGranularity = 'High-level' | 'Detailed' | 'Very Granular';
```
