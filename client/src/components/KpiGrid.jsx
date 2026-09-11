import React from 'react';
import { 
  Building, 
  Bed, 
  PieChart, 
  BadgeIndianRupee, 
  CalendarCheck, 
  Coffee, 
  UserCheck, 
  Star, 
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function KpiGrid({ kpiData }) {
  if (!kpiData) return null;

  return (
    <section className="kpi-grid" id="overview">
      {/* 1. Total Branches */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Total Branches</span>
          <div className="kpi-icon-pill icon-blue">
            <Building size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">{kpiData.totalBranches}</span>
          <span className="kpi-subtext">Properties</span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Across TN & Puducherry</span>
          <span className="kpi-tag neutral">Active</span>
        </div>
      </div>

      {/* 2. Total Rooms */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Total Rooms</span>
          <div className="kpi-icon-pill icon-teal">
            <Bed size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">{kpiData.totalRooms}</span>
          <span className="kpi-subtext">Keys</span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">{kpiData.occupiedRooms || 329} Currently Occupied</span>
          <span className="kpi-tag success">93.6% Ready</span>
        </div>
      </div>

      {/* 3. Occupancy Rate */}
      <div className="kpi-card highlight-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Occupancy Rate</span>
          <div className="kpi-icon-pill icon-emerald">
            <PieChart size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">{kpiData.occupancyRate}%</span>
          <span className="trend-badge positive">
            <TrendingUp size={12} /> {kpiData.occupancyGrowth}%
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Target: 75.0% (+3.4% beat)</span>
          <span className="kpi-tag success">Optimal</span>
        </div>
      </div>

      {/* 4. Revenue */}
      <div className="kpi-card highlight-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Total Revenue</span>
          <div className="kpi-icon-pill icon-gold">
            <BadgeIndianRupee size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">₹{kpiData.revenueLakhs}L</span>
          <span className="trend-badge positive">
            <TrendingUp size={12} /> {kpiData.revenueGrowth}%
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">vs ₹42.8L prior 7-days</span>
          <span className="kpi-tag success">High Pace</span>
        </div>
      </div>

      {/* 5. Bookings */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Bookings</span>
          <div className="kpi-icon-pill icon-indigo">
            <CalendarCheck size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">{kpiData.bookingsCount?.toLocaleString()}</span>
          <span className="trend-badge positive">
            <TrendingUp size={12} /> {kpiData.bookingsGrowth}%
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Direct booking surge (38%)</span>
          <span className="kpi-tag info">Strong Web</span>
        </div>
      </div>

      {/* 6. Food Orders */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Food Orders</span>
          <div className="kpi-icon-pill icon-amber">
            <Coffee size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">{kpiData.foodOrdersCount?.toLocaleString()}</span>
          <span className="trend-badge positive">
            <TrendingUp size={12} /> {kpiData.foodGrowth}%
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Avg Order Value: ₹645</span>
          <span className="kpi-tag success">F&B Spike</span>
        </div>
      </div>

      {/* 7. Staff Count */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Staff On Duty</span>
          <div className="kpi-icon-pill icon-cyan">
            <UserCheck size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">{kpiData.staffCount}</span>
          <span className="trend-badge neutral-badge">
            <TrendingUp size={12} /> {kpiData.staffGrowth}%
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Staff/Guest Ratio 1:2.3</span>
          <span className="kpi-tag info">Balanced</span>
        </div>
      </div>

      {/* 8. Guest Rating */}
      <div className="kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Guest Rating</span>
          <div className="kpi-icon-pill icon-yellow">
            <Star size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">{kpiData.guestRating} <span className="max-denom">/ 5</span></span>
          <span className="trend-badge positive">
            <TrendingUp size={12} /> {kpiData.ratingGrowth}%
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Based on 942 recent reviews</span>
          <span className="kpi-tag success">Excellent</span>
        </div>
      </div>
    </section>
  );
}
