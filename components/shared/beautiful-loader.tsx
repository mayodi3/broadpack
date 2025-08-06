"use client";

import { Loader2 } from "lucide-react";

interface BeautifulLoaderProps {
  message?: string;
}

export default function BeautifulLoader({
  message = "Logging in...",
}: BeautifulLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-6">
        {/* Animated Logo/Icon Container */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full border-4 border-gray-200 mx-auto"
            style={{ borderTopColor: "var(--primary)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2
                className="w-8 h-8 animate-spin"
                style={{ color: "var(--primary)" }}
              />
            </div>
          </div>

          {/* Pulsing Ring Animation */}
          <div
            className="absolute inset-0 w-20 h-20 rounded-full border-2 border-opacity-20 animate-ping mx-auto"
            style={{ borderColor: "var(--primary)" }}
          />
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2
            className="text-2xl font-semibold"
            style={{ color: "var(--primary)" }}
          >
            {message}
          </h2>
          <p className="text-gray-600">
            Please wait while we authenticate you...
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1">
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: "var(--primary)",
              animationDelay: "0ms",
            }}
          />
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: "var(--primary)",
              animationDelay: "150ms",
            }}
          />
          <div
            className="w-2 h-2 rounded-full animate-bounce"
            style={{
              backgroundColor: "var(--primary)",
              animationDelay: "300ms",
            }}
          />
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="h-1 rounded-full animate-pulse"
              style={{
                backgroundColor: "var(--primary)",
                width: "100%",
                animation: "loading-bar 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
