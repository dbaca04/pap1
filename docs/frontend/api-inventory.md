# API Call Inventory & Expected Payloads

This document outlines the intended backend API calls originating from the AIPAP1 frontend. It assumes the backend will handle data persistence (projects, settings) and orchestration of calls to the Gemini AI services.

## 1. Project Management APIs

These APIs manage the lifecycle of projects.

### 1.1. Get All Projects
*   **User Action:** User lands on Project Dashboard.
*   **HTTP Method & Endpoint:** `GET /api/projects`
*   **Request Payload:** None
*   **Expected Response Payload:** `Project[]` (Array of project objects)

### 1.2. Get Single Project
*   **User Action:** User clicks on a project in the dashboard to open it (though typically the full project data might be part of the initial `GET /api/projects` load). This might be used if navigating directly to a project or refreshing.
*   **HTTP Method & Endpoint:** `GET /api/projects/:projectId`
*   **Request Payload:** None
*   **Expected Response Payload:** `Project`

### 1.3. Create New Project
*   **User Action:** User submits the "Create New Project" modal.
*   **HTTP Method & Endpoint:** `POST /api/projects`
*   **Request Payload Structure (referencing `types.ts`):**
    ```json
    {
      "name": "string (Project['name'])",
      "description": "string (Project['description'])",
      "initialPrdSectionsContent": "Record<PRDSectionName, PRDSectionData> (Content from guided creation or quick draft)",
      "uploadedFileContext": "string (Project['uploadedFileContext'], optional summary from uploaded file)",
      "initialTechStack": "Technology[] (Project['techStack'], e.g., default stack)"
    }
    ```
    *Backend generates `id`, `status` (e.g., Idea), `prdMarkdown` (from `initialPrdSectionsContent`), `prdVersion`, `tasks` (empty array), `devOpsConfig` (default), `lastModifiedDate`.*
*   **Expected Response Payload:** `Project` (The newly created project object)

### 1.4. Update Project
*   **User Action:**
    *   User saves changes in Project Dashboard edit modal (name, description).
    *   User saves draft in PRD Wizard (updates `prdSectionsContent`, `prdMarkdown`, `techStack`, `status`).
    *   User archives/unarchives a project (updates `status`).
    *   Tasks are generated and saved to the project (updates `tasks`, `status`).
*   **HTTP Method & Endpoint:** `PUT /api/projects/:projectId`
*   **Request Payload Structure (referencing `types.ts`):**
    `Partial<Project>` - The frontend will send only the fields that have changed. For example:
    *   Editing details: `{ "name": "...", "description": "..." }`
    *   Saving PRD draft: `{ "prdSectionsContent": {...}, "prdMarkdown": "...", "techStack": [...], "status": "..." }`
    *   Archiving: `{ "status": "Archived" }`
    *   Saving generated tasks: `{ "tasks": [...], "status": "TasksGenerated" }`
*   **Expected Response Payload:** `Project` (The updated project object)

### 1.5. Delete Project
*   **User Action:** User confirms deletion of a project from the dashboard kebab menu.
*   **HTTP Method & Endpoint:** `DELETE /api/projects/:projectId`
*   **Request Payload:** None
*   **Expected Response Payload:** `204 No Content` or `{ "message": "Project deleted successfully" }`

## 2. User Settings APIs

These APIs manage user-specific application settings. Assumes a user authentication context (e.g., `/api/users/me/`).

### 2.1. Get User Settings
*   **User Action:** Application loads, settings are needed.
*   **HTTP Method & Endpoint:** `GET /api/users/me/settings`
*   **Request Payload:** None
*   **Expected Response Payload:** `UserSettings`

### 2.2. Update User Settings
*   **User Action:** User saves changes in the Settings Modal.
*   **HTTP Method & Endpoint:** `PUT /api/users/me/settings`
*   **Request Payload Structure (referencing `types.ts`):** `UserSettings`
    ```json
    {
      "devOpsPlatform": "'Azure DevOps' | 'GitHub' | 'None'",
      "azureDevOpsOrg": "string (optional)",
      "azureDevOpsProject": "string (optional)",
      "githubRepo": "string (optional)",
      "taskGranularity": "'High-level' | 'Detailed' | 'Very Granular'",
      "theme": "'light' | 'dark'"
    }
    ```
