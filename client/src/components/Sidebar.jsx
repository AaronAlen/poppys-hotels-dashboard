import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  TrendingUp, 
  Sparkles, 
  BellRing, 
  Info
} from 'lucide-react';
import PoppysLogo from './PoppysLogo';

export default function Sidebar({ activeTab, setActiveTab }) {
  const primaryNav = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard, badge: null },
    { id: 'branches', label: 'Properties & Map', icon: MapPin, badge: '8' },
    { id: 'forecast', label: 'Forecast & Yield', icon: TrendingUp, badge: 'AI' },
  ];

  return (
    <aside className="sidebar" id="sidebar">
      <div className="sidebar-header">
        <PoppysLogo size={42} showText={true} />
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group-title">EXECUTIVE COCKPIT</div>
        {primaryNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} strokeWidth={2} />
              <span className="nav-label-text">{item.label}</span>
              {item.badge && <span className="nav-item-badge">{item.badge}</span>}
            </button>
          );
        })}

        <div className="nav-group-title">STRATEGIC INTELLIGENCE</div>
        <button
          onClick={() => setActiveTab('ai-analyst')}
          className={`nav-item ai-nav-item ${activeTab === 'ai-analyst' ? 'active' : ''}`}
        >
          <div className="ai-sparkle-pill">
            <Sparkles size={16} />
          </div>
          <span className="nav-label-text">AI Advisor</span>
          <span className="badge-pulse">Live</span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`nav-item ${activeTab === 'alerts' ? 'active' : ''}`}
        >
          <BellRing size={18} />
          <span className="nav-label-text">Anomaly Alerts</span>
          <span className="badge-count">2</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="demo-tag-container">
          <span className="mock-badge">
            <Info size={12} /> Executive Suite
          </span>
          <p className="footer-title">Poppys Group</p>
          <span className="footer-sub">Managing Director Intelligence</span>
        </div>
      </div>
    </aside>
  );
}
