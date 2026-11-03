import React from 'react';
import styles from './Drawings.module.css';

interface DrawingProps {
  className?: string;
  animate?: boolean;
}

export default function FlangeCouplingDrawing({ className = '', animate = false }: DrawingProps) {
  return (
    <div className={`${styles.drawingWrapper} ${className}`} role="img" aria-label="Technical drawing of a rigid bolted flange coupling with pitch circle diameter and bolt pattern callouts. Representative illustration.">
      <svg
        viewBox="0 0 500 400"
        className={`${styles.svgCanvas} ${animate ? styles.strokeDraw : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Flange Coupling Engineering Drawing</title>
        <desc>Orthographic and front representation of a rigid bolted flange coupling with PCD circle, central bore, keyway, and dimension callouts.</desc>

        {/* Drawing Grid Background (Subtle 20px) */}
        <defs>
          <pattern id="grid-flange" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dfe4ea" strokeWidth="0.5" strokeDasharray="1 3" />
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid-flange)" opacity="0.4" />

        {/* Main Outer Flange Rim */}
        <circle cx="250" cy="200" r="140" stroke="#1f2326" strokeWidth="2" />
        
        {/* Recessed Spigot Register */}
        <circle cx="250" cy="200" r="105" stroke="#1f2326" strokeWidth="1.5" strokeDasharray="6 3" />

        {/* Pitch Circle Diameter (PCD) */}
        <circle cx="250" cy="200" r="80" stroke="#1e7bf0" strokeWidth="1" strokeDasharray="8 4 2 4" />

        {/* Hub / Boss */}
        <circle cx="250" cy="200" r="50" stroke="#1f2326" strokeWidth="2" />

        {/* Central Shaft Bore */}
        <circle cx="250" cy="200" r="25" stroke="#1f2326" strokeWidth="2" />

        {/* Keyway */}
        <path d="M 245 175 L 245 168 L 255 168 L 255 175" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />

        {/* 6 Reamed Bolt Holes on PCD */}
        {/* Angle 0, 60, 120, 180, 240, 300 degrees */}
        <circle cx="330" cy="200" r="10" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />
        <circle cx="290" cy="269.28" r="10" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />
        <circle cx="210" cy="269.28" r="10" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />
        <circle cx="170" cy="200" r="10" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />
        <circle cx="210" cy="130.72" r="10" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />
        <circle cx="290" cy="130.72" r="10" stroke="#1f2326" strokeWidth="1.5" fill="#ffffff" />

        {/* Centerlines (Dash-dot #5b6570) */}
        <line x1="80" y1="200" x2="420" y2="200" stroke="#5b6570" strokeWidth="1" strokeDasharray="12 4 2 4" />
        <line x1="250" y1="30" x2="250" y2="370" stroke="#5b6570" strokeWidth="1" strokeDasharray="12 4 2 4" />

        {/* Technical Callout 1: PCD Callout */}
        <path d="M 290 130.72 L 360 80 L 440 80" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="290" cy="130.72" r="2" fill="#1e7bf0" />
        <text x="365" y="74" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          6x ⌀20 ON ⌀160 PCD
        </text>

        {/* Technical Callout 2: Outer Flange Diameter */}
        <line x1="390" y1="200" x2="460" y2="200" stroke="#5b6570" strokeWidth="0.8" />
        <line x1="450" y1="60" x2="450" y2="340" stroke="#5b6570" strokeWidth="0.8" />
        <polygon points="450,60 447,70 453,70" fill="#5b6570" />
        <polygon points="450,340 447,330 453,330" fill="#5b6570" />
        <text x="456" y="204" fill="#1f2326" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
          ⌀280 h9
        </text>

        {/* Technical Callout 3: Bore & Keyway Fit */}
        <path d="M 245 168 L 180 100 L 110 100" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="245" cy="168" r="2" fill="#1e7bf0" />
        <text x="110" y="94" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          BORE ⌀50 H7 / KEY 14x9
        </text>

        {/* Drawing Border & Label */}
        <rect x="10" y="10" width="480" height="380" stroke="#dfe4ea" strokeWidth="1" />
        <text x="24" y="375" fill="#5b6570" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.08em">
          DWG NO: ML-FC-003 // FLANGE COUPLING // REPRESENTATIVE ILLUSTRATION
        </text>
      </svg>
    </div>
  );
}
