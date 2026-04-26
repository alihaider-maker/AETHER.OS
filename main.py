from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# THE LINK: This allows the UI to talk to this Python script
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class Research(BaseModel):
    hypothesis: str

@app.post("/analyze")
async def analyze(data: Research):
    # This is where the "logic" happens
    return {
        "id": "AL-99",
        "scientist": "Ali Haider",
        "rank": "Lead Researcher",
        "findings": ["Neural integrity 98%", "Quantum sync stable", "Catalyst ready"],
        "status": "Authorized"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)