import React from 'react';
import styles from './Drawings.module.css';

interface DrawingProps {
  className?: string;
  animate?: boolean;
}

export default function LBracketDrawing({ className = '', animate = false }: DrawingProps) {
  return (
    <div className={`${styles.drawingWrapper} ${className}`} role="img" aria-label="Technical drawing of a formed sheetmetal L-bracket with triangular gusset, slotted mounting holes and bend reliefs. Representative illustration.">
      <svg
        viewBox="0 0 500 400"
        className={`${styles.svgCanvas} ${animate ? styles.strokeDraw : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Formed Sheetmetal L-Bracket Technical Drawing</title>
        <desc>Formed sheetmetal bracket with 90-degree bend radius, formed triangular gusset, slotted mounting holes, and bend relief cuts.</desc>

        <defs>
          <pattern id="grid-bracket" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dfe4ea" strokeWidth="0.5" strokeDasharray="1 3" />
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid-bracket)" opacity="0.4" />

        {/* L-Bracket Formed Profile (Side Projection) */}
        {/* Vertical Leg: x 100-120, y 70-260 */}
        {/* Horizontal Leg: x 100-360, y 260-280 */}
        <path
          d="M 100 70 L 120 70 L 120 260 L 360 260 L 360 280 L 100 280 Z"
          stroke="#1f2326"
          strokeWidth="2.5"
          fill="#ffffff"
        />

        {/* Formed Triangular Stiffening Gusset */}
        <polygon points="120,180 200,260 120,260" stroke="#1e7bf0" strokeWidth="1.8" fill="#eaf2fe" opacity="0.6" />
        <line x1="120" y1="180" x2="200" y2="260" stroke="#1e7bf0" strokeWidth="1.8" strokeDasharray="4 2" />

        {/* Inner Bend Radius (R3 mm) */}
        <path d="M 120 250 Q 120 260 130 260" stroke="#1f2326" strokeWidth="1.5" />

        {/* Slotted Mounting Holes (Vertical Leg) */}
        <rect x="105" y="100" width="10" height="30" rx="5" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />
        {/* Slotted Mounting Holes (Horizontal Leg) */}
        <rect x="270" y="265" width="40" height="10" rx="5" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />

        {/* Corner Bend Relief Notch Indicator */}
        <rect x="96" y="258" width="6" height="6" stroke="#1e7bf0" strokeWidth="1" fill="#1e7bf0" />

        {/* Dimension Line: Height */}
        <line x1="60" y1="70" x2="60" y2="280" stroke="#5b6570" strokeWidth="1" />
        <line x1="50" y1="70" x2="100" y2="70" stroke="#5b6570" strokeWidth="0.8" />
        <line x1="50" y1="280" x2="100" y2="280" stroke="#5b6570" strokeWidth="0.8" />
        <polygon points="60,70 57,80 63,80" fill="#5b6570" />
        <polygon points="60,280 57,270 63,270" fill="#5b6570" />
        <text x="25" y="180" fill="#1f2326" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
          210 ±0.5
        </text>

        {/* Dimension Line: Base Length */}
        <line x1="100" y1="320" x2="360" y2="320" stroke="#5b6570" strokeWidth="1" />
        <line x1="100" y1="280" x2="100" y2="330" stroke="#5b6570" strokeWidth="0.8" />
        <line x1="360" y1="280" x2="360" y2="330" stroke="#5b6570" strokeWidth="0.8" />
        <polygon points="100,320 110,317 110,323" fill="#5b6570" />
        <polygon points="360,320 350,317 350,323" fill="#5b6570" />
        <text x="210" y="314" fill="#1f2326" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
          260 ±0.5
        </text>

        {/* Callout: Sheetmetal Gauge & Material */}
        <path d="M 120 70 L 220 50 L 320 50" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="120" cy="70" r="2" fill="#1e7bf0" />
        <text x="225" y="44" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          3.0mm CRCA STEEL // BEND R3.0
        </text>

        {/* Callout: Triangular Gusset */}
        <path d="M 160 220 L 240 160 L 340 160" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="160" cy="220" r="2" fill="#1e7bf0" />
        <text x="245" y="154" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          FORMED GUSSET [ANTI-DEFLECTION]
        </text>

        {/* Border */}
        <rect x="10" y="10" width="480" height="380" stroke="#dfe4ea" strokeWidth="1" />
        <text x="24" y="375" fill="#5b6570" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.08em">
          DWG NO: ML-LB-005 // L-BRACKET GUSSET // REPRESENTATIVE ILLUSTRATION
        </text>
      </svg>
    </div>
  );
}
