import React from 'react';
import styles from './Drawings.module.css';

interface DrawingProps {
  className?: string;
  animate?: boolean;
}

export default function SpurGearDrawing({ className = '', animate = false }: DrawingProps) {
  return (
    <div className={`${styles.drawingWrapper} ${className}`} role="img" aria-label="Technical drawing of a module-based spur gear with keyway, bore, pitch circle diameter and root circle. Representative illustration.">
      <svg
        viewBox="0 0 500 400"
        className={`${styles.svgCanvas} ${animate ? styles.strokeDraw : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Spur Gear Technical Drawing</title>
        <desc>Module-based involute gear profile with pitch circle diameter, dedendum, addendum, shaft bore, and keyway.</desc>

        <defs>
          <pattern id="grid-gear" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dfe4ea" strokeWidth="0.5" strokeDasharray="1 3" />
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid-gear)" opacity="0.4" />

        {/* Tip / Addendum Circle (Outer) */}
        <circle cx="250" cy="200" r="145" stroke="#1f2326" strokeWidth="2" />

        {/* Pitch Circle Diameter (PCD) - Blue Dash-dot */}
        <circle cx="250" cy="200" r="125" stroke="#1e7bf0" strokeWidth="1.2" strokeDasharray="8 4 2 4" />

        {/* Root / Dedendum Circle */}
        <circle cx="250" cy="200" r="105" stroke="#1f2326" strokeWidth="1.5" strokeDasharray="5 3" />

        {/* Gear Hub Outer Diameter */}
        <circle cx="250" cy="200" r="60" stroke="#1f2326" strokeWidth="2" />

        {/* Central Shaft Bore */}
        <circle cx="250" cy="200" r="30" stroke="#1f2326" strokeWidth="2" />

        {/* Keyway */}
        <path d="M 243 170 L 243 162 L 257 162 L 257 170" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />

        {/* 12 Involute Teeth Representations */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 250 + 105 * Math.cos(angle);
          const y1 = 200 + 105 * Math.sin(angle);
          const x2 = 250 + 145 * Math.cos(angle);
          const y2 = 200 + 145 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#1f2326"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}

        {/* Centerlines */}
        <line x1="60" y1="200" x2="440" y2="200" stroke="#5b6570" strokeWidth="1" strokeDasharray="12 4 2 4" />
        <line x1="250" y1="30" x2="250" y2="370" stroke="#5b6570" strokeWidth="1" strokeDasharray="12 4 2 4" />

        {/* Callout: Pitch Circle Diameter */}
        <path d="M 338 112 L 390 60 L 460 60" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="338" cy="112" r="2" fill="#1e7bf0" />
        <text x="395" y="54" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          PCD ⌀250 (MODULE 5)
        </text>

        {/* Callout: Pressure Angle & Tooth Count */}
        <path d="M 395 200 L 440 200" stroke="#5b6570" strokeWidth="1" />
        <text x="390" y="220" fill="#1f2326" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
          Z = 50 / α = 20°
        </text>

        {/* Callout: Shaft Bore Tolerance */}
        <path d="M 243 162 L 180 90 L 110 90" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="243" cy="162" r="2" fill="#1e7bf0" />
        <text x="110" y="84" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          ⌀60 H7 / KEY 18x11
        </text>

        {/* Border */}
        <rect x="10" y="10" width="480" height="380" stroke="#dfe4ea" strokeWidth="1" />
        <text x="24" y="375" fill="#5b6570" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.08em">
          DWG NO: ML-SG-001 // SPUR GEAR // REPRESENTATIVE ILLUSTRATION
        </text>
      </svg>
    </div>
  );
}
