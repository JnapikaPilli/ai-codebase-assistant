# RepoLens — CLAUDE.md

This file provides project context, architecture guidance, and conventions for Claude (or any AI assistant) working on this codebase.

---

## Project Overview

**RepoLens** is a React frontend developer tool that lets users analyze GitHub repositories using AI. Users paste a repo URL, trigger an analysis, then ask natural language questions about the codebase. The backend is pre-built and exposes two REST endpoints.

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18 (functional components + hooks) |
| Styling   | Scoped `<style>` tags per component (no CSS-in-JS lib, no Tailwind) |
| HTTP      | Native `fetch` API                |
| Backend   | Python Flask API |

---

## Project Structure

```
src/
├── App.js                   # Root component, all global state lives here
└── components/
    ├── RepoInput.js         # GitHub URL input + Analyze button
    ├── QuestionInput.js     # Question textarea + Ask AI button
    └── AnswerDisplay.js     # Renders AI answer or loading skeleton
CLAUDE.md                    # This file
```

---

## Backend API Reference

### POST `/repo/analyze`
Analyzes a GitHub repository and indexes its files.

**Request:**
```json
{ "repo_url": "https://github.com/user/repo" }
```

**Response:**
```json
{ "repo_id": 1, "files_stored": ["file1.py", "file2.js", ...] }
```

---

### POST `/repo/question`
Asks a natural language question about an already-analyzed repository.

**Request:**
```json
{ "repo_id": 1, "question": "What does this repository do?" }
```

**Response:**
```json
{ "answer": "AI explanation..." }
```

---

## State Architecture (App.js)

All shared state is managed in `App.js` and passed down as props:

| State variable  | Type      | Description                                      |
|-----------------|-----------|--------------------------------------------------|
| `repoId`        | `number`  | ID returned after successful `/repo/analyze`     |
| `filesStored`   | `array`   | List of indexed files from the analyze response  |
| `answer`        | `string`  | AI answer from `/repo/question`                  |
| `analyzing`     | `boolean` | Loading state for the analyze request            |
| `asking`        | `boolean` | Loading state for the question request           |
| `analyzeError`  | `string`  | Error message from analyze request               |
| `askError`      | `string`  | Error message from question request              |

**UI visibility is state-driven:**
- Section 1 (RepoInput) — always visible
- Section 2 (QuestionInput) — shown only when `repoId` is set
- Section 3 (AnswerDisplay) — shown only when `answer` is non-empty or `asking` is true

---

## Component Contracts

### `<RepoInput onAnalyze={fn} loading={bool} />`
- Renders a URL input and "Analyze Repository" button
- Calls `onAnalyze(repoUrl)` on form submit
- Disables input and button while `loading` is true
- Shows a CSS spinner inside the button during loading

### `<QuestionInput onAsk={fn} loading={bool} />`
- Renders a textarea and "Ask AI" button
- Calls `onAsk(question)` on form submit
- Disables both controls while `loading` is true
- Shows spinner + "Thinking…" label during loading

### `<AnswerDisplay answer={string} loading={bool} />`
- When `loading`: shows three animated skeleton/pulse bars
- When `answer` is set: renders the answer text with `white-space: pre-wrap`
- Returns `null` if neither loading nor answer

---

## Styling Conventions

- Each component owns its styles via a `<style>` tag at the bottom of its JSX return
- **Color palette:**
  - Background: `#0d0d0d`
  - Card background: `#141414`
  - Card border: `#232323`
  - Primary text: `#f0ece4`
  - Secondary/muted text: `#666` / `#555`
  - Success green: `#6dbf8a`
  - Error red: `#e05c5c`
  - Button background: `#e8e2d9` (light, inverted)
  - Button text: `#0d0d0d`
- **Typography:**
  - Body/answers: `Georgia, serif`
  - Labels, inputs, buttons, code: `Courier New, monospace`
- No external CSS frameworks or icon libraries are used

---

## Dev Proxy Setup

All fetch calls use relative paths (`/repo/analyze`, `/repo/question`). To proxy API calls to the backend during local development, add to `package.json`:

```json
"proxy": "http://localhost:5000"
```

Replace `8000` with your actual backend port.

---

## Key Conventions

- **No external dependencies** beyond React itself
- **No `<form>` quirks** — all forms use `onSubmit` with `e.preventDefault()`
- **Error handling** — both API calls are wrapped in `try/catch`; errors surface as inline messages below the relevant section
- **Loading states** — always reflected in both the button UI and disabled input state
- **State reset** — calling Analyze clears any existing `repoId`, `answer`, and errors to avoid stale state across analyses

---

## Common Tasks for AI Assistants

**Adding a new feature (e.g., file browser after analysis):**
1. Add state to `App.js`
2. Create a new component in `src/components/`
3. Pass data down as props from `App.js`
4. Follow the existing color/font conventions

**Changing the backend base URL:**
- Update the `proxy` field in `package.json`, or
- Add a `REACT_APP_API_BASE` env variable and prefix all fetch paths with `process.env.REACT_APP_API_BASE`

**Adding persistent history:**
- `repoId` and past Q&A can be stored in `localStorage` and rehydrated with `useEffect` on mount
