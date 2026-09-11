import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiGrid from './components/KpiGrid';
import AlertsSection from './components/AlertsSection';
import BranchTable from './components/BranchTable';
import ChartsDualGrid from './components/ChartsDualGrid';
import RoomCategorySection from './components/RoomCategorySection';
import RestaurantAnalytics from './components/RestaurantAnalytics';
import OccupancyForecast from './components/OccupancyForecast';
import BranchMap from './components/BranchMap';
import AiHotelAnalyst from './components/AiHotelAnalyst';
import { api } from './services/api';
import { 
  Sparkles, 
  ShieldAlert, 
  TrendingUp, 
  Building2, 
  ArrowRight,
  BadgeCheck,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBranch, setSelectedBranch] = useState('all');

  // Dashboard Data State
  const [kpiData, setKpiData] = useState(null);
  const [branches, setBranches] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [occupancyTrend, setOccupancyTrend] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  // UI State
  const [toasts, setToasts] = useState([]);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  const showToast = (message) => {
    const id = Date.now();
    setToasts([{ id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id === id));
    }, 2800);
  };

  // Initial Data Load
  useEffect(() => {
    loadAllData();
  }, []);

  // Update KPIs on branch change
  useEffect(() => {
    api.getKpis(selectedBranch).then((res) => {
      if (res) setKpiData(res);
    });
  }, [selectedBranch]);

  const loadAllData = async () => {
    const [
      kpisRes,
      branchesRes,
      alertsRes,
      trendRes,
      bookingsRes,
      catsRes,
      restRes,
      revRes,
      forecastRes
    ] = await Promise.all([
      api.getKpis(selectedBranch),
      api.getBranches(),
      api.getAlerts(),
      api.getOccupancyTrend(),
      api.getBookings(),
      api.getRoomCategories(),
      api.getRestaurantData(),
      api.getRevenueBreakdown(),
      api.getOccupancyForecast()
    ]);

    if (kpisRes) setKpiData(kpisRes);
    if (branchesRes) setBranches(branchesRes);
    if (alertsRes) setAlerts(alertsRes);
    if (trendRes) setOccupancyTrend(trendRes);
    if (bookingsRes) setBookingData(bookingsRes);
    if (catsRes) setCategories(catsRes);
    if (restRes) setRestaurantData(restRes);
    if (revRes) setRevenueData(revRes);
    if (forecastRes) setForecastData(forecastRes);
  };

  const handleBranchSelect = (branchKey) => {
    setSelectedBranch(branchKey);
  };

  const handleAlertAction = (actionType, branchName) => {
    if (actionType === 'analyze_ota') {
      showToast('Redirected to OTA Channel Manager: 48-hr cancellation cutoff applied for Ooty.');
    } else if (actionType === 'launch_package') {
      showToast('Launched "Kodaikanal Mid-Week Retreat" promo with 20% F&B voucher.');
    } else if (actionType === 'maintain_strategy') {
      showToast('Strategy replicated: "Temple Heritage Dining Package" rolled out to Kumbakonam.');
    }
  };

  const handleDismissAlert = async (alertId) => {
    await api.acknowledgeAlert(alertId);
    setAlerts((prev) => 
      prev.map((a) => a.alertId === alertId ? { ...a, isAcknowledged: true } : a)
    );
    showToast('Alert marked as acknowledged.');
  };

  const handleApplyPricing = () => {
    showToast('Dynamic Yield Management Rule applied: Weekend rates increased by +12% on Deluxe & Suite keys.');
  };

  return (
    <div className="app-layout">
      {/* LEFT FIXED SIDEBAR */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* MAIN CONTENT AREA */}
      <main className="main-content" id="main-content">
        {/* TOP HEADER */}
        <Header 
          selectedBranch={selectedBranch}
          onBranchChange={handleBranchSelect}
          onToggleNotif={() => setIsNotifDrawerOpen(!isNotifDrawerOpen)}
          onShowToast={showToast}
        />

        {/* DASHBOARD BODY */}
        <div className="dashboard-scroll-body">
          
          {/* TAB 1: EXECUTIVE OVERVIEW (BUSINESS OWNER PULSE) */}
          {activeTab === 'overview' && (
            <div className="tab-fade-container">
              {/* Executive Top Kpi Metrics */}
              <KpiGrid kpiData={kpiData} />

              {/* Critical Business Alerts & Anomaly Actions */}
              <AlertsSection 
                alerts={alerts}
                onAlertAction={handleAlertAction}
                onDismissAlert={handleDismissAlert}
              />

              {/* Performance Trend & Channel Profit Margins */}
              <div className="analytics-layout-grid">
                <div className="main-column">
                  <ChartsDualGrid 
                    branches={branches}
                    occupancyTrend={occupancyTrend}
                  />
                </div>

                <div className="ai-column">
                  <AiHotelAnalyst />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REGIONAL PROPERTIES & REAL TAMIL NADU MAP */}
          {activeTab === 'branches' && (
            <div className="tab-fade-container single-tab-flow">
              {/* Authentic Tamil Nadu Geographic Map in Dark Theme */}
              <BranchMap 
                branches={branches}
                selectedBranch={selectedBranch}
                onSelectBranch={handleBranchSelect}
                onFilterToBranch={handleBranchSelect}
              />

              {/* Executive Branch Performance Matrix */}
              <BranchTable 
                branches={branches}
                selectedBranch={selectedBranch}
                onSelectBranch={handleBranchSelect}
                onRefresh={() => {
                  loadAllData();
                  showToast('Synchronized with central PMS database.');
                }}
              />
            </div>
          )}

          {/* TAB 3: DEMAND FORECAST & YIELD OPTIMIZATION */}
          {activeTab === 'forecast' && (
            <div className="tab-fade-container single-tab-flow">
              <div className="content-card mb-4">
                <div className="card-header-bar">
                  <div>
                    <h3 className="card-title">
                      <Sparkles size={18} style={{ color: '#c59b27' }} /> AI Predictive Demand & Dynamic Pricing Engine
                    </h3>
                    <p className="card-subtitle">
                      Machine learning 7-day occupancy forecast model with automated RevPAR surge recommendations
                    </p>
                  </div>
                  <button className="btn-primary-action" onClick={handleApplyPricing}>
                    ⚡ Apply Dynamic Rates Across Group
                  </button>
                </div>

                <OccupancyForecast 
                  forecastData={forecastData}
                  onApplyPricing={handleApplyPricing}
                />
              </div>

              {/* Room Categories Yield Contribution */}
              <RoomCategorySection categories={categories} />

              {/* F&B & Banquet Revenue Synergy */}
              <RestaurantAnalytics restaurantData={restaurantData} />
            </div>
          )}

          {/* TAB 4: AI BUSINESS ADVISOR (EXECUTIVE STUDIO) */}
          {activeTab === 'ai-analyst' && (
            <div className="tab-fade-container ai-full-studio">
              <div className="ai-studio-grid">
                <div className="ai-studio-left">
                  <div className="content-card neon-card">
                    <h3 className="card-title">
                      <Sparkles size={18} style={{ color: '#00f2fe' }} /> Executive Portfolio Intelligence
                    </h3>
                    <p className="card-subtitle">AI-synthesized operational parameters across all 8 Poppys properties</p>
                    
                    <div className="ai-brief-pills">
                      <div className="brief-mini-pill">
                        <span>Group Occupancy Pace</span>
                        <strong>78.4% (Optimal)</strong>
                      </div>
                      <div className="brief-mini-pill">
                        <span>Weekly Revenue Runrate</span>
                        <strong style={{ color: '#10b981' }}>₹48.6L (+13.5%)</strong>
                      </div>
                      <div className="brief-mini-pill">
                        <span>Active Risk Anomalies</span>
                        <strong style={{ color: '#ef4444' }}>2 Requires Review</strong>
                      </div>
                    </div>

                    <div className="executive-takeaways-card">
                      <h4 style={{ fontSize: '0.86rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                        Executive Summary for Managing Director
                      </h4>
                      <ul className="executive-bullets">
                        <li>
                          <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
                          <span><strong>Madurai:</strong> Leads portfolio with ₹11.2L revenue driven by peak wedding banquet bookings.</span>
                        </li>
                        <li>
                          <CheckCircle2 size={14} style={{ color: '#38bdf8', flexShrink: 0 }} />
                          <span><strong>Direct Bookings:</strong> Direct website share increased to 42%, saving ₹4.2L in OTA commissions this month.</span>
                        </li>
                        <li>
                          <ShieldAlert size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                          <span><strong>Ooty Alert:</strong> OTA cancellation rate spiked to 18.2%. 48-hr non-refundable cutoff is recommended immediately.</span>
                        </li>
                        <li>
                          <TrendingUp size={14} style={{ color: '#f59e0b', flexShrink: 0 }} />
                          <span><strong>Weekend Yield:</strong> Upcoming Saturday occupancy forecast is 92%. Dynamic pricing increase (+12%) is ready to deploy.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="ai-studio-right">
                  <AiHotelAnalyst />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ALERTS & ANOMALY RESOLUTION */}
          {activeTab === 'alerts' && (
            <div className="tab-fade-container single-tab-flow">
              <AlertsSection 
                alerts={alerts}
                onAlertAction={handleAlertAction}
                onDismissAlert={handleDismissAlert}
              />

              <div className="content-card">
                <h3 className="card-title">Executive Operational Audit Log</h3>
                <p className="card-subtitle">Audited system notifications and AI triggered intervention rules</p>
                <div className="audit-log-list">
                  <div className="audit-row">
                    <span className="audit-time">Today, 08:30 AM</span>
                    <strong className="audit-branch">Madurai</strong>
                    <span>Banquet Hall wedding settlement of ₹3.2L successfully reconciled.</span>
                    <span className="audit-badge badge-green">Resolved</span>
                  </div>
                  <div className="audit-row">
                    <span className="audit-time">Yesterday, 04:15 PM</span>
                    <strong className="audit-branch">Ooty</strong>
                    <span>Detected OTA bulk cancellation anomaly (+18%). Notification dispatched to GM.</span>
                    <span className="audit-badge badge-red">Active Investigation</span>
                  </div>
                  <div className="audit-row">
                    <span className="audit-time">Sep 9, 11:20 AM</span>
                    <strong className="audit-branch">Kodaikanal</strong>
                    <span>Mid-week occupancy alert triggered (54%). Dynamic package generated.</span>
                    <span className="audit-badge badge-amber">Action In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* NOTIFICATIONS DRAWER */}
      {isNotifDrawerOpen && (
        <div className="modal-backdrop open" onClick={() => setIsNotifDrawerOpen(false)}>
          <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldAlert size={18} style={{ color: '#ef4444' }} />
                <h3>Executive Intelligence Alerts ({alerts.length})</h3>
              </div>
              <button className="icon-btn-close" onClick={() => setIsNotifDrawerOpen(false)}>✕</button>
            </div>
            <div className="drawer-body">
              {alerts.map((alert) => (
                <div key={alert.alertId} className={`drawer-alert-item ${alert.severity}`}>
                  <div className="drawer-alert-head">
                    <span className="drawer-branch">{alert.branch}</span>
                    <span className="drawer-time">{alert.time}</span>
                  </div>
                  <p className="drawer-message">{alert.message}</p>
                  <div className="drawer-action-row">
                    <button 
                      className="btn-tiny-action"
                      onClick={() => {
                        handleAlertAction(alert.actionType, alert.branch);
                        setIsNotifDrawerOpen(false);
                      }}
                    >
                      {alert.actionLabel}
                    </button>
                    {!alert.isAcknowledged && (
                      <button 
                        className="btn-tiny-dismiss"
                        onClick={() => handleDismissAlert(alert.alertId)}
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATIONS */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <BadgeCheck size={16} style={{ color: '#00f5a0' }} />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
