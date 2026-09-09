"use client";

import { ArrowUpRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import GithubCardShiny from "./animata/card/github-card-shiny";
import { useLanguage } from "./LanguageProvider";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

type Project = {
  slug: string;
  tag: string;
  title: string;
  desc: string;
  tools: string[];
  externalUrl?: string;
  details?: string[];
  steps?: { label: string; description: string }[];
};

export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const { lang } = useLanguage();
  const projectGridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectGridRef,
    offset: ["start end", "end start"],
  });
  const aircraftX = useTransform(
    scrollYProgress,
    [0.08, 0.56, 0.6, 1],
    ["-86vw", "100vw", "100vw", "-86vw"]
  );
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousProgressRef = useRef(0);
  const acceptedScrollDirectionRef = useRef(1);
  const reverseScrollDistanceRef = useRef(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [aircraftFacing, setAircraftFacing] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const progressDelta = latest - previousProgressRef.current;
    const scrollDirection = progressDelta >= 0 ? 1 : -1;
    if (scrollDirection !== acceptedScrollDirectionRef.current) {
      reverseScrollDistanceRef.current += Math.abs(progressDelta);
      if (reverseScrollDistanceRef.current >= 0.045) {
        acceptedScrollDirectionRef.current = scrollDirection;
        reverseScrollDistanceRef.current = 0;
      }
    } else {
      reverseScrollDistanceRef.current = 0;
    }
    const followsOutboundPath = latest < 0.58;
    setAircraftFacing(followsOutboundPath === (acceptedScrollDirectionRef.current === 1) ? 1 : -1);
    previousProgressRef.current = latest;
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 180);
  });
  const allCategory = "all-projects";
  const allLabel = lang === "fr" ? "Tous" : "All";
  const categories = [allCategory, ...Array.from(new Set(projects.map((p) => p.tag)))];
  const [active, setActive] = useState(allCategory);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const filtered =
    active === allCategory ? projects : projects.filter((p) => p.tag === active);

  return (
    <div ref={projectGridRef} className="relative">
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActive(cat);
              setExpandedSlug(null);
            }}
            className={`rounded-sm border px-4 py-2 font-mono text-xs tracking-wide transition ${
              active === cat
                ? "border-accent bg-accent text-white"
                : "border-border text-text-dim hover:border-metal hover:text-metal-light"
            }`}
          >
            {cat === allCategory ? allLabel : cat}
          </button>
        ))}
      </div>
      <div className="pointer-events-none fixed left-0 top-24 z-20 h-96 w-[clamp(13rem,24vw,19rem)]" aria-hidden="true">
        <motion.div
          className="relative h-full w-full"
          style={{ x: aircraftX }}
          animate={{ scale: 0.72, scaleX: aircraftFacing }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.div className="rafale-exhaust absolute -left-16 top-36 w-64" animate={{ opacity: isScrolling ? 0.72 : 0, scaleX: isScrolling ? 1.08 : 0.72 }} transition={{ duration: 0.16 }} />
          <img
            src="/Rafale-Photoroom.png"
            alt=""
            className="absolute left-36 top-0 w-full drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </div>
      <motion.div
        layout
        transition={{ layout: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
                whileHover={expandedSlug === p.slug ? undefined : { y: -6 }}
              transition={{
                    layout: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
              }}
                className={`group ${expandedSlug === p.slug ? "sm:col-span-2" : ""}`}
            >
                <GithubCardShiny
                  className={`w-full cursor-pointer ${expandedSlug === p.slug ? "min-h-96" : ""}`}
                  tag={p.tag}
                  title={p.title}
                  desc={p.desc}
                  tools={p.tools}
                  onClick={() => setExpandedSlug(expandedSlug === p.slug ? null : p.slug)}
                >
                  <AnimatePresence initial={false}>
                    {expandedSlug === p.slug && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 overflow-hidden"
                      >
                        {p.details && (
                          <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm leading-6 text-text-dim">
                            {p.details.map((detail) => <li key={detail}>{detail}</li>)}
                          </ul>
                        )}
                        <div className="mt-6 flex items-center justify-between gap-4">
                          <HoverBorderGradient
                            href={p.externalUrl ?? `/projects/${p.slug}`}
                            target={p.externalUrl ? "_blank" : undefined}
                            rel={p.externalUrl ? "noreferrer" : undefined}
                            onClick={(event) => {
                              event.stopPropagation();
                              if (!p.externalUrl) window.scrollTo({ top: 0, behavior: "auto" });
                            }}
                            aria-label={lang === "fr" ? `Voir le projet ${p.title}` : `View project ${p.title}`}
                          >
                            {lang === "fr" ? "Voir le projet" : "View project"}
                            <ArrowUpRight className="size-4" aria-hidden="true" />
                          </HoverBorderGradient>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setExpandedSlug(null);
                            }}
                            className="liquid-button liquid-button--circle inline-flex size-9 items-center justify-center border border-border text-text-dim"
                            aria-label={lang === "fr" ? "Refermer le projet" : "Close project"}
                          >
                            <X className="size-4" aria-hidden="true" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GithubCardShiny>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
