
# AIPAP1 - Development Notes

## 1. Introduction

Welcome to the development notes for AIPAP1 (AI Project Acceleration Platform). This document provides an overview of the project's setup, architecture, key features, and important development considerations. AIPAP1 is a React-based single-page application (SPA) designed to assist in defining Product Requirements Documents (PRDs), generating project tasks, and streamlining project planning, leveraging the Google Gemini API for its AI capabilities.

## 2. Getting Started

### 2.1. Prerequisites

*   A modern web browser with support for ES6 modules (e.g., Chrome, Firefox, Edge, Safari).
*   Internet connection (for loading ESM modules and accessing the Gemini API).

### 2.2. Running the Application

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd aipap1-project-directory
    ```
2.  **API Key Configuration (Crucial):**
    *   The Google Gemini API key **must** be available as `process.env.API_KEY` in the execution environment where the `GoogleGenAI` client (in `services/geminiService.ts`) is initialized.
    *   **This application does not provide a UI for API key input, nor should the key be hardcoded into the client-side source files.**
    *   For local development where there isn't a server-side `process.env`, you would typically need a mechanism (like a local proxy or a build step, though this project doesn't use one) to make this environment variable accessible to the browser context if the API calls are made directly from the client. However, strictly follow the guideline: the key is assumed to be pre-configured and accessible via `process.env.API_KEY` when `new GoogleGenAI(...)` is called.
3.  **Open in Browser:**
    *   Simply open the `index.html` file in your web browser. The application uses ES modules imported via `esm.sh`, so no local build or complex dev server setup is strictly required to run the provided code.

## 3. Key Technologies & Libraries

*   **React 19:** Core UI library (loaded via `esm.sh`).
*   **ReactDOM 19:** For rendering React components in the DOM (loaded via `esm.sh`).
*   **Tailwind CSS:** Utility-first CSS framework (loaded via CDN, JIT mode enabled in `index.html`).
    *   Custom configuration for dark mode, typography, and theme colors (`sky`, `slate`) is included in `index.html`.
*   **@google/genai (v1.3.0):** Official Google SDK for interacting with Gemini models (loaded via `esm.sh`).
*   **react-markdown & remark-gfm:** For rendering Markdown content (e.g., PRD previews) with GitHub Flavored Markdown support.
*   **Mermaid:** For rendering diagrams from text-based definitions (e.g., user flows).
*   **Heroicons:** SVG icons used as React components throughout the application.

## 4. Architecture Overview

AIPAP1 is a client-side rendered Single Page Application (SPA).

*   **Component-Based UI:** Built with React, organized into functional components found in the `/components` directory.
*   **State Management:**
    *   **React Context API (`AppContext` in `App.tsx`):** Used for managing global application state, including:
        *   User settings (`settings`).
        *   Project list (`projects`) and the currently active project (`activeProject`).
        *   Current workspace tab (`currentWorkspaceTab`) within an active project.
        *   Global loading state (`isLoading`).
        *   Notification system (`showNotification`).
        *   Right sidebar visibility (`isRightSidebarOpen`, `toggleRightSidebar`).
    *   Local component state (`useState`, `useMemo`, `useCallback`) is used for component-specific UI logic.
*   **Services (`/services` directory):**
    *   `localStorageService.ts`: Handles persistence of projects and user settings in the browser's local storage.
    *   `geminiService.ts`: Encapsulates all interactions with the Google Gemini API, including model calls, prompt construction, and response parsing.
*   **Routing:** Implicit routing is handled by changes in the `activeProject` and `currentWorkspaceTab` state, which conditionally render different components (`ProjectDashboard` or `ProjectWorkspace`, and then `PRDWizard` or `TaskAgent`).
*   **Styling:** Primarily through Tailwind CSS, with global styles and theme setup in `index.html`.
*   **Data Flow:**
    1.  User interactions in components call functions provided by `AppContext`.
    2.  Context functions update the global state.
    3.  State updates trigger re-renders of relevant components.
    4.  For AI-driven actions, context functions (or component event handlers) call methods in `geminiService.ts`.
    5.  `geminiService.ts` makes API calls. Responses are processed and then used to update the application state via context, leading to UI updates.

## 5. Code Structure

```
/
├── components/         # React UI components
│   ├── Button.tsx
│   ├── CompletionFeedbackModal.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── PRDWizard.tsx
│   ├── ProjectDashboard.tsx
│   ├── ProjectWorkspace.tsx
│   ├── RightSidebar.tsx
│   ├── SettingsModal.tsx
│   ├── TaskAgent.tsx
│   ├── TaskPreview.tsx
│   ├── TaskViewControlBar.tsx
│   ├── TextArea.tsx
│   └── TopHeader.tsx
├── data/               # Mock data
│   └── mockProjects.ts
├── docs/               # Documentation files
│   ├── development-notes.md (this file)
│   └── ui-ux-guide.md
├── icons/              # SVG icons as React components
│   └── *.tsx
├── services/           # Business logic and external API interactions
│   ├── geminiService.ts
│   └── localStorageService.ts
├── utils/              # Utility functions
│   └── prdUtils.ts
├── App.tsx             # Main application component, context provider
├── constants.tsx       # Application-wide constants
├── index.html          # Main HTML entry point, Tailwind CSS setup
├── index.tsx           # React root rendering
├── metadata.json       # Application metadata (name, description, permissions)
└── types.ts            # TypeScript type definitions
```

## 6. Core Features & Implementation Details

### 6.1. Project Management (`ProjectDashboard.tsx`)

*   **CRUD Operations:** Allows users to create, view, edit details of, and delete projects.
*   **Persistence:** Project data is saved to and loaded from local storage via `localStorageService.ts`.
*   **Display:** Projects are listed in a sortable, searchable table.
*   **Archiving:** Projects can be marked as `Archived`.
*   **Creation Modal:**
    *   Offers "Guided Creation" (uses `preAnalyzeForPRDWizard` if sufficient input) or "AI Quick Draft" (uses `generateQuickDraftPRD`).
    *   Supports file upload to extract initial context using `uploadDocumentAndExtractContext`.
    *   Initializes `prdSectionsContent` and a basic `prdMarkdown`.

### 6.2. PRD Wizard (`PRDWizard.tsx`)

*   **Step-Based Workflow:** Guides users through `PRD_WIZARD_STEPS` defined in `constants.tsx`.
*   **Section Editing:** Each step focuses on specific `PRDSectionName`s. Content is stored in `activeProject.prdSectionsContent`.
    *   `localPRDSectionsContent` is used for staged edits within the wizard before saving.
    *   `initialPRDSectionsContent` (from `prdUtils.ts`) provides the default structure.
*   **Rich Content Support:**
    *   Markdown for main section content (`TextArea` + `ReactMarkdown`).
    *   Structured data for specific sections:
        *   **Features:** User stories (modal for add/edit, AI assist, AC generation).
        *   **Target Users:** User personas (modal for add/edit).
        *   **UI/UX Vision:** Theme keywords, inspirations.
        *   **User Flows:** Key flows (modal for add/edit), Mermaid diagram rendering via `MermaidDiagram` component.
        *   **Technology Stack:** Dynamic list for defining tech.
*   **AI Integration:**
    *   `generatePRDSectionDraft`: AI drafts content for individual sections.
    *   `assistUserStory`, `generateAcceptanceCriteria`: AI help for user stories.
    *   `generateNFRSuggestions`, `generateTechStackSuggestions`: AI provides suggestions.
    *   `generateQuickDraftPRD`: AI generates a full PRD skeleton (available in project creation or as an overwrite option in the wizard footer for "Idea" status projects).
    *   Contextual file upload to inform AI.
*   **Status Tracking:** `getSectionStatus` and `getStepStatus` determine completion levels (red, yellow, blue, green) for visual feedback.
*   **Completion Flow:** `CompletionFeedbackModal` prompts users if sections are incomplete before finalizing the PRD.
*   **Output:** Generates/updates `activeProject.prdMarkdown` by concatenating content from `prdSectionsContent`.

### 6.3. Task Agent (`TaskAgent.tsx`)

*   **PRD Analysis:**
    *   `analyzePRDForTaskGeneration` is called to parse the `prdMarkdown` and extract objectives, user roles, features, tech stack, and NFRs. This result (`prdAnalysis`) is crucial for task generation.
*   **Task Generation:**
    *   `generateHierarchicalTasks` uses the `prdAnalysis` and `taskGranularity` setting to create a hierarchical list of `Task` objects.
    *   Tasks include phases, sub-tasks, details, and test strategies.
*   **Task Display (`TaskPreview.tsx`, `TaskItem.tsx`):**
    *   **Views:** Hierarchical, Grouped by Phase, Grouped by Priority. Controlled by `TaskViewControlBar.tsx`.
    *   **Filtering:** Search by text, filter by tags (phase, priority, custom tags).
    *   **Expand/Collapse:** For navigating hierarchical tasks.
*   **Task Detail Sidebar:** Shows comprehensive details of a selected task.
*   **Actions:**
    *   Export tasks (JSON, Markdown, CSV).
    *   Simulated sync to DevOps platform (based on user settings).
    *   Generate Executive Brief (`generateExecutiveBrief`) summarizing PRD and tasks.

### 6.4. Gemini API Integration (`services/geminiService.ts`)

*   **Initialization:**
    *   `ai = new GoogleGenAI({ apiKey: process.env.API_KEY });` is the required method.
    *   Initialization is attempted on first use or if previously failed (but not for hard errors like invalid key).
    *   `geminiInitialized` and `geminiInitializationError` track the state.
*   **API Key:** **Strictly** relies on `process.env.API_KEY` being available in the execution environment. No client-side input or storage of the key.
*   **Core Function:** `safeGenerateContent` is a wrapper for `ai.models.generateContent`.
    *   Defaults to model `gemini-2.5-flash-preview-04-17`.
    *   Handles basic error logging and re-throws critical errors.
*   **JSON Parsing:** `extractJsonFromResponse` is a robust utility to get JSON data from the model's text response.
    *   It handles optional Markdown code fences (e.g., \`\`\`json ... \`\`\`).
    *   Includes a workaround for a specific API response corruption (`}棟{` replaced with `},{`).
    *   Attempts to parse the cleaned string and, on failure, tries to extract the first balanced JSON structure.
*   **Specific AI Functions:** Tailored functions for various features (e.g., `preAnalyzeForPRDWizard`, `generatePRDSectionDraft`, `analyzePRDForTaskGeneration`, `generateHierarchicalTasks`, `generateExecutiveBrief`, `uploadDocumentAndExtractContext`, etc.) construct specific prompts and process responses.
*   **Model Usage:**
    *   Primarily uses `'gemini-2.5-flash-preview-04-17'`.
    *   Uses `config: { responseMimeType: "application/json" }` when expecting JSON output.

### 6.5. UI Components

*   Reusable components (`Button.tsx`, `Input.tsx`, `TextArea.tsx`, `Modal.tsx`) provide consistent styling and behavior.
*   Specialized components handle complex UI parts like the PRD wizard steps, task items, and various modals.

### 6.6. Styling

*   **Tailwind CSS:** Utility classes are used extensively. The configuration in `index.html` enables dark mode (`darkMode: 'class'`), extends the theme (colors, fonts), and sets up Tailwind Typography plugin for Markdown rendering.
*   **Dark/Light Mode:** Applied by toggling the `dark` class on the `<html>` element. Styles adapt using Tailwind's `dark:` variants.
*   **Custom Scrollbars:** CSS in `index.html` provides themed scrollbars.

### 6.7. Mermaid Diagram Integration (`PRDWizard.tsx` -> `MermaidDiagram` component)
*   The `MermaidDiagram` component dynamically renders diagrams based on Mermaid syntax provided in "User Flow" steps.
*   It initializes `mermaid` with the current application theme (light/dark) and re-renders on theme changes or code changes.
*   Includes error display and a retry mechanism if rendering fails.

## 7. State Management (`AppContext`)

*   Provides global state objects like `projects`, `activeProject`, `settings`, `isLoading`, `notification`, `currentWorkspaceTab`, `isRightSidebarOpen`.
*   Offers updater functions (e.g., `updateProject`, `setActiveProject`, `toggleTheme`, `showNotification`, `setIsLoading`, `toggleRightSidebar`).
*   `useMemo` is used to memoize the context value, optimizing performance by preventing unnecessary re-renders of consumers when unrelated parts of the state change.

## 8. Data Persistence (`localStorageService.ts`)

*   `PROJECTS_KEY` (`aipap_projects`) and `SETTINGS_KEY` (`aipap_settings`) are used for storing data in `localStorage`.
*   Handles loading and saving of project arrays and user settings objects.
*   Includes migrations/fallbacks for older data structures (e.g., initializing `prdSectionsContent`, `techStack`, ensuring `lastModifiedDate`).
*   Crucially, `geminiApiKey` is explicitly removed during loading from and saving to local storage to align with the server-side key management strategy.

## 9. Error Handling

*   **API Errors (`geminiService.ts`):**
    *   Basic `console.error` for general API call failures.
    *   `safeGenerateContent` throws specific errors for critical issues like an invalid API key (if detected by the SDK) or if the API is not initialized.
*   **UI Notifications:** The `showNotification` function (from `AppContext`) is used to display user-friendly error (or success) messages as toasts.
*   **File Handling:** Errors during file reading or processing (e.g., size limits, parsing issues) are caught and reported via notifications.

## 10. Key Development Patterns & Considerations

*   **Modularity & Reusability:** Components and services are designed with separation of concerns. UI elements like buttons and modals are reusable.
*   **Accessibility (ARIA):**
    *   Modals (`Modal.tsx`) implement focus trapping, `aria-modal`, `aria-labelledby`.
    *   Buttons and interactive elements have appropriate `aria-label`s or `title` attributes where beneficial, especially for icon-only buttons.
    *   Loading states have `role="status"` and `aria-label`. Notifications use `role="alert"` and `aria-live="assertive"`.
    *   Semantic HTML is used where possible.
*   **Responsiveness:** While primarily desktop-focused, Tailwind's responsive prefixes (sm, md, lg) are used to adapt layout for various screen sizes.
*   **Performance:**
    *   `useMemo` and `useCallback` are utilized to prevent unnecessary computations and re-renders, especially in `AppContext` and components consuming context.
    *   Code splitting is not explicitly managed due to the esm.sh approach, but could be a consideration for larger, self-hosted builds.
    *   Virtualization for potentially long lists (e.g., tasks, projects) is not implemented but could be a future optimization.
*   **Offline Functionality:**
    *   Projects and settings are loaded from local storage, allowing the app to function offline for viewing/editing already loaded data.
    *   AI-dependent features (content generation, analysis) require an internet connection and a valid API key setup.

## 11. Known Issues / Limitations (Example)

*   The current file upload for context extraction has a size limit (5MB) and works best with plain text or Markdown. PDF/DOCX extraction quality can vary.
*   DevOps "sync" is currently a simulation.
*   Mermaid diagram rendering is client-side and might face issues with very complex diagrams or specific syntax variations.

## 12. Future Enhancements (Ideas)

*   Implement real DevOps integration (Azure DevOps/GitHub APIs).
*   Introduce user authentication and cloud-based project storage.
*   Expand AI capabilities (e.g., risk assessment, timeline estimation).
*   Add more sophisticated project management features (e.g., Gantt charts, dependencies between tasks).
*   Full internationalization (i18n) support.
*   Implement a more robust version history for PRD sections or tasks.

This document should serve as a good starting point for developers working on AIPAP1. Remember to keep it updated as the project evolves!
