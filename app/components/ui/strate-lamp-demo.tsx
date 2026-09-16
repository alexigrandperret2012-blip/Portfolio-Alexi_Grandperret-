"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { LampContainer } from "@/app/components/ui/lamp";
import { MotionCarousel } from "@/app/components/ui/motion-carousel";

export default function StrateLampDemo() {
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
    "/strate/IMG_6796.JPG",
    "/strate/IMG_6930.JPG",
    "/strate/IMG_6963.JPG",
    "/strate/IMG_6966.JPG",
    "/strate/IMG_6971.JPG",
    "/strate/IMG_6982.JPG",
    "/strate/IMG_6993.JPG",
    "/strate/IMG_7042.JPG",
    "/strate/IMG_7049.JPG",
    "/strate/IMG_7090.JPG",
    "/strate/IMG_7091.JPG",
    "/strate/IMG_7111.JPG",
    "/strate/IMG_7155.JPG",
    "/strate/IMG_7203.JPG",
  ];

  return (
    <div ref={demoRef} className="-mt-8 space-y-[-7rem] sm:-mt-16 sm:space-y-[-8.5rem]">
      <LampContainer />
      <MotionCarousel slides={slides} imageFilter={carouselFilter} />
    </div>
  );
}
