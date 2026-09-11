import React, { useState } from 'react';
import { Sparkles, MapPin, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

export default function BranchMap({ 
  branches, 
  selectedBranch, 
  onSelectBranch, 
  onFilterToBranch 
}) {
  const [hoveredPin, setHoveredPin] = useState(null);
  const activeBranch = branches?.find(b => b.key === selectedBranch) || branches?.[0];

  return (
    <div className="content-card neon-card" id="branch-map-section">
      <div className="card-header-bar">
        <div>
          <h3 className="card-title">
            <span className="neon-indicator teal-indicator"></span> Branch Locations & Regional Presence
          </h3>
          <p className="card-subtitle">Interactive geographical performance view of Poppys Hotels in Tamil Nadu & Puducherry</p>
        </div>
        <div className="map-legend">
          <span className="leg-item"><span className="leg-dot dot-strong"></span> Strong Performance</span>
          <span className="leg-item"><span className="leg-dot dot-warn"></span> Needs Attention</span>
          <span className="leg-item"><span className="leg-dot dot-moderate"></span> Moderate / Improving</span>
        </div>
      </div>

      <div className="map-layout-wrapper">
        {/* SVG Interactive Map Container */}
        <div className="svg-map-container" id="tamilNaduMapContainer" style={{ position: 'relative' }}>
          <svg viewBox="0 0 650 540" className="tn-svg-map">
            <defs>
              <linearGradient id="tnLandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0b172a" />
                <stop offset="50%" stopColor="#0f2545" />
                <stop offset="100%" stopColor="#0a192f" />
              </linearGradient>
              <filter id="neonPinGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00f2fe" floodOpacity="0.8"/>
              </filter>
            </defs>

            {/* Tamil Nadu Stylized Boundary */}
            <path 
              className="state-boundary" 
              d="M 180,60 C 240,40 340,50 420,70 C 450,110 460,170 450,220 C 480,260 460,330 430,370 C 390,440 330,490 280,510 C 250,510 220,470 200,430 C 180,390 140,350 130,290 C 120,240 140,170 150,130 Z" 
              fill="url(#tnLandGradient)"
              stroke="rgba(56, 189, 248, 0.4)"
              strokeWidth="2"
            />

            {/* Coastal Waters Glow Line */}
            <path 
              d="M 420,70 C 450,110 460,170 450,220 C 480,260 460,330 430,370 C 390,440 330,490 280,510" 
              fill="none" 
              stroke="#00f2fe" 
              strokeWidth="3.5" 
              strokeDasharray="6 3"
              opacity="0.6"
            />

            {/* Pins */}
            {branches?.filter(b => b.key !== 'Other').map((branch) => {
              const isSelected = selectedBranch === branch.key;
              const isHovered = hoveredPin === branch.key;

              let pinColor = '#3b82f6';
              let rippleClass = 'ripple-blue';
              if (branch.operationalStatus === 'Strong Performance') {
                pinColor = '#10b981';
                rippleClass = 'ripple-green';
              } else if (branch.operationalStatus === 'Needs Attention') {
                pinColor = branch.key === 'Ooty' ? '#ef4444' : '#f59e0b';
                rippleClass = branch.key === 'Ooty' ? 'ripple-red' : 'ripple-orange';
              }

              return (
                <g 
                  key={branch.key}
                  className="map-pin-anchor"
                  transform={`translate(${branch.pinCoords.x}, ${branch.pinCoords.y})`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredPin(branch.key)}
                  onMouseLeave={() => setHoveredPin(null)}
                  onClick={() => onSelectBranch(branch.key)}
                >
                  {/* Invisible Hit Area to prevent ripple flickering */}
                  <circle cx="0" cy="0" r="22" fill="transparent" />

                  {/* Pulsing Ripple Circle (pointer-events: none is critical) */}
                  <circle 
                    className={`pin-ripple ${rippleClass}`} 
                    cx="0" 
                    cy="0" 
                    r="14" 
                    style={{ pointerEvents: 'none' }}
                  />

                  {/* Core Pin */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r={isSelected || isHovered ? 8.5 : 7} 
                    fill={pinColor}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2.5 : 2}
                    filter={isSelected || isHovered ? "url(#neonPinGlow)" : undefined}
                    style={{ transition: 'r 0.15s ease' }}
                  />

                  {/* Label */}
                  <text 
                    x="14" 
                    y="4" 
                    className="pin-label-clean"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '11px',
                      fontWeight: isSelected ? 800 : 700,
                      fill: isSelected ? '#38bdf8' : '#e2e8f0',
                      pointerEvents: 'none',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}
                  >
                    {branch.name} ({branch.occupancyRate}%)
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Tooltip */}
          {hoveredPin && (
            <div className="map-hover-tooltip">
              {(() => {
                const hBranch = branches.find(b => b.key === hoveredPin);
                if (!hBranch) return null;
                return (
                  <div>
                    <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.84rem' }}>{hBranch.name}</strong>
                    <div style={{ display: 'flex', gap: 10, marginTop: 3, fontSize: '0.74rem' }}>
                      <span style={{ color: '#38bdf8' }}>Occ: {hBranch.occupancyRate}%</span>
                      <span style={{ color: '#34d399' }}>Rev: ₹{hBranch.revenueLakhs}L</span>
                      <span style={{ color: '#f59e0b' }}>★ {hBranch.rating}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Selected Property Details Panel */}
        {activeBranch && (
          <div className="map-selected-info">
            <div className="selected-head">
              <span className="info-kicker">SELECTED PROPERTY</span>
              <h4>{activeBranch.name}</h4>
              <span className={`status-pill ${activeBranch.operationalStatus === 'Strong Performance' ? 'status-strong' : activeBranch.operationalStatus === 'Needs Attention' ? 'status-attention' : 'status-moderate'}`}>
                {activeBranch.operationalStatus}
              </span>
            </div>

            <div className="branch-metrics-mini">
              <div className="metric-mini">
                <span>Occupancy</span>
                <strong>{activeBranch.occupancyRate}%</strong>
              </div>
              <div className="metric-mini">
                <span>Revenue</span>
                <strong>₹{activeBranch.revenueLakhs}L</strong>
              </div>
              <div className="metric-mini">
                <span>Bookings</span>
                <strong>{activeBranch.bookingsCount}</strong>
              </div>
              <div className="metric-mini">
                <span>Rating</span>
                <strong>{activeBranch.rating} ⭐</strong>
              </div>
            </div>

            <div className="branch-quick-tip">
              <Sparkles size={14} style={{ color: '#c59b27', flexShrink: 0, marginTop: 2 }} />
              <span>"{activeBranch.executiveNotes}"</span>
            </div>

            <button 
              className="btn-outline-full"
              onClick={() => onFilterToBranch(activeBranch.key)}
            >
              Focus Dashboard on {activeBranch.name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
