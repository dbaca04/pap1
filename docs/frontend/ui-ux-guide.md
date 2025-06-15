
# AIPAP1 - UI/UX Design Guide

## 1. Introduction

This document outlines the User Interface (UI) and User Experience (UX) design for the AI Project Acceleration Platform (AIPAP1). AIPAP1 is an AI-powered platform designed to assist in defining Product Requirements Documents (PRDs), generating project tasks, and streamlining project planning. This guide serves as a reference for understanding the design principles, user flows, and visual language of the application.

**Core Design Principles:**

*   **Clarity:** Interfaces are intuitive and easy to understand, minimizing cognitive load.
*   **Efficiency:** Users can accomplish tasks quickly and with minimal friction. AI assistance is integrated seamlessly.
*   **Consistency:** UI elements and interaction patterns are consistent across the application.
*   **Accessibility:** The design aims to be usable by people with a wide range of abilities, incorporating ARIA attributes and keyboard navigation.
*   **Aesthetics:** A modern, clean, and professional look and feel that is also engaging. Dark and light themes enhance user preference.
*   **Responsiveness:** The application is designed to work well across various screen sizes, focusing primarily on desktop use but with considerations for tablet-like interfaces where applicable.

## 2. Global UI/UX Elements

These elements are present across multiple parts of the application, ensuring a consistent experience.

### 2.1. Theme (Light/Dark Mode)

*   **Visuals:** The application supports both Light and Dark themes. The Light theme uses a `slate-50` background with `slate-900` text. The Dark theme uses a `slate-900` background with `slate-50` text. Accent colors (primarily `sky` blue) are used for interactive elements and highlights.
*   **Switching:** Users can toggle the theme using a dedicated button in the main left sidebar. The setting is persisted in local storage. The `<html>` tag dynamically receives a `dark` class to apply theme-specific styles.
*   **Impact:** Theme changes affect background colors, text colors, and component-specific styles (e.g., code blocks in Markdown previews, Mermaid diagrams).

### 2.2. Loading States

*   **Initial App Load:**
    *   **Visuals:** A full-screen loading indicator is displayed while the main application bundle loads. It features a "blueprint" grid pattern (`sky-900` background with light blue lines) and the text "Loading AIPAP1..." (`sky-300` color). The text has a subtle pulsing animation.
    *   **Purpose:** Provides feedback that the application is starting.
*   **Async Operations (Global):**
    *   **Visuals:** When `isLoading` is true in the `AppContext`, a semi-transparent black overlay (`bg-black bg-opacity-60`) covers the screen with a centered, animated spinner (sky blue border).
    *   **Purpose:** Indicates background processing, such as API calls to Gemini, preventing user interaction with the underlying UI until complete.
    *   **Accessibility:** Includes `aria-label="Loading content"` and `role="status"`.

### 2.3. Notifications

*   **Visuals:** Small toast-like notifications appear at the bottom-right of the screen.
    *   Success: Green background (`bg-green-500`).
    *   Error: Red background (`bg-red-500`).
    *   Text is white.
    *   They have a fade-in/slide-up animation when appearing and fade-out/slide-down when disappearing.
*   **Behavior:** Notifications are triggered by `showNotification` from `AppContext`. They automatically dismiss after a configurable duration (default 3 seconds).
*   **Purpose:** Provide non-intrusive feedback for actions like saving settings, project updates, or errors.
*   **Accessibility:** `role="alert"` and `aria-live="assertive"`.

### 2.4. Navigation Principles

*   **Primary Navigation:** A collapsible left sidebar provides access to the main sections (Dashboard, active project views).
*   **Secondary/Contextual Navigation:**
    *   Within the Project Workspace, tabs are used to switch between PRD Wizard, Task Agent, etc.
    *   Within the PRD Wizard, a step-based navigation guides the user.
*   **Action Buttons:** Consistently styled buttons are used for primary, secondary, and destructive actions.
*   **Icons:** Heroicons are used extensively for visual cues and to save space, especially in collapsed states or for common actions.

### 2.5. Custom Scrollbars

