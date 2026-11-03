import { ImageResponse } from 'next/og';

export const alt = 'The MechLab Engineering - Design, Engineer, Deliver';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#f4f5f7',
          padding: '60px 80px',
          border: '12px solid #1f2326',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Header Rule */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #1f2326',
            paddingBottom: '24px',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '2px',
              color: '#1f2326',
            }}
          >
            THE MECHLAB ENGINEERING
          </div>
          <div
            style={{
              fontSize: '18px',
              fontFamily: 'monospace',
              letterSpacing: '3px',
              color: '#1e7bf0',
              fontWeight: 700,
            }}
          >
            DESIGN • ENGINEER • DELIVER
          </div>
        </div>

        {/* Central Drawing Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '16px',
              fontFamily: 'monospace',
              letterSpacing: '2px',
              color: '#5b6570',
              textTransform: 'uppercase',
            }}
          >
            01 / MECHANICAL DESIGN STUDIO
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#1f2326',
              maxWidth: '900px',
            }}
          >
            Engineering ideas, built to perform.
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#2b3035',
              maxWidth: '850px',
              lineHeight: 1.4,
            }}
          >
            3D CAD Modelling • Sheetmetal Design • 2D Drafting &amp; GD&amp;T • Reverse Engineering • 3D Printing Prototyping
          </div>
        </div>

        {/* Title Block Footer Grid */}
        <div
          style={{
            display: 'flex',
            border: '2px solid #1f2326',
            backgroundColor: '#ffffff',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '12px 20px',
              borderRight: '1px solid #dfe4ea',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#5b6570' }}>CONTACT</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#1f2326' }}>themechlabengineering@gmail.com</span>
          </div>
          <div
            style={{
              flex: 1,
              padding: '12px 20px',
              borderRight: '1px solid #dfe4ea',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#5b6570' }}>PHONE &amp; WHATSAPP</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#1f2326' }}>+91 86102 41235</span>
          </div>
          <div
            style={{
              width: '180px',
              padding: '12px 20px',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#1f2326',
            }}
          >
            <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#dfe4ea' }}>DRAWING SHEET</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>REV 1.0.0</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

