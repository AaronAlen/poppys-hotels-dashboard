import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { BadgePercent } from 'lucide-react';

export default function BookingAndRevenueDonuts({ bookingData, revenueData }) {
  const bookingCanvasRef = useRef(null);
  const paceCanvasRef = useRef(null);
  const revenueCanvasRef = useRef(null);

  const bookingChartInst = useRef(null);
  const paceChartInst = useRef(null);
  const revenueChartInst = useRef(null);

  // 1. Booking Channels Donut
  useEffect(() => {
    if (!bookingCanvasRef.current || !bookingData) return;
    if (bookingChartInst.current) bookingChartInst.current.destroy();

    const labels = bookingData.types.map(t => t.channel);
    const data = bookingData.types.map(t => t.percent);
    const bgColors = bookingData.types.map(t => t.color);

    bookingChartInst.current = new Chart(bookingCanvasRef.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: bgColors,
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw}%`
            }
          }
        }
      }
    });

    return () => {
      if (bookingChartInst.current) bookingChartInst.current.destroy();
    };
  }, [bookingData]);

  // 2. 7-Day Booking Pace
  useEffect(() => {
    if (!paceCanvasRef.current || !bookingData) return;
    if (paceChartInst.current) paceChartInst.current.destroy();

    const labels = bookingData.sevenDayPace.map(p => p.day);
    const data = bookingData.sevenDayPace.map(p => p.count);

    paceChartInst.current = new Chart(paceCanvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: '#3b82f6',
          borderRadius: 4,
          barThickness: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.raw} bookings`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 9 } } },
          y: { display: false }
        }
      }
    });

    return () => {
      if (paceChartInst.current) paceChartInst.current.destroy();
    };
  }, [bookingData]);

  // 3. Revenue Breakdown Donut
  useEffect(() => {
    if (!revenueCanvasRef.current || !revenueData) return;
    if (revenueChartInst.current) revenueChartInst.current.destroy();

    const labels = revenueData.streams.map(s => s.stream);
    const data = revenueData.streams.map(s => s.percent);
    const bgColors = revenueData.streams.map(s => s.color);

    revenueChartInst.current = new Chart(revenueCanvasRef.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: bgColors,
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw}%`
            }
          }
        }
      }
    });

    return () => {
      if (revenueChartInst.current) revenueChartInst.current.destroy();
    };
  }, [revenueData]);

  return (
    <div className="charts-dual-grid" id="bookings">
      {/* Booking Type Analysis */}
      <div className="content-card">
        <div className="card-header-bar">
          <div>
            <h3 className="card-title">Booking Type Analysis</h3>
            <p className="card-subtitle">Channel distribution & 7-day volume pace</p>
          </div>
          <span className="channel-pill">1,284 Bookings</span>
        </div>

        <div className="donut-with-details">
          <div className="donut-canvas-container">
            <canvas ref={bookingCanvasRef}></canvas>
          </div>
          <div className="channel-breakdown-list">
            {bookingData?.types?.map((item) => (
              <div key={item.channel} className="channel-item">
                <span className="ch-color" style={{ backgroundColor: item.color }}></span>
                <span className="ch-name">{item.channel}</span>
                <span className="ch-pct">{item.percent}%</span>
                <span className="ch-val">{item.count} bks</span>
              </div>
            ))}
          </div>
        </div>

        <div className="booking-pace-subcard">
          <div className="pace-header">
            <span>7-Day Daily Booking Volume Pace</span>
            <strong>+16.5% WoW Growth</strong>
          </div>
          <div className="pace-canvas-wrapper">
            <canvas ref={paceCanvasRef}></canvas>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="content-card" id="revenue">
        <div className="card-header-bar">
          <div>
            <h3 className="card-title">Revenue Breakdown</h3>
            <p className="card-subtitle">Operational revenue streams for Poppys group</p>
          </div>
          <span className="badge-total">₹48.6L</span>
        </div>

        <div className="donut-with-details">
          <div className="donut-canvas-container">
            <canvas ref={revenueCanvasRef}></canvas>
          </div>
          <div className="channel-breakdown-list">
            {revenueData?.streams?.map((item) => (
              <div key={item.stream} className="channel-item">
                <span className="ch-color" style={{ backgroundColor: item.color }}></span>
                <span className="ch-name">{item.stream}</span>
                <span className="ch-pct">{item.percent}%</span>
                <span className="ch-val">₹{item.amountLakhs}L</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rev-summary-banner">
          <BadgePercent size={24} style={{ color: '#0d9488', flexShrink: 0 }} />
          <div>
            <strong>RevPAR (Revenue per Available Room): ₹1,653</strong>
            <p>Average Daily Rate (ADR): ₹4,820 &bull; Banquet utilization up 22%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