*   **Visuals:** Thin, minimally styled scrollbars are used for scrollable areas.
    *   Light Mode: `slate-400` thumb, transparent track. Hover makes thumb `slate-500`.
    *   Dark Mode: `slate-600` thumb, transparent track. Hover makes thumb `slate-700`.
*   **Purpose:** Enhances the aesthetic appeal by replacing default browser scrollbars with a more integrated look. Applied to elements with the `custom-scrollbar` class.

## 3. Main Application Layout (`App.tsx`)

The main layout orchestrates the primary UI regions.

### 3.1. Top Header (`TopHeader.tsx`)

*   **Visuals:** A fixed-height (14 units) bar at the top. `bg-white dark:bg-slate-800` with a bottom border.
*   **Content (Left):**
    *   App Logo/Icon (`SparklesIcon`, sky blue).
    *   App Name (`AppName` constant, "AIPAP1", sky blue text).
*   **Content (Center):**
    *   Displays the name of the `activeProject` or "Dashboard" if no project is active. Truncated if too long.
*   **Content (Right):**
    *   **Right Sidebar Toggle:** A button with `LayoutSidebarRightIcon`. Only visible when a project is active. Toggles the `RightSidebar` panel. Changes appearance (`bg-sky-100 dark:bg-slate-700`) when the sidebar is open.
*   **Purpose:** Provides global branding, current context (project name), and access to the contextual right sidebar.

### 3.2. Left Sidebar (`main-sidebar` in `App.tsx`)

*   **Visuals:**
    *   Positioned on the left, full height. `bg-slate-200 dark:bg-slate-900` with a right shadow.
    *   **Collapsible:** Transitions between `w-20` (collapsed) and `w-64` (expanded). The sidebar is always collapsed if no project is active. The collapse/expand button only appears if a project is active.
*   **Structure:**
    *   **Top Section (Navigation):**
        *   **Dashboard Button:** `BriefcaseIcon`. Navigates to `ProjectDashboard` (sets `activeProject` to `null`).
        *   **Active Project Section (Conditional):**
            *   Separator line.
            *   Project Name Label (only in expanded view, truncated).
            *   **PRD Wizard Button:** `DocumentTextIcon`. Sets `currentWorkspaceTab` to `PRD`. Active state style when selected.
            *   **Task Agent Button:** `ListBulletIcon`. Sets `currentWorkspaceTab` to `Tasks`. Active state style when selected.
            *   **Project Settings Button:** `CogIcon`. Disabled. Shows "Coming Soon" notification.
            *   **Dev Assistant Button:** `SparklesIcon`. Disabled. Labeled "Soon".
    *   **Bottom Section (Actions):**
        *   Separator line.
        *   **Collapse/Expand Button:** `ChevronRightIcon` (expand) or `ChevronLeftIcon` (collapse). Only visible when a project is active. Toggles `isSidebarCollapsed`.
        *   **Theme Toggle Button:** `MoonIcon` (to switch to dark) or `SunIcon` (to switch to light).
        *   **Global Settings Button:** `SettingsIcon`. Opens the `SettingsModal`.
*   **Behavior:**
    *   Buttons in collapsed view show only icons with tooltips for their labels.
    *   In expanded view, icons are accompanied by text labels.
    *   Hover states provide visual feedback (`bg-sky-100 dark:hover:bg-slate-700`).

### 3.3. Main Content Area

*   **Visuals:** Occupies the remaining space to the right of the Left Sidebar and to the left of the Right Sidebar (if open). `bg-slate-50 dark:bg-slate-800`.
*   **Content:** Dynamically renders either:
    *   `ProjectDashboard.tsx` (if `activeProject` is `null`).
    *   `ProjectWorkspace.tsx` (if `activeProject` is selected).
*   **Behavior:** Overflowing content is scrollable (uses custom scrollbar).

### 3.4. Right Sidebar (`RightSidebar.tsx`) - Contextual Panel

*   **Visuals:**
    *   Slides in from the right when toggled by the `TopHeader` button. Fixed position. `bg-slate-100 dark:bg-slate-800/80` with backdrop blur, giving a semi-transparent look over content.
    *   Width: 96 units (384px).
