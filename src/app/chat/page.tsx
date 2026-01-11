import ChatInterface from "@/components/chat/ChatInterface";

export default function ChatPage() {
    return (
        <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-0 md:p-6">
            <div className="w-full h-full md:h-[90vh] md:max-w-4xl">
                <ChatInterface />
            </div>
        </main>
    );
}
