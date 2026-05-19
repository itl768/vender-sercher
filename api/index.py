from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

app = FastAPI()

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# LOAD CSV
# =========================

BASE_DIR = os.path.dirname(__file__)

file_path = os.path.join(
    BASE_DIR,
    "../data.csv"
)

df = pd.read_csv(file_path)

# Fill missing values
df = df.fillna("")

# =========================
# HOME
# =========================

@app.get("/")
def home():

    return {
        "message": "CSV Backend Running"
    }

# =========================
# SEARCH API
# =========================

@app.get("/search")
def search_items(keyword: str = ""):

    if not keyword:
        return df.to_dict(orient="records")

    filtered_df = df[
        df["item"]
        .astype(str)
        .str.lower()
        .str.contains(keyword.lower(), na=False)
    ]

    return filtered_df.to_dict(
        orient="records"
    )