*   **Header:**
    *   Toggle buttons: "Live PRD Preview" (`EyeIcon`) and "AI Assistant" (`SparklesIcon`). Selected view is highlighted.
    *   Close button (`XIcon`).
*   **Content Area:** Scrollable.
    *   **Live PRD Preview View:**
        *   Displays the `activeProject.prdMarkdown` rendered as HTML using `ReactMarkdown` with GFM support.
        *   Styled with Tailwind Typography plugin for readability.
    *   **AI Assistant View:**
        *   Displays contextual help text based on the `currentWorkspaceTab` (PRD, Tasks).
        *   Provides tips and reminders about AI features.
*   **Purpose:** Offers a persistent contextual panel for users to preview their PRD in real-time or get AI-related guidance without leaving their current workspace view.
*   **Behavior:** Only available when a project is active. Its visibility is controlled by `isRightSidebarOpen` state.

## 4. Project Dashboard (`ProjectDashboard.tsx`)

This is the landing page of the application if no project is active, or when the user navigates back from a project.

### 4.1. Overview & Purpose

Displays a list of all user projects, allows creation of new projects, and provides basic project management actions (edit, delete, archive).

### 4.2. Header & Controls

*   **Header:**
    *   Title: "My Projects" (H1).
    *   Tagline: "Your centralized hub for every great idea."
*   **Controls (Row):**
    *   **Search Bar:** `Input` field with a `SearchIcon`. Filters the project list by name or description.
    *   **Create New Project Button:** Primary button with `PlusIcon`. Opens the `Create Project Modal`.

### 4.3. Project List / Table

*   **Visuals:** A table displayed within a bordered, shadowed container (`bg-white dark:bg-slate-800`).
*   **Columns:**
    *   **Project Name:** Clickable link that sets the project as active and navigates to `ProjectWorkspace`. Text is sky blue.
    *   **Status:** Displays project status (`ProjectStatus` enum) as a colored pill. Pill colors vary by status (e.g., Idea: slate, PRD Definition: blue, Requirements Complete: indigo, etc.).
    *   **Description:** Truncated text of the project description. Full description on hover via `title` attribute.
    *   **Last Modified:** Human-readable relative date (e.g., "Today", "Yesterday", "Oct 21, 2023"). Full timestamp on hover.
    *   **Actions:** Contains a kebab menu button (`DotsVerticalIcon`).
*   **Sorting:** Column headers for "Project Name", "Status", and "Last Modified" are clickable to sort the table. An arrow icon (`ChevronUpIcon` / `ChevronDownIcon`) indicates the current sort key and direction.
*   **Hover:** Rows have a subtle background change on hover.

### 4.4. Kebab Menu Actions (per project row)

*   **Visuals:** A small dropdown menu (`bg-white dark:bg-slate-700`) appears when the kebab icon is clicked.
*   **Actions:**
    *   **Edit Details:** Opens the `Edit Project Modal` pre-filled with the project's data.
    *   **Archive / Unarchive:** Toggles the project's status to/from `ProjectStatus.Archived`.
    *   **Delete:** Prompts for confirmation, then deletes the project. Text is red.

### 4.5. Empty States

*   **No Projects Yet:**
    *   Displayed if `projects` array is empty and no search term is active.
    *   Visuals: Large `FolderPlusIcon` (sky blue), "Let's Build Something Great" title, descriptive paragraph, and a "Create New Project" button.
*   **No Search Results:**
    *   Displayed if `filteredProjects` is empty due to an active `searchTerm`.
    *   Visuals: Simple message: "No projects found for "{searchTerm}". Try a different search term."

### 4.6. Create New Project Modal (`Modal` component)

