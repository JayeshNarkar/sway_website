"use client";

import { AnnouncementMessage } from "@/lib/prisma";
import { useEffect, useMemo, useState } from "react";

interface AnnouncementBarProps {
  messages: AnnouncementMessage[];
  autoScroll?: boolean;
  scrollInterval?: number;
}

export default function AnnouncementBar({
  messages,
  autoScroll = true,
  scrollInterval = 5000,
}: AnnouncementBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedMessages = useMemo(
    () =>
      [...messages].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id),
    [messages]
  );

  useEffect(() => {
    if (!autoScroll || sortedMessages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sortedMessages.length);
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [sortedMessages.length, autoScroll, scrollInterval]);

  useEffect(() => {
    if (currentIndex >= sortedMessages.length && sortedMessages.length > 0) {
      setCurrentIndex(0);
    }
  }, [sortedMessages.length, currentIndex]);

  if (!sortedMessages || sortedMessages.length === 0) return null;

  return (
    <>
      <div className="h-[78.8px] bg-gradient-to-t from-rose-300 via-pink-400 to-purple-500" />
      <div className="w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-gray-300 to-slate-600 text-gray-800 overflow-hidden relative group  border-t-2 border-gray-600">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
          <div className="flex-1 text-center">
            <div className="relative min-h-6 overflow-hidden">
              <div className="transition-opacity duration-500 ease-in-out">
                {sortedMessages.map((item, index) => (
                  <div
                    key={item.id}
                    className={`${
                      index === currentIndex ? "block" : "hidden"
                    } min-h-6 flex items-center justify-center text-xs sm:text-sm font-bold tracking-wide px-2`}
                  >
                    <span className="drop-shadow-lg">
                      {item.message.split(/(\p{Emoji})/u).map((char, i) =>
                        /\p{Emoji}/u.test(char) ? (
                          <span key={i}>{char}</span>
                        ) : (
                          <span
                            key={i}
                            className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                          >
                            {char}
                          </span>
                        )
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 ml-4 flex items-center space-x-2">
            <div className="text-xs bg-stone-600 px-2 py-1 rounded-md font-semibold text-white">
              LIMITED TIME
            </div>
          </div>
        </div>

        {autoScroll && sortedMessages.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-600">
            <div
              className="h-full bg-amber-400 transition-all duration-300 ease-linear"
              style={{
                width: `${((currentIndex + 1) / sortedMessages.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
