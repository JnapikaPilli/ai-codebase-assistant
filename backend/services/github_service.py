import requests


def get_repo_files(repo_url):
    """
    Fetch files from a GitHub repository
    """

    parts = repo_url.replace("https://github.com/", "").split("/")
    owner = parts[0]
    repo = parts[1]

    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents"

    headers = {
        "User-Agent": "ai-codebase-assistant"
    }

    try:
        response = requests.get(api_url, headers=headers, timeout=10)

        if response.status_code != 200:
            return []

        files = []

        for item in response.json():

            if item["type"] == "file":

                file_response = requests.get(
                    item["download_url"],
                    headers=headers,
                    timeout=10
                )

                files.append({
                    "filename": item["name"],
                    "content": file_response.text
                })

        return files

    except Exception as e:
        print("GitHub fetch error:", e)
        return []