*   **Title:** "Start a New Project". Size `xl`.
*   **Fields:**
    *   **Project Name (Required):** `Input` field.
    *   **Project Description (Required):** `TextArea` field with placeholder guiding users to provide details for AI. Informational text below about AI pre-drafting.
    *   **File Upload Area:**
        *   Label: "Have existing documents? Give your AI Architect a head start."
        *   Visuals: Dashed border area with `FolderDownloadIcon`. Supports drag & drop and click-to-browse. Changes appearance on drag-enter.
        *   Accepted file types: .txt, .md, .pdf, .docx (with a note about PDF/DOCX quality).
        *   Selected file display: Shows file name and size, with a remove button (`XIcon`).
        *   Error display: Shows file size error if applicable.
    *   **Quick Start Options (Radio Group):**
        *   **Guided Creation:** `PencilIcon`. Description: "AI assists by pre-drafting PRD sections from your input, then guides you step-by-step."
        *   **AI Quick Draft:** `SparklesIcon`. Description: "AI generates a full PRD skeleton instantly. Best for a very fast start, then refine."
        *   Selected option has enhanced border and background.
*   **Footer:**
    *   **Cancel Button:** Secondary variant.
    *   **Create Project Button:** Primary variant. Text changes based on `quickStartOption` ("Start Guided Creation" or "Generate Quick Draft & Start"). Disabled if name or description is empty.
*   **Behavior:**
    *   On submit, if "Guided Creation" is chosen and description is long or a file is uploaded, `preAnalyzeForPRDWizard` is called.
    *   If "AI Quick Draft" is chosen, `generateQuickDraftPRD` is called.
    *   A new project is created, added to state, and set as active, navigating the user to the `ProjectWorkspace`.
    *   File content is processed by `uploadDocumentAndExtractContext` for summary.

### 4.7. Edit Project Modal (`Modal` component)

*   **Title:** "Edit Project: {Project Name}". Size `lg`.
*   **Fields:**
    *   **Project Name (Required):** `Input` field.
    *   **Project Description:** `TextArea` field.
*   **Footer:**
    *   **Cancel Button:** Secondary variant.
    *   **Save Changes Button:** Primary variant.
*   **Behavior:** Updates the selected project's name and description.

## 5. Project Workspace (`ProjectWorkspace.tsx`)

This view is active when a project is selected. It houses the tools for working on that specific project.

### 5.1. Overview & Purpose

Provides a tabbed interface to switch between different aspects of project development, primarily the PRD Wizard and Task Agent.

### 5.2. Tabbed Navigation

*   **Visuals:** Tabs are displayed horizontally at the top of the workspace content area, below the main `TopHeader`.
    *   Active Tab: `bg-white dark:bg-slate-800`, sky blue text and bottom border.
    *   Inactive Tabs: `slate-500 dark:text-slate-400` text, hover changes background and text color.
*   **Tabs:**
    *   **PRD Wizard:** `DocumentTextIcon`.
    *   **Task Agent:** `ListBulletIcon`.
    *   **Project Settings:** `CogIcon`. Currently disabled (shows "Coming Soon" notification on click via `App.tsx` logic, button itself is also styled disabled).
*   **Behavior:** Clicking a tab switches the content displayed in the main area of the `ProjectWorkspace`.

## 6. PRD Wizard (`PRDWizard.tsx`)

The PRD Wizard guides users through creating and editing a Product Requirements Document.

### 6.1. Overview & Purpose

A step-by-step interface for defining all sections of a PRD, with integrated AI assistance for content generation and refinement.

### 6.2. Step Navigation (Header)

*   **Visuals:** Located in the `PRDWizard` header.
    *   Displays the current step's name (e.g., "Step 1: Overview") and a brief description.
    *   A horizontal list of numbered step indicators.
*   **Step Indicators:**
    *   **Appearance:** Circular buttons. Color indicates status:
        *   `Red`: Incomplete / Needs significant attention.
        *   `Yellow`: Partially complete / Needs review or more detail.
        *   `Blue`: AI Drafted / Untouched or minimally touched by user.
        *   `Green`: Complete / Sufficiently filled.
    *   Current Step: Highlighted with a stronger color and ring.
    *   Completed Previous Steps (if Green): Show a checkmark.
    *   Collapsed View (Smaller Screens): May show only numbers or icons if text doesn't fit.
*   **Behavior:** Users can click on step indicators to navigate to that step. The wizard also determines an initial step based on project status or first incomplete step.

