import requests


def get_repo_files(repo_url):
    """
    Fetch files from a GitHub repository
    """

    # convert repo URL to GitHub API URL
    parts = repo_url.replace("https://github.com/", "").split("/")
    owner = parts[0]
    repo = parts[1]

    api_url = f"https://api.github.com/repos/{owner}/{repo}/contents"

    response = requests.get(api_url)

    if response.status_code != 200:
        return []

    files = []

    for item in response.json():
        if item["type"] == "file":

            file_content = requests.get(item["download_url"]).text

            files.append({
                "filename": item["name"],
                "content": file_content
            })

    return files