*   **Expected Response Payload:** `UserSettings` (The updated settings object)

## 3. AI Orchestration APIs (Backend as Proxy/Manager for Gemini)

These APIs are called by the frontend when AI assistance is required. The backend then communicates with the Gemini API.

### 3.1. Pre-analyze PRD for Wizard (Project Creation)
*   **User Action:** User initiates project creation with "Guided Creation" and provides substantial description or a file.
*   **Frontend Call Location:** `ProjectDashboard.tsx` -> `handleCreateProjectSubmit`
*   **HTTP Method & Endpoint:** `POST /api/ai/pre-analyze-prd-wizard`
*   **Request Payload:**
    ```json
    {
      "projectName": "string",
      "projectDescription": "string",
      "documentContent": "string (optional, content of uploaded file)"
    }
    ```
*   **Expected Response Payload:** `Partial<Record<PRDSectionName, string>>` (AI-drafted content for specified PRD sections)

### 3.2. Generate PRD Section Draft
*   **User Action:** User clicks "AI Draft Section" button in PRD Wizard.
*   **Frontend Call Location:** `PRDWizard.tsx` -> `generateSectionWithAI`
*   **HTTP Method & Endpoint:** `POST /api/ai/draft-prd-section`
*   **Request Payload:**
    ```json
    {
      "sectionName": "PRDSectionName (enum string)",
      "projectContext": { // Relevant parts of the Project object for context
        "name": "string",
        "description": "string",
        "prdMarkdown": "string (current full PRD draft for context)"
        // Potentially other parts of Project like prdSectionsContent could be sent
      }
    }
    ```
*   **Expected Response Payload:** `{ "draft": "string (Markdown content for the section)" }`

### 3.3. Generate Quick Draft PRD (Full Skeleton)
*   **User Action:** User selects "AI Quick Draft" in project creation, or "AI Generate Full PRD Draft" in PRD Wizard footer.
*   **Frontend Call Location:** `ProjectDashboard.tsx` -> `handleCreateProjectSubmit`; `PRDWizard.tsx` -> `generateFullPrdWithAI`
*   **HTTP Method & Endpoint:** `POST /api/ai/quick-draft-prd`
*   **Request Payload:**
    ```json
    {
      "projectName": "string",
      "projectDescription": "string",
      "mainUser": "string (e.g., 'Primary User' or a specific persona role)"
    }
    ```
*   **Expected Response Payload:** `{ "markdown": "string (Full PRD Markdown skeleton)" }`

### 3.4. Assist User Story Formulation
*   **User Action:** User clicks "AI Assist Story" in User Story modal (PRD Wizard).
*   **Frontend Call Location:** `PRDWizard.tsx` -> `assistWithUserStory`
*   **HTTP Method & Endpoint:** `POST /api/ai/assist-user-story`
*   **Request Payload:**
    ```json
    {
      "currentRole": "string",
      "currentAction": "string",
      "currentBenefit": "string",
      "projectContext": "string (e.g., project name, description, relevant PRD section snippet)"
    }
    ```
*   **Expected Response Payload:** `{ "role": "string", "action": "string", "benefit": "string" }`

### 3.5. Generate Acceptance Criteria
*   **User Action:** User clicks "AI Generate ACs" in User Story modal (PRD Wizard).
*   **Frontend Call Location:** `PRDWizard.tsx` -> `generateUserStoryACs`
*   **HTTP Method & Endpoint:** `POST /api/ai/generate-acceptance-criteria`
*   **Request Payload:**
    ```json
    {
      "userStoryText": "string (e.g., 'As a [role], I want to [action] so that [benefit]')",
      "projectContext": "string (e.g., project name, description, relevant feature description)"
    }
    ```
*   **Expected Response Payload:** `{ "acceptanceCriteria": "string[]" }`

### 3.6. Analyze PRD for Task Generation
*   **User Action:** User clicks "Analyze PRD Document" in Task Agent.
*   **Frontend Call Location:** `TaskAgent.tsx` -> `handleAnalyzePRD`
*   **HTTP Method & Endpoint:** `POST /api/projects/:projectId/analyze-prd-for-tasks`
    *(Backend retrieves `prdMarkdown` for the given `projectId`)*
