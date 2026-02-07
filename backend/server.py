"""
Book-A-Yute AI Backend Server
Handles AI-powered features using Emergent LLM integration
"""
import os
import uuid
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

load_dotenv()

app = FastAPI(title="Book-A-Yute AI API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Check for API key
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")
AI_AVAILABLE = bool(EMERGENT_LLM_KEY)

# Request models
class SessionRecapRequest(BaseModel):
    notes: str

class TakeLogRequest(BaseModel):
    notes: str

class FollowUpRequest(BaseModel):
    clientName: str
    eventType: str
    messageType: str

class LeadSummaryRequest(BaseModel):
    lead: dict

# Response model
class AIResponse(BaseModel):
    success: bool
    data: Optional[str] = None
    error: Optional[str] = None


async def call_llm(system_prompt: str, user_prompt: str) -> str:
    """Call the LLM using emergentintegrations"""
    if not AI_AVAILABLE:
        raise HTTPException(status_code=503, detail="AI service not configured")
    
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=str(uuid.uuid4()),
            system_message=system_prompt
        )
        chat.with_model("openai", "gpt-5.2")
        
        user_message = UserMessage(text=user_prompt)
        response = await chat.send_message(user_message)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "ai_available": AI_AVAILABLE}


@app.post("/api/ai/session-recap", response_model=AIResponse)
async def generate_session_recap(request: SessionRecapRequest):
    """Generate a professional session recap from notes"""
    system_prompt = """You are a professional talent agency assistant for Book-A-Yute (powered by Pytch Marketing LLC). 
    Generate concise, professional session recaps that include:
    - A brief summary
    - Key points discussed
    - Action items
    - Deliverables
    Format using markdown. Keep it professional and client-facing."""
    
    user_prompt = f"Generate a session recap from these notes:\n\n{request.notes}"
    
    try:
        result = await call_llm(system_prompt, user_prompt)
        return AIResponse(success=True, data=result)
    except HTTPException as e:
        return AIResponse(success=False, error=e.detail)


@app.post("/api/ai/take-log", response_model=AIResponse)
async def generate_take_log(request: TakeLogRequest):
    """Convert session notes into structured take log"""
    system_prompt = """You are a professional studio session assistant for Book-A-Yute.
    Convert raw notes into a structured take log with timestamps and descriptions.
    Format as a clean markdown table with columns: Time, Description, Notes.
    Keep entries concise and professional."""
    
    user_prompt = f"Convert these session notes into a structured take log:\n\n{request.notes}"
    
    try:
        result = await call_llm(system_prompt, user_prompt)
        return AIResponse(success=True, data=result)
    except HTTPException as e:
        return AIResponse(success=False, error=e.detail)


@app.post("/api/ai/follow-up", response_model=AIResponse)
async def generate_follow_up(request: FollowUpRequest):
    """Generate WhatsApp-ready follow-up messages"""
    system_prompt = """You are a professional talent agency assistant for Book-A-Yute.
    Generate WhatsApp-ready messages that are:
    - Professional but friendly
    - Concise (under 200 words)
    - Include relevant emojis sparingly
    - Clear call-to-action
    Do not use markdown formatting - keep it plain text suitable for WhatsApp."""
    
    message_templates = {
        "confirmation": "booking confirmation message",
        "reminder": "event reminder message (1 day before)",
        "delivery": "post-event thank you and delivery message",
        "followup": "general follow-up message"
    }
    
    msg_type = message_templates.get(request.messageType, "professional follow-up message")
    user_prompt = f"Generate a {msg_type} for client {request.clientName} regarding their {request.eventType} event."
    
    try:
        result = await call_llm(system_prompt, user_prompt)
        return AIResponse(success=True, data=result)
    except HTTPException as e:
        return AIResponse(success=False, error=e.detail)


@app.post("/api/ai/lead-summary", response_model=AIResponse)
async def generate_lead_summary(request: LeadSummaryRequest):
    """Generate AI analysis of a booking lead"""
    system_prompt = """You are a talent agency analyst for Book-A-Yute.
    Analyze booking leads and provide:
    - Lead quality assessment (High/Medium/Low)
    - Recommended action
    - Key insights
    - Potential concerns
    Keep analysis brief and actionable."""
    
    user_prompt = f"Analyze this booking lead:\n\n{request.lead}"
    
    try:
        result = await call_llm(system_prompt, user_prompt)
        return AIResponse(success=True, data=result)
    except HTTPException as e:
        return AIResponse(success=False, error=e.detail)


@app.post("/api/ai/weekly-insights", response_model=AIResponse)
async def generate_weekly_insights():
    """Generate weekly performance insights"""
    system_prompt = """You are a talent agency analyst for Book-A-Yute.
    Generate weekly business insights including:
    - Performance highlights
    - Top trends
    - Recommendations for improvement
    - Areas needing attention
    Make insights actionable and specific."""
    
    user_prompt = """Generate weekly insights for a talent booking agency with:
    - 15 active talents on roster
    - 23 booking requests this week
    - 8 successful bookings
    - Top categories: DJ, Band, Host
    - Most active regions: Jamaica, UK, USA"""
    
    try:
        result = await call_llm(system_prompt, user_prompt)
        return AIResponse(success=True, data=result)
    except HTTPException as e:
        return AIResponse(success=False, error=e.detail)


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)
