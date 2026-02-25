from flask import Blueprint, request, jsonify

from models.db import SessionLocal
from models.repository_model import Repository
from models.file_model import File

from services.github_service import get_repo_files


repo_bp = Blueprint("repo", __name__)


@repo_bp.route("/repo/analyze", methods=["POST"])
def analyze_repo():

    data = request.json
    repo_url = data.get("repo_url")

    if not repo_url:
        return jsonify({"error": "repo_url is required"}), 400

    session = SessionLocal()

    # store repository
    repo = Repository(repo_url=repo_url)
    session.add(repo)
    session.commit()

    # fetch repository files from GitHub
    files = get_repo_files(repo_url)

    stored_files = []

    for file in files:

        new_file = File(
            repo_id=repo.id,
            filename=file["filename"],
            content=file["content"]
        )

        session.add(new_file)
        stored_files.append(file["filename"])

    session.commit()

    return jsonify({
        "message": "Repository analyzed successfully",
        "repo_id": repo.id,
        "files_stored": stored_files
    })