*   **Request Payload:** None (or `{ "prdMarkdown": "string" }` if frontend sends it explicitly)
*   **Expected Response Payload:** `GeminiPRDAnalysisResult`

### 3.7. Generate Hierarchical Tasks
*   **User Action:** User clicks "Generate Tasks" in Task Agent.
*   **Frontend Call Location:** `TaskAgent.tsx` -> `handleGenerateTasks`
*   **HTTP Method & Endpoint:** `POST /api/projects/:projectId/generate-tasks`
*   **Request Payload:**
    ```json
    {
      "analysisResult": "GeminiPRDAnalysisResult (from previous step)",
      "granularity": "'High-level' | 'Detailed' | 'Very Granular'",
      "techStack": "Technology[] (from Project.techStack for context)"
      // project name, description also available to backend via projectId
    }
    ```
*   **Expected Response Payload:** `{ "tasks": "Task[]" }` (Hierarchically structured tasks)

### 3.8. Generate Executive Brief
*   **User Action:** User clicks "Generate Executive Brief" in Task Agent.
*   **Frontend Call Location:** `TaskAgent.tsx` -> `handleGenerateExecutiveBrief`
*   **HTTP Method & Endpoint:** `POST /api/projects/:projectId/generate-executive-brief`
    *(Backend retrieves `prdMarkdown` and `tasks` for the given `projectId`)*
*   **Request Payload:** None (or relevant project data if not fetched by backend via ID)
*   **Expected Response Payload:** `{ "brief": "string (Markdown content)" }`

### 3.9. Upload Document and Extract Context
*   **User Action:** User uploads a file in Project Creation modal or PRD Wizard footer.
*   **Frontend Call Location:** `ProjectDashboard.tsx` -> `handleCreateProjectSubmit`; `PRDWizard.tsx` -> `handleFileChange`
*   **HTTP Method & Endpoint:** `POST /api/ai/extract-document-context`
*   **Request Payload:**
    ```json
    {
      "fileContent": "string (text content of the uploaded file)"
    }
    ```
*   **Expected Response Payload:** `{ "contextSummary": "string" }`

### 3.10. Generate NFR Suggestions
*   **User Action:** User clicks "AI Suggest NFRs" in PRD Wizard (NFR section).
*   **Frontend Call Location:** `PRDWizard.tsx` -> `generateNFRsWithAI`
*   **HTTP Method & Endpoint:** `POST /api/ai/suggest-nfrs`
*   **Request Payload:**
    ```json
    {
      "projectDescription": "string",
      "existingFeaturesSummary": "string (summary of features or user stories)"
    }
    ```
*   **Expected Response Payload:** `{ "suggestions": "string[]" }`

### 3.11. Generate Tech Stack Suggestions
*   **User Action:** User clicks "AI Suggest Technologies" in PRD Wizard (Tech Stack section).
*   **Frontend Call Location:** `PRDWizard.tsx` -> `handleGenerateTechStackWithAI`
*   **HTTP Method & Endpoint:** `POST /api/ai/suggest-tech-stack`
*   **Request Payload:**
    ```json
    {
      "projectDescription": "string",
      "featuresSummary": "string (summary of features)"
    }
    ```
*   **Expected Response Payload:** `{ "suggestions": "string[]" }` (Each string formatted: "Category: Technology Name - Rationale")

### 3.12. Draft Incomplete PRD Sections (PRD Health Check Flow)
*   **User Action:** User clicks "Finish & Go To Tasks" in PRD Wizard, and chooses "AI Draft Incomplete Sections" in the feedback modal.
*   **Frontend Call Location:** `PRDWizard.tsx` -> `handleAiDraftIncompleteSections`
*   **HTTP Method & Endpoint:** `POST /api/projects/:projectId/draft-incomplete-sections`
*   **Request Payload:**
    ```json
    {
      "incompleteSections": "PRDSectionName[]",
      "projectContext": { // Similar to draft-prd-section
        "name": "string",
        "description": "string",
        "prdMarkdown": "string"
      }
    }
    ```
*   **Expected Response Payload:** `Record<PRDSectionName, PRDSectionData>` (Updated section data for the drafted sections)
---

This inventory covers the primary interactions. Note that error handling (e.g., 4xx, 5xx responses) should be implemented for all endpoints. Payloads should be validated by the backend.
