import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, MapPin, Building, TrendingUp, Navigation, Compass } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function BranchMap({ 
  branches, 
  selectedBranch, 
  onSelectBranch, 
  onFilterToBranch 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [activeBranchKey, setActiveBranchKey] = useState(selectedBranch || 'Madurai');

  const activeBranch = branches?.find(b => b.key === activeBranchKey) || branches?.[0];

  // Exact GPS Coordinates for Poppys Properties across Tamil Nadu & Puducherry
  const branchCoords = {
    Madurai: [9.9252, 78.1198],
    Rameswaram: [9.2876, 79.3129],
    Kumbakonam: [10.9601, 79.3845],
    Ooty: [11.4102, 76.6950],
    Kodaikanal: [10.2381, 77.4892],
    Pondicherry: [11.9416, 79.8083],
    Anaikatti: [11.1085, 76.7725],
  };

  useEffect(() => {
    if (selectedBranch && selectedBranch !== 'all' && selectedBranch !== activeBranchKey) {
      setActiveBranchKey(selectedBranch);
    }
  }, [selectedBranch]);

  // Initialize Real Leaflet Map with NO ZOOM (Fixed Tamil Nadu Geometry)
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    // Fixed locked view of Tamil Nadu - No Zoom, No Scroll Wheel Zoom
    const map = L.map(mapContainerRef.current, {
      center: [10.85, 78.7],
      zoom: 7,
      minZoom: 7,
      maxZoom: 7,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      boxZoom: false,
      keyboard: false,
      dragging: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // Professional Dark GIS Tiles (No API key, No watermarks)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      attribution: 'Esri, HERE, Garmin'
    }).addTo(map);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16
    }).addTo(map);

    // Plot real branch markers with mouseover triggers
    branches?.filter(b => b.key !== 'Other').forEach((branch) => {
      const coords = branchCoords[branch.key];
      if (!coords) return;

      const isStrong = branch.operationalStatus === 'Strong Performance';
      const isWarn = branch.operationalStatus === 'Needs Attention';
      const markerColor = isStrong ? '#10b981' : isWarn ? '#ef4444' : '#38bdf8';
      const rippleClass = isStrong ? 'ripple-emerald' : isWarn ? 'ripple-rose' : 'ripple-cyan';

      const customHtml = `
        <div class="real-map-pin-wrap ${branch.key === activeBranchKey ? 'active-pin-glow' : ''}" id="pin-${branch.key}">
          <div class="pin-halo ${rippleClass}"></div>
          <div class="pin-core" style="background: ${markerColor}; border: 2px solid #ffffff; box-shadow: 0 0 14px ${markerColor};"></div>
          <div class="pin-text-curved-chip">
            <span class="chip-name">${branch.name}</span>
            <span class="chip-metric">${branch.occupancyRate}%</span>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: customHtml,
        iconSize: [120, 36],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(coords, { icon }).addTo(map);
      markersRef.current[branch.key] = marker;

      // INSTANT SIDE TAB DATA CHANGE ON HOVER & CLICK
      marker.on('mouseover', () => {
        setActiveBranchKey(branch.key);
        onSelectBranch(branch.key);
      });

      marker.on('click', () => {
        setActiveBranchKey(branch.key);
        onSelectBranch(branch.key);
      });
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [branches]);

  const handleSelect = (key) => {
    setActiveBranchKey(key);
    onSelectBranch(key);
  };

  return (
    <div className="content-card dark-map-card curved-card-box" id="branch-map-section">
      <div className="card-header-bar">
        <div>
          <h3 className="card-title text-white">
            <span className="neon-indicator cyan-indicator"></span> Tamil Nadu Regional Properties &amp; Live Satellite Presence
          </h3>
          <p className="card-subtitle text-slate-400">
            Official GIS mapping across all 8 Poppys hotels &bull; Hover any marker to inspect performance
          </p>
        </div>

        <div className="map-legend">
          <span className="leg-item"><span className="leg-dot dot-strong"></span> Strong Performance (&gt;75%)</span>
          <span className="leg-item"><span className="leg-dot dot-warn"></span> Anomaly Alert</span>
          <span className="leg-item"><span className="leg-dot dot-moderate"></span> Steady</span>
        </div>
      </div>

      <div className="map-layout-wrapper">
        {/* Real Leaflet Dark Map Container */}
        <div className="real-map-leaflet-wrapper">
          <div 
            ref={mapContainerRef} 
            id="realTamilNaduLeafletMap"
            className="leaflet-real-dark-container"
            style={{ height: '440px', width: '100%', borderRadius: '18px' }}
          />
        </div>

        {/* Selected Property Details Panel in Curved Box */}
        {activeBranch && (
          <div className="curved-property-inspector-box">
            <div className="selected-head">
              <span className="curved-pill-tag">SELECTED HOTEL PROPERTY</span>
              <h4 className="inspector-hotel-title">{activeBranch.name}</h4>
              <span className={`curved-status-pill ${activeBranch.operationalStatus === 'Strong Performance' ? 'status-strong' : activeBranch.operationalStatus === 'Needs Attention' ? 'status-attention' : 'status-moderate'}`}>
                {activeBranch.operationalStatus}
              </span>
            </div>

            <div className="curved-metrics-grid">
              <div className="curved-metric-capsule">
                <span className="capsule-label">Live Occupancy</span>
                <strong className="capsule-val">
                  <AnimatedCounter value={activeBranch.occupancyRate} suffix="%" decimals={1} />
                </strong>
              </div>
              <div className="curved-metric-capsule">
                <span className="capsule-label">Weekly Revenue</span>
                <strong className="capsule-val text-emerald">
                  <AnimatedCounter value={activeBranch.revenueLakhs} prefix="₹" suffix="L" decimals={1} />
                </strong>
              </div>
              <div className="curved-metric-capsule">
                <span className="capsule-label">Weekly Bookings</span>
                <strong className="capsule-val">
                  <AnimatedCounter value={activeBranch.bookingsCount} />
                </strong>
              </div>
              <div className="curved-metric-capsule">
                <span className="capsule-label">Guest Rating</span>
                <strong className="capsule-val text-gold">
                  <AnimatedCounter value={activeBranch.rating} suffix=" ⭐" decimals={1} />
                </strong>
              </div>
            </div>

            <div className="curved-executive-insight-box">
              <Sparkles size={15} style={{ color: '#00f2fe', flexShrink: 0, marginTop: 2 }} />
              <p>"{activeBranch.executiveNotes}"</p>
            </div>

            <div className="inspector-actions-row">
              <button 
                className="curved-primary-btn"
                onClick={() => onFilterToBranch(activeBranch.key)}
              >
                Isolate Dashboard to {activeBranch.name}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Branch Switcher Curved Row */}
      <div className="curved-branch-pills-selector">
        <span className="pills-label">Quick Hover / Select Location:</span>
        {branches?.filter(b => b.key !== 'Other').map((b) => (
          <button
            key={b.key}
            className={`curved-branch-chip ${activeBranchKey === b.key ? 'active' : ''}`}
            onMouseEnter={() => handleSelect(b.key)}
            onClick={() => handleSelect(b.key)}
          >
            <MapPin size={11} />
            <span>{b.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
