import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  BedDouble, 
  CalendarCheck2, 
  Utensils, 
  Users, 
  BadgeIndianRupee, 
  Star, 
  Sparkles, 
  BellRing, 
  Info 
} from 'lucide-react';
import PoppysLogo from './PoppysLogo';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'branches', label: 'Branch Analytics', icon: Building2 },
    { id: 'rooms', label: 'Rooms & Occupancy', icon: BedDouble },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck2 },
    { id: 'restaurant', label: 'Restaurant', icon: Utensils },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'revenue', label: 'Revenue', icon: BadgeIndianRupee },
    { id: 'guest-exp', label: 'Guest Experience', icon: Star },
  ];

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <PoppysLogo size={42} showText={true} />
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group-title">OPERATIONS & ANALYTICS</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="nav-group-title">INTELLIGENCE</div>
        <button
          onClick={() => setActiveTab('ai-analyst')}
          className={`nav-item ai-nav-item ${activeTab === 'ai-analyst' ? 'active' : ''}`}
        >
          <div className="ai-sparkle-pill">
            <Sparkles size={16} />
          </div>
          <span>AI Analyst</span>
          <span className="badge-pulse">Live</span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`nav-item ${activeTab === 'alerts' ? 'active' : ''}`}
        >
          <BellRing size={18} />
          <span>Alerts & Recomms</span>
          <span className="badge-count">3</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="demo-tag-container">
          <span className="mock-badge">
            <Info size={12} /> Mock / Demo Data
          </span>
          <p className="footer-title">Hotel Management Dashboard</p>
          <span className="footer-sub">v2.5 MERN Enterprise Edition</span>
        </div>
      </div>
    </aside>
  );
}
