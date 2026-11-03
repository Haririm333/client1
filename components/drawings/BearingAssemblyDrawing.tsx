import React from 'react';
import styles from './Drawings.module.css';

interface DrawingProps {
  className?: string;
  animate?: boolean;
}

export default function BearingAssemblyDrawing({ className = '', animate = false }: DrawingProps) {
  return (
    <div className={`${styles.drawingWrapper} ${className}`} role="img" aria-label="Technical drawing of a bearing housing assembly with internal circlip groove, deep-groove ball bearing, and seal. Representative illustration.">
      <svg
        viewBox="0 0 500 400"
        className={`${styles.svgCanvas} ${animate ? styles.strokeDraw : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Bearing Housing Assembly Technical Drawing</title>
        <desc>Cross-section of a machined bearing housing with precision H7 bearing bore, retention circlip, deep groove ball bearing, and seal.</desc>

        <defs>
          <pattern id="grid-bearing" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dfe4ea" strokeWidth="0.5" strokeDasharray="1 3" />
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid-bearing)" opacity="0.4" />

        {/* Centerline */}
        <line x1="50" y1="200" x2="450" y2="200" stroke="#5b6570" strokeWidth="1" strokeDasharray="14 4 2 4" />

        {/* Housing Outer Wall */}
        <rect x="120" y="70" width="260" height="260" stroke="#1f2326" strokeWidth="2" fill="#ffffff" />

        {/* Housing Flange Mounting Holes */}
        <circle cx="150" cy="100" r="8" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />
        <circle cx="350" cy="100" r="8" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />
        <circle cx="150" cy="300" r="8" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />
        <circle cx="350" cy="300" r="8" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />

        {/* Bearing Outer Ring Bore (⌀160) */}
        <circle cx="250" cy="200" r="80" stroke="#1f2326" strokeWidth="2" />

        {/* Bearing Outer Race */}
        <circle cx="250" cy="200" r="70" stroke="#1f2326" strokeWidth="1.5" />

        {/* Bearing Pitch Circle */}
        <circle cx="250" cy="200" r="55" stroke="#1e7bf0" strokeWidth="1" strokeDasharray="6 3" />

        {/* 8 Ball Bearings */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 250 + 55 * Math.cos(angle);
          const cy = 200 + 55 * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="12"
              stroke="#1f2326"
              strokeWidth="1.5"
              fill="#f4f5f7"
            />
          );
        })}

        {/* Bearing Inner Race */}
        <circle cx="250" cy="200" r="40" stroke="#1f2326" strokeWidth="1.5" />

        {/* Shaft Through Bore (⌀60) */}
        <circle cx="250" cy="200" r="30" stroke="#1f2326" strokeWidth="2" />

        {/* Internal Circlip Groove Indicator */}
        <path d="M 235 120 L 265 120" stroke="#1e7bf0" strokeWidth="2" />

        {/* Callout 1: Housing Bore Fit */}
        <path d="M 320 160 L 380 90 L 450 90" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="320" cy="160" r="2" fill="#1e7bf0" />
        <text x="385" y="84" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          HOUSING BORE ⌀160 H7
        </text>

        {/* Callout 2: Shaft Fit */}
        <path d="M 225 180 L 160 110 L 80 110" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="225" cy="180" r="2" fill="#1e7bf0" />
        <text x="50" y="104" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          SHAFT ⌀60 j6 / CIRCLIP DIN 472
        </text>

        {/* Border */}
        <rect x="10" y="10" width="480" height="380" stroke="#dfe4ea" strokeWidth="1" />
        <text x="24" y="375" fill="#5b6570" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.08em">
          DWG NO: ML-BA-004 // BEARING ASSEMBLY // REPRESENTATIVE ILLUSTRATION
        </text>
      </svg>
    </div>
  );
}
