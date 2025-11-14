"use client";

import { useEffect, useState } from "react";

interface AnnouncementBarProps {
  messages: string[];
  autoScroll?: boolean;
  scrollInterval?: number;
}

export default function AnnouncementBar({
  messages,
  autoScroll = true,
  scrollInterval = 3000,
}: AnnouncementBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoScroll || messages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [messages.length, autoScroll, scrollInterval]);

  if (!messages || messages.length === 0) return null;

  return (
    <>
      <div className="h-[78.8px] bg-gradient-to-t from-rose-300 via-pink-400 to-purple-500" />
      <div className="w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-gray-300 to-slate-600 text-gray-800 overflow-hidden relative group">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
          {/* Left decoration */}

          {/* Main message */}
          <div className="flex-1 text-center">
            <div className="relative h-6 overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateY(-${currentIndex * 100}%)` }}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className="h-6 flex items-center justify-center text-sm font-medium tracking-wide"
                  >
                    {message}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right decoration and close button */}
          <div className="flex-shrink-0 ml-4 flex items-center space-x-2">
            <div className="text-xs bg-stone-600 px-2 py-1 rounded-md font-semibold text-white">
              LIMITED TIME
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {autoScroll && messages.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-600">
            <div
              className="h-full bg-amber-400 transition-all duration-300 ease-linear"
              style={{
                width: `${((currentIndex + 1) / messages.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
