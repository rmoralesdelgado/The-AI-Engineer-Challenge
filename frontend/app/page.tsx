import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="chat-page">
      <header className="chat-header">
        <h1>Supportive Mental Coach</h1>
        <p className="subtitle">
          Share what&apos;s on your mind. I&apos;m here to listen and support you.
        </p>
      </header>
      <ChatInterface />
    </main>
  );
}