### 6.3. Section Editing Interface (Main Content Area)

For each step, relevant PRD sections are displayed for editing.

#### 6.3.1. Common Elements (per section card)

*   **Visuals:** Each section is typically presented in a card-like container (`bg-white dark:bg-slate-800`, shadow, border colored by section status).
*   **Section Title:** Large, prominent heading (e.g., "Executive Summary").
*   **AI Draft/Suggest Button:** `SparklesIcon`. Contextual button to trigger AI generation for that specific section's content or for suggestions (e.g., NFRs, Tech Stack). Not available for all sections or if section has very specific custom UI (e.g. Technology list).
*   **Prompt/Description:** A brief helper text explaining what content is expected for this section.
*   **Main Content Area:** A `TextArea` for users to input/edit the main textual content of the section. Supports Markdown.
*   **Quick Notes / Scratchpad:**
    *   A list of small `Input` fields at the bottom of each section.
    *   Allows users to jot down quick thoughts or to-do items related to the section.
    *   Add/Remove buttons for notes.

#### 6.3.2. Specific Section UIs

Some sections have specialized UI elements in addition to or replacing the main `TextArea`.

*   **Executive Summary, Problem Statement, Goals/Objectives, Design Principles, Out of Scope:** Primarily use the main `TextArea` for content.
*   **Target Users:**
    *   Main `TextArea` for general description.
    *   **User Personas List:** Displays existing personas (Role Name, Description).
    *   "Add Persona" button opens `PersonaModal`.
    *   Edit/Delete buttons per persona.
*   **UI/UX Vision:**
    *   Main `TextArea` for overall vision.
    *   **Conceptual Theme Keywords:** List of `Input` fields for keywords (e.g., "Minimalist", "Playful"). Add/Remove keyword buttons.
    *   **Admired Applications / Inspirations:** `TextArea` for listing inspirational apps and why.
*   **Key User Flows:**
    *   Main `TextArea` for an overview.
    *   **User Flows List:** Displays existing flows (Flow Name, Steps preview).
    *   "Add User Flow" button opens `UserFlowModal`.
    *   Edit/Delete buttons per flow.
    *   **Mermaid Diagram Preview:** If a flow's `steps` content starts with Mermaid syntax (e.g., `graph TD;`), a `MermaidDiagram` component renders a visual preview. Handles errors and theme changes.
*   **Features:**
    *   Main `TextArea` for general feature overview.
    *   **User Stories List:** Displays existing stories ("As a..., I want to..., so that..."). Can expand to show Acceptance Criteria.
    *   "Add User Story" button opens `UserStoryModal`.
    *   Edit/Delete buttons per story.
*   **Technology Stack:**
    *   Main `TextArea` for general notes or rationale.
    *   **Defined Technologies List:** Each item has:
        *   Category: `select` dropdown (Frontend, Backend, Database, etc.).
        *   Name: `Input` field.
        *   Remove button.
    *   "Add Technology" button.
    *   "AI Suggest Technologies" button (adds suggestions to the notes/main content area).
*   **Non-Functional Requirements (NFRs):**
    *   Main `TextArea` for defining NFRs.
    *   "AI Suggest NFRs" button (adds suggestions to the content area).

### 6.4. Modals within PRD Wizard

*   **User Story Modal:**
    *   Fields: "As a..." (Role), "I want to..." (Action), "So that..." (Benefit) - all `Input` or `TextArea`.
    *   AI Assist Story button: `SparklesIcon`. Calls `assistUserStory` to help complete/refine the story parts.
    *   Acceptance Criteria: List of `Input` fields. Add/Remove AC buttons.
    *   AI Generate ACs button: `SparklesIcon`. Calls `generateAcceptanceCriteria`.
    *   Footer: Cancel, Save Story.
*   **Persona Modal:**
    *   Fields: Role Name/Title (`Input`), Description (Needs, Goals, Pain Points - `TextArea`).
    *   Footer: Cancel, Save Persona.
