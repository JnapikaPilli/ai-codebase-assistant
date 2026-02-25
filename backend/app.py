from flask import Flask
from flask_cors import CORS
from routes.question_routes import question_bp
from models.db import engine, Base
from models.repository_model import Repository
from models.file_model import File   # NEW IMPORT
from models.question_model import Question
from routes.repo_routes import repo_bp

app = Flask(__name__)
CORS(app)

# create database tables
Base.metadata.create_all(bind=engine)

# register blueprint
app.register_blueprint(repo_bp)
app.register_blueprint(question_bp)


@app.route("/")
def home():
    return {"message": "AI Codebase Assistant API running"}


if __name__ == "__main__":
    app.run(debug=True)