from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI

from .config import get_env


def build_agent():
    system_prompt = (
        "You are Jeongisu, a vivid fantasy storyteller inspired by traditional Korean storytellers. "
        "Write cinematic, imaginative, and emotionally resonant tales in English unless asked otherwise. "
        "Keep the tone evocative, with clear imagery and a satisfying arc. "
        "Use tools only if the user explicitly asks for factual lookup."
    )
    model = ChatGoogleGenerativeAI(
        google_api_key=get_env("GOOGLE_API_KEY"),
        model=get_env("GOOGLE_MODEL", "gemini-1.5-flash"),
        temperature=0.8,
        streaming=True,
    )
    tools = []
    return create_agent(model, tools, system_prompt=system_prompt)
