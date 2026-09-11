import React from 'react';

export default function PoppysLogo({ size = 42, showText = true }) {
  return (
    <div className="poppys-official-logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {/* Royal Gold Lotus Emblem */}
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="poppysLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCF6BA" />
            <stop offset="25%" stopColor="#BF953F" />
            <stop offset="50%" stopColor="#FBF5B7" />
            <stop offset="75%" stopColor="#B38728" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#D4AF37" floodOpacity="0.4"/>
          </filter>
        </defs>

        <rect width="100" height="100" rx="22" fill="#081324" />
        <rect x="2.5" y="2.5" width="95" height="95" rx="20" fill="none" stroke="url(#poppysLogoGold)" strokeWidth="2" strokeOpacity="0.7" />

        <g filter="url(#logoGlow)" transform="translate(50, 48)">
          {/* Center Spire */}
          <path d="M 0,-26 C -3.5,-15 -3.5,-4 0,11 C 3.5,-4 3.5,-15 0,-26 Z" fill="url(#poppysLogoGold)" />
          
          {/* Inner Petals */}
          <path d="M -5,-3 C -13,-14 -20,-16 -19,-3 C -18,8 -8,11 0,13 C -4.5,8 -5.5,2 -5,-3 Z" fill="url(#poppysLogoGold)" opacity="0.95"/>
          <path d="M 5,-3 C 13,-14 20,-16 19,-3 C 18,8 8,11 0,13 C 4.5,8 5.5,2 4.5,-3 Z" fill="url(#poppysLogoGold)" opacity="0.95"/>
          
          {/* Outer Arching Wings/Petals */}
          <path d="M -15,4 C -25,-5 -33,-3 -29,11 C -25,22 -11,20 0,15 C -9,14 -14,10 -15,4 Z" fill="url(#poppysLogoGold)" opacity="0.85"/>
          <path d="M 15,4 C 25,-5 33,-3 29,11 C 25,22 11,20 0,15 C 9,14 14,10 15,4 Z" fill="url(#poppysLogoGold)" opacity="0.85"/>
          
          {/* Base Ribbon Cradle */}
          <path d="M -24,19 C -11,25 11,25 24,19 C 15,22 -15,22 -24,19 Z" fill="url(#poppysLogoGold)" />
        </g>
      </svg>

      {showText && (
        <div className="brand-text">
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.2rem',
            fontWeight: 800,
            letterSpacing: '2px',
            color: '#FFFFFF',
            lineHeight: 1.15
          }}>
            POPPYS
          </h2>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#D4AF37',
            display: 'block'
          }}>
            HOTELS & RESORTS
          </span>
        </div>
      )}
    </div>
  );
}
