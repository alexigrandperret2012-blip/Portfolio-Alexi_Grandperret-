"use client";

import { motion } from "motion/react";

type Group = { title: string; items: string[] };

export default function SkillsGrid({ groups }: { groups: Group[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="mb-3.5 font-mono text-[11px] uppercase tracking-wide text-text-faint">
            {group.title}
          </div>
          <div className="flex flex-wrap gap-2">
            {group.items.map((thing) => (
              <motion.span
                key={thing}
                whileHover={{ scale: 1.08, y: -2 }}
                transition={{ duration: 0.2 }}
                className="cursor-default rounded-sm border border-border bg-bg-panel px-3 py-1.5 font-mono text-[12.5px] text-metal-light transition-colors hover:border-accent"
              >
                {thing}
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
