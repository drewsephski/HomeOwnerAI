"use client";

import { Mic } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSpeechRecognition } from "react-speech-recognition";
import SpeechRecognition from "react-speech-recognition";

interface AIVoiceInputProps {
  onStart?: () => void;
  onStop?: (duration: number, transcript?: string) => void;
  visualizerBars?: number;
  demoMode?: boolean;
  demoInterval?: number;
  className?: string;
  onTranscript?: (transcript: string) => void;
}

export function AIVoiceInput({
  onStart,
  onStop,
  visualizerBars = 48,
  demoMode = false,
  demoInterval = 3000,
  className,
  onTranscript
}: AIVoiceInputProps) {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(demoMode);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Update transcript when it changes
  useEffect(() => {
    if (transcript && onTranscript) {
      onTranscript(transcript);
    }
  }, [transcript, onTranscript]);

  // Handle speech recognition end
  useEffect(() => {
    if (!listening && submitted && transcript.trim()) {
      // Speech recognition just ended and we have a transcript
      // Use a small delay to ensure transcript is fully captured
      const timer = setTimeout(() => {
        setSubmitted(false);
        onStop?.(time, transcript);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [listening, submitted, transcript, time, onStop]);

  // Handle manual stop when listening but transcript is empty
  useEffect(() => {
    if (!listening && submitted && !transcript.trim()) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        onStop?.(time);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [listening, submitted, transcript, time, onStop]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let resetTimerId: NodeJS.Timeout;

    if (submitted) {
      onStart?.();
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      onStop?.(time);
      resetTimerId = setTimeout(() => setTime(0), 0);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(resetTimerId);
    };
  }, [submitted, time, onStart, onStop]);

  useEffect(() => {
    if (!isDemo) return;

    let timeoutId: NodeJS.Timeout;
    const runAnimation = () => {
      setSubmitted(true);
      timeoutId = setTimeout(() => {
        setSubmitted(false);
        timeoutId = setTimeout(runAnimation, 1000);
      }, demoInterval);
    };

    const initialTimeout = setTimeout(runAnimation, 100);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [isDemo, demoInterval]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    if (isDemo) {
      setIsDemo(false);
      setSubmitted(false);
      return;
    }

    if (listening) {
      // Stop listening
      SpeechRecognition.stopListening();
      setSubmitted(false);
    } else {
      // Start listening
      resetTranscript();
      setSubmitted(true);
      SpeechRecognition.startListening({
        continuous: true,
        language: 'en-US',
        interimResults: true,
      });
    }
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
        <button
          className={cn(
            "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
            submitted
              ? "bg-none"
              : "bg-none hover:bg-black/10 dark:hover:bg-white/10"
          )}
          type="button"
          onClick={handleClick}
        >
          {submitted ? (
            <div
              className="w-6 h-6 rounded-sm animate-spin bg-black dark:bg-white cursor-pointer pointer-events-auto"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <Mic className="w-6 h-6 text-black/70 dark:text-white/70" />
          )}
        </button>

        <span
          className={cn(
            "font-mono text-sm transition-opacity duration-300",
            submitted
              ? "text-black/70 dark:text-white/70"
              : "text-black/30 dark:text-white/30"
          )}
        >
          {formatTime(time)}
        </span>

        <div className="h-4 w-64 flex items-center justify-center gap-0.5">
          {[...Array(visualizerBars)].map((_, i) => {
            const height = 20 + ((i * 7) % 80); // Deterministic height based on index
            return (
              <div
                key={i}
                className={cn(
                  "w-0.5 rounded-full transition-all duration-300",
                  submitted
                    ? "bg-black/50 dark:bg-white/50 animate-pulse"
                    : "bg-black/10 dark:bg-white/10 h-1"
                )}
                style={
                  submitted && isClient
                    ? {
                        height: `${height}%`,
                        animationDelay: `${i * 0.05}s`,
                      }
                    : undefined
                }
              />
            );
          })}
        </div>

        <p className="h-4 text-xs text-black/70 dark:text-white/70">
          {submitted ? "Listening..." : "Click to speak"}
        </p>
      </div>
    </div>
  );
}