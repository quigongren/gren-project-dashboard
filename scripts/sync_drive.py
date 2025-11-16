import os
import io
import json
import pathlib
from typing import List, Tuple

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload

# ---------- CONFIG ----------

# Where to put synced files in the repo
BASE_OUTPUT_DIR = pathlib.Path("drive_sync")

# Map env var -> logical subfolder name in the repo
FOLDER_ENV_MAP: List[Tuple[str, str]] = [
    ("DRIVE_FOLDER_ID_LINEAGE", "gren_lineage"),
    ("DRIVE_FOLDER_ID_JILL", "jill_health_management"),
]

# MIME types for exports
DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
MD_MIME = "text/markdown"


# ---------- AUTH ----------

def get_drive_service():
    creds_json = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    if not creds_json:
        raise RuntimeError("GOOGLE_APPLICATION_CREDENTIALS_JSON env var is not set.")

    info = json.loads(creds_json)
    scopes = ["https://www.googleapis.com/auth/drive.readonly"]
    creds = Credentials.from_service_account_info(info, scopes=scopes)
    service = build("drive", "v3", credentials=creds)
    return service


# ---------- HELPERS ----------

def safe_filename(name: str) -> str:
    # Basic sanitization for filesystem
    bad_chars = '<>:"/\\|?*'
    for c in bad_chars:
        name = name.replace(c, "_")
    return name.strip()


def ensure_dir(path: pathlib.Path):
    path.mkdir(parents=True, exist_ok=True)


# ---------- SYNC LOGIC ----------

def list_files_in_folder(service, folder_id: str):
    query = f"'{folder_id}' in parents and trashed = false"
    page_token = None
    while True:
        resp = (
            service.files()
            .list(
                q=query,
                spaces="drive",
                fields="nextPageToken, files(id, name, mimeType, modifiedTime)",
                pageToken=page_token,
            )
            .execute()
        )
        for f in resp.get("files", []):
            yield f
        page_token = resp.get("nextPageToken", None)
        if not page_token:
            break


def export_google_doc(service, file_id: str, mime_type: str) -> bytes:
    request = service.files().export_media(fileId=file_id, mimeType=mime_type)
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while not done:
        _, done = downloader.next_chunk()
    return fh.getvalue()


def download_binary_file(service, file_id: str) -> bytes:
    request = service.files().get_media(fileId=file_id)
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while not done:
        _, done = downloader.next_chunk()
    return fh.getvalue()


def sync_folder(service, drive_folder_id: str, local_subdir: str):
    output_dir = BASE_OUTPUT_DIR / local_subdir
    ensure_dir(output_dir)

    print(f"Syncing Drive folder {drive_folder_id} → {output_dir}")

    for f in list_files_in_folder(service, drive_folder_id):
        file_id = f["id"]
        name = f["name"]
        mime_type = f["mimeType"]

        safe_name = safe_filename(name)
        print(f"  Processing: {safe_name} ({mime_type})")

        # Google Docs-type files
        if mime_type == "application/vnd.google-apps.document":
            # Export DOCX
            docx_bytes = export_google_doc(service, file_id, DOCX_MIME)
            docx_path = output_dir / f"{safe_name}.docx"
            docx_path.write_bytes(docx_bytes)
            print(f"    → {docx_path}")

            # Export Markdown
            try:
                md_bytes = export_google_doc(service, file_id, MD_MIME)
                md_path = output_dir / f"{safe_name}.md"
                md_path.write_bytes(md_bytes)
                print(f"    → {md_path}")
            except Exception as e:
                print(f"    ! Markdown export failed for {safe_name}: {e}")

        else:
            # Non-Google file: download as-is
            if "." in safe_name:
                local_name = safe_name
            else:
                # Rough MIME → extension mapping (extend as needed)
                ext = ""
                if mime_type == "application/pdf":
                    ext = ".pdf"
                elif mime_type == DOCX_MIME:
                    ext = ".docx"
                local_name = safe_name + ext

            data = download_binary_file(service, file_id)
            local_path = output_dir / local_name
            local_path.write_bytes(data)
            print(f"    → {local_path}")


def main():
    service = get_drive_service()

    any_folder = False

    for env_var, subdir in FOLDER_ENV_MAP:
        folder_id = os.environ.get(env_var)
        if not folder_id:
            print(f"[WARN] {env_var} not set; skipping.")
            continue
        any_folder = True
        sync_folder(service, folder_id, subdir)

    if not any_folder:
        raise RuntimeError(
            "No DRIVE_FOLDER_ID_* env vars set. "
            "Set DRIVE_FOLDER_ID_LINEAGE and/or DRIVE_FOLDER_ID_JILL in the workflow env."
        )

    print("Done.")


if __name__ == "__main__":
    main()
