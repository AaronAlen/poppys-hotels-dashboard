import React from 'react';
import { Trophy, Sparkles, Bed, TrendingUp } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function RoomCategorySection({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="curved-room-category-container curved-card-box" id="rooms">
      <div className="card-header-bar">
        <div>
          <div className="curved-kicker-pill-gold">
            <Bed size={12} />
            <span>PORTFOLIO ROOM INVENTORY YIELD</span>
          </div>
          <h3 className="curved-main-title mt-1">Room Category Profitability &amp; Inventory Yield</h3>
          <p className="curved-main-subtitle">Revenue contribution, average rates, and live occupancy by key category</p>
        </div>

        <div className="curved-trophy-pill">
          <Trophy size={14} style={{ color: '#ca8a04' }} />
          <span>Top Margin Generator: <strong>Deluxe (₹19.2L)</strong></span>
        </div>
      </div>

      <div className="curved-category-cards-grid">
        {categories.map((cat) => {
          return (
            <div 
              key={cat.name} 
              className={`curved-cat-card ${cat.isTopSeller ? 'featured-curved-cat' : ''}`}
            >
              <div className="curved-cat-head">
                <div className="curved-cat-title-wrap">
                  <h4 className="curved-cat-name">{cat.name}</h4>
                  {cat.isTopSeller && (
                    <span className="curved-gold-badge">
                      <Sparkles size={10} /> Top Seller
                    </span>
                  )}
                </div>
                <span className="curved-keys-pill">
                  <AnimatedCounter value={cat.totalRooms} /> Keys
                </span>
              </div>

              <div className="curved-cat-metrics-row">
                <div className="curved-cat-metric-pill">
                  <span className="pill-sub">Live Occupancy</span>
                  <strong className={`pill-val ${cat.isTopSeller ? 'text-emerald' : ''}`}>
                    <AnimatedCounter value={cat.occupancyPercent} suffix="%" decimals={1} />
                  </strong>
                </div>

                <div className="curved-cat-metric-pill">
                  <span className="pill-sub">Weekly Revenue</span>
                  <strong className="pill-val text-gold">
                    <AnimatedCounter value={cat.revenueLakhs} prefix="₹" suffix="L" decimals={1} />
                  </strong>
                </div>
              </div>

              {/* Curved Progress Track */}
              <div className="curved-progress-track">
                <div 
                  className={`curved-progress-fill ${cat.isTopSeller ? 'fill-emerald' : cat.occupancyPercent < 70 ? 'fill-warn' : 'fill-blue'}`} 
                  style={{ width: `${cat.occupancyPercent}%` }}
                />
              </div>

              <div className="curved-cat-footer">
                <span className="curved-occupied-text">
                  <AnimatedCounter value={cat.occupied} /> of {cat.totalRooms} rooms occupied
                </span>
                <span className="curved-adr-text">
                  ADR: <strong>₹<AnimatedCounter value={cat.averagePrice} /></strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
