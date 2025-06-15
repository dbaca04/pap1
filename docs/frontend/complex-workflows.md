# Complex Client-Side Workflows

This document illustrates complex client-side workflows using Mermaid diagrams.

## 1. PRD Health Check & Finalization Flow

This flow describes the process when a user clicks "Finish & Go to Tasks" in the PRD Wizard.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend_AI_Service as Backend (AI Orchestration)

    User->>Frontend: Clicks "Finish & Go to Tasks" (PRD Wizard)
    Frontend->>Frontend: saveCurrentDraft()
    Frontend->>Frontend: checkPRDCompletion() determines incomplete sections (Red, Yellow, or Blue status)
    alt Sections Incomplete
        Frontend->>Frontend: Incomplete sections found
        Frontend->>User: Show CompletionFeedbackModal with options: "AI Draft Incomplete Sections" or "Let Me Complete Manually"
        alt User selects "AI Draft Incomplete Sections"
            User->>Frontend: Selects "AI Draft"
            Frontend->>Backend_AI_Service: POST /api/projects/:projectId/draft-incomplete-sections (payload: { incompleteSections: PRDSectionName[], projectContext: {...} })
            Backend_AI_Service-->>Frontend: Response with updated PRDSectionData for drafted sections
            Frontend->>Frontend: Update activeProject with new section content (localPRDSectionsContent updated, wasInitiallyAIDrafted=true, userModifiedSinceAIDraft=false)
            Frontend->>Frontend: reCheckPRDCompletion()
            alt Still Incomplete
                 Frontend->>User: Show CompletionFeedbackModal again with remaining incomplete sections
            else All Complete (all sections Green)
                 Frontend->>Frontend: Update project status to 'RequirementsComplete' via updateProject()
                 Frontend->>Frontend: Navigate to Task Agent tab (setCurrentWorkspaceTab('Tasks'))
                 Frontend->>User: Show "PRD is now complete! Proceeding to Task Agent" notification
            end
        else User selects "Manual Complete"
            User->>Frontend: Selects "Manual Complete"
            Frontend->>Frontend: Close CompletionFeedbackModal
            Frontend->>Frontend: (Optional) Navigate to the step containing the first incomplete section
        end
    else All Sections Complete (all sections Green)
        Frontend->>Frontend: All sections complete
        Frontend->>Frontend: Update project status to 'RequirementsComplete' via updateProject()
        Frontend->>Frontend: Navigate to Task Agent tab (setCurrentWorkspaceTab('Tasks'))
        Frontend->>User: Show "PRD marked as complete! Proceeding to Task Agent." notification
    end
```

## 2. Task Generation Flow

This flow describes the process from PRD analysis to task generation within the Task Agent.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend_AI_Service as Backend (AI Orchestration)

    User->>Frontend: Clicks "Analyze PRD Document" (Task Agent)
    Frontend->>Frontend: setIsLoading(true)
    Frontend->>Backend_AI_Service: POST /api/projects/:projectId/analyze-prd-for-tasks
    note right of Frontend: Backend retrieves PRD markdown for project ID and calls Gemini for analysis.
    Backend_AI_Service-->>Frontend: Response { analysisResult: GeminiPRDAnalysisResult } or error
    Frontend->>Frontend: setIsLoading(false)
    alt Analysis Successful
        Frontend->>Frontend: Stores analysisResult in state (setPrdAnalysis)
        Frontend->>User: Show "PRD Analysis Complete! Ready to generate tasks." notification
    else Analysis Failed
        Frontend->>User: Show "PRD Analysis failed..." or "Error analyzing PRD..." notification
    end

    User->>Frontend: Selects Task Granularity (e.g., 'Detailed')
    User->>Frontend: Clicks "Generate Tasks" (Task Agent, enabled if analysisResult exists and techStack defined)
    Frontend->>Frontend: setIsLoading(true)
    Frontend->>Backend_AI_Service: POST /api/projects/:projectId/generate-tasks (payload: { analysisResult: GeminiPRDAnalysisResult, granularity: string, techStack: Technology[] })
    note right of Frontend: Backend uses analysis, granularity, and project's tech stack for task generation via Gemini.
    Backend_AI_Service-->>Frontend: Response { tasks: Task[] } or error
    Frontend->>Frontend: setIsLoading(false)
    alt Task Generation Successful
        Frontend->>Frontend: Update activeProject with generated tasks & status 'TasksGenerated' (via updateProject())
        Frontend->>Frontend: Update task summary display and available tags
        Frontend->>User: Show "Tasks generated successfully!" notification
    else Task Generation Failed
        Frontend->>User: Show "Error generating tasks..." notification
    end
```
