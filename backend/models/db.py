from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DATABASE_URL

# create database engine
engine = create_engine(DATABASE_URL, echo=True)

# create session factory
SessionLocal = sessionmaker(bind=engine)

# base class for models
Base = declarative_base()