import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Tag, 
  TrendingUp 
} from 'lucide-react';

export default function AlertsSection({ alerts, onAlertAction, onDismissAlert }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <section className="alerts-section" id="alerts">
      <div className="section-title-row">
        <div className="title-with-icon">
          <div className="alert-bell-icon">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2>AI Alerts & Recommendations</h2>
            <p className="section-subtext">Real-time operational anomaly detection powered by Poppys Intelligence Engine</p>
          </div>
        </div>
        <span className="demo-chip">Demo AI Anomaly Detector</span>
      </div>

      <div className="alerts-grid">
        {alerts.map((alert) => {
          let cardClass = 'alert-warning';
          let badgeClass = 'yellow-badge';
          let BadgeIcon = AlertCircle;
          let recClass = 'yellow-rec';

          if (alert.priority === 'HIGH') {
            cardClass = 'alert-high';
            badgeClass = 'red-badge';
            BadgeIcon = AlertTriangle;
            recClass = 'red-rec';
          } else if (alert.priority === 'POSITIVE') {
            cardClass = 'alert-success';
            badgeClass = 'green-badge';
            BadgeIcon = CheckCircle2;
            recClass = 'green-rec';
          }

          return (
            <div 
              key={alert.alertId} 
              className={`alert-card ${cardClass}`}
              style={{ opacity: alert.isAcknowledged ? 0.6 : 1 }}
            >
              <div className="alert-header">
                <div className="alert-badge-wrap">
                  <span className={`priority-badge ${badgeClass}`}>
                    <BadgeIcon size={12} /> {alert.priority === 'HIGH' ? 'HIGH PRIORITY' : alert.priority === 'POSITIVE' ? 'STRONG GROWTH' : 'ATTENTION NEEDED'}
                  </span>
                  <span className="alert-timestamp">{alert.timestamp}</span>
                </div>
                <div className="branch-pill">{alert.branchName}</div>
              </div>

              <h3 className="alert-title">{alert.title}</h3>
              <p className="alert-text">{alert.description}</p>

              <div className={`ai-recommendation-box ${recClass}`}>
                <div className="rec-label">
                  <Sparkles size={13} /> AI Recommendation:
                </div>
                <p>"{alert.recommendation}"</p>
              </div>

              <div className="alert-actions">
                <button 
                  className={`btn ${alert.priority === 'HIGH' ? 'btn-danger-outline' : alert.priority === 'POSITIVE' ? 'btn-success-outline' : 'btn-warning-outline'}`}
                  onClick={() => onAlertAction(alert.actionType, alert.branchName)}
                >
                  {alert.priority === 'HIGH' && <Search size={14} />}
                  {alert.priority === 'ATTENTION' && <Tag size={14} />}
                  {alert.priority === 'POSITIVE' && <TrendingUp size={14} />}
                  {alert.actionLabel}
                </button>
                <button 
                  className="btn btn-ghost"
                  disabled={alert.isAcknowledged}
                  onClick={() => onDismissAlert(alert.alertId)}
                >
                  {alert.isAcknowledged ? 'Acknowledged ✓' : 'Acknowledge'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
