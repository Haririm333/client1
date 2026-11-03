import React from 'react';
import styles from './Drawings.module.css';

interface DrawingProps {
  className?: string;
  animate?: boolean;
}

export default function GearPlateDrawing({ className = '', animate = false }: DrawingProps) {
  return (
    <div className={`${styles.drawingWrapper} ${className}`} role="img" aria-label="Technical drawing of a lightweight CNC machined gear plate with spoke-style cutouts and weight reduction pockets. Representative illustration.">
      <svg
        viewBox="0 0 500 400"
        className={`${styles.svgCanvas} ${animate ? styles.strokeDraw : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Lightened Gear Plate Technical Drawing</title>
        <desc>CNC machined aluminum gear plate featuring spoke-style lightening pockets, peripheral mounting circle, central bearing register, and stress relief radii.</desc>

        <defs>
          <pattern id="grid-plate" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dfe4ea" strokeWidth="0.5" strokeDasharray="1 3" />
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid-plate)" opacity="0.4" />

        {/* Outer Perimeter Circle */}
        <circle cx="250" cy="200" r="140" stroke="#1f2326" strokeWidth="2" />

        {/* Peripheral Mounting PCD */}
        <circle cx="250" cy="200" r="120" stroke="#1e7bf0" strokeWidth="1" strokeDasharray="6 3" />

        {/* 6 Peripheral Mounting Holes */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const cx = 250 + 120 * Math.cos(angle);
          const cy = 200 + 120 * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="6"
              stroke="#1f2326"
              strokeWidth="1.5"
              fill="#ffffff"
            />
          );
        })}

        {/* 4 Spoke-Style Lightening Cutout Pockets */}
        {/* Symmetric kidney/spoke shapes */}
        <path
          d="M 215 165 C 225 140 240 135 250 135 C 260 135 275 140 285 165 C 275 170 265 175 250 175 C 235 175 225 170 215 165 Z"
          stroke="#1f2326"
          strokeWidth="1.8"
          fill="#f4f5f7"
        />
        <path
          d="M 215 235 C 225 260 240 265 250 265 C 260 265 275 260 285 235 C 275 230 265 225 250 225 C 235 225 225 230 215 235 Z"
          stroke="#1f2326"
          strokeWidth="1.8"
          fill="#f4f5f7"
        />
        <path
          d="M 165 215 C 140 225 135 240 135 250 C 135 260 140 275 165 285 C 170 275 175 265 175 250 C 175 235 170 225 165 215 Z"
          stroke="#1f2326"
          strokeWidth="1.8"
          fill="#f4f5f7"
          transform="rotate(-90 250 200)"
        />
        <path
          d="M 165 215 C 140 225 135 240 135 250 C 135 260 140 275 165 285 C 170 275 175 265 175 250 C 175 235 170 225 165 215 Z"
          stroke="#1f2326"
          strokeWidth="1.8"
          fill="#f4f5f7"
          transform="rotate(90 250 200)"
        />

        {/* Central Hub & Bore */}
        <circle cx="250" cy="200" r="45" stroke="#1f2326" strokeWidth="2" />
        <circle cx="250" cy="200" r="22" stroke="#1f2326" strokeWidth="2" fill="#ffffff" />

        {/* Centerlines */}
        <line x1="70" y1="200" x2="430" y2="200" stroke="#5b6570" strokeWidth="1" strokeDasharray="14 4 2 4" />
        <line x1="250" y1="30" x2="250" y2="370" stroke="#5b6570" strokeWidth="1" strokeDasharray="14 4 2 4" />

        {/* Callout 1: Spoke Cutouts for Inertia Reduction */}
        <path d="M 270 150 L 340 90 L 430 90" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="270" cy="150" r="2" fill="#1e7bf0" />
        <text x="345" y="84" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          LIGHTENING POCKETS [40% MASS SAVINGS]
        </text>

        {/* Callout 2: Outer Diameter & Flatness */}
        <line x1="390" y1="200" x2="450" y2="200" stroke="#5b6570" strokeWidth="0.8" />
        <text x="390" y="225" fill="#1f2326" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
          ⌀280 ±0.1 // ⏥ 0.05
        </text>

        {/* Border */}
        <rect x="10" y="10" width="480" height="380" stroke="#dfe4ea" strokeWidth="1" />
        <text x="24" y="375" fill="#5b6570" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.08em">
          DWG NO: ML-GP-006 // GEAR PLATE // REPRESENTATIVE ILLUSTRATION
        </text>
      </svg>
    </div>
  );
}
