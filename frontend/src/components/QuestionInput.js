import { useState } from "react";

export default function QuestionInput({ onAsk, loading }) {
  const [question, setQuestion] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    onAsk(trimmed);
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="What does this repository do? How is the code structured? What are the main dependencies?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
        rows={3}
      />
      <div className="action-row">
        <button type="submit" disabled={loading || !question.trim()}>
          {loading ? <><span className="spinner" /> Thinking…</> : "Ask AI"}
        </button>
      </div>

      <style>{`
        textarea {
          width: 100%;
          background: #0d0d0d;
          border: 1px solid #2e2e2e;
          border-radius: 3px;
          padding: 12px 14px;
          color: #f0ece4;
          font-family: 'Georgia', serif;
          font-size: 0.9rem;
          line-height: 1.6;
          outline: none;
          resize: vertical;
          transition: border-color 0.15s;
          caret-color: #f0ece4;
        }

        textarea::placeholder {
          color: #a8a0a0ff;
          font-style: italic;
        }

        textarea:focus {
          border-color: #555;
        }

        textarea:disabled {
          opacity: 0.5;
        }

        .action-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 12px;
        }

        button {
          background: #e8e2d9;
          color: #0d0d0d;
          border: none;
          border-radius: 3px;
          padding: 10px 28px;
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: opacity 0.15s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        button:hover:not(:disabled) {
          opacity: 0.85;
        }

        button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .spinner {
          width: 12px;
          height: 12px;
          border: 2px solid #0d0d0d;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}