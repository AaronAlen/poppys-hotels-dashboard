import React from 'react';
import { Bell, Database } from 'lucide-react';

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
            <span className="status-indicator"></span> Live Group Operations
          </div>
          <h1>Good Morning, Manager! <span className="wave-emoji">👋</span></h1>
          <p className="header-subtitle">Here's your hotel performance overview across all branches.</p>
        </div>

        <div className="header-controls">
          <div className="filter-group">
            {/* Date Range Selector */}
            <div className="select-wrapper">
              <select 
                className="custom-select" 
                title="Date Range Selector"
                defaultValue="past7"
                onChange={(e) => onShowToast(`Date range adjusted: ${e.target.options[e.target.selectedIndex].text}`)}
              >
                <option value="past7">Past 7 Days (Sep 5 - Sep 11)</option>
                <option value="mtd">Month to Date (Sep 2026)</option>
                <option value="last30">Past 30 Days</option>
                <option value="qtd">Quarter to Date</option>
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
                <option value="all">All Branches (8)</option>
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

            {/* Category Selector */}
            <div className="select-wrapper">
              <select 
                className="custom-select" 
                title="Room Category Selector"
                defaultValue="all"
                onChange={(e) => onShowToast(`Room Category filter: ${e.target.value.toUpperCase()}`)}
              >
                <option value="all">All Categories</option>
                <option value="deluxe">Deluxe Rooms</option>
                <option value="suite">Suites</option>
                <option value="premium">Premium</option>
                <option value="standard">Standard</option>
                <option value="family">Family Villas</option>
              </select>
            </div>

            {/* Booking Type Selector */}
            <div className="select-wrapper">
              <select 
                className="custom-select" 
                title="Booking Type Selector"
                defaultValue="all"
                onChange={(e) => onShowToast(`Channel filter: ${e.target.value.toUpperCase()}`)}
              >
                <option value="all">All Booking Types</option>
                <option value="direct">Direct Website (38%)</option>
                <option value="ota">OTA / Portals (27%)</option>
                <option value="corporate">Corporate (14%)</option>
                <option value="walkin">Walk-in (12%)</option>
              </select>
            </div>

            {/* Room Selector */}
            <div className="select-wrapper">
              <select 
                className="custom-select" 
                title="Room Inventory Selector"
                defaultValue="all"
                onChange={(e) => onShowToast(`Inventory filter: ${e.target.value.toUpperCase()}`)}
              >
                <option value="all">All Rooms (420)</option>
                <option value="occupied">Occupied (329)</option>
                <option value="vacant">Vacant Clean (64)</option>
                <option value="maintenance">Maintenance (27)</option>
              </select>
            </div>
          </div>

          <div className="header-user-actions">
            <button 
              className="icon-button notification-btn" 
              onClick={onToggleNotif}
              title="System Notifications"
            >
              <Bell size={18} />
              <span className="notif-badge">3</span>
            </button>

            <div 
              className="manager-profile"
              onClick={() => onShowToast('Logged in as Rajesh Kumar (VP Operations). Session active.')}
            >
              <div className="avatar-ring">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                  alt="Manager Profile" 
                  className="avatar-img" 
                />
              </div>
              <div className="profile-info">
                <span className="user-name">Rajesh Kumar</span>
                <span className="user-role">Group Operations VP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-mock-ribbon">
        <Database size={13} style={{ color: '#f59e0b' }} />
        <span>Poppys Hotels Live Operations Sandbox &bull; Demo / Mock Data Active</span>
      </div>
    </header>
  );
}
