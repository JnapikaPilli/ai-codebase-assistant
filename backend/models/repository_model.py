from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from models.db import Base


class Repository(Base):
    __tablename__ = "repositories"

    id = Column(Integer, primary_key=True, index=True)

    repo_url = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)