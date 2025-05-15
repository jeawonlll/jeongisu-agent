# Jeongisu 🗣️📜

**Jeongisu** is an AI-powered storytelling agent inspired by the *jeongisu* (전기수), traditional Korean storytellers who captivated audiences with vivid tales of heroes, myths, and legends. This project brings that spirit into the digital age — generating fantasy narratives with character, depth, and imagination.

---

## ✨ Features

- 🪄 **AI Story Generation** — Creates original fantasy stories based on prompts or character/world inputs.
- 🧠 **Modular Prompt Engine** — Easily extendable prompt templates for genre-specific narratives.
- 🏰 **World & Character Builders** — Assistants to help scaffold lore, names, factions, and more.
- 🔄 **Interactive Mode** — Work with Jeongisu in a dialogue to co-create your tale.

---

## 🛠 Tech Stack

- **Python 3.10+**
- [OpenAI GPT API](https://platform.openai.com/)
- [LangChain](https://www.langchain.com/) for agent orchestration
- Optional: **FastAPI** or **Streamlit** for serving UI

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/jeongisu.git
cd jeongisu
````

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Set your API keys

Create a `.env` file:

```
OPENAI_API_KEY=your-api-key-here
```

### 4. Run the agent

```bash
python main.py
```

---

## 📦 Project Structure

```text
jeongisu/
├── agents/             # Prompt templates and logic for story modes
├── generators/         # Story, character, and world generators
├── ui/                 # Optional UI (CLI or web)
├── tests/              # Unit tests
├── main.py             # Entry point
├── README.md
└── requirements.txt
```

---

## 🤖 Example Usage

```python
from jeongisu.generators.story import generate_story

prompt = "A warrior born from flame sets out to reclaim a shattered kingdom."
story = generate_story(prompt)
print(story)
```

---

## 📚 Inspirations

* [전기수 (Jeongisu)](https://ko.wikipedia.org/wiki/전기수)
* Fantasy writers like Tolkien, Le Guin, and Korean historical dramas

---

## 📜 License

MIT License. See [LICENSE](./LICENSE) for details.

---

## 🙏 Credits

Created by [유도니](https://github.com/your-username),
with love for storytelling and tradition.

```

---

필요에 따라 다음을 추가/편집할 수 있습니다:

- 실제 사용 예시 출력 결과
- 로고나 배너 이미지
- 웹 데모 링크 (Streamlit이나 Vercel 배포 시)
- GitHub Actions 또는 Docker 관련 문서

언제든지 수정 도와드릴게요!  
배포용 포맷, UI 추가, CLI 튜토리얼 등도 필요하면 말씀만 주세요.
```
