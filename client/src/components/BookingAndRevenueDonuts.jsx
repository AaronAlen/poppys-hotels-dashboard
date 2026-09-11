import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { BadgePercent } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

export default function BookingAndRevenueDonuts({ bookingData, revenueData }) {
  const containerRef = useRef(null);
  const bookingCanvasRef = useRef(null);
  const paceCanvasRef = useRef(null);
  const revenueCanvasRef = useRef(null);

  const bookingChartInst = useRef(null);
  const paceChartInst = useRef(null);
  const revenueChartInst = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver to animate charts on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (bookingChartInst.current) {
            bookingChartInst.current.reset();
            bookingChartInst.current.update();
          }
          if (paceChartInst.current) {
            paceChartInst.current.reset();
            paceChartInst.current.update();
          }
          if (revenueChartInst.current) {
            revenueChartInst.current.reset();
            revenueChartInst.current.update();
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

  // 1. Booking Channels Donut
  useEffect(() => {
    if (!bookingCanvasRef.current || !bookingData || !isVisible) return;
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
        animation: {
          duration: 1200,
          animateRotate: true,
          animateScale: true,
          easing: 'easeOutQuart'
        },
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
  }, [bookingData, isVisible]);

  // 2. 7-Day Booking Pace
  useEffect(() => {
    if (!paceCanvasRef.current || !bookingData || !isVisible) return;
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
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
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
  }, [bookingData, isVisible]);

  // 3. Revenue Breakdown Donut
  useEffect(() => {
    if (!revenueCanvasRef.current || !revenueData || !isVisible) return;
    if (revenueChartInst.current) revenueChartInst.current.destroy();

    const streamList = revenueData.streams || revenueData.sources || [];
    const labels = streamList.map(s => s.stream || s.name);
    const data = streamList.map(s => s.percent || s.percentage);
    const bgColors = streamList.map(s => s.color);

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
        animation: {
          duration: 1400,
          animateRotate: true,
          animateScale: true,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw}% (₹${streamList[ctx.dataIndex]?.amountLakhs || 0}L)`
            }
          }
        }
      }
    });

    return () => {
      if (revenueChartInst.current) revenueChartInst.current.destroy();
    };
  }, [revenueData, isVisible]);

  if (!bookingData || !revenueData) return null;

  return (
    <div className="donuts-grid" ref={containerRef}>
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
              <span className="center-value"><AnimatedCounter value={bookingData.totalBookings} /></span>
              <span className="center-label">Bookings</span>
            </div>
          </div>

          <div className="donut-legend-list">
            {bookingData.types.map((t) => (
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
              <span className="center-value">₹<AnimatedCounter value={revenueData.totalRevenueLakhs} suffix="L" decimals={1} /></span>
              <span className="center-label">Gross Rev</span>
            </div>
          </div>

          <div className="donut-legend-list">
            {(revenueData.streams || revenueData.sources || []).map((s) => (
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
          <span>Banquet &amp; Food Sales margin holds at <strong>74%</strong>.</span>
        </div>
      </div>
    </div>
  );
}
