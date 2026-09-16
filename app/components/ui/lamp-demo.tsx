"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { LampContainer } from "@/app/components/ui/lamp";
import { MotionCarousel } from "@/app/components/ui/motion-carousel";

export default function LampDemo() {
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
    "/GRUAU/1.avif",
    "/GRUAU/image%20(1).png",
    "/GRUAU/image%20(5).png",
    "/GRUAU/IMG_4753.jpeg",
    "/GRUAU/IMG_5136.jpeg",
    "/GRUAU/IMG_5142.jpeg",
    "/GRUAU/IMG_5150.jpeg",
    "/GRUAU/Gemini_Generated_Image_3xhqt33xhqt33xhq.jpg",
  ];

  return (
    <div ref={demoRef} className="-mt-8 space-y-[-7rem] sm:-mt-16 sm:space-y-[-8.5rem]">
      <LampContainer />
      <MotionCarousel slides={slides} imageFilter={carouselFilter} />
    </div>
  );
}
