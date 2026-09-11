import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { Star, ThumbsUp, AlertCircle } from 'lucide-react';

export default function StaffAndGuestExperience({ staffData, guestData }) {
  const staffCanvasRef = useRef(null);
  const staffChartInst = useRef(null);

  useEffect(() => {
    if (!staffCanvasRef.current || !staffData?.breakdown) return;
    if (staffChartInst.current) staffChartInst.current.destroy();

    const labels = staffData.breakdown.map(b => b.department);
    const data = staffData.breakdown.map(b => b.count);
    const bgColors = staffData.breakdown.map(b => b.color);

    staffChartInst.current = new Chart(staffCanvasRef.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: bgColors,
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverOffset: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw} Staff`
            }
          }
        }
      }
    });

    return () => {
      if (staffChartInst.current) staffChartInst.current.destroy();
    };
  }, [staffData]);

  return (
    <div className="charts-dual-grid" id="staff">
      {/* Staff Analytics */}
      <div className="content-card">
        <div className="card-header-bar">
          <div>
            <h3 className="card-title">Staff Analytics</h3>
            <p className="card-subtitle">Active headcount: 186 Staff across 6 operational wings</p>
          </div>
          <span className="staff-ratio-badge">Staff/Guest Ratio 1:2.3</span>
        </div>

        <div className="staff-layout">
          <div className="staff-donut-container">
            <canvas ref={staffCanvasRef}></canvas>
          </div>
          <div className="staff-dept-grid">
            {staffData?.breakdown?.map((dept) => (
              <div key={dept.department} className="dept-box">
                <span className="dept-title">{dept.department}</span>
                <strong className="dept-count">{dept.count}</strong>
                <span className="dept-pct">{dept.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guest Experience */}
      <div className="content-card" id="guest-exp">
        <div className="card-header-bar">
          <div>
            <h3 className="card-title">Guest Experience</h3>
            <p className="card-subtitle">CSAT performance & guest feedback sentiment</p>
          </div>
          <div className="overall-csat">
            <span className="csat-number">{guestData?.overallRating || '4.4'}</span>
            <div className="csat-stars">
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <Star size={15} color="#f59e0b" />
            </div>
          </div>
        </div>

        <div className="criteria-list">
          {guestData?.categories?.map((cat) => (
            <div key={cat.name} className="crit-row">
              <span className="crit-name">{cat.name}</span>
              <div className="crit-bar">
                <div className="crit-fill" style={{ width: `${cat.percent}%` }}></div>
              </div>
              <span className="crit-score">{cat.score}</span>
            </div>
          ))}
        </div>

        <div className="feedback-chips-box">
          <div className="feedback-group">
            <span className="feedback-label pos">
              <ThumbsUp size={12} /> Top Positive Mentions:
            </span>
            <div className="chip-container">
              {guestData?.positiveFeedback?.map((pos) => (
                <span key={pos} className="chip chip-green">{pos}</span>
              ))}
            </div>
          </div>
          <div className="feedback-group">
            <span className="feedback-label neg">
              <AlertCircle size={12} /> Needs Improvement:
            </span>
            <div className="chip-container">
              {guestData?.needsImprovement?.map((neg) => (
                <span key={neg} className="chip chip-orange">{neg}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
