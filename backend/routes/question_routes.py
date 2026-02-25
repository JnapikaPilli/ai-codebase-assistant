from flask import Blueprint, request, jsonify

from models.db import SessionLocal
from models.file_model import File
from models.question_model import Question

from services.ai_service import generate_answer


question_bp = Blueprint("question", __name__)


@question_bp.route("/repo/question", methods=["POST"])
def ask_question():

    data = request.json
    repo_id = data.get("repo_id")
    question = data.get("question")

    if not repo_id or not question:
        return jsonify({"error": "repo_id and question are required"}), 400

    session = SessionLocal()

    # fetch files belonging to the repository
    files = session.query(File).filter(File.repo_id == repo_id).all()

    if not files:
        return jsonify({"error": "Repository files not found"}), 404

    # generate answer using AI service
    answer = generate_answer(question, files)

    # store question and answer
    q = Question(
        repo_id=repo_id,
        question=question,
        answer=answer
    )

    session.add(q)
    session.commit()

    return jsonify({
        "question": question,
        "answer": answer
    })