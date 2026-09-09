"use client";

export default function Streamlines() {
  const rows = 14;
  const lines = Array.from({ length: rows }, (_, i) => {
    const y = 20 + i * (460 / rows);
    const bulge = 60 * Math.sin((i / rows) * Math.PI);
    const d = `M -50 ${y} Q 550 ${y - bulge}, 1150 ${y + 10}`;
    const opacity = 0.15 + (i / rows) * 0.35;
    return { d, opacity, key: i };
  });

  return (
    <svg
      viewBox="0 0 1100 500"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full opacity-55"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8fa3b3" stopOpacity="0" />
          <stop offset="50%" stopColor="#8fa3b3" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff7a45" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g stroke="url(#fade)" fill="none" strokeWidth="1">
        {lines.map((line) => (
          <path
            key={line.key}
            d={line.d}
            strokeDasharray="2 6"
            className="stream-line"
            style={{ opacity: line.opacity }}
          />
        ))}
      </g>
    </svg>
  );
}