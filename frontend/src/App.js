import { useState } from "react";
import RepoInput from "./components/RepoInput";
import QuestionInput from "./components/QuestionInput";
import AnswerDisplay from "./components/AnswerDisplay";

export default function App() {
  const [repoId, setRepoId] = useState(null);
  const [filesStored, setFilesStored] = useState([]);
  const [answer, setAnswer] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [asking, setAsking] = useState(false);
  const [analyzeError, setAnalyzeError] = useState("");
  const [askError, setAskError] = useState("");

  async function handleAnalyze(repoUrl) {
    setAnalyzing(true);
    setAnalyzeError("");
    setRepoId(null);
    setFilesStored([]);
    setAnswer("");
    try {
      const res = await fetch(" https://repo-lens.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo_url: repoUrl }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setRepoId(data.repo_id);
      setFilesStored(data.files_stored || []);
    } catch (err) {
      setAnalyzeError(err.message);
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleAsk(question) {
    setAsking(true);
    setAskError("");
    setAnswer("");
    try {
      const res = await fetch(" https://repo-lens.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo_id: repoId, question }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAskError(err.message);
    } finally {
      setAsking(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>RepoLens</h1>
        <p className="subtitle">Analyze any GitHub repository with AI</p>
      </header>

      <main>
        <section className="card">
          <h2>Repository</h2>
          <RepoInput onAnalyze={handleAnalyze} loading={analyzing} />
          {analyzeError && <p className="error">{analyzeError}</p>}
          {repoId && (
            <p className="success">
              ✓ Repository analyzed — {filesStored.length} file
              {filesStored.length !== 1 ? "s" : ""} indexed
            </p>
          )}
        </section>

        {repoId && (
          <section className="card">
            <h2>Ask a Question</h2>
            <QuestionInput onAsk={handleAsk} loading={asking} />
            {askError && <p className="error">{askError}</p>}
          </section>
        )}

        {(answer || asking) && (
          <section className="card">
            <h2>Answer</h2>
            <AnswerDisplay answer={answer} loading={asking} />
          </section>
        )}
      </main>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Georgia', serif;
          background: #0d0d0d;
          color: #e8e2d9;
          min-height: 100vh;
        }

        .app {
          max-width: 760px;
          margin: 0 auto;
          padding: 48px 24px 80px;
        }

        header {
          margin-bottom: 48px;
          border-bottom: 1px solid #2a2a2a;
          padding-bottom: 32px;
        }

        h1 {
          font-size: 2.8rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #f5f0e8;
          font-family: 'Georgia', serif;
        }

        .subtitle {
          margin-top: 8px;
          color: #b9b4b4ff;
          font-size: 0.95rem;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.05em;
        }

        .card {
          background: #141414;
          border: 1px solid #232323;
          border-radius: 4px;
          padding: 32px;
          margin-bottom: 24px;
        }

        .card h2 {
          font-size: 0.75rem;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color:  #b9b4b4ff;
          margin-bottom: 20px;
        }

        .error {
          margin-top: 12px;
          color: #e05c5c;
          font-size: 0.85rem;
          font-family: 'Courier New', monospace;
        }

        .success {
          margin-top: 12px;
          color: #6dbf8a;
          font-size: 0.85rem;
          font-family: 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
}
