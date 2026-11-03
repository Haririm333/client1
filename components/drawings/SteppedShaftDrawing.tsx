import React from 'react';
import styles from './Drawings.module.css';

interface DrawingProps {
  className?: string;
  animate?: boolean;
}

export default function SteppedShaftDrawing({ className = '', animate = false }: DrawingProps) {
  return (
    <div className={`${styles.drawingWrapper} ${className}`} role="img" aria-label="Technical drawing of a precision stepped shaft with bearing seats, keyways and ground fillet radii. Representative illustration.">
      <svg
        viewBox="0 0 500 400"
        className={`${styles.svgCanvas} ${animate ? styles.strokeDraw : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Stepped Shaft Technical Drawing</title>
        <desc>Multi-diameter precision transmission shaft detailing transition shoulders, bearing seat lands, keyway, and ground undercut radii.</desc>

        <defs>
          <pattern id="grid-shaft" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dfe4ea" strokeWidth="0.5" strokeDasharray="1 3" />
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid-shaft)" opacity="0.4" />

        {/* Centerline */}
        <line x1="30" y1="200" x2="470" y2="200" stroke="#5b6570" strokeWidth="1" strokeDasharray="14 4 2 4" />

        {/* Stepped Shaft Profile (Symmetric about y=200) */}
        {/* Step 1: Drive End (⌀30, length 60) x: 60 -> 120 */}
        <rect x="60" y="175" width="60" height="50" stroke="#1f2326" strokeWidth="2" fill="#ffffff" />
        {/* Keyway on Drive End */}
        <rect x="75" y="175" width="35" height="8" stroke="#1e7bf0" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />

        {/* Step 2: Seal Journal (⌀40, length 30) x: 120 -> 150 */}
        <rect x="120" y="165" width="30" height="70" stroke="#1f2326" strokeWidth="2" fill="#ffffff" />

        {/* Step 3: Bearing Seat 1 (⌀50 k5, length 50) x: 150 -> 200 */}
        <rect x="150" y="155" width="50" height="90" stroke="#1f2326" strokeWidth="2" fill="#ffffff" />

        {/* Step 4: Central Main Shoulder (⌀70, length 100) x: 200 -> 300 */}
        <rect x="200" y="135" width="100" height="130" stroke="#1f2326" strokeWidth="2" fill="#ffffff" />
        {/* Gear Mount Keyway */}
        <rect x="220" y="135" width="60" height="12" stroke="#1e7bf0" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />

        {/* Step 5: Bearing Seat 2 (⌀50 k5, length 50) x: 300 -> 350 */}
        <rect x="300" y="155" width="50" height="90" stroke="#1f2326" strokeWidth="2" fill="#ffffff" />

        {/* Step 6: Driven End (⌀35, length 70) x: 350 -> 420 */}
        <rect x="350" y="170" width="70" height="60" stroke="#1f2326" strokeWidth="2" fill="#ffffff" />

        {/* Fillet Radii Indicators */}
        <path d="M 200 135 Q 203 145 200 155" stroke="#1e7bf0" strokeWidth="1.2" fill="none" />
        <path d="M 300 135 Q 297 145 300 155" stroke="#1e7bf0" strokeWidth="1.2" fill="none" />

        {/* Dimension Line 1: Overall Length */}
        <line x1="60" y1="310" x2="420" y2="310" stroke="#5b6570" strokeWidth="1" />
        <line x1="60" y1="230" x2="60" y2="320" stroke="#5b6570" strokeWidth="0.8" />
        <line x1="420" y1="235" x2="420" y2="320" stroke="#5b6570" strokeWidth="0.8" />
        <polygon points="60,310 70,307 70,313" fill="#5b6570" />
        <polygon points="420,310 410,307 410,313" fill="#5b6570" />
        <text x="225" y="304" fill="#1f2326" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">
          360 ±0.2
        </text>

        {/* Dimension Callout 2: Bearing Seat Tolerance */}
        <path d="M 175 155 L 175 90 L 100 90" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="175" cy="155" r="2" fill="#1e7bf0" />
        <text x="50" y="84" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          ⌀50 k5 [BEARING SEAT]
        </text>

        {/* Dimension Callout 3: Main Shoulder Diameter */}
        <path d="M 250 135 L 250 70 L 320 70" stroke="#1e7bf0" strokeWidth="1" />
        <circle cx="250" cy="135" r="2" fill="#1e7bf0" />
        <text x="325" y="65" fill="#1560c8" fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
          ⌀70 h8 / R2.5 GROUND FILLET
        </text>

        {/* Border */}
        <rect x="10" y="10" width="480" height="380" stroke="#dfe4ea" strokeWidth="1" />
        <text x="24" y="375" fill="#5b6570" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.08em">
          DWG NO: ML-SS-002 // STEPPED SHAFT // REPRESENTATIVE ILLUSTRATION
        </text>
      </svg>
    </div>
  );
}