*   **User Flow Modal:**
    *   Fields: Flow Name (`Input`), Steps (`TextArea` - supports plain text or Mermaid code).
    *   Mermaid Preview: If steps contain Mermaid code, a live preview is shown.
    *   Footer: Cancel, Save Flow.

### 6.5. File Upload Integration

*   **Location:** A small link/button in the footer ("Upload Document to Add Context to Current Step").
*   **Behavior:** Opens a file dialog. On file selection:
    *   File content is read and passed to `uploadDocumentAndExtractContext`.
    *   The extracted summary is appended to a relevant section (e.g., Problem Statement or a designated context section) of the current step.
    *   Notification confirms context addition.

### 6.6. Footer Controls

*   **Visuals:** Sticky footer at the bottom of the `PRDWizard`.
*   **Buttons:**
    *   **Previous Button:** `ChevronLeftIcon`. Navigates to the previous step. Disabled on the first step.
    *   **Save Draft Button:** Saves the current state of `localPRDSectionsContent` and the generated `prdMarkdown` to the `activeProject`.
    *   **Next Button:** `ChevronRightIcon`. Navigates to the next step.
    *   **Finish & Go to Tasks Button:** (On the last step) Primary button (green). Triggers PRD completion check.
*   **AI Generate Full PRD Button (Conditional):** `SparklesIcon`. Appears if the project status is "Idea". Prompts for confirmation, then calls `generateQuickDraftPRD` to overwrite all current PRD content with an AI draft.

### 6.7. Completion Feedback Modal (`CompletionFeedbackModal.tsx`)

*   **Trigger:** Shown when user clicks "Finish & Go to Tasks" if `checkPRDCompletion` finds incomplete sections (Red, Yellow, or Blue status).
*   **Content:**
    *   Title: "PRD Needs More Detail".
    *   Message explaining the issue.
    *   List of incomplete sections.
    *   Options:
        *   "Let Me Complete Manually" button (`PencilIcon`). Closes modal, potentially navigates to the first incomplete section.
        *   "AI Draft Incomplete Sections" button (`SparklesIcon`). Closes modal, calls AI to draft listed sections, then re-checks completion.
*   **Purpose:** Prevents users from moving to Task Generation with a significantly incomplete PRD, offering paths to resolution.

## 7. Task Agent (`TaskAgent.tsx`)

This view allows users to generate and review project tasks based on the completed PRD.

### 7.1. Overview & Purpose

Transforms the PRD into a structured list of development tasks, with different views and export options.

### 7.2. Control Panel (Top Section)

*   **Visuals:** A prominent section at the top, typically with a distinct background (`bg-white dark:bg-slate-800`).
*   **Step 1: Analyze PRD:**
    *   **Button:** "Analyze PRD Document" (`SparklesIcon`). Enabled if PRD has content. Triggers `analyzePRDForTaskGeneration`.
    *   **Status Display (If Analyzed):** Shows a summary of the analysis (Objectives, User Roles, Key Features count). "Re-Analyze" button available.
    *   **Error/Guidance:** Messages appear if PRD is too short or analysis fails.
*   **Step 2: Generate Tasks:**
    *   **Task Granularity Select:** Dropdown (High-level, Detailed, Very Granular).
    *   **Button:** "Generate Tasks" (`SparklesIcon`). Enabled if PRD is analyzed and tech stack is defined. Triggers `generateHierarchicalTasks`. Styled distinctively (e.g., green) when enabled.
    *   **Error/Guidance:** Messages appear if tech stack is missing or PRD not analyzed.

### 7.3. Task View Control Bar (`TaskViewControlBar.tsx`)

*   **Visuals:** A horizontal bar below the main control panel, usually with a slightly different background (`bg-slate-100 dark:bg-slate-700/60`).
*   **Controls:**
    *   **Expand/Collapse All Buttons:** Buttons to globally expand or collapse all hierarchical task items.
    *   **View By Dropdown:** Select menu to switch task display:
        *   `Hierarchical`: Default tree view.
        *   `Phase`: Tasks grouped by `task.phase`.
        *   `Priority`: Tasks grouped by `task.priority`.
    *   **Search Input:** `Input` field with `SearchIcon`. Filters tasks by title or keywords in description/details.
    *   **Filter by Tags Dropdown:**
        *   Button (`TagIcon`) showing "Filter by Tag" and count of selected tags.
        *   Dropdown panel lists all available tags (from `task.tags`, `task.phase`, `task.priority`) with checkboxes.
        *   Selected tags are displayed below the bar with remove (`XIcon`) options. "Clear All Tags" button.

