# RepoLens – AI Codebase Assistant

RepoLens is a developer tool that analyzes GitHub repositories and answers questions about their code using AI.

The system ingests a repository, stores its files, and allows users to query the codebase using natural language.

---

## Architecture

The system consists of three main layers:

Frontend (React)

* Allows users to input a GitHub repository
* Lets users ask questions about the codebase
* Displays AI generated explanations

Backend (Flask API)

* Handles repository ingestion
* Stores repository files in a relational database
* Processes user questions
* Sends relevant context to the AI model

AI Layer

* Uses Groq-hosted Llama models
* Performs reasoning over repository code
* Generates explanations of system behavior

---

## System Flow

1. User submits a GitHub repository URL
2. Backend fetches repository metadata using the GitHub API
3. Repository files are stored in the database
4. User asks a question about the repository
5. Relevant files are selected using keyword-based retrieval
6. Context is sent to the LLM
7. AI returns an explanation

---

## Tech Stack

Frontend

* React
* Fetch API

Backend

* Python
* Flask
* SQLAlchemy
* SQLite

AI

* Groq LLM API
* Llama models

Testing

* Pytest

---

## Key Design Decisions

Modular Architecture
Routes, services, and models are separated to maintain clear boundaries.

Simple Retrieval (RAG)
Relevant files are selected using keyword matching before sending context to the LLM.

AI Safety
Environment variables are used for API keys.

Observability
SQLAlchemy query logs and API responses make debugging easy.

---

## Running the Project

Start Backend

cd backend
source venv/bin/activate
python app.py

Start Frontend

cd frontend
npm start

---

## Future Improvements

* Semantic search over code using embeddings
* Support for large repositories
* File-level summarization
* Streaming AI responses
* Deployment using Docker
