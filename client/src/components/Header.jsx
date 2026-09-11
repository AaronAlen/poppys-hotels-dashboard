import React from 'react';
import { Bell, Database, ShieldCheck } from 'lucide-react';

export default function Header({ 
  selectedBranch, 
  onBranchChange, 
  onToggleNotif, 
  onShowToast 
}) {
  return (
    <header className="top-header">
      <div className="header-overlay"></div>
      <div className="header-inner">
        <div className="header-welcome">
          <div className="welcome-chip">
            <span className="status-indicator"></span> Executive Business Suite
          </div>
          <h1>Good Morning, Managing Director! <span className="wave-emoji">👋</span></h1>
          <p className="header-subtitle">Executive portfolio pulse & profit metrics across 8 Poppys properties.</p>
        </div>

        <div className="header-controls">
          <div className="filter-group">
            {/* Date Range Selector */}
            <div className="select-wrapper">
              <select 
                className="custom-select" 
                title="Date Range Selector"
                defaultValue="past7"
                onChange={(e) => onShowToast(`Reporting Period: ${e.target.options[e.target.selectedIndex].text}`)}
              >
                <option value="past7">Past 7 Days (Sep 5 - Sep 11)</option>
                <option value="mtd">Month to Date (Sep 2026)</option>
                <option value="last30">Past 30 Days</option>
                <option value="qtd">Q3 FY26 (Quarter to Date)</option>
              </select>
            </div>

            {/* Branch Selector */}
            <div className="select-wrapper">
              <select 
                className="custom-select" 
                title="Branch Selector"
                value={selectedBranch}
                onChange={(e) => onBranchChange(e.target.value)}
              >
                <option value="all">All 8 Properties (Tamil Nadu)</option>
                <option value="Madurai">Madurai (Central Hub)</option>
                <option value="Rameswaram">Rameswaram Beach Resort</option>
                <option value="Kumbakonam">Kumbakonam Heritage</option>
                <option value="Ooty">Ooty Mountain Retreat</option>
                <option value="Kodaikanal">Kodaikanal Hill Resort</option>
                <option value="Pondicherry">Pondicherry Coastal</option>
                <option value="Anaikatti">Anaikatti Jungle Lodge</option>
                <option value="Other">Other Properties</option>
              </select>
            </div>

            {/* Booking Channel Margins Selector */}
            <div className="select-wrapper">
              <select 
                className="custom-select" 
                title="Revenue Channel Selector"
                defaultValue="all"
                onChange={(e) => onShowToast(`Channel Filter: ${e.target.options[e.target.selectedIndex].text}`)}
              >
                <option value="all">All Booking Channels</option>
                <option value="direct">Direct Brand Website (Zero Commission)</option>
                <option value="ota">OTA Portals (MakeMyTrip, Booking.com)</option>
                <option value="corporate">Corporate & Banquet Contracts</option>
              </select>
            </div>
          </div>

          <div className="header-user-actions">
            <button 
              className="icon-button notification-btn" 
              onClick={onToggleNotif}
              title="Risk & Anomaly Alerts"
            >
              <Bell size={18} />
              <span className="notif-badge">2</span>
            </button>

            <div 
              className="manager-profile"
              onClick={() => onShowToast('Logged in as Managing Director. Full executive privileges active.')}
            >
              <div className="avatar-ring">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" 
                  alt="Business Owner" 
                  className="avatar-img" 
                />
              </div>
              <div className="profile-info">
                <span className="user-name">A. P. Poppyraj</span>
                <span className="user-role">Managing Director</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-mock-ribbon">
        <Database size={13} style={{ color: '#f59e0b' }} />
        <span>Poppys Group PMS &amp; Central Reservation System Live Sync &bull; Executive Intelligence Edition</span>
      </div>
    </header>
  );
}
