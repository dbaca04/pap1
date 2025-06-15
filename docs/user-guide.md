# AIPAP1 - User Guide

## 1. Welcome to AIPAP1!

Welcome to the AI Project Acceleration Platform (AIPAP1)! This powerful tool is designed to help you streamline the crucial early phases of your project lifecycle. By leveraging advanced AI, AIPAP1 assists you in:

*   **Defining comprehensive Product Requirements Documents (PRDs)** with guided steps and AI-powered content generation.
*   **Transforming your PRD into actionable project tasks** broken down hierarchically.
*   **Accelerating your project planning process** from idea to a structured task list.

**Who is AIPAP1 for?**
Product managers, project managers, startup founders, business analysts, and anyone involved in defining project scope and planning execution. If you want to build better products faster, AIPAP1 is for you.

## 2. Getting Started

### 2.1. Accessing the Application & API Key Setup
Before you begin, it's crucial to understand how AIPAP1 accesses the Google Gemini API.
*   The application **requires** a Google Gemini API Key to function with AI features.
*   This key is **not** entered through the application's UI. It's expected to be pre-configured in the environment where the application's code is running, specifically as `process.env.API_KEY`.
*   **For local use (opening `index.html` directly):** You must manually add a script to your `index.html` file to simulate this environment variable. Refer to `docs/user-manual.md` for detailed instructions on this critical setup step. **AI features will not work without this.**

Once the API key is correctly configured for your local environment:
1.  Open the `index.html` file in a modern web browser.
2.  Your data (projects, settings) is stored locally in your browser.

### 2.2. The Main Interface at a Glance

When you first open AIPAP1, you'll be greeted by the **Project Dashboard**. The interface consists of a few key areas:

