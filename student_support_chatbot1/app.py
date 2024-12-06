from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Initialize FastAPI app
app = FastAPI()

# Paths
base_path = os.getcwd()
frontend_path = os.path.join(base_path, "Frontend")
model_path = os.path.join(base_path, "Model")

# Mount static files directory for serving static files (JS, CSS, images)
app.mount("/static", StaticFiles(directory=frontend_path), name="static")

# Load your pretrained model
print(f"Loading model from: {model_path}")
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(model_path)
print("Model loaded successfully!")

@app.get("/")
async def serve_homepage():
    """Serve the main frontend HTML file."""
    return FileResponse(os.path.join(frontend_path, "index.html"))

@app.post("/chatbot")
async def chatbot_api(request: dict):
    """
    API endpoint to interact with the chatbot model.
    Expects a JSON payload: { "question": "User's question" }
    """
    question = request.get("question", "").strip()
    if not question:
        return {"answer": "Please ask a valid question."}

    # Generate a response from the model
    inputs = tokenizer.encode(question, return_tensors="pt")
    outputs = model.generate(inputs, max_length=100, num_return_sequences=1)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return {"answer": answer}
