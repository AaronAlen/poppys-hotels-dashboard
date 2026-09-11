import React from 'react';
import { Sparkles, Lightbulb, Sliders, TrendingUp, Calendar, Zap } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function OccupancyForecast({ forecastData, onApplyPricing }) {
  if (!forecastData?.days) return null;

  return (
    <div className="curved-forecast-container curved-card-box">
      <div className="curved-forecast-header">
        <div>
          <div className="curved-kicker-pill-cyan">
            <Sparkles size={12} />
            <span>AI PREDICTIVE DEMAND ENGINE</span>
          </div>
          <h3 className="curved-main-title mt-1">
            7-Day Occupancy Forecast &amp; Demand Surge Modeling
          </h3>
          <p className="curved-main-subtitle">
            Next 7 days predictive occupancy modeling &amp; yield surge detection across 8 Poppys properties
          </p>
        </div>
        <div className="curved-badge-tag-wrap">
          <span className="curved-live-badge">
            <Zap size={11} /> Live Yield Optimization Active
          </span>
        </div>
      </div>

      <div className="forecast-content-wrapper">
        <div className="forecast-cards-row curved-cards-grid">
          {forecastData.days.map((d) => (
            <div 
              key={d.day} 
              className={`curved-forecast-day-card ${d.isPeak ? 'peak-curved-card' : ''}`}
            >
              {d.isPeak && (
                <div className="curved-peak-flag">
                  <span>SURGE PEAK</span>
                </div>
              )}
              <span className="curved-day-label">{d.day}</span>
              
              <div className="curved-pct-wrap">
                <span className={`curved-day-pct ${d.isPeak ? 'text-emerald-glow' : ''}`}>
                  <AnimatedCounter value={d.occupancy} suffix="%" />
                </span>
              </div>

              {/* Curved Mini Gauge Fill */}
              <div className="curved-mini-gauge-track">
                <div 
                  className={`curved-mini-gauge-fill ${d.isPeak ? 'fill-peak' : d.occupancy > 75 ? 'fill-good' : 'fill-dip'}`}
                  style={{ width: `${d.occupancy}%` }}
                />
              </div>

              <span className={`curved-day-status ${d.isPeak ? 'status-peak' : ''}`}>
                {d.status}
              </span>
            </div>
          ))}
        </div>

        <div className="curved-forecast-rec-banner">
          <div className="curved-rec-icon-glow">
            <Lightbulb size={22} />
          </div>
          <div className="curved-rec-text-wrap">
            <div className="curved-rec-heading">
              <span className="curved-rec-pill">AI YIELD DECISION</span>
              <strong>Weekend Demand Surge Recommendation</strong>
            </div>
            <p className="curved-rec-desc">
              "{forecastData.aiRecommendation}"
            </p>
          </div>
          <button 
            className="curved-pricing-action-btn"
            onClick={onApplyPricing}
          >
            <Sliders size={15} /> 
            <span>Apply Dynamic Rates (+12%)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
