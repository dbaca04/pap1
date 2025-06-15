# User-Facing Notification Messages

This document lists the text for success, error, and informational "toast" notifications displayed by the frontend. The backend may return structured error codes or messages that the frontend can map to these (or similar) texts.

## Global / Settings
*   **Success:** "Settings saved successfully!"
    *   *Trigger:* After successfully saving changes in the Settings Modal.
    *   *Backend hint:* Generic success.
*   **Error:** (Generic, for unhandled API errors) "An unexpected error occurred. Please try again."
    *   *Trigger:* Fallback for API errors not specifically handled.
    *   *Backend hint:* Return appropriate 5xx or detailed 4xx error.
*   **Error:** "The configured Gemini API key (process.env.API_KEY) is not valid. Please contact the administrator."
    *   *Trigger:* If `geminiService.ts` detects an invalid API key error from the Gemini SDK.
    *   *Backend hint:* If backend orchestrates AI, this error would originate there.

## Project Dashboard
*   **Error:** "Project name cannot be empty."
    *   *Trigger:* User tries to create/edit a project with an empty name.
    *   *Backend hint:* `VALIDATION_ERROR`, `PROJECT_NAME_REQUIRED`
*   **Error:** "Project description cannot be empty."
    *   *Trigger:* User tries to create a project with an empty description.
    *   *Backend hint:* `VALIDATION_ERROR`, `PROJECT_DESCRIPTION_REQUIRED`
*   **Success:** "Project updated successfully!"
    *   *Trigger:* After successfully editing project details.
    *   *Backend hint:* Generic success.
*   **Success/Error:** "Project deleted successfully!" (uses 'error' type for red color, but is a success message contextually)
    *   *Trigger:* After successfully deleting a project.
    *   *Backend hint:* Generic success.
*   **Error:** "File is too large. Maximum 5MB."
    *   *Trigger:* User tries to upload a file larger than 5MB in project creation.
    *   *Backend hint:* `VALIDATION_ERROR`, `FILE_SIZE_EXCEEDED`
*   **Error:** "Error reading file content: {errorMessage}. Proceeding without file context."
    *   *Trigger:* Frontend fails to read an uploaded file during project creation.
    *   *Backend hint:* Not directly a backend error, but backend might have similar checks if it handles uploads.
*   **Success:** "AI is analyzing your input to pre-draft PRD sections..."
    *   *Trigger:* Project creation with "Guided" option and sufficient input for pre-analysis.
    *   *Backend hint:* Informational during a potentially long-running AI call.
*   **Error:** "Note: For PDF/DOCX, text extraction quality may vary for AI analysis. Plain text or Markdown is recommended."
    *   *Trigger:* User uploads a PDF/DOCX during project creation.
    *   *Backend hint:* Informational.
*   **Error:** "Failed to create project: {errorMessage}"
    *   *Trigger:* Any error during the `handleCreateProjectSubmit` flow, often from AI service calls.
    *   *Backend hint:* Could be AI service error, database error, etc. Example: `AI_SERVICE_UNAVAILABLE`, `DATABASE_ERROR`.

## PRD Wizard
*   **Success:** "Draft saved!"
    *   *Trigger:* User clicks "Save Draft".
    *   *Backend hint:* Generic success.
*   **Success:** "AI draft for "{sectionName}" generated!"
    *   *Trigger:* After AI successfully drafts a PRD section.
    *   *Backend hint:* Generic success.
*   **Error:** "Error generating AI draft: {errorMessage}"
    *   *Trigger:* AI fails to draft a PRD section.
    *   *Backend hint:* `AI_SERVICE_ERROR`, specific error from Gemini.
*   **Error:** "Role, Action, and Benefit are required for a user story."
    *   *Trigger:* User tries to save a user story without all core fields.
    *   *Backend hint:* `VALIDATION_ERROR`, `USER_STORY_INCOMPLETE`
*   **Error:** "AI User Story Assistance Error: {errorMessage}"
    *   *Trigger:* AI fails to assist with user story.
*   **Error:** "Please fill in Role, Action, and Benefit before generating ACs."
    *   *Trigger:* User tries to generate ACs for an incomplete user story.
*   **Error:** "AI Acceptance Criteria Generation Error: {errorMessage}"
    *   *Trigger:* AI fails to generate ACs.
*   **Success:** "Context from '{fileName}' added to {sectionName}."
    *   *Trigger:* After successfully processing an uploaded file and adding its context.
