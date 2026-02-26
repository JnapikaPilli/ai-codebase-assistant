export default function AnswerDisplay({ answer, loading }) {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="pulse-bar" />
        <div className="pulse-bar short" />
        <div className="pulse-bar medium" />
      </div>
    );
  }

  if (!answer) return null;

  return (
    <div className="answer">
      <p className="answer-text">{answer}</p>

      <style>{`
        .answer-text {
          color: #c8c2b9;
          font-family: 'Georgia', serif;
          font-size: 0.975rem;
          line-height: 1.8;
          white-space: pre-wrap;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 4px 0;
        }

        .pulse-bar {
          height: 14px;
          background: #1e1e1e;
          border-radius: 2px;
          width: 100%;
          animation: pulse 1.4s ease-in-out infinite;
        }

        .pulse-bar.short {
          width: 55%;
          animation-delay: 0.15s;
        }

        .pulse-bar.medium {
          width: 78%;
          animation-delay: 0.3s;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
