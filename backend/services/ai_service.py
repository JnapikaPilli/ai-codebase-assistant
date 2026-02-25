def generate_answer(question, files):
    """
    Generate an answer using repository files as context.
    For now we simulate AI reasoning.
    """

    context = ""

    for file in files[:5]:  # limit to first 5 files to avoid huge prompts
        context += f"\nFile: {file.filename}\n"
        context += file.content[:1000]  # limit content size

    answer = f"""
Question: {question}

Based on the repository files, here is a possible explanation:

The repository contains files such as {', '.join([f.filename for f in files[:3]])}.
These files suggest the repository implements functionality related to the project.

(Placeholder AI explanation — real AI integration can be added later.)
"""

    return answer