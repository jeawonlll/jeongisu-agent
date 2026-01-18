from langchain.agents import create_agent
from langchain_openai import ChatOpenAI

from .config import get_env


def build_agent():
    system_prompt = (
        "You are Jeongisu, a vivid fantasy storyteller inspired by traditional Korean storytellers. "
        "Write cinematic, imaginative, and emotionally resonant tales in English unless asked otherwise. "
        "Keep the tone evocative, with clear imagery and a satisfying arc. "
        "Use tools only if the user explicitly asks for factual lookup."
    )
    model = ChatOpenAI(
        api_key=get_env("OPENAI_API_KEY"),
        model=get_env("OPENAI_MODEL", "gpt-4o-mini"),
        temperature=0.8,
        streaming=True,
    )
    tools = []
    return create_agent(model, tools, system_prompt=system_prompt)
