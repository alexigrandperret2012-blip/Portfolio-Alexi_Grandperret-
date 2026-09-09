"use client";

const stars = [
  { left: "8%", top: "12%", size: "1.5" },
  { left: "20%", top: "24%", size: "1" },
  { left: "34%", top: "8%", size: "1.25" },
  { left: "52%", top: "18%", size: "1" },
  { left: "78%", top: "22%", size: "1.8" },
  { left: "86%", top: "12%", size: "1.2" },
  { left: "18%", top: "68%", size: "1" },
  { left: "48%", top: "72%", size: "1.1" },
  { left: "70%", top: "55%", size: "1.3" },
  { left: "90%", top: "52%", size: "1" },
];

export default function HomeBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.84),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(8,15,25,0.9),transparent_32%)]" />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-95"
        style={{ backgroundImage: "url('/background-image-mooo.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/5 via-slate-950/40 to-slate-950/85" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/90 via-slate-950/20 to-transparent" />

      <div
        className="absolute right-[5%] top-[24%] h-[18rem] w-[18rem] rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_58%)] blur-[1.2rem]"
        style={{ animation: "home-blob-drift 22s ease-in-out infinite" }}
      />

      <div
        className="absolute left-0 top-[30%] h-2 w-36 rounded-full bg-blue-300/12 blur-sm"
        style={{ animation: "home-glow-drift-a 18s ease-in-out infinite" }}
      />
      <div
        className="absolute right-10 top-[50%] h-2 w-48 rounded-full bg-cyan-300/12 blur-sm"
        style={{ animation: "home-glow-drift-b 20s ease-in-out infinite" }}
      />

      {stars.map((star, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-white/80"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `home-star-twinkle ${4 + index * 0.3}s ease-in-out infinite`,
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
