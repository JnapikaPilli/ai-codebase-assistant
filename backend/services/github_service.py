import requests
import os

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "User-Agent": "ai-codebase-assistant"
}

if GITHUB_TOKEN:
    headers["Authorization"] = f"token {GITHUB_TOKEN}"


def fetch_directory(api_url, files):
    """
    Recursively fetch files from a directory
    """

    response = requests.get(api_url, headers=headers, timeout=10)

    if response.status_code != 200:
        print("GitHub API Error:", response.status_code)
        return

    for item in response.json():

        if item["type"] == "file":
            if(len(files)>50):
                print("File limit reached (50). Stopping indexing.")
                return

            try:
                file_response = requests.get(
                    item["download_url"],
                    headers=headers,
                    timeout=10
                )

                if file_response.status_code == 200:

                    files.append({
                        "filename": item["path"],
                        "content": file_response.text
                    })

                    print("Indexed file:", item["path"])

            except Exception as e:
                print("File download error:", e)

        elif item["type"] == "dir":

            print("Entering directory:", item["path"])

            fetch_directory(item["url"], files)


def get_repo_files(repo_url):
    """
    Fetch all files from a GitHub repository recursively
    """

    parts = repo_url.replace("https://github.com/", "").split("/")
    owner = parts[0]
    repo = parts[1]

    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents"

    files = []

    try:
        fetch_directory(api_url, files)

        print("Total files indexed:", len(files))

        return files

    except Exception as e:
        print("GitHub fetch error:", e)
        return []