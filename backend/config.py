import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DATABASE_URL = "sqlite:///" + os.path.join(BASE_DIR, "database.db")