*   **Error:** "Error processing document: {errorMessage}"
    *   *Trigger:* Error during file upload/processing in PRD wizard.
*   **Success:** "PRD marked as complete! Proceeding to Task Agent."
    *   *Trigger:* User finishes PRD, and all sections are complete.
*   **Success:** "AI suggestions for NFRs added!"
    *   *Trigger:* AI successfully suggests NFRs.
*   **Error:** "Error generating NFR suggestions: {errorMessage}"
    *   *Trigger:* AI fails to suggest NFRs.
*   **Success:** "AI suggestions for Technology Stack added to notes!"
    *   *Trigger:* AI successfully suggests tech stack items.
*   **Error:** "Error generating Technology Stack suggestions: {errorMessage}"
    *   *Trigger:* AI fails to suggest tech stack.
*   **Success:** "AI attempted to draft incomplete sections."
    *   *Trigger:* After AI drafting in `CompletionFeedbackModal`.
*   **Error:** "Error during AI drafting of incomplete sections: {errorMessage}"
    *   *Trigger:* Failure during AI drafting from `CompletionFeedbackModal`.
*   **Success:** "PRD is now complete! Proceeding to Task Agent."
    *   *Trigger:* After AI drafting (from modal) makes the PRD complete.
*   **Error:** "Role Name and Description are required for a persona."
     *   *Trigger:* User tries to save a persona without all core fields.
*   **Error:** "Flow Name and Steps are required for a user flow."
     *   *Trigger:* User tries to save a user flow without all core fields.
*   **Success:** "Full PRD drafted by AI! Please review and customize."
     *   *Trigger:* After "AI Generate Full PRD Draft" action.
*   **Error:** "Error generating full PRD draft: {errorMessage}"
     *   *Trigger:* Failure of "AI Generate Full PRD Draft" action.


## Task Agent
*   **Error:** "No active project."
    *   *Trigger:* Should not happen if UI flow is correct, but a safeguard.
*   **Error:** "PRD is too short or empty. Please complete it in the Wizard."
    *   *Trigger:* User tries to analyze a PRD with insufficient content.
    *   *Backend hint:* `VALIDATION_ERROR`, `PRD_CONTENT_INSUFFICIENT`
*   **Success:** "PRD Analysis Complete! Ready to generate tasks."
    *   *Trigger:* After AI successfully analyzes the PRD.
*   **Error:** "PRD Analysis failed or returned no data. Check PRD content."
    *   *Trigger:* AI analysis returns no usable data.
    *   *Backend hint:* `AI_ANALYSIS_FAILED`
*   **Error:** "Error analyzing PRD: {errorMessage}"
    *   *Trigger:* General error during PRD analysis.
*   **Error:** "Analyze PRD first."
    *   *Trigger:* User tries to generate tasks before PRD analysis.
*   **Error:** "Technology stack is not defined in the PRD. Please define it in the Wizard (Technical Plan step) before generating tasks."
    *   *Trigger:* User tries to generate tasks without a defined tech stack.
    *   *Backend hint:* `VALIDATION_ERROR`, `TECH_STACK_MISSING`
*   **Success:** "Tasks generated successfully!"
    *   *Trigger:* After AI successfully generates tasks.
*   **Error:** "Error generating tasks: {errorMessage}"
    *   *Trigger:* General error during task generation.
*   **Error:** "No tasks to export."
    *   *Trigger:* User tries to export tasks when none exist.
*   **Success:** "Tasks exported as {FORMAT}."
    *   *Trigger:* After successful task export.
*   **Success:** "Simulating task sync to {DevOpsPlatform} for project {ProjectName}. View at: {link} (placeholder link)"
    *   *Trigger:* User clicks "Sync to DevOps".
*   **Error:** "Generate tasks first to include a summary in the brief."
    *   *Trigger:* User tries to generate executive brief before tasks exist.
*   **Success:** "Executive Brief generated!"
    *   *Trigger:* After AI successfully generates the executive brief.
*   **Error:** "Error generating executive brief: {errorMessage}"
    *   *Trigger:* General error during executive brief generation.
*   **Success:** "{Type} copied to clipboard!" (e.g., "Executive Brief copied to clipboard!")
    *   *Trigger:* User copies text to clipboard.
*   **Error:** "Failed to copy {type} to clipboard."
    *   *Trigger:* Clipboard copy action fails.

## Placeholders / Coming Soon
*   **Success:** "Project Settings: Coming Soon!"
    *   *Trigger:* User clicks on the "Project Settings" tab/button.
