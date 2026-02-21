import { ChatInterface } from "@/components/ChatInterface";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="chat-page">
      <header className="chat-header">
        <h1>Mental Wellness Session</h1>
        <ThemeToggle />
      </header>
      <ChatInterface />
    </main>
  );
}
