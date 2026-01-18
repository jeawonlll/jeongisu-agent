# Jeongisu

**Jeongisu** is an AI-powered storytelling agent inspired by the *jeongisu* (전기수), traditional Korean storytellers who captivated audiences with vivid tales of heroes, myths, and legends. This version focuses on a LangChain v1+ streaming backend and a React A2UI-style demo UI.

---

## Features

- **AI Story Generation**: Creates original fantasy stories based on prompts.
- **Streaming Output**: Delivers token-by-token storytelling to the UI.
- **Web Demo (A2UI-inspired)**: A Google-style generative UI demo built in React.
- **LangChain Orchestration**: Simple LCEL chain with model streaming.

---

## Tech Stack

- **Python 3.10+**
- **LangChain v1+** (`create_agent` with streaming events)
- **FastAPI** for the streaming API
- **uv** for dependency management
- **ruff** for linting
- **React + Vite** for the demo UI

---

## Getting Started

### 1) Backend setup (uv)

```bash
uv sync
```

Create a `.env` file:

```
GOOGLE_API_KEY=your-api-key-here
GOOGLE_MODEL=gemini-1.5-flash
```

Run the API:

```bash
uv run uvicorn backend.app.main:app --reload --port 8000
```

### 2) Frontend setup (React)

```bash
cd frontend
npm install
npm run dev
```

The UI expects the API at `http://localhost:8000`. If you change ports, update `frontend/src/main.jsx`.

### 3) Linting

```bash
uv run ruff check
```

---

## Project Structure

```text
jeongisu/
    backend/
        app/
            agent.py         # LangChain chain
            config.py        # Env helpers
            main.py          # FastAPI streaming API
    frontend/
        src/
            main.jsx         # A2UI-inspired demo UI
            styles.css       # UI styling
    pyproject.toml
    .env.example
    README.md
```

---

## Inspirations

- [전기수 (Jeongisu)](https://ko.wikipedia.org/wiki/전기수)
- Fantasy writers like Tolkien, Le Guin, and Korean historical dramas

---

## License

MIT License. See [LICENSE](./LICENSE) for details.
