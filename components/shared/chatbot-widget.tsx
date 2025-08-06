"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { gsap } from "gsap";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Always visible for site-wide use
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      text: "Karibu! I'm Broadbot, the official virtual assistant for BROADPARK HOTELS, ready to help you plan your perfect stay in Mbale Vihiga. Please feel free to ask me anything about our rooms, services, dining options, or nearby attractions.",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    // Cleanup function to clear any pending timeouts
    return () => {
      // Assuming ScrollTrigger is from GSAP, ensure it's imported or handled
      // if (typeof ScrollTrigger !== 'undefined') {
      //   ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      // }
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!widgetRef.current) return;
    const ctx = gsap.context(() => {
      if (isVisible) {
        gsap.fromTo(
          widgetRef.current,
          { y: 100, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      } else {
        gsap.to(widgetRef.current, {
          y: 100,
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    }, widgetRef);
    return () => ctx.revert();
  }, [isVisible]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isExpanded]);

  // Animate expansion
  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      if (isExpanded) {
        gsap.fromTo(
          contentRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }, contentRef);
    return () => {};
  }, [isExpanded]);

  const sendToPinecone = async (message: string) => {
    try {
      const response = await fetch("/api/pinecone-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      console.log(data);
      return (
        data.response ||
        "I'm sorry, I couldn't process your request at the moment."
      );
    } catch (error) {
      return "I'm having trouble connecting to the assistant. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isSending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    setIsSending(true);

    try {
      const botResponse = await sendToPinecone(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error handling message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, there was an error processing your message. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsExpanded(!isExpanded);
    // Focus input when expanding
    if (!isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const getUnreadCount = () => {
    return messages.filter((msg) => !msg.isUser).length;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Collapsed State - Just the icon */}
      {!isExpanded ? (
        <button
          onClick={toggleChat}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center relative"
          style={{
            width: "64px",
            height: "64px",
            boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.15)",
          }}
        >
          <MessageCircle className="w-8 h-8" />
          {messages.length > 1 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </button>
      ) : (
        /* Expanded State - Full chat */
        <div
          ref={widgetRef}
          className="w-96 h-[600px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
        >
          {/* Chat Header */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">BROADPARK Assistant</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  message.isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    message.isUser ? "bg-primary" : "bg-blue-500"
                  }`}
                >
                  {message.isUser ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    message.isUser
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-blue-500 text-white rounded-bl-md"
                  }`}
                >
                  {message.isUser ? (
                    <p>{message.text}</p>
                  ) : (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  )}
                  <div className={`text-xs mt-1 opacity-70`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isSending}
                className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
