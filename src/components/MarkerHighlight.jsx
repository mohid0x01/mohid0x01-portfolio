import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MarkerHighlight = ({
  children,
  duration = 0.8,
  delay = 0,
}) => {
  const markerRef = useRef();

  useGSAP(
    () => {
      gsap.from(markerRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: markerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: markerRef },
  );

  return (
    <span
      ref={markerRef}
      className="relative z-0 inline-block px-1 origin-[left_center]"
    >
      <span
        className={`absolute inset-0 -z-10 h-[105%] w-full bg-accent origin-[left_center] opacity-90`}
        aria-hidden="true"
        style={{ transform: "skewY(-1deg) rotate(-0.5deg)" }}
      />
      <span className="relative z-10 text-white italic">{children}</span>
    </span>
  );
};

export default MarkerHighlight;
