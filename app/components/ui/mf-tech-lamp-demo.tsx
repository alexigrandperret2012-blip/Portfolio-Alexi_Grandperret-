"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { LampContainer } from "@/app/components/ui/lamp";
import { MotionCarousel } from "@/app/components/ui/motion-carousel";

export default function MfTechLampDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: demoRef,
    offset: ["start end", "end start"],
  });

  const carouselFilter = useTransform(
    scrollYProgress,
    [0, 0.24, 0.42, 1],
    ["brightness(0.4) saturate(0.68)", "brightness(0.75) saturate(0.82)", "brightness(1.12) saturate(1.05)", "brightness(0.55) saturate(0.8)"]
  );

  const slides = [
    "/MF%20tech/11.mov",
    "/MF%20tech/0232c58e-5176-4cfd-8157-09e0e6e53528-scaled.jpg",
    "/MF%20tech/Copie-de-Sans-titre-2.png",
    "/MF%20tech/IMG_0688.jpeg",
    "/MF%20tech/IMG_0689.jpeg",
    "/MF%20tech/IMG_0690.jpeg",
    "/MF%20tech/IMG_0924-scaled.jpg",
  ];

  return (
    <div ref={demoRef} className="-mt-16 space-y-[-8.5rem]">
      <LampContainer />
      <MotionCarousel slides={slides} imageFilter={carouselFilter} />
    </div>
  );
}
