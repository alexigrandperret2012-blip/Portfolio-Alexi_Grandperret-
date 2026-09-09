"use client";

import { Fragment, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type Token = { key: string; node: React.ReactNode; isSpace: boolean };

function tokenize(children: React.ReactNode): Token[] {
  const nodes = Array.isArray(children) ? children : [children];
  const tokens: Token[] = [];
  nodes.forEach((node, i) => {
    if (typeof node === "string") {
      node
        .split(/(\s+)/)
        .filter((part) => part.length > 0)
        .forEach((part, j) => {
          tokens.push({ key: `s-${i}-${j}`, node: part, isSpace: /^\s+$/.test(part) });
        });
    } else {
      tokens.push({ key: `n-${i}`, node, isSpace: false });
    }
  });
  return tokens;
}

// Groups consecutive word tokens into small chunks so the reveal effect only
// needs a handful of animated elements instead of one per word (cheaper to animate while scrolling).
const CHUNK_SIZE = 4;

function chunkTokens(tokens: Token[]): { key: string; nodes: React.ReactNode[] }[] {
  const chunks: { key: string; nodes: React.ReactNode[] }[] = [];
  let current: React.ReactNode[] = [];

  const flush = () => {
    if (current.length > 0) {
      chunks.push({ key: `chunk-${chunks.length}`, nodes: current });
      current = [];
    }
  };

  let wordsInChunk = 0;
  tokens.forEach((t) => {
    current.push(<Fragment key={t.key}>{t.node}</Fragment>);
    if (!t.isSpace) {
      wordsInChunk += 1;
      if (wordsInChunk >= CHUNK_SIZE) {
        flush();
        wordsInChunk = 0;
      }
    }
  });
  flush();

  return chunks;
}

function Chunk({
  children,
  index,
  total,
  progress,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

// Reveals text chunk-by-chunk as the user scrolls past it, instead of all at once.
export default function ScrollRevealText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });

  const chunks = useMemo(() => chunkTokens(tokenize(children)), [children]);
  const total = Math.max(chunks.length, 1);

  return (
    <div ref={ref} className={className}>
      {chunks.map((chunk, index) => (
        <Chunk key={chunk.key} index={index} total={total} progress={scrollYProgress}>
          {chunk.nodes}
        </Chunk>
      ))}
    </div>
  );
}
