"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { LampContainer } from "@/app/components/ui/lamp";
import { MotionCarousel } from "@/app/components/ui/motion-carousel";

export default function MarelliLampDemo() {
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
    "/Magneti%20marelli/d%C3%A9part.png",
    "/Magneti%20marelli/d%C3%A9part2.MOV",
    "/Magneti%20marelli/d%C3%A9part3.png",
    "/Magneti%20marelli/IMG_5490.png",
    "/Magneti%20marelli/IMG_5550.png",
    "/Magneti%20marelli/IMG_5555.png",
    "/Magneti%20marelli/IMG_5562.png",
  ];

  return (
    <div ref={demoRef} className="mt-1 space-y-[-1.25rem] sm:-mt-16 sm:space-y-[-8.5rem]">
      <LampContainer />
      <MotionCarousel slides={slides} imageFilter={carouselFilter} />
    </div>
  );
}
