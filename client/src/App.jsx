import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KpiGrid from './components/KpiGrid';
import AlertsSection from './components/AlertsSection';
import BranchTable from './components/BranchTable';
import ChartsDualGrid from './components/ChartsDualGrid';
import BookingAndRevenueDonuts from './components/BookingAndRevenueDonuts';
import RoomCategorySection from './components/RoomCategorySection';
import RestaurantAnalytics from './components/RestaurantAnalytics';
import StaffAndGuestExperience from './components/StaffAndGuestExperience';
import OccupancyForecast from './components/OccupancyForecast';
import BranchMap from './components/BranchMap';
import AiHotelAnalyst from './components/AiHotelAnalyst';
import { api } from './services/api';
import { 
  Info, 
  Bell, 
  X, 
  AlertTriangle, 
  TrendingDown, 
  Check, 
  Layers, 
  Building2, 
  BedDouble, 
  CalendarCheck2, 
  Utensils, 
  Users, 
  BadgeIndianRupee, 
  Star, 
  Sparkles, 
  BellRing,
  ArrowRight
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
  const [staffData, setStaffData] = useState(null);
  const [guestData, setGuestData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  // UI State
  const [toasts, setToasts] = useState([]);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
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
      staffRes,
      revRes,
      guestRes,
      forecastRes
    ] = await Promise.all([
      api.getKpis(selectedBranch),
      api.getBranches(),
      api.getAlerts(),
      api.getOccupancyTrend(),
      api.getBookings(),
      api.getRoomCategories(),
      api.getRestaurantData(),
      api.getStaffData(),
      api.getRevenueBreakdown(),
      api.getGuestExperience(),
      api.getOccupancyForecast()
    ]);

    if (kpisRes) setKpiData(kpisRes);
    if (branchesRes) setBranches(branchesRes);
    if (alertsRes) setAlerts(alertsRes);
    if (trendRes) setOccupancyTrend(trendRes);
    if (bookingsRes) setBookingData(bookingsRes);
    if (catsRes) setCategories(catsRes);
    if (restRes) setRestaurantData(restRes);
    if (staffRes) setStaffData(staffRes);
    if (revRes) setRevenueData(revRes);
    if (guestRes) setGuestData(guestRes);
    if (forecastRes) setForecastData(forecastRes);
  };

  const handleBranchSelect = (branchKey) => {
    setSelectedBranch(branchKey);
    if (branchKey === 'all') {
      showToast('Viewing aggregated performance for All 8 Poppys Properties.');
    } else {
      showToast(`Focused on ${branchKey} branch analytics.`);
    }
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

  // Breadcrumb / Current Tab Title Helper
  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Executive Operations Overview';
      case 'branches': return 'Branch-wise Regional Analytics & Map';
      case 'rooms': return 'Rooms, Yield & Occupancy Forecast';
      case 'bookings': return 'Booking Channels & Demand Pace';
      case 'restaurant': return 'Food & Restaurant (F&B) Analytics';
      case 'staff': return 'Workforce & Staff Deployment';
      case 'revenue': return 'Revenue Streams & RevPAR Analysis';
      case 'guest-exp': return 'Guest Experience & Sentiment Intelligence';
      case 'ai-analyst': return 'AI Hotel Analyst Conversational Studio';
      case 'alerts': return 'Operational Anomaly Detection & Recommendations';
      default: return 'Hotel Performance Dashboard';
    }
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

        {/* TAB NAVIGATION HEADER BAR */}
        <div className="tab-context-bar">
          <div className="tab-context-title">
            <span className="tab-badge">Active View</span>
            <h2>{getTabTitle()}</h2>
          </div>
          <div className="tab-pill-chips">
            <button 
              className={`tab-pill-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-pill-btn ${activeTab === 'branches' ? 'active' : ''}`}
              onClick={() => setActiveTab('branches')}
            >
              Branches
            </button>
            <button 
              className={`tab-pill-btn ${activeTab === 'rooms' ? 'active' : ''}`}
              onClick={() => setActiveTab('rooms')}
            >
              Rooms
            </button>
            <button 
              className={`tab-pill-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              Bookings
            </button>
            <button 
              className={`tab-pill-btn ${activeTab === 'restaurant' ? 'active' : ''}`}
              onClick={() => setActiveTab('restaurant')}
            >
              Restaurant
            </button>
            <button 
              className={`tab-pill-btn ${activeTab === 'staff' ? 'active' : ''}`}
              onClick={() => setActiveTab('staff')}
            >
              Staff
            </button>
            <button 
              className={`tab-pill-btn ${activeTab === 'revenue' ? 'active' : ''}`}
              onClick={() => setActiveTab('revenue')}
            >
              Revenue
            </button>
            <button 
              className={`tab-pill-btn ${activeTab === 'guest-exp' ? 'active' : ''}`}
              onClick={() => setActiveTab('guest-exp')}
            >
              Guests
            </button>
            <button 
              className={`tab-pill-btn ai-tab-btn ${activeTab === 'ai-analyst' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai-analyst')}
            >
              <Sparkles size={12} /> AI Analyst
            </button>
          </div>
        </div>

        {/* DASHBOARD TAB CONTAINER */}
        <div className="dashboard-scroll-body">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-fade-container">
              {/* 8 KPI Cards */}
              <KpiGrid kpiData={kpiData} />

              {/* AI Alerts Summary */}
              <AlertsSection 
                alerts={alerts}
                onAlertAction={handleAlertAction}
                onDismissAlert={handleDismissAlert}
              />

              {/* Dual Column: Neon Charts & AI Assistant */}
              <div className="analytics-layout-grid">
                <div className="main-column">
                  <ChartsDualGrid 
                    branches={branches}
                    occupancyTrend={occupancyTrend}
                  />

                  <BookingAndRevenueDonuts 
                    bookingData={bookingData}
                    revenueData={revenueData}
                  />
                </div>

                <AiHotelAnalyst />
              </div>
            </div>
          )}

          {/* TAB 2: BRANCH ANALYTICS */}
          {activeTab === 'branches' && (
            <div className="tab-fade-container single-tab-flow">
              <BranchTable 
                branches={branches}
                selectedBranch={selectedBranch}
                onSelectBranch={handleBranchSelect}
                onRefresh={() => {
                  loadAllData();
                  showToast('Synchronized with Poppys central PMS.');
                }}
              />

              <BranchMap 
                branches={branches}
                selectedBranch={selectedBranch}
                onSelectBranch={handleBranchSelect}
                onFilterToBranch={handleBranchSelect}
              />

              <ChartsDualGrid 
                branches={branches}
                occupancyTrend={occupancyTrend}
              />
            </div>
          )}

          {/* TAB 3: ROOMS & OCCUPANCY */}
          {activeTab === 'rooms' && (
            <div className="tab-fade-container single-tab-flow">
              <RoomCategorySection categories={categories} />
              
              <OccupancyForecast 
                forecastData={forecastData}
                onApplyPricing={handleApplyPricing}
              />
            </div>
          )}

          {/* TAB 4: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="tab-fade-container single-tab-flow">
              <BookingAndRevenueDonuts 
                bookingData={bookingData}
                revenueData={revenueData}
              />
            </div>
          )}

          {/* TAB 5: RESTAURANT */}
          {activeTab === 'restaurant' && (
            <div className="tab-fade-container single-tab-flow">
              <RestaurantAnalytics restaurantData={restaurantData} />
            </div>
          )}

          {/* TAB 6: STAFF */}
          {activeTab === 'staff' && (
            <div className="tab-fade-container single-tab-flow">
              <StaffAndGuestExperience 
                staffData={staffData}
                guestData={guestData}
              />
            </div>
          )}

          {/* TAB 7: REVENUE */}
          {activeTab === 'revenue' && (
            <div className="tab-fade-container single-tab-flow">
              <BookingAndRevenueDonuts 
                bookingData={bookingData}
                revenueData={revenueData}
              />
            </div>
          )}

          {/* TAB 8: GUEST EXPERIENCE */}
          {activeTab === 'guest-exp' && (
            <div className="tab-fade-container single-tab-flow">
              <StaffAndGuestExperience 
                staffData={staffData}
                guestData={guestData}
              />
            </div>
          )}

          {/* TAB 9: AI ANALYST (FULL STUDIO) */}
          {activeTab === 'ai-analyst' && (
            <div className="tab-fade-container ai-full-studio">
              <div className="ai-studio-grid">
                <div className="ai-studio-left">
                  <div className="content-card neon-card">
                    <h3 className="card-title">
                      <Sparkles size={18} style={{ color: '#00f2fe' }} /> AI Intelligence Overview
                    </h3>
                    <p className="card-subtitle">Synthesizing live operational parameters across 8 Poppys branches</p>
                    
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
                        <span>Active Anomalies</span>
                        <strong style={{ color: '#ef4444' }}>2 Needs Attention</strong>
                      </div>
                    </div>

                    <OccupancyForecast 
                      forecastData={forecastData}
                      onApplyPricing={handleApplyPricing}
                    />
                  </div>
                </div>

                <div className="ai-studio-right">
                  <AiHotelAnalyst />
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: ALERTS & RECOMMENDATIONS */}
          {activeTab === 'alerts' && (
            <div className="tab-fade-container single-tab-flow">
              <AlertsSection 
                alerts={alerts}
                onAlertAction={handleAlertAction}
                onDismissAlert={handleDismissAlert}
              />

              <div className="content-card">
                <h3 className="card-title">Recent Operational Anomaly Log</h3>
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
              <h3><Bell size={18} style={{ color: '#c59b27' }} /> Operational Notifications</h3>
              <button className="close-drawer" onClick={() => setIsNotifDrawerOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="drawer-body">
              <div className="notif-item unread">
                <div className="notif-icon icon-red"><AlertTriangle size={16} /></div>
                <div className="notif-content">
                  <strong>Ooty Cancellation Spike</strong>
                  <p>18% increase in weekend OTA cancellations detected.</p>
                  <span className="notif-time">42m ago</span>
                </div>
              </div>
              <div className="notif-item unread">
                <div className="notif-icon icon-amber"><TrendingDown size={16} /></div>
                <div className="notif-content">
                  <strong>Kodaikanal Mid-week Dip</strong>
                  <p>Occupancy at 54%. Promo package suggested.</p>
                  <span className="notif-time">2h ago</span>
                </div>
              </div>
              <div className="notif-item">
                <div className="notif-icon icon-green"><Check size={16} /></div>
                <div className="notif-content">
                  <strong>Madurai Banquet Settlement</strong>
                  <p>₹3.2L banquet revenue cleared successfully.</p>
                  <span className="notif-time">Today, 08:30 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST SYSTEM */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <Info size={16} />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
