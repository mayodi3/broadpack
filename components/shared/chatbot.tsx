"use client";

import type React from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputValue,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);

      const isLive = true;
      const url = isLive
        ? "https://n8n.mayodi.help/webhook/3ac9320f-299a-4440-adef-7ccbb46f5079"
        : "https://n8n.mayodi.help/webhook-test/3ac9320f-299a-4440-adef-7ccbb46f5079";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: inputValue,
            timeStamp: Date.now().toString(),
          }),
        });

        const data = await response.json();

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            data.message ||
            "Sorry, I couldn't process your request. Please try again later.",
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("[v0] Error sending message:", error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Sorry, there was an error processing your request. Please try again later.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          aria-label="Open chatbot"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      ) : (
        <div className="bg-background border border-border rounded-lg shadow-2xl w-80 sm:w-96 h-[600px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">BROADPARK Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary/80 rounded-full p-1 transition-colors"
              aria-label="Close chatbot"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Welcome to BROADPARK HOTELS!</p>
                <p className="mt-1">How can I assist you today?</p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-orange-100 text-orange-900 border border-orange-200"
                  }`}
                >
                  <div className="text-sm leading-relaxed prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-2 space-y-1">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside mb-2 space-y-1">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="mb-1">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                        code: ({ children }) => (
                          <code className="bg-black/10 px-1 py-0.5 rounded text-xs font-mono">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-black/10 p-2 rounded my-2 overflow-x-auto text-xs">
                            {children}
                          </pre>
                        ),
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            className="underline hover:no-underline font-medium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                        h1: ({ children }) => (
                          <h1 className="text-lg font-bold mb-2 mt-3">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-base font-bold mb-2 mt-3">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-sm font-bold mb-1 mt-2">
                            {children}
                          </h3>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-orange-100 text-orange-900 border border-orange-200 rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-border bg-background"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm bg-background"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