### 7.4. Task Display Area (`TaskPreview.tsx`)

*   **Visuals:** The main area where tasks are listed.
*   **Behavior:** Content and structure change based on `viewMode`.
*   **Hierarchical View:**
    *   Tasks are rendered as a nested list (`ul`/`li`). `TaskItem` component handles individual task rendering.
    *   Indentation visually represents hierarchy.
*   **Grouped Views (Phase, Priority):**
    *   Tasks are grouped under expandable/collapsible `GroupHeader` components (e.g., "Phase: Feature Development").
    *   Within each group, tasks are typically listed flatly but can still show sub-tasks if `TaskItem` is configured to do so.
*   **Task Item (`TaskItem.tsx`):**
    *   **Visuals:** Card-like appearance. Selected task has a highlight (ring or background).
    *   **Expand/Collapse Toggle:** `ChevronUpIcon`/`ChevronDownIcon` if the task has sub-tasks.
    *   **Title:** Prominently displayed.
    *   **Pills:** Small, colored tags displaying:
        *   Phase (e.g., "Feature Development" - purple).
        *   Priority (e.g., "High" - red/amber).
        *   Status (e.g., "To Do" - blue).
        *   Custom tags.
        *   Pill colors are distinct for different categories/values.
    *   **Interaction:** Clicking a task item (not the expand toggle) selects it and opens its details in the `Task Detail Sidebar`.
    *   **Filtering Behavior:**
        *   If an item or its descendant matches filters, it's shown.
        *   If an item itself doesn't match but a descendant does (in hierarchical view), the item might be dimmed (`opacity-60`) to indicate it's a non-matching parent of a match.

### 7.5. Task Detail Sidebar (Part of `TaskAgent.tsx` Layout)

*   **Visuals:** Slides in from the right, similar to `RightSidebar` but dedicated to task details. Fixed position, width `md:w-1/3 xl:w-1/4`.
*   **Trigger:** Opens when a `TaskItem` is clicked.
*   **Header:**
    *   "Task: {Task Title}" (truncated).
    *   Close button (`XIcon`).
*   **Content:** Displays details of the `selectedTask`:
    *   ID.
    *   Description (whitespace-pre-wrap).
    *   Details (pre-formatted, scrollable if long).
    *   Test Strategy (pre-formatted, scrollable if long).
    *   Phase, Priority, Status (often as pills or styled text).
    *   Dependencies (comma-separated list).
    *   Tags (list of pills).
    *   Sub-tasks (simple list of titles, if any).
*   **Purpose:** Provides a focused view of a single task's complete information without cluttering the main list.

### 7.6. Action Buttons (Below Task List or in a dedicated actions bar)

*   **Sync to DevOps:** Button appears if `settings.devOpsPlatform` is not 'None'. Simulates syncing tasks and updates project status. Shows a notification with a placeholder link.
*   **Export Buttons:**
    *   "Export JSON"
    *   "Export Markdown"
    *   "Export CSV"
    *   Each button triggers a file download of the tasks in the specified format.

### 7.7. Executive Brief Generation

*   **Visuals:** A section usually at the bottom or side.
*   **Button:** "Generate Executive Brief" (`FileTextIcon`).
*   **Preview Area (If Generated):**
    *   `TextArea` or `pre` tag showing the Markdown content of the brief.
    *   "Copy Brief" button (`CopyIcon`).
*   **Behavior:** Calls `generateExecutiveBrief` with the current project and its tasks.

### 7.8. Empty State

