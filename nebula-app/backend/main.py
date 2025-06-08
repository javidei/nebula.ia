from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Permitir frontend React (localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    prompt: str

# Simulación simple de respuesta IA (reemplaza con modelo real luego)
@app.post("/chat")
async def chat(message: Message):
    prompt = message.prompt.lower()
    if "hábito" in prompt:
        response = "Claro, ¿qué hábito quieres empezar a trackear?"
    elif "ánimo" in prompt or "emociones" in prompt:
        response = "Cuéntame cómo te sientes hoy."
    else:
        response = "Soy Nébula, tu asistente para productividad y emociones. ¿En qué te ayudo?"

    return {"response": response}
