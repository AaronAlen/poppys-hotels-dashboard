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
  ShieldAlert,
  Percent
} from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function KpiGrid({ kpiData }) {
  if (!kpiData) return null;

  return (
    <section className="kpi-grid curved-kpi-container" id="overview">
      {/* 1. Total Portfolio Revenue */}
      <div className="kpi-card curved-kpi-card highlight-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Weekly Group Revenue</span>
          <div className="kpi-icon-pill icon-gold">
            <BadgeIndianRupee size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">
            <AnimatedCounter value={kpiData.revenueLakhs} prefix="₹" suffix="L" decimals={1} />
          </span>
          <span className="curved-trend-badge positive">
            <TrendingUp size={12} /> +<AnimatedCounter value={kpiData.revenueGrowth} suffix="%" decimals={1} />
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Pace vs prior 7-days (₹42.8L)</span>
          <span className="curved-pill-tag tag-emerald">High Margin</span>
        </div>
      </div>

      {/* 2. Group Occupancy Rate */}
      <div className="kpi-card curved-kpi-card highlight-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Average Occupancy</span>
          <div className="kpi-icon-pill icon-emerald">
            <PieChart size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">
            <AnimatedCounter value={kpiData.occupancyRate} suffix="%" decimals={1} />
          </span>
          <span className="curved-trend-badge positive">
            <TrendingUp size={12} /> +<AnimatedCounter value={kpiData.occupancyGrowth} suffix="%" decimals={1} />
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Target: 75.0% (+3.4% beat)</span>
          <span className="curved-pill-tag tag-emerald">Optimal Pace</span>
        </div>
      </div>

      {/* 3. Direct Website Booking Share */}
      <div className="kpi-card curved-kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Direct Web Bookings</span>
          <div className="kpi-icon-pill icon-cyan">
            <Percent size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">
            <AnimatedCounter value={42.4} suffix="%" decimals={1} />
          </span>
          <span className="curved-trend-badge positive">
            <TrendingUp size={12} /> +<AnimatedCounter value={5.2} suffix="%" decimals={1} />
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Saved ₹4.2L in OTA commission</span>
          <span className="curved-pill-tag tag-cyan">Zero Comm.</span>
        </div>
      </div>

      {/* 4. RevPAR & ADR Yield */}
      <div className="kpi-card curved-kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Group RevPAR</span>
          <div className="kpi-icon-pill icon-blue">
            <TrendingUp size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">
            <AnimatedCounter value={3802} prefix="₹" />
          </span>
          <span className="curved-trend-badge positive">
            <TrendingUp size={12} /> ADR: ₹4,850
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Room Yield: 88.4% optimal</span>
          <span className="curved-pill-tag tag-blue">Healthy</span>
        </div>
      </div>

      {/* 5. Total Rooms in Portfolio */}
      <div className="kpi-card curved-kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Total Active Keys</span>
          <div className="kpi-icon-pill icon-teal">
            <Bed size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">
            <AnimatedCounter value={kpiData.totalRooms || 420} />
          </span>
          <span className="kpi-subtext">Rooms</span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">
            <AnimatedCounter value={329} /> Occupied &bull; 91 Available
          </span>
          <span className="curved-pill-tag tag-neutral">8 Properties</span>
        </div>
      </div>

      {/* 6. Total Bookings Count */}
      <div className="kpi-card curved-kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Total Bookings</span>
          <div className="kpi-icon-pill icon-indigo">
            <CalendarCheck size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">
            <AnimatedCounter value={kpiData.bookingsCount || 1420} />
          </span>
          <span className="curved-trend-badge positive">
            <TrendingUp size={12} /> +<AnimatedCounter value={kpiData.bookingsGrowth} suffix="%" decimals={1} />
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Avg Stay Duration: 2.1 nights</span>
          <span className="curved-pill-tag tag-indigo">High Demand</span>
        </div>
      </div>

      {/* 7. F&B & Banquet Revenue */}
      <div className="kpi-card curved-kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Restaurant &amp; Banquets</span>
          <div className="kpi-icon-pill icon-amber">
            <Coffee size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">
            <AnimatedCounter value={9.4} prefix="₹" suffix="L" decimals={1} />
          </span>
          <span className="curved-trend-badge positive">
            <TrendingUp size={12} /> +<AnimatedCounter value={kpiData.foodGrowth} suffix="%" decimals={1} />
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">19.3% total revenue contribution</span>
          <span className="curved-pill-tag tag-amber">74% Margin</span>
        </div>
      </div>

      {/* 8. Portfolio Guest CSAT Rating */}
      <div className="kpi-card curved-kpi-card">
        <div className="kpi-card-header">
          <span className="kpi-title">Executive CSAT Index</span>
          <div className="kpi-icon-pill icon-yellow">
            <Star size={17} />
          </div>
        </div>
        <div className="kpi-value-row">
          <span className="kpi-number">
            <AnimatedCounter value={kpiData.guestRating || 4.6} suffix=" ⭐" decimals={1} />
          </span>
          <span className="curved-trend-badge positive">
            <TrendingUp size={12} /> 942 Reviews
          </span>
        </div>
        <div className="kpi-footer">
          <span className="kpi-sub">Madurai 4.6 &bull; Pondy 4.7</span>
          <span className="curved-pill-tag tag-emerald">Top Tier</span>
        </div>
      </div>
    </section>
  );
}
