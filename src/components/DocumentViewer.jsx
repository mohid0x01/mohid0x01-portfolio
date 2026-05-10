import React, { useRef } from "react";
import { HiXMark } from "react-icons/hi2";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const DocumentViewer = ({ file, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    }).from(
      modalRef.current,
      {
        scale: 0.9,
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "expo.out",
      },
      "-=0.2",
    );
  }, []);

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-main-bg/95 backdrop-blur-xl opacity-0"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="relative w-full h-full max-w-5xl bg-main-bg border border-accent/20 rounded-lg overflow-hidden flex flex-col will-change-transform"
      > <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <span className="text-[10px] uppercase tracking-widest font-bold text-accent">
            Document Viewer
          </span>
          <button
            onClick={onClose}
            className="p-2 bg-accent rounded-full transition-colors group"
          >
            <HiXMark className="text-2xl text-main-text group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="grow bg-main-bg">
          <iframe
            src={`${file}#toolbar=0`} 
            className="w-full h-full border-none"
            title="Document Content"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
