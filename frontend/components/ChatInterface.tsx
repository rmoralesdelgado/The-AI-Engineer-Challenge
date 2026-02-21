"use client";

import { useState, useRef, useEffect } from "react";
import { SendIcon, ClearIcon } from "./Icons";

type Message = {
  role: "user" | "coach";
  content: string;
};

/**
 * Chat interface for the supportive mental coach.
 * Sends messages to the backend POST /api/chat and displays the conversation.
 */
export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        { role: "coach", content: data.reply },
      ]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to get a response";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
    setInput("");
  };

  return (
    <section className="chat-section">
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="empty-state">
            <p>Start the conversation by typing a message below.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message-bubble ${msg.role}`}
            data-role={msg.role}
          >
            <span className="message-label">
              {msg.role === "user" ? "You" : "Coach"}
            </span>
            <p className="message-content">{msg.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="message-bubble coach" data-role="coach">
            <span className="message-label">Coach</span>
            <p className="message-content typing">Thinking...</p>
          </div>
        )}
        {error && (
          <div className="error-banner" role="alert">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <button
          type="button"
          onClick={handleClear}
          className="clear-button"
          disabled={messages.length === 0}
          aria-label="Clear chat and start anew"
          title="Clear chat"
        >
          <ClearIcon />
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Type your message..."
          rows={1}
          disabled={isLoading}
          className="message-input"
          aria-label="Message to coach"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="send-button"
          aria-label="Send message"
        >
          <SendIcon />
        </button>
      </form>
    </section>
  );
}
