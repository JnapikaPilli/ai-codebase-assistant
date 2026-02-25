from sqlalchemy import Column, Integer, String, Text, ForeignKey
from models.db import Base


class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)

    repo_id = Column(Integer, ForeignKey("repositories.id"))

    filename = Column(String, nullable=False)

    content = Column(Text)