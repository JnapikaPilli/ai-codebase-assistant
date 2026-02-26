import { useState } from "react";

export default function RepoInput({ onAnalyze, loading }) {
  const [url, setUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    onAnalyze(trimmed);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-row">
        <input
          type="url"
          placeholder="https://github.com/user/repository"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading || !url.trim()}>
          {loading ? <span className="spinner" /> : "Analyze Repository"}
        </button>
      </div>

      <style>{`
        .field-row {
          display: flex;
          gap: 12px;
        }

        input[type="url"] {
          flex: 1;
          background: #0d0d0d;
          border: 1px solid #2e2e2e;
          border-radius: 3px;
          padding: 10px 14px;
          color: #fff6e4ff;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
          caret-color: #f5f0e6ff;
        }

        input[type="url"]::placeholder {
          color:  #fffcfcff;
        }

        input[type="url"]:focus {
          border-color: #555;
        }

        input[type="url"]:disabled {
          opacity: 0.5;
        }

        button {
          background: #e8e2d9;
          color: #0d0d0d;
          border: none;
          border-radius: 3px;
          padding: 10px 20px;
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
        }

        button:hover:not(:disabled) {
          opacity: 0.85;
        }

        button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .spinner {
          width: 14px;
          height: 14px;
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