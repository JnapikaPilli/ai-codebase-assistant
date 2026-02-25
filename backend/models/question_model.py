from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from datetime import datetime
from models.db import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)

    repo_id = Column(Integer, ForeignKey("repositories.id"))

    question = Column(String, nullable=False)

    answer = Column(Text)

    created_at = Column(DateTime, default=datetime.utcnow)