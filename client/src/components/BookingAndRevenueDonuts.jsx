import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import AnimatedCounter from './AnimatedCounter';

export default function BookingAndRevenueDonuts({ bookingData, revenueData }) {
  const bookingCanvasRef = useRef(null);
  const paceCanvasRef = useRef(null);
  const revenueCanvasRef = useRef(null);

  const bookingChartInst = useRef(null);
  const paceChartInst = useRef(null);
  const revenueChartInst = useRef(null);

  // Safe data access
  const bookingTypes = bookingData?.types || bookingData?.data?.types || [
    { channel: 'Direct Website', percent: 38, count: 488, color: '#2563eb' },
    { channel: 'OTA', percent: 27, count: 347, color: '#0d9488' },
    { channel: 'Corporate', percent: 14, count: 180, color: '#6366f1' },
    { channel: 'Walk-in', percent: 12, count: 154, color: '#f59e0b' },
    { channel: 'Travel Agent', percent: 6, count: 77, color: '#a855f7' },
    { channel: 'Other', percent: 3, count: 38, color: '#94a3b8' }
  ];

  const paceList = bookingData?.sevenDayPace || bookingData?.data?.sevenDayPace || [
    { day: 'Mon', count: 152 },
    { day: 'Tue', count: 145 },
    { day: 'Wed', count: 178 },
    { day: 'Thu', count: 169 },
    { day: 'Fri', count: 210 },
    { day: 'Sat', count: 248 },
    { day: 'Sun', count: 182 }
  ];

  const totalBookingsCount = bookingData?.totalBookings || 1284;

  const revStreams = revenueData?.streams || revenueData?.data?.streams || revenueData?.sources || [
    { stream: 'Rooms', percent: 64.2, amountLakhs: 31.2, color: '#0f172a' },
    { stream: 'Restaurant', percent: 19.3, amountLakhs: 9.4, color: '#f59e0b' },
    { stream: 'Events', percent: 8.4, amountLakhs: 4.1, color: '#0d9488' },
    { stream: 'Other Services', percent: 8.0, amountLakhs: 3.9, color: '#94a3b8' }
  ];

  const totalRevVal = revenueData?.totalRevenueLakhs || 48.6;

  // 1. Booking Channels Donut (No Zooming - Pure Smooth Rotation)
  useEffect(() => {
    if (!bookingCanvasRef.current) return;
    if (bookingChartInst.current) bookingChartInst.current.destroy();

    const labels = bookingTypes.map(t => t.channel);
    const data = bookingTypes.map(t => t.percent);
    const bgColors = bookingTypes.map(t => t.color);

    bookingChartInst.current = new Chart(bookingCanvasRef.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: bgColors,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        animation: {
          duration: 900,
          animateRotate: true,
          animateScale: false, // Prevents zooming bug
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 10,
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

  // 2. 7-Day Booking Pace Mini Bars
  useEffect(() => {
    if (!paceCanvasRef.current) return;
    if (paceChartInst.current) paceChartInst.current.destroy();

    const labels = paceList.map(p => p.day);
    const data = paceList.map(p => p.count);

    paceChartInst.current = new Chart(paceCanvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: '#3b82f6',
          borderRadius: 4,
          barThickness: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 800,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            callbacks: {
              label: (ctx) => ` ${ctx.raw} bookings`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#64748b' } },
          y: { display: false }
        }
      }
    });

    return () => {
      if (paceChartInst.current) paceChartInst.current.destroy();
    };
  }, [bookingData]);

  // 3. Revenue Breakdown Donut (No Zooming)
  useEffect(() => {
    if (!revenueCanvasRef.current) return;
    if (revenueChartInst.current) revenueChartInst.current.destroy();

    const labels = revStreams.map(s => s.stream || s.name);
    const data = revStreams.map(s => s.percent || s.percentage);
    const bgColors = revStreams.map(s => s.color);

    revenueChartInst.current = new Chart(revenueCanvasRef.current, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: bgColors,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        animation: {
          duration: 900,
          animateRotate: true,
          animateScale: false, // Prevents zooming bug
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw}% (₹${revStreams[ctx.dataIndex]?.amountLakhs || 0}L)`
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
    <div className="donuts-grid">
      {/* 1. Booking Channels */}
      <div className="content-card curved-card-box">
        <div className="card-header-bar">
          <div>
            <h3 className="card-title">Booking Channels Breakdown</h3>
            <p className="card-subtitle">Channel share &amp; zero-commission direct bookings</p>
          </div>
          <span className="card-tag-pill green-pill">
            Direct: <strong><AnimatedCounter value={42} suffix="%" /></strong>
          </span>
        </div>

        <div className="donut-layout">
          <div className="donut-chart-container">
            <canvas ref={bookingCanvasRef}></canvas>
            <div className="donut-center-metric">
              <span className="center-value"><AnimatedCounter value={totalBookingsCount} /></span>
              <span className="center-label">Bookings</span>
            </div>
          </div>

          <div className="donut-legend-list">
            {bookingTypes.map((t) => (
              <div key={t.channel} className="donut-legend-item">
                <span className="legend-dot" style={{ backgroundColor: t.color }}></span>
                <span className="legend-name">{t.channel}</span>
                <strong className="legend-val"><AnimatedCounter value={t.percent} suffix="%" /></strong>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Pace Mini Bar Chart */}
        <div className="pace-mini-section">
          <span className="pace-title">7-Day Booking Inflow Pace:</span>
          <div className="pace-canvas-wrap">
            <canvas ref={paceCanvasRef}></canvas>
          </div>
        </div>
      </div>

      {/* 2. Revenue Streams Breakdown */}
      <div className="content-card curved-card-box">
        <div className="card-header-bar">
          <div>
            <h3 className="card-title">Revenue Streams &amp; Contribution</h3>
            <p className="card-subtitle">Departmental earnings across all 8 branches</p>
          </div>
          <span className="card-tag-pill blue-pill">
            Rooms: <strong><AnimatedCounter value={64.2} suffix="%" decimals={1} /></strong>
          </span>
        </div>

        <div className="donut-layout">
          <div className="donut-chart-container">
            <canvas ref={revenueCanvasRef}></canvas>
            <div className="donut-center-metric">
              <span className="center-value">₹<AnimatedCounter value={totalRevVal} suffix="L" decimals={1} /></span>
              <span className="center-label">Gross Rev</span>
            </div>
          </div>

          <div className="donut-legend-list">
            {revStreams.map((s) => (
              <div key={s.stream || s.name} className="donut-legend-item">
                <span className="legend-dot" style={{ backgroundColor: s.color }}></span>
                <span className="legend-name">{s.stream || s.name}</span>
                <div className="legend-right">
                  <span className="legend-amt">₹<AnimatedCounter value={s.amountLakhs} suffix="L" decimals={1} /></span>
                  <strong className="legend-val"><AnimatedCounter value={s.percent || s.percentage} suffix="%" decimals={1} /></strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="revenue-summary-foot">
          <span>Banquet &amp; Food Sales margin holds at <strong>74%</strong> across all operating units.</span>
        </div>
      </div>
    </div>
  );
}
