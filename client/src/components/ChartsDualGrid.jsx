import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';

export default function ChartsDualGrid({ branches, occupancyTrend }) {
  const containerRef = useRef(null);
  const barCanvasRef = useRef(null);
  const lineCanvasRef = useRef(null);
  const barChartInst = useRef(null);
  const lineChartInst = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver to detect when charts enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Re-trigger animation if already instantiated
          if (barChartInst.current) {
            barChartInst.current.reset();
            barChartInst.current.update();
          }
          if (lineChartInst.current) {
            lineChartInst.current.reset();
            lineChartInst.current.update();
          }
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 1. Neon Branch Revenue Bar Chart
  useEffect(() => {
    if (!barCanvasRef.current || !branches || !isVisible) return;
    if (barChartInst.current) barChartInst.current.destroy();

    const ctx = barCanvasRef.current.getContext('2d');

    // Create Neon Gradients for Bars
    const neonCyanGradient = ctx.createLinearGradient(0, 0, 0, 250);
    neonCyanGradient.addColorStop(0, '#00f2fe');
    neonCyanGradient.addColorStop(1, '#1e3a8a');

    const neonEmeraldGradient = ctx.createLinearGradient(0, 0, 0, 250);
    neonEmeraldGradient.addColorStop(0, '#00f5a0');
    neonEmeraldGradient.addColorStop(1, '#065f46');

    const neonRedGradient = ctx.createLinearGradient(0, 0, 0, 250);
    neonRedGradient.addColorStop(0, '#ff4b72');
    neonRedGradient.addColorStop(1, '#881337');

    const neonAmberGradient = ctx.createLinearGradient(0, 0, 0, 250);
    neonAmberGradient.addColorStop(0, '#f59e0b');
    neonAmberGradient.addColorStop(1, '#78350f');

    const neonPurpleGradient = ctx.createLinearGradient(0, 0, 0, 250);
    neonPurpleGradient.addColorStop(0, '#a855f7');
    neonPurpleGradient.addColorStop(1, '#3b0764');

    const labels = branches.map(b => b.name);
    const data = branches.map(b => b.revenueLakhs);
    const bgColors = branches.map(b => {
      if (b.key === 'Madurai') return neonCyanGradient;
      if (b.key === 'Rameswaram' || b.key === 'Pondicherry') return neonEmeraldGradient;
      if (b.key === 'Ooty') return neonRedGradient;
      if (b.key === 'Kodaikanal') return neonAmberGradient;
      if (b.key === 'Anaikatti') return neonPurpleGradient;
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
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,
          barThickness: 24
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1300,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(11, 23, 42, 0.95)',
            borderColor: '#38bdf8',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: (ctx) => ` Revenue: ₹${ctx.raw} Lakhs (${branches[ctx.dataIndex]?.operationalStatus})`
            }
          }
        },
        scales: {
          x: { 
            grid: { display: false }, 
            ticks: { font: { size: 10, weight: 600 }, color: '#475569' } 
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
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
  }, [branches, isVisible]);

  // 2. Unique Neon Lined 7-Day Occupancy Trend Chart with Glowing Animation
  useEffect(() => {
    if (!lineCanvasRef.current || !occupancyTrend || !isVisible) return;
    if (lineChartInst.current) lineChartInst.current.destroy();

    const ctx = lineCanvasRef.current.getContext('2d');

    // Neon Cyan Gradient for Line Stroke
    const neonLineGradient = ctx.createLinearGradient(0, 0, 450, 0);
    neonLineGradient.addColorStop(0, '#00f2fe');
    neonLineGradient.addColorStop(0.5, '#3b82f6');
    neonLineGradient.addColorStop(1, '#8b5cf6');

    // Neon Glow Area Fill
    const neonAreaGradient = ctx.createLinearGradient(0, 0, 0, 240);
    neonAreaGradient.addColorStop(0, 'rgba(0, 242, 254, 0.32)');
    neonAreaGradient.addColorStop(0.6, 'rgba(59, 130, 246, 0.12)');
    neonAreaGradient.addColorStop(1, 'rgba(59, 130, 246, 0.00)');

    // Custom Neon Glow Shadow Plugin
    const neonGlowPlugin = {
      id: 'neonGlowPlugin',
      beforeDatasetDraw(chart, args) {
        if (args.index === 0) {
          const { ctx } = chart;
          ctx.save();
          ctx.shadowColor = 'rgba(0, 242, 254, 0.75)';
          ctx.shadowBlur = 16;
          ctx.shadowOffsetY = 4;
        }
      },
      afterDatasetDraw(chart) {
        chart.ctx.restore();
      }
    };

    lineChartInst.current = new Chart(lineCanvasRef.current, {
      type: 'line',
      data: {
        labels: occupancyTrend.labels,
        datasets: [
          {
            label: 'This Week',
            data: occupancyTrend.thisWeek,
            borderColor: neonLineGradient,
            backgroundColor: neonAreaGradient,
            fill: true,
            tension: 0.42,
            borderWidth: 3.5,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#00f2fe',
            pointBorderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#00f2fe',
            pointHoverBorderColor: '#ffffff'
          },
          {
            label: 'Last Week',
            data: occupancyTrend.lastWeek,
            borderColor: 'rgba(148, 163, 184, 0.8)',
            borderDash: [6, 4],
            fill: false,
            tension: 0.42,
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
          duration: 1500,
          easing: 'easeOutCubic'
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(11, 23, 42, 0.95)',
            borderColor: '#00f2fe',
            borderWidth: 1.5,
            padding: 12,
            titleFont: { size: 12, weight: 'bold' },
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw}% Occupancy`
            }
          }
        },
        scales: {
          x: { 
            grid: { display: false }, 
            ticks: { font: { size: 11, weight: 600 }, color: '#475569' } 
          },
          y: {
            min: 50,
            max: 100,
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
            ticks: {
              callback: (v) => `${v}%`,
              font: { size: 11 },
              color: '#64748b'
            }
          }
        }
      },
      plugins: [neonGlowPlugin]
    });

    return () => {
      if (lineChartInst.current) lineChartInst.current.destroy();
    };
  }, [occupancyTrend, isVisible]);

  return (
    <div className="charts-dual-grid" ref={containerRef}>
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