*   **Top Header:** Displays the application name ("AIPAP1") and the current context (e.g., "Dashboard" or the active project's name). It also contains the toggle for the Right Sidebar when a project is active.
*   **Left Sidebar:** Your main navigation hub.
    *   **Dashboard:** Takes you back to the Project Dashboard.
    *   **Project-Specific Navigation (when a project is active):**
        *   **PRD Wizard:** Access the tool to create and edit your PRD.
        *   **Task Agent:** Access the tool to generate and manage tasks from your PRD.
        *   *(Project Settings & Dev Assistant are planned for future updates)*
    *   **Global Actions (Bottom):**
        *   **Collapse/Expand Sidebar:** (Only if a project is active)
        *   **Theme Toggle:** Switch between Light and Dark mode.
        *   **Settings:** Access global application settings.
*   **Main Content Area:** This is where the primary content of the Dashboard, PRD Wizard, or Task Agent is displayed.
*   **Right Sidebar (Contextual Panel):** When a project is active, this panel can be toggled from the Top Header. It provides:
    *   **Live PRD Preview:** See your PRD rendered in real-time as you edit.
    *   **AI Assistant:** Get contextual tips and information about AI features.

### 2.3. Choosing Your Theme
AIPAP1 offers both Light and Dark themes for your visual comfort.
*   **How to Switch:** Click the Moon/Sun icon at the bottom of the Left Sidebar.
*   Your preference is saved automatically.

## 3. Project Management: The Dashboard

The Project Dashboard is where you manage all your projects.

### 3.1. Viewing Your Projects
*   Existing projects are listed in a table.
*   **Search:** Use the search bar to quickly find projects by name or description.
*   **Sort:** Click on column headers (Project Name, Status, Last Modified) to sort the list.

### 3.2. Creating a New Project
Click the "**+ Create New Project**" button to open the creation modal. You'll need to provide:

1.  **Project Name (Required):** A clear and concise name for your project.
2.  **Project Description (Required):** A brief overview of the project's main goal or purpose. The more detail you provide, the better AI can assist later.
3.  **Upload Existing Documents (Optional but Recommended):**
    *   If you have existing documents (e.g., project briefs, research notes, technical specs), upload them here (.txt, .md, .pdf, .docx).
    *   AIPAP1's AI will analyze this content to get a head start on understanding your project, which significantly improves the quality of AI-drafted PRD sections.
4.  **Choose Your Starting Method:**
    *   **Guided Creation:**
        *   **How it works:** If you provide a detailed description (150+ characters) or upload a document, AI will pre-analyze this input and attempt to pre-draft several initial PRD sections for you. You'll then be guided step-by-step through the PRD Wizard to review and complete these sections.
        *   **Best for:** Users who want a structured start with initial AI assistance tailored to their input.
    *   **AI Quick Draft:**
        *   **How it works:** AI instantly generates a full PRD skeleton with placeholder prompts for all standard sections.
        *   **Best for:** Users who want the absolute fastest start and are comfortable refining a more generic template.

Once you've filled in the details, click "**Start Guided Creation**" or "**Generate Quick Draft & Start**". Your new project will be created, and you'll be taken to the Project Workspace.

### 3.3. Project Actions (Kebab Menu)
For each project in the list, click the three-dots (kebab) icon on the right to access actions:
*   **Edit Details:** Change the project's name or description.
*   **Archive/Unarchive:** Move a project to/from an archived state. Archived projects are typically hidden or filtered out but not deleted.
*   **Delete:** Permanently remove a project. You'll be asked for confirmation.

## 4. Working with a Project: The Project Workspace

When you open or create a project, you enter the Project Workspace.

### 4.1. Navigating the Workspace
Use the tabs at the top of the main content area to switch between:
*   **PRD Wizard:** For defining and editing your Product Requirements Document.
*   **Task Agent:** For generating and managing project tasks based on your PRD.
*   *(Project Settings is planned for future updates)*

### 4.2. The Left Sidebar (Project Context)
When a project is active, the Left Sidebar provides quick navigation to its PRD Wizard and Task Agent. You can also collapse/expand this sidebar for more screen space.

### 4.3. The Right Sidebar: Your Contextual Companion
Toggle this panel using the "Layout" icon in the Top Header (top right).
*   **Live PRD Preview:** As you work in the PRD Wizard, this tab shows a real-time, formatted preview of your entire PRD markdown. This is incredibly useful for seeing how your content flows and looks.
*   **AI Assistant:** This tab provides helpful tips, reminders, and explanations related to the AI features available in your current view (PRD Wizard or Task Agent).

## 5. The PRD Wizard: Crafting Your Product Requirements

The PRD Wizard is a step-by-step tool to help you create a comprehensive PRD.

### 5.1. The Step-by-Step Process
*   **Navigation:** At the top of the wizard, you'll see a series of numbered steps (e.g., "Step 1: Overview," "Step 2: Users & Experience"). Click these to navigate.
*   **Status Indicators:** Each step indicator is color-coded to show its completion status:
    *   **Red:** Incomplete / Needs significant attention.
    *   **Yellow:** Partially complete / Needs review or more detail.
    *   **Blue:** AI Drafted / Untouched or minimally touched by the user.
    *   **Green:** Complete / Sufficiently filled.
*   The wizard will try to take you to the first incomplete step when you open a project.

### 5.2. Editing PRD Sections
Each step focuses on one or more PRD sections (e.g., Executive Summary, Features). For each section:
*   **Read the Prompt:** A brief description explains what content is expected.
*   **Content Area:** A large text area is provided for you to write or edit content. Markdown is supported for formatting.
*   **Quick Notes/Scratchpad:** Use the small input fields at the bottom of each section to jot down quick thoughts, to-do items, or questions related to that section.

### 5.3. AI Assistance in the PRD Wizard
AIPAP1 integrates AI directly into the PRD creation process. Look for the **Sparkles icon (`✨`)** for AI-powered actions.

*   **AI Draft Section:** For most text-based sections (like Executive Summary, Problem Statement, Goals), click the "AI Draft Section" button. The AI will generate a starting draft based on your project's name, description, any uploaded context, and existing PRD content.
    *   *Tip: The more context you provide upfront (detailed description, uploaded files), the better the AI drafts will be.*
*   **User Personas (Target Users section):**
    *   After adding a general description for Target Users, click "**+ Add Persona**".
    *   In the modal, you can manually define a persona (Role Name, Description) or use AI to help flesh out details if you provide a starting point.
*   **UI/UX Vision:**
    *   Describe your overall vision in the main text area.
    *   Use the "Conceptual Theme Keywords" inputs to list terms (e.g., "Minimalist," "Playful").
    *   Use the "Admired Applications/Inspirations" text area to note apps whose look and feel you admire and why.
*   **Key User Flows:**
    *   Click "**+ Add User Flow**".
    *   In the modal, define the Flow Name and its Steps.
    *   **Mermaid Diagrams:** You can write Mermaid flowchart syntax directly in the "Steps" field (e.g., `graph TD; A-->B;`). The PRD Wizard (and the Right Sidebar preview) will render this as a visual diagram.
*   **User Stories (Features section):**
    *   Click "**+ Add User Story**".
    *   In the modal:
        *   Fill in "As a...", "I want to...", "So that...".
        *   Click "**✨ AI Assist Story**" if you need help completing or refining any part.
        *   Manually add Acceptance Criteria (ACs) or click "**✨ AI Generate ACs**" for AI to suggest them based on the story.
*   **Technology Stack:**
    *   Manually add technologies by category and name.
    *   Click "**✨ AI Suggest Technologies**". The AI will analyze your project description and features to suggest relevant technologies and add them as notes in the main content area for this section. You can then formally add them to the structured list.
*   **Non-Functional Requirements (NFRs):**
    *   Click "**✨ AI Suggest NFRs**". The AI will suggest common NFRs (like Performance, Security, Usability) based on your project, adding them to the main content area for you to review and integrate.
*   **AI Generate Full PRD Draft (Footer Option):**
    *   If your project is in the "Idea" stage, you'll see an option in the wizard's footer: "**✨ AI Generate Full PRD Draft (Overwrite)**".
    *   This powerful feature will use AI to generate content for *all* PRD sections based on your project name, description, and the first user persona (if defined).
    *   **Caution:** This will overwrite any existing content in your PRD sections. Use it for a very fast start or if you want to completely redraft.

### 5.4. Uploading Documents for Context (Footer)
At any point in the PRD Wizard, you can click the "**Upload Document to Add Context to Current Step**" link in the footer. Upload a relevant file, and AI will extract its key information and append it as context to the main content area of the *current section you are working on*.

### 5.5. Saving Your Work
Click the "**Save Draft**" button in the footer frequently to save your progress.

### 5.6. Review & Finalize (Last Step)
*   The final step provides an overview of all your PRD sections and their completion statuses.
*   You can make last-minute edits directly in the text areas provided for each section in this review step.
*   When you're satisfied, click "**Finish & Go to Task Agent**".
    *   **Completion Feedback:** If any sections are still marked as significantly incomplete (Red, Yellow, or Blue status), a modal will appear. It will list the incomplete sections and offer you two choices:
        1.  **"Let Me Complete Manually":** Closes the modal so you can go back and edit.
        2.  **"AI Draft Incomplete Sections":** AI will attempt to generate content for the listed incomplete sections.
    *   Once all sections are sufficiently complete (Green status), the project status updates to "Requirements Complete," and you can proceed to the Task Agent.

## 6. The Task Agent: Generating and Managing Project Tasks

Once your PRD is marked as "Requirements Complete," the Task Agent helps you break it down into an actionable plan.

### 6.1. Step 1: AI-Powered PRD Analysis
*   **Action:** Click the "**Analyze PRD Document**" button.
*   **Process:** AIPAP1's AI reads your entire PRD to identify:
    *   Core Objectives
    *   Main User Roles
    *   Key Features (including user stories and ACs)
    *   Defined Technology Stack
    *   Critical Non-Functional Requirements (NFRs)
*   **Output:** A summary of this analysis is displayed, showing counts for each category. You can re-analyze if you update your PRD.
    *   *This analysis is crucial for effective task generation.*

### 6.2. Step 2: Task Generation
*   **Choose Task Granularity:** Select how detailed you want the initial tasks to be:
    *   **High-level:** Fewer, broader tasks/epics.
    *   **Detailed:** A balanced level of detail.
    *   **Very Granular:** Many small, specific sub-tasks.
*   **Action:** Click the "**Generate Tasks**" button (enabled after PRD analysis and if a tech stack is defined in the PRD).
*   **Process:** The AI uses the PRD analysis and your chosen granularity to create a hierarchical list of tasks. This includes:
    *   **Phases:** (e.g., Project Foundation, Architecture & Design, Feature Development, Cross-Cutting Concerns)
    *   **Main Tasks/Epics:** Within each phase.
    *   **Sub-Tasks:** Breaking down main tasks into smaller, actionable items.
    *   Each task includes a title, description, details (often step-by-step for developers), and a suggested test strategy.

### 6.3. Viewing and Filtering Tasks

Once tasks are generated, the **Task View Control Bar** appears, offering several ways to manage the display:

*   **Expand/Collapse All:** Quickly show or hide all sub-tasks in the hierarchical view.
*   **View By:**
    *   **Hierarchical (Default):** Shows tasks in their parent-child tree structure.
    *   **Phase:** Groups tasks under their respective project phases (e.g., "Feature Development").
    *   **Priority:** Groups tasks by their priority level (e.g., "Critical," "High").
*   **Search:** Type keywords to filter tasks by title, description, or details.
*   **Filter by Tags:**
    *   Click the "Filter by Tag" button to open a dropdown of all available tags (derived from task phases, priorities, and custom tags defined by AI).
    *   Select one or more tags to show only tasks that match all selected tags.
    *   Active tags are shown below the control bar and can be individually removed.

### 6.4. Understanding Task Display
*   **Task Items (`TaskPreview.tsx`):** Each task is displayed as an item.
    *   **Hierarchy:** Indentation shows parent-child relationships in hierarchical view.
    *   **Expand/Collapse:** Click the chevron icon to show/hide sub-tasks.
    *   **Information Pills:** Quickly see a task's Phase, Priority, Status, and any custom tags. Colors help differentiate (e.g., red for Critical priority).
*   **Selecting a Task:** Click anywhere on a task item (other than the expand/collapse toggle) to select it.

### 6.5. Task Detail Sidebar
When you select a task, its full details appear in a sidebar that slides in from the right:
*   ID, Title, Description
*   Detailed breakdown/steps
*   Test Strategy
*   Phase, Priority, Status
*   Dependencies (if any)
*   Tags
*   List of Sub-task titles (if any)

Click the "X" icon in the sidebar header to close it.

### 6.6. Task Actions
Below the task list (or in a dedicated actions bar), you'll find:
*   **Export Tasks:**
    *   Export your full task list as a JSON, Markdown, or CSV file for use in other tools or for documentation.
*   **Sync to DevOps (Simulated):**
    *   If you've configured a DevOps platform in Settings (e.g., Azure DevOps, GitHub), this button simulates syncing the tasks to that platform.
    *   It shows a notification with a placeholder link and updates the project status to "Tasks Synced."

### 6.7. Generate Executive Brief (Bonus)
*   **Action:** Click the "**Generate Executive Brief**" button.
*   **Process:** The AI uses your PRD and the generated task list to create a concise summary document.
*   **Output:** The brief (in Markdown format) is displayed in a preview area, and you can copy it to your clipboard. This is useful for sharing project overviews with stakeholders.

## 7. Global Settings

Access the Settings Modal by clicking the **Cog icon** at the bottom of the Left Sidebar.

*   **API Key Configuration:** A message clarifies that the Google Gemini API key is managed server-side by the application administrator (via `process.env.API_KEY`) and is not set by the user in this interface.
*   **Preferred DevOps Platform:** Choose your platform (Azure DevOps, GitHub, or None) for the simulated task sync feature in the Task Agent. If you select Azure DevOps or GitHub, fields will appear to enter mock organization/project or repository names.
*   **Default Task Generation Granularity:** Set your preferred default for how detailed tasks should be when generated by the Task Agent.
*   Click "**Save Settings**" to apply your changes.

## 8. Tips for Effective Use

*   **Provide Detailed Input:** The more context you give the AI (detailed project descriptions, uploaded documents, well-defined PRD sections), the more relevant and helpful its suggestions and drafts will be.
*   **Iterate with AI:** Use AI-generated content as a starting point. Review, edit, and refine it to perfectly match your project's unique needs and your expertise. AI is a powerful assistant, not a replacement for your critical thinking.
*   **Save Frequently:** Use the "Save Draft" button in the PRD Wizard regularly.
*   **Use the Right Sidebar:** The Live PRD Preview is invaluable for seeing your document take shape. The AI Assistant tab provides useful contextual hints.
*   **Explore Different Task Views:** Experiment with hierarchical, phase, and priority views in the Task Agent to find the perspective that best suits your planning needs.

Thank you for using AIPAP1! We hope it significantly accelerates your project planning and helps you build amazing products.