*   **Visuals:** If no tasks are generated yet.
    *   Contextual message: "Ready to Understand Your PRD?" or "PRD Analyzed! Let's Create Some Tasks."
    *   A simple visual flow diagram (1. PRD Input &rarr; 2. AI Analysis &rarr; 3. Task Generation) to guide the user.

## 8. Settings Modal (`SettingsModal.tsx`)

Accessible from the main left sidebar, allows users to configure global application settings.

### 8.1. Purpose & Access

Centralized location for user-specific preferences and configurations that affect AI behavior or integrations.

### 8.2. API Key Configuration

*   **Visuals:** An informational paragraph is displayed.
*   **Content:** "The Google Gemini API key is configured server-side (via `process.env.API_KEY`) by the application administrator. AI-powered features will be available if the key is correctly set up."
*   **Behavior:** No input field for the API key is present in the UI. This acknowledges the backend-managed API key requirement.

### 8.3. DevOps Integration Settings

*   **Preferred DevOps Platform:** `select` dropdown (None, Azure DevOps, GitHub).
*   **Conditional Fields:**
    *   If "Azure DevOps" selected:
        *   Azure DevOps Organization (`Input`).
        *   Azure DevOps Project (`Input`).
    *   If "GitHub" selected:
        *   GitHub Repository (owner/repo - `Input`).
*   **Purpose:** Allows users to specify their DevOps platform for simulated task syncing.

### 8.4. Task Granularity Settings

*   **Default Task Generation Granularity:** `select` dropdown (High-level, Detailed, Very Granular).
*   **Purpose:** Sets the default granularity preference used by the `TaskAgent` when generating tasks.

### 8.5. Footer

*   **Cancel Button.**
*   **Save Settings Button.**
*   **Focus Management:** The modal implements focus trapping. The first interactive element (DevOps platform select) receives focus on open. Tab and Shift+Tab cycle through focusable elements within the modal. Escape key closes the modal.

## 9. Right Sidebar (Contextual Panel - `RightSidebar.tsx`)

Already detailed in section 3.4, but reiterated here for completeness as a major UI component.

*   **Toggling:** Via `LayoutSidebarRightIcon` in `TopHeader`.
*   **Views:**
    *   **Live PRD Preview:** Real-time Markdown rendering of the active project's PRD.
    *   **AI Assistant:** Contextual help and tips based on `currentWorkspaceTab`.
*   **Purpose:** Provides non-intrusive, readily available contextual information or help.

## 10. Common Reusable Components

### 10.1. `Button.tsx`
*   **Props:** `variant` ('primary', 'secondary', 'danger', 'ghost'), `size` ('sm', 'md', 'lg'), standard button attributes.
*   **Styling:** Consistent base style with variations for different semantic purposes and sizes. Includes focus, hover, and disabled states. Flex properties for icon alignment.

### 10.2. `Input.tsx`
*   **Styling:** Standardized appearance for text inputs, including border, focus ring, background (theme-aware), and placeholder text styling.

### 10.3. `TextArea.tsx`
*   **Styling:** Similar to `Input.tsx` but for multi-line text entry.

### 10.4. `Modal.tsx`
*   **Props:** `isOpen`, `onClose`, `title`, `children`, `footer`, `titleId`, `size`.
*   **Behavior:** Full-screen overlay, centered content box. Handles click-outside-to-close (on overlay), Escape key, and focus trapping.
*   **Styling:** Theme-aware backgrounds, distinct header/content/footer areas.

## 11. Icons

Heroicons are used throughout the application. They are:
*   SVG-based, ensuring scalability and crispness.
*   Consistently styled (stroke-based).
*   Used to enhance understandability and provide visual affordances for actions.
*   Examples: `SparklesIcon` for AI features, `BriefcaseIcon` for Dashboard, `PlusIcon` for Add, `TrashIcon` for Delete, etc.

## 12. Conclusion

The UI/UX design of AIPAP1 focuses on creating a powerful yet user-friendly tool for project planning and requirements definition. By integrating AI assistance seamlessly and providing clear, efficient workflows, AIPAP1 aims to accelerate project lifecycles and improve the quality of project documentation and task breakdown. Continuous iteration based on user feedback will be key to refining and enhancing this experience.