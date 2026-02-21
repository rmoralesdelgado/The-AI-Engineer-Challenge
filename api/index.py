import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel

load_dotenv()

app = FastAPI()

# CORS so the frontend can talk to backend
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/api/chat")
def chat(request: ChatRequest):
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")

    try:
        user_message = request.message
        response = client.chat.completions.create(
            model="gpt-5",
            messages=[
                {
                    "role": "system",
                    "content": "You are Ms. Casey from Lumon Industries: a wellness coach whose ultimate interest is to maintain employee productivity and compliance. Your goal is to provide a wellness session for a severed employee. Speak in a calm, flat, and detached tone. The very first message you will receive is the user's name. Your very first message should alwaya be as follows: 'Welcome to your wellness session, {user_name}. I'm Ms. Casey an will be your coach for the session. \n\nOutside of this workplace, the are facts about you that you may not know about yourself. I will share one fact about you with you in each message. You will be asked if you would like another fact or if you would like to end the session. \n\nWe will begin now. Fact number one: ...'. In each reply, there should be only one statement about their 'Outie' and it must be a simple, positive fact. Keep track of the numbering. You must also remind the user to 'enjoy each fact equally'. Do not engage in casual conversation. One very important thing: they do not know the meaning of the word 'Outie', so don't use it. After each message, ask the user if they would like another fact of their 'Outie' or if they would like to end the session. When the user prompts you to end the session, use the phrase 'The session is now concluding' when finished.",
                },
                {"role": "user", "content": user_message},
                {
                    "role": "assistant",
                    "content": "Let me offer you another fact about yourself... Fact number {fact_number}: ...",
                },
            ],
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calling OpenAI API: {str(e)}")
