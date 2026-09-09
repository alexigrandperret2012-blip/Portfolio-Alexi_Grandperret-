"use client";

import { useEffect, useState } from "react";

export default function StartupOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ssrMask = document.getElementById("startup-ssr-mask");

    if (media.matches) {
      if (ssrMask) ssrMask.style.display = "none";
      window.setTimeout(() => setIsVisible(false), 0);
      return;
    }

    window.setTimeout(() => {
      if (ssrMask) ssrMask.style.display = "none";
    }, 80);

    const COUNTDOWN_START = 5;
    const COUNTDOWN_STEP_MS = 1200;
    const OPENING_DELAY_MS = COUNTDOWN_START * COUNTDOWN_STEP_MS;
    const FADE_DELAY_MS = OPENING_DELAY_MS + 900;
    const REMOVE_DELAY_MS = OPENING_DELAY_MS + 1700;
    const timerIds: number[] = [];
    let fastForwarded = false;

    const clearScheduledTimers = () => {
      for (const id of timerIds) {
        window.clearTimeout(id);
      }
      timerIds.length = 0;
    };

    for (let value = COUNTDOWN_START - 1; value >= 1; value -= 1) {
      const delay = (COUNTDOWN_START - value) * COUNTDOWN_STEP_MS;
      const id = window.setTimeout(() => {
        setCountdown(value);
      }, delay);
      timerIds.push(id);
    }

    const openingTimer = window.setTimeout(() => {
      setIsOpening(true);
    }, OPENING_DELAY_MS);
    timerIds.push(openingTimer);

    const fadeTimer = window.setTimeout(() => {
      setIsFading(true);
    }, FADE_DELAY_MS);
    timerIds.push(fadeTimer);

    const removeTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, REMOVE_DELAY_MS);
    timerIds.push(removeTimer);

    const fastForwardIntro = () => {
      if (fastForwarded) return;
      fastForwarded = true;

      clearScheduledTimers();
      setCountdown(0);
      setIsOpening(true);

      const quickFade = window.setTimeout(() => {
        setIsFading(true);
      }, 220);
      const quickRemove = window.setTimeout(() => {
        setIsVisible(false);
      }, 980);

      timerIds.push(quickFade, quickRemove);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        fastForwardIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearScheduledTimers();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`startup-overlay ${isOpening ? "startup-overlay--opening" : ""} ${isFading ? "startup-overlay--fade" : ""}`}
      aria-hidden="true"
    >
      <div className="startup-overlay__shutter startup-overlay__shutter--top" />
      <div className="startup-overlay__shutter startup-overlay__shutter--bottom" />
      <div className="startup-overlay__center-line" />
      <div className="startup-overlay__flash" />
      <div className="startup-overlay__fx">
        <div className="startup-overlay__pulse" />
        <div className="startup-overlay__grid" />
        <div className="startup-overlay__scanlines" />
        <div className="startup-overlay__noise" />
      </div>
      <div className="startup-overlay__message">
        <span>SYSTEM ONLINE</span>
        <span className="startup-overlay__countdown">
          {`LAUNCH IN ${countdown}`}
        </span>
        <span className="startup-overlay__cursor" />
      </div>
    </div>
  );
}