import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';

export default function RoomCategorySection({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="content-card" id="rooms">
      <div className="card-header-bar">
        <div>
          <h3 className="card-title">Room Category Analysis</h3>
          <p className="card-subtitle">Inventory distribution, average rates and yield by category</p>
        </div>
        <div className="highlight-pill">
          <Trophy size={14} style={{ color: '#ca8a04' }} />
          Most Revenue Generating Category: <strong>Deluxe (₹19.2L)</strong>
        </div>
      </div>

      <div className="category-cards-grid">
        {categories.map((cat) => {
          let progressFill = 'cat-progress-fill';
          if (cat.isTopSeller) progressFill = 'cat-progress-fill success-fill';
          else if (cat.occupancyPercent < 70) progressFill = 'cat-progress-fill warn-fill';

          return (
            <div 
              key={cat.name} 
              className={`category-card ${cat.isTopSeller ? 'featured-category' : ''}`}
            >
              <div className="cat-header">
                <span className="cat-name">
                  {cat.name}
                  {cat.isTopSeller && (
                    <span className="badge-star">
                      <Sparkles size={9} /> Top Seller
                    </span>
                  )}
                </span>
                <span className="cat-rooms">{cat.totalRooms} Rooms</span>
              </div>

              <div className="cat-occ">
                <span className="cat-occ-label">
                  Occupancy: <strong style={{ color: cat.isTopSeller ? '#059669' : 'inherit' }}>{cat.occupancyPercent}%</strong>
                </span>
                <span className="cat-count">{cat.occupied} / {cat.totalRooms}</span>
              </div>

              <div className="cat-progress">
                <div className={progressFill} style={{ width: `${cat.occupancyPercent}%` }}></div>
              </div>

              <div className="cat-meta-row">
                <div>
                  <span className="meta-label">Avg Price</span>
                  <span className="meta-value">₹{cat.averagePrice?.toLocaleString()}</span>
                </div>
                <div>
                  <span className="meta-label">Revenue</span>
                  <span className="meta-value" style={{ color: cat.isTopSeller ? '#059669' : 'inherit' }}>
                    ₹{cat.revenueLakhs}L
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
