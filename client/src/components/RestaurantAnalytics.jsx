import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { BarChart2, Award } from 'lucide-react';

export default function RestaurantAnalytics({ restaurantData }) {
  const canvasRef = useRef(null);
  const chartInst = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !restaurantData?.pastWeekOrders) return;
    if (chartInst.current) chartInst.current.destroy();

    const labels = restaurantData.pastWeekOrders.map(o => o.day);
    const data = restaurantData.pastWeekOrders.map(o => o.orders);

    chartInst.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'F&B Orders',
          data,
          backgroundColor: [
            '#0d9488', '#0d9488', '#0d9488', '#0d9488', '#0d9488',
            '#ea580c', // Saturday Peak
            '#0d9488'
          ],
          borderRadius: 6,
          barThickness: 20
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Orders: ${ctx.raw}`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10, weight: 600 } } },
          y: {
            beginAtZero: true,
            grid: { color: '#f1f5f9' },
            ticks: { font: { size: 10 } }
          }
        }
      }
    });

    return () => {
      if (chartInst.current) chartInst.current.destroy();
    };
  }, [restaurantData]);

  return (
    <div className="content-card" id="restaurant">
      <div className="card-header-bar">
        <div>
          <h3 className="card-title">Food & Restaurant Analytics</h3>
          <p className="card-subtitle">F&B revenue insights, order spikes and popular dining selections</p>
        </div>
        <div className="cuisine-tag-group">
          <span className="cuisine-pill active">All Outlets</span>
          {restaurantData?.categories?.map((cat) => (
            <span key={cat} className="cuisine-pill">{cat}</span>
          ))}
        </div>
      </div>

      <div className="restaurant-dual-grid">
        {/* Past Week Orders Bar Chart */}
        <div className="fb-chart-pane">
          <div className="fb-header">
            <span className="fb-sub-title">
              <BarChart2 size={16} style={{ color: '#0d9488' }} /> Past Week Daily Orders (3,842 Total)
            </span>
            <span className="sat-peak-badge">Saturday Peak: 782 Orders</span>
          </div>
          <div className="chart-canvas-wrapper-fb">
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>

        {/* Top Food Items Ranking */}
        <div className="fb-ranking-pane">
          <span className="fb-sub-title">
            <Award size={16} style={{ color: '#d97706' }} /> Top 5 Food Items Ordered
          </span>

          <div className="top-dishes-list">
            {restaurantData?.topFoodItems?.map((dish) => (
              <div key={dish.rank} className="dish-item">
                <div className="dish-rank">{dish.rank}</div>
                <div className="dish-info">
                  <div className="dish-name-row">
                    <span className="dish-title">{dish.name}</span>
                    <span className="dish-count">{dish.count} orders</span>
                  </div>
                  <div className="dish-progress">
                    <div className="dish-fill" style={{ width: `${dish.sharePct}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
