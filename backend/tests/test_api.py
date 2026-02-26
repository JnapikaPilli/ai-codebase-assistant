import sys
import os

# add backend directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import app


def test_home():
    client = app.test_client()

    response = client.get("/")

    assert response.status_code == 200


def test_repo_analyze():

    client = app.test_client()

    response = client.post(
        "/repo/analyze",
        json={
            "repo_url": "https://github.com/pallets/flask"
        }
    )

    assert response.status_code == 200


def test_question_endpoint():

    client = app.test_client()

    response = client.post(
        "/repo/question",
        json={
            "repo_id": 1,
            "question": "What does this repository do?"
        }
    )

    assert response.status_code in [200, 404]