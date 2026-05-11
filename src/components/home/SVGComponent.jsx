import * as React from "react";

const SVGComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 200"
    {...props}
  >
    <defs>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&display=swap');
        .hero-text {
          font-family: 'Syncopate', sans-serif;
          font-weight: 700;
          font-size: 200px;
          fill: currentColor;
          letter-spacing: -0.05em;
        }
      `}</style>
    </defs>
    <text className="hero-text" x="50%" y="78%" dominantBaseline="middle" textAnchor="middle">
      MOHID
    </text>
  </svg>
);

export default SVGComponent;
