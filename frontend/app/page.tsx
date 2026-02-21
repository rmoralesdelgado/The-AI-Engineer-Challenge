import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="chat-page">
      <header className="chat-header">
        <h1>Supportive Mental Coach</h1>
      </header>
      <ChatInterface />
    </main>
  );
}
