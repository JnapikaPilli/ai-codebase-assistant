from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def select_relevant_files(question, files, limit=5):
    """
    Simple relevance search:
    pick files that contain keywords from the question
    """

    keywords = question.lower().split()

    scored = []

    for file in files:
        content = file.content.lower()

        score = sum(keyword in content for keyword in keywords)

        scored.append((score, file))

    scored.sort(reverse=True, key=lambda x: x[0])

    return [f for _, f in scored[:limit]]


def generate_answer(question, files):

    try:
        relevant_files = select_relevant_files(question, files)

        context = ""

        for file in relevant_files:
            context += f"\nFile: {file.filename}\n"
            context += file.content[:800]

        prompt = f"""
You are analyzing a GitHub repository.

Repository Files:
{context}

User Question:
{question}

Explain clearly what the repository does, its structure, and how the main parts work.
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are a senior software engineer helping explain GitHub repositories."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        print("AI generation error:", e)
        return "Error generating answer from AI."