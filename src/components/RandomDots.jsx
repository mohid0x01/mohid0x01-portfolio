import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const RandomDots = ({ count = 80 }) => {
  const container = useRef();

  const [dots] = useState(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, 
      opacity: Math.random() * 0.5 + 0.2,
    }));
  });

  useGSAP(
    () => {
      const allDots = container.current.querySelectorAll(".dot");

      allDots.forEach((dot) => {
        gsap.to(dot, {
          x: "random(-50, 50)",
          y: "random(-50, 50)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(dot, {
          scale: "random(0.2, 1.5)", 
          opacity: 1,
          filter: "brightness(1.5) blur(0.5px)", 
          duration: "random(0.5, 2)",
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: "random(0, 5)",
        });
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-transparent"
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="dot absolute rounded-full shadow-[0_0_10px_rgba(245,150,162,0.5)]"
          style={{
            top: dot.top,
            left: dot.left,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            background: `radial-gradient(circle, #ffffff 0%, #f596a2 40%, rgba(245,150,162,0) 100%)`,
          }}
        />
      ))}
    </div>
  );
};

export default RandomDots;
