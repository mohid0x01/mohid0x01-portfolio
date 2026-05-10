import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState("");

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const xSetRing = gsap.quickSetter(ring, "x", "px");
    const ySetRing = gsap.quickSetter(ring, "y", "px");
    const xSetDot = gsap.quickSetter(dot, "x", "px");
    const ySetDot = gsap.quickSetter(dot, "y", "px");

    const rSet = gsap.quickSetter(ring, "rotate", "deg");
    const sxSet = gsap.quickSetter(ring, "scaleX");
    const sySet = gsap.quickSetter(ring, "scaleY");

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouse.current.x = clientX;
      mouse.current.y = clientY;

      const target = e.target.closest("[data-magnetic]");
      if (target) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        xSetDot(centerX);
        ySetDot(centerY);
      } else {
        xSetDot(clientX);
        ySetDot(clientY);
      }

      const interactable = e.target.closest("[data-cursor]");
      if (interactable) {
        setCursorText(interactable.getAttribute("data-cursor"));
        gsap.to(ring, {
          width: 85,
          height: 85,
          backgroundColor: "white",
          mixBlendMode: "difference",
          duration: 0.5,
          ease: "expo.out",
        });
        gsap.to(textRef.current, {
          opacity: 1,
          scale: 1,
          color: "black",
          duration: 0.3,
        });
      } else {
        setCursorText("");
        gsap.to(ring, {
          width: 40,
          height: 40,
          backgroundColor: "transparent",
          mixBlendMode: "difference",
          duration: 0.5,
          ease: "expo.out",
        });
        gsap.to(textRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
      }
    };

    const render = () => {
      const ease = 0.12;
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      pos.current.x += dx * ease;
      pos.current.y += dy * ease;
      vel.current.x = dx;
      vel.current.y = dy;
      const speed = Math.sqrt(dx * dx + dy * dy);
      xSetRing(pos.current.x);
      ySetRing(pos.current.y);
      const stretch = gsap.utils.clamp(0, 0.8, speed / 100);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      rSet(angle);
      sxSet(1 + stretch);
      sySet(1 - stretch / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(render);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center will-change-transform"
      >
        <span
          ref={textRef}
          className="text-[10px] font-bold uppercase tracking-tighter"
        >
          {cursorText}
        </span>
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
    </>
  );
};

export default CustomCursor;
