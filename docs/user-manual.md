# AIPAP1 - User Manual: Getting Started

Okay, I can help you get this application into a usable state. Here's a comprehensive guide:

The application is designed as a client-side Single Page Application (SPA) that heavily relies on the Google Gemini API for its core AI-powered features. Getting it fully usable primarily involves ensuring the API key is correctly configured and then understanding the basic workflow.

## 1. Prerequisites

*   A modern web browser (e.g., Chrome, Firefox, Edge, Safari) that supports ES6 modules.
*   An internet connection to load external modules and access the Google Gemini API.
*   A valid Google Gemini API Key.

## 2. Crucial Step: API Key Configuration

The application is designed to fetch the Google Gemini API key **exclusively** from an environment variable named `process.env.API_KEY`. This is a security best practice, preventing the key from being exposed in client-side code.

**How it's intended to work:**
The `geminiService.ts` file attempts to initialize the Google GenAI client using:
`ai = new GoogleGenAI({ apiKey: process.env.API_KEY });`

This means the JavaScript environment running `geminiService.ts` must have `process.env.API_KEY` defined and accessible.

**For local development or direct client-side serving (like opening `index.html`):**

Since `process.env` is typically associated with Node.js/server-side environments, you'll need to make this variable available to the browser's JavaScript context. The most straightforward way to do this *for local testing without modifying the application's core JavaScript files* is to define it on the `window` object *before* the application scripts load.

**Action:**
You will need to manually edit your local `index.html` file to include a script tag that sets this up. Add the following script block within the `<head>` tag, **before** the `<script type="importmap">` and **before** `<script type="module" src="./index.tsx"></script>`:

```html
<script>
  // --- IMPORTANT: FOR LOCAL TESTING/DEVELOPMENT ONLY ---
  // Replace 'YOUR_GEMINI_API_KEY_HERE' with your actual Google Gemini API Key.
  // This makes the API key available to the client-side JavaScript as if it were an environment variable.
  // DO NOT commit this change with your actual key to version control.
  window.process = {
    env: {
      API_KEY: 'YOUR_GEMINI_API_KEY_HERE'
    }
  };
  // --- END OF LOCAL TESTING CONFIGURATION ---
</script>
```

**Why this approach?**
*   It respects the application's code which expects `process.env.API_KEY`.
*   It avoids modifying the `geminiService.ts` to hardcode the key, adhering to the guidelines.
*   It's a common pattern for making "environment-like" variables available in pure client-side setups during development.

**Important Notes on the API Key:**
*   Without a valid API key configured as above, the application will load, but **all AI-dependent features will fail**, and you'll likely see errors in the console or notifications related to API key issues.
*   The application itself **does not provide any UI** to input or manage the API key.

## 3. Running the Application

1.  **Ensure API Key is Set:** Double-check you've added the script block with your API key to your local `index.html` as described above.
2.  **Open `index.html`:** Simply open the `index.html` file in your chosen modern web browser.
    *   The application uses ES modules loaded via `esm.sh`, so no complex build process or local development server is strictly required to view and interact with it (once the API key is handled).

You should see the "Loading AIPAP1..." screen, followed by the Project Dashboard.

## 4. Basic Usage Workflow

Once the application is running and the API key is correctly configured, here's how to get started:

1.  **Project Dashboard:**
    *   This is your landing page. Initially, it will be empty.
    *   Click "**+ Create New Project**".
    *   Fill in the **Project Name** and a **Project Description**.
    *   **Upload Existing Documents (Optional but Recommended):** If you have any relevant documents (briefs, notes), upload them. This significantly helps the AI understand your project context.
    *   **Choose a Starting Method:**
        *   **Guided Creation:** Good if you have a detailed description or uploaded documents. AI will try to pre-draft some PRD sections.
        *   **AI Quick Draft:** For a very fast start, AI generates a full PRD skeleton.
    *   Click "**Start Guided Creation**" or "**Generate Quick Draft & Start**".

2.  **PRD Wizard:**
    *   You'll be taken to the PRD Wizard for your new project.
    *   Navigate through the steps (Overview, Users & Experience, Features, etc.) using the top step navigator or "Next"/"Previous" buttons.
    *   For each section, you can write content manually or use the "**✨ AI Draft Section**" (or similar AI-assist buttons like "AI Suggest NFRs", "AI Generate User Stories") to get AI-generated starting points.
    *   Utilize the **Right Sidebar** (toggle via the layout icon in the top header) to see a "Live PRD Preview" or get "AI Assistant" tips.
    *   Save your progress using "**Save Draft**".
    *   Once you've completed all sections to your satisfaction, click "**Finish & Go to Tasks**" on the final "Review & Finalize" step.

3.  **Task Agent:**
    *   **Step 1: Analyze PRD:** Click "**Analyze PRD Document**". The AI will process your completed PRD.
    *   **Step 2: Generate Tasks:** Choose your desired **Task Granularity** and click "**Generate Tasks**". The AI will create a hierarchical list of tasks based on the PRD analysis.
    *   **Review Tasks:** Explore tasks using different views (Hierarchical, Phase, Priority), search, and filter by tags using the control bar.
    *   **Task Details:** Click on any task to see its full details in a sidebar that slides from the right.
    *   **Actions:** You can export tasks (JSON, Markdown, CSV) or simulate syncing them to a DevOps platform (if configured in Settings).
    *   **Executive Brief:** Generate an AI-written summary of your project and tasks.

4.  **Settings:**
    *   Access via the cog icon in the main left sidebar.
    *   Here you can configure preferences like the default DevOps platform for simulated sync and task granularity. The API key itself is not managed here.

## 5. Offline Functionality vs. AI Features

*   **Offline:** Project data and settings are stored in your browser's local storage. This means you can view and edit existing project information (like PRD content you've already written or tasks you've generated) even if you're offline.
*   **AI Features:** All features that involve content generation, analysis, or suggestions by the AI (e.g., drafting sections, generating tasks, analyzing PRDs) **require an active internet connection and a correctly configured, valid Google Gemini API Key.**

By following these steps, especially the API key configuration, you should have a fully usable AIPAP1 application ready to accelerate your project planning!
