import React from 'react';
import { Sparkles, Lightbulb, Sliders } from 'lucide-react';

export default function OccupancyForecast({ forecastData, onApplyPricing }) {
  if (!forecastData?.days) return null;

  return (
    <div className="content-card">
      <div className="card-header-bar">
        <div>
          <div className="title-with-pill">
            <h3 className="card-title">Occupancy Forecast — AI Prediction</h3>
            <span className="ai-chip">
              <Sparkles size={11} /> Machine Learning Forecast
            </span>
          </div>
          <p className="card-subtitle">Next 7 days predictive occupancy modeling & demand surge detection</p>
        </div>
        <span className="mock-tag">Demo AI Prediction / Mock Data</span>
      </div>

      <div className="forecast-content-wrapper">
        <div className="forecast-cards-row">
          {forecastData.days.map((d) => (
            <div 
              key={d.day} 
              className={`forecast-day-card ${d.isPeak ? 'peak-forecast' : ''}`}
            >
              {d.isPeak && <span className="peak-tag">PEAK</span>}
              <span className="day-label">{d.day}</span>
              <span className={`day-pct ${d.isPeak ? 'text-emerald' : ''}`}>{d.occupancy}%</span>
              <span className="day-status">{d.status}</span>
            </div>
          ))}
        </div>

        <div className="forecast-rec-banner">
          <div className="rec-icon-box">
            <Lightbulb size={20} />
          </div>
          <div className="rec-text-wrap">
            <strong style={{ color: '#0f766e', fontSize: '0.82rem', display: 'block' }}>
              AI Strategic Recommendation:
            </strong>
            <p style={{ fontSize: '0.77rem', color: '#475569' }}>
              "{forecastData.aiRecommendation}"
            </p>
          </div>
          <button 
            className="btn-primary-sm"
            onClick={onApplyPricing}
          >
            <Sliders size={14} /> Apply Dynamic Pricing
          </button>
        </div>
      </div>
    </div>
  );
}
