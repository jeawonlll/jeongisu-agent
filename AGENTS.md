# Repository Guidelines

## Project Structure & Module Organization
`backend/app/` contains the FastAPI service and LangChain agent code: `main.py` exposes `/health` and `/api/stream`, `agent.py` builds the storyteller agent, and `config.py` reads environment variables. `frontend/` is a Vite React app; `src/main.jsx` contains the current UI flow and `src/styles.css` holds the styling. Root files include `pyproject.toml`, `uv.lock`, `.env.example`, and `README.md`.

## Build, Test, and Development Commands
Backend setup: `uv sync` installs Python dependencies from `pyproject.toml` and `uv.lock`.
Run the API: `uv run uvicorn backend.app.main:app --reload --port 8000`.
Lint Python: `uv run ruff check`.
Frontend setup: `cd frontend && npm install`.
Run the UI: `cd frontend && npm run dev`.
Create a production bundle: `cd frontend && npm run build`.

## Coding Style & Naming Conventions
Follow existing conventions: 4-space indentation in Python, 2-space indentation in JSX/CSS, and descriptive snake_case names for Python functions. Keep React components in PascalCase and internal handlers in camelCase, matching `App`, `handleSuggestion`, and `streamStory`. Use Ruff defaults from `pyproject.toml`; line length targets 100 characters. Keep modules small and colocate simple styles in `frontend/src/styles.css` unless the frontend grows enough to justify splitting files.

## Testing Guidelines
There is no committed automated test suite yet. Until one is added, treat `uv run ruff check` and `cd frontend && npm run build` as the minimum verification steps before opening a PR. For non-trivial backend changes, add `pytest` tests in a new `tests/` tree that mirrors the behavior under `backend/app/`. For frontend behavior changes, include clear manual verification steps in the PR.

## Commit & Pull Request Guidelines
Recent history uses Conventional Commit prefixes such as `feat:`, `chore:`, and `docs:`. Keep messages imperative and scoped, for example `feat: normalize stream content`. PRs should explain the user-visible change, list local verification commands, and call out any environment or API contract changes. Include screenshots or short recordings for UI updates.

## Security & Configuration Tips
Do not commit secrets. Copy `.env.example` to `.env` locally and keep API keys there. If you change backend or frontend ports, update the CORS list in `backend/app/main.py` and the API URL in `frontend/src/main.jsx`.
