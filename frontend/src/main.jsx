import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API_URL = "http://localhost:8000/api/stream";

const SUGGESTIONS = [
  "A moonlit palace floats above a sea of clouds.",
  "A disgraced alchemist seeks a mirror that rewrites memories.",
  "Two rival clans must unite to stop a dragon of ink.",
  "A silent bard finds a flute carved from meteor stone.",
];

function App() {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  const canGenerate = useMemo(() => prompt.trim().length > 0, [prompt]);

  const handleSuggestion = (text) => {
    setPrompt(text);
  };

  const stopStream = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setIsStreaming(false);
  };

  const finishStream = () => {
    abortRef.current = null;
    setIsStreaming(false);
  };

  const streamStory = async () => {
    setError("");
    setStory("");
    if (!canGenerate) {
      setError("Please enter a prompt.");
      return;
    }
    const controller = new AbortController();
    abortRef.current = controller;
    setIsStreaming(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("Streaming response failed.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() || "";
        for (const part of parts) {
          const line = part
            .split("\n")
            .find((entry) => entry.startsWith("data: "));
          if (!line) {
            continue;
          }
          const payload = JSON.parse(line.replace("data: ", ""));
          if (payload.type === "token") {
            setStory((prev) => prev + payload.content);
          }
          if (payload.type === "done") {
            finishStream();
          }
        }
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Could not reach the story stream.");
      }
      finishStream();
    }
  };

  return (
    <div className="page">
      <header className="global-nav">
        <a className="global-nav__brand" href="/" aria-label="Jeongisu home">
          Jeongisu
        </a>
        <nav className="global-nav__links" aria-label="Primary">
          <a href="#create">Create</a>
          <a href="#stream">Stream</a>
          <a href="#prompts">Prompts</a>
        </nav>
      </header>

      <div className="sub-nav">
        <span className="sub-nav__title">Storyteller</span>
        <div className="sub-nav__actions">
          <a href="#stream">View stream</a>
          <button
            className="button button--primary button--small"
            type="button"
            onClick={streamStory}
            disabled={!canGenerate || isStreaming}
          >
            {isStreaming ? "Streaming" : "Generate"}
          </button>
        </div>
      </div>

      <main>
        <section className="hero-tile" id="create">
          <div className="hero-tile__copy">
            <p className="eyebrow">Jeongisu</p>
            <h1>Stories, live as they are told.</h1>
            <p>
              A quiet canvas for shaping cinematic fantasy prompts and watching
              each line arrive in motion.
            </p>
          </div>

          <div className="composer" aria-label="Story prompt composer">
            <label className="field">
              <span className="field__label">Prompt</span>
              <textarea
                className="field__input"
                rows={5}
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="A sword forged from sunrise seeks its lost bearer..."
              />
            </label>

            <div className="actions">
              <button
                className="button button--primary"
                type="button"
                onClick={streamStory}
                disabled={!canGenerate || isStreaming}
              >
                {isStreaming ? "Streaming" : "Generate"}
              </button>
              <button
                className="button button--secondary"
                type="button"
                onClick={stopStream}
                disabled={!isStreaming}
              >
                Stop
              </button>
            </div>

            {error ? <div className="error">{error}</div> : null}
          </div>
        </section>

        <section className="prompt-tile" id="prompts">
          <div className="tile-heading">
            <h2>Prompt starts</h2>
            <p>Choose a line, then refine it in the composer.</p>
          </div>
          <div className="prompt-grid">
            {SUGGESTIONS.map((text) => (
              <button
                className="prompt-card"
                type="button"
                key={text}
                onClick={() => handleSuggestion(text)}
              >
                <span>{text}</span>
                <span aria-hidden="true">+</span>
              </button>
            ))}
          </div>
        </section>

        <section className="stream-tile" id="stream">
          <div className="stream-tile__header">
            <div>
              <p className="eyebrow eyebrow--dark">Live output</p>
              <h2>Story Stream</h2>
            </div>
            <span className={isStreaming ? "status" : "status status--idle"}>
              {isStreaming ? "Live" : "Idle"}
            </span>
          </div>

          <article className="story">
            {story ? (
              <p>{story}</p>
            ) : (
              <p className="story__placeholder">
                The story will appear here as the tokens arrive.
              </p>
            )}
          </article>
        </section>
      </main>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
