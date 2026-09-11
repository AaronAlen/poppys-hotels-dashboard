import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function ChartsDualGrid({ branches, occupancyTrend }) {
  const barCanvasRef = useRef(null);
  const lineCanvasRef = useRef(null);
  const barChartInst = useRef(null);
  const lineChartInst = useRef(null);

  // Safe fallback data
  const branchList = (branches && branches.length > 0) ? branches : [
    { key: 'Madurai', name: 'Poppys Madurai', revenueLakhs: 14.8, operationalStatus: 'Strong Performance' },
    { key: 'Rameswaram', name: 'Poppys Rameswaram', revenueLakhs: 8.9, operationalStatus: 'Strong Performance' },
    { key: 'Kumbakonam', name: 'Poppys Kumbakonam', revenueLakhs: 6.4, operationalStatus: 'Moderate' },
    { key: 'Ooty', name: 'Poppys Ooty', revenueLakhs: 5.1, operationalStatus: 'Needs Attention' },
    { key: 'Kodaikanal', name: 'Poppys Kodaikanal', revenueLakhs: 4.8, operationalStatus: 'Moderate' },
    { key: 'Pondicherry', name: 'Poppys Pondicherry', revenueLakhs: 5.2, operationalStatus: 'Strong Performance' },
    { key: 'Anaikatti', name: 'Poppys Anaikatti', revenueLakhs: 3.4, operationalStatus: 'Moderate' }
  ];

  const trendData = occupancyTrend || {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    thisWeek: [74, 76, 79, 81, 88, 92, 85],
    lastWeek: [68, 70, 71, 74, 82, 86, 78]
  };

  // 1. Neon Branch Revenue Bar Chart
  useEffect(() => {
    if (!barCanvasRef.current) return;
    if (barChartInst.current) barChartInst.current.destroy();

    const ctx = barCanvasRef.current.getContext('2d');

    const neonCyanGradient = ctx.createLinearGradient(0, 0, 0, 240);
    neonCyanGradient.addColorStop(0, '#00f2fe');
    neonCyanGradient.addColorStop(1, '#0284c7');

    const neonEmeraldGradient = ctx.createLinearGradient(0, 0, 0, 240);
    neonEmeraldGradient.addColorStop(0, '#00f5a0');
    neonEmeraldGradient.addColorStop(1, '#059669');

    const neonRedGradient = ctx.createLinearGradient(0, 0, 0, 240);
    neonRedGradient.addColorStop(0, '#ff4b72');
    neonRedGradient.addColorStop(1, '#be123c');

    const neonAmberGradient = ctx.createLinearGradient(0, 0, 0, 240);
    neonAmberGradient.addColorStop(0, '#f59e0b');
    neonAmberGradient.addColorStop(1, '#b45309');

    const labels = branchList.map(b => b.name.replace('Poppys ', ''));
    const data = branchList.map(b => b.revenueLakhs);
    const bgColors = branchList.map(b => {
      if (b.operationalStatus === 'Strong Performance') return neonEmeraldGradient;
      if (b.operationalStatus === 'Needs Attention') return neonRedGradient;
      return neonCyanGradient;
    });

    barChartInst.current = new Chart(barCanvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Revenue (₹ Lakhs)',
          data,
          backgroundColor: bgColors,
          borderColor: '#ffffff',
          borderWidth: 1.5,
          borderRadius: 8,
          borderSkipped: false,
          barThickness: 24
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 900,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            borderColor: '#38bdf8',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` Revenue: ₹${ctx.raw}L (${branchList[ctx.dataIndex]?.operationalStatus || ''})`
            }
          }
        },
        scales: {
          x: { 
            grid: { display: false }, 
            ticks: { font: { size: 11, weight: '600' }, color: '#475569' } 
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(226, 232, 240, 0.7)' },
            ticks: {
              callback: (v) => `₹${v}L`,
              font: { size: 11 },
              color: '#64748b'
            }
          }
        }
      }
    });

    return () => {
      if (barChartInst.current) barChartInst.current.destroy();
    };
  }, [branches]);

  // 2. Unique Neon Lined 7-Day Occupancy Trend Chart
  useEffect(() => {
    if (!lineCanvasRef.current) return;
    if (lineChartInst.current) lineChartInst.current.destroy();

    const ctx = lineCanvasRef.current.getContext('2d');

    const neonLineGradient = ctx.createLinearGradient(0, 0, 450, 0);
    neonLineGradient.addColorStop(0, '#00f2fe');
    neonLineGradient.addColorStop(0.5, '#3b82f6');
    neonLineGradient.addColorStop(1, '#8b5cf6');

    const neonAreaGradient = ctx.createLinearGradient(0, 0, 0, 240);
    neonAreaGradient.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
    neonAreaGradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.1)');
    neonAreaGradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    lineChartInst.current = new Chart(lineCanvasRef.current, {
      type: 'line',
      data: {
        labels: trendData.labels,
        datasets: [
          {
            label: 'This Week',
            data: trendData.thisWeek,
            borderColor: neonLineGradient,
            backgroundColor: neonAreaGradient,
            fill: true,
            tension: 0.38,
            borderWidth: 3.5,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#00f2fe',
            pointBorderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'Last Week',
            data: trendData.lastWeek,
            borderColor: 'rgba(148, 163, 184, 0.7)',
            borderDash: [5, 4],
            fill: false,
            tension: 0.38,
            borderWidth: 2,
            pointBackgroundColor: '#94a3b8',
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            borderColor: '#00f2fe',
            borderWidth: 1.5,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}% Occupancy`
            }
          }
        },
        scales: {
          x: { 
            grid: { display: false }, 
            ticks: { font: { size: 11, weight: '600' }, color: '#475569' } 
          },
          y: {
            min: 50,
            max: 100,
            grid: { color: 'rgba(226, 232, 240, 0.7)' },
            ticks: {
              callback: (v) => `${v}%`,
              font: { size: 11 },
              color: '#64748b'
            }
          }
        }
      }
    });

    return () => {
      if (lineChartInst.current) lineChartInst.current.destroy();
    };
  }, [occupancyTrend]);

  return (
    <div className="charts-dual-grid">
      {/* Branch Revenue Comparison */}
      <div className="content-card neon-card curved-card-box">
        <div className="card-header-bar">
          <div>
            <h3 className="card-title">
              <span className="neon-indicator"></span> Branch Revenue Comparison
            </h3>
            <p className="card-subtitle">Current 7-day revenue comparison across branches (₹ Lakhs)</p>
          </div>
          <span className="chart-tag neon-pill">₹48.6L Group Total</span>
        </div>
        <div className="chart-canvas-wrapper">
          <canvas ref={barCanvasRef}></canvas>
        </div>
      </div>

      {/* Unique Neon Lined Occupancy Trend Chart */}
      <div className="content-card neon-card curved-card-box">
        <div className="card-header-bar">
          <div>
            <h3 className="card-title">
              <span className="neon-indicator cyan-indicator"></span> Occupancy Rate Trend
            </h3>
            <p className="card-subtitle">7-day performance comparison: This Week vs Last Week</p>
          </div>
          <div className="legend-custom">
            <span className="legend-item">
              <span className="dot dot-neon-cyan"></span> This Week (78.4%)
            </span>
            <span className="legend-item">
              <span className="dot dot-gray"></span> Last Week (70.2%)
            </span>
          </div>
        </div>
        <div className="chart-canvas-wrapper">
          <canvas ref={lineCanvasRef}></canvas>
        </div>
      </div>
    </div>
  );
}
