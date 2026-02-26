# AI Guidance Rules

This project uses AI models via the Groq API to analyze GitHub repositories.

Guidelines followed during development:

AI Usage

* AI tools were used to assist in UI generation and code suggestions.
* All generated code was manually reviewed before integration.

Prompt Design

* The model receives repository context and a user question.
* Only relevant repository files are included to reduce hallucination risk.

Safety Constraints

* API keys are stored using environment variables.
* AI responses are treated as explanations, not authoritative code analysis.

Limitations

* Large repositories may exceed context limits.
* Retrieval uses simple keyword matching instead of embeddings.

Future Improvements

* Add vector search for semantic retrieval.
* Add chunked file indexing.
* Implement streaming responses.
