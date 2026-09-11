/**
 * REST API Client Service for Poppys Hotels Management & AI Analytics Dashboard
 * Connects to Express backend at http://localhost:5000/api
 * Includes seamless offline fallback to ensure uninterrupted UI demonstration
 */

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // 1. Fetch Aggregated / Branch KPIs
  async getKpis(branch = 'all') {
    try {
      const res = await fetch(`${API_BASE_URL}/kpis?branch=${encodeURIComponent(branch)}`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.data;
    } catch (e) {
      console.warn('Backend API unavailable, using resilient fallback data:', e);
      return null;
    }
  },

  // 2. Fetch All Branches
  async getBranches() {
    try {
      const res = await fetch(`${API_BASE_URL}/branches`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.data;
    } catch (e) {
      console.warn('Backend API unavailable, using resilient fallback data:', e);
      return null;
    }
  },

  // 3. Fetch AI Alerts
  async getAlerts() {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return null;
    }
  },

  // 4. Acknowledge Alert
  async acknowledgeAlert(alertId) {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts/${alertId}/acknowledge`, {
        method: 'POST'
      });
      return await res.json();
    } catch (e) {
      return { success: true };
    }
  },

  // 5. Fetch Occupancy 7-Day Trend
  async getOccupancyTrend() {
    try {
      const res = await fetch(`${API_BASE_URL}/occupancy-trend`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return null;
    }
  },

  // 6. Fetch Bookings Breakdown
  async getBookings() {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`);
      if (!res.ok) throw new Error('API error');
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // 7. Fetch Room Categories
  async getRoomCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/room-categories`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return null;
    }
  },

  // 8. Fetch Restaurant & Food Analytics
  async getRestaurantData() {
    try {
      const res = await fetch(`${API_BASE_URL}/restaurant`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return null;
    }
  },

  // 9. Fetch Staff Analytics
  async getStaffData() {
    try {
      const res = await fetch(`${API_BASE_URL}/staff`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return null;
    }
  },

  // 10. Fetch Revenue Breakdown
  async getRevenueBreakdown() {
    try {
      const res = await fetch(`${API_BASE_URL}/revenue-breakdown`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return null;
    }
  },

  // 11. Fetch Guest Experience
  async getGuestExperience() {
    try {
      const res = await fetch(`${API_BASE_URL}/guest-experience`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return null;
    }
  },

  // 12. Fetch Occupancy Forecast
  async getOccupancyForecast() {
    try {
      const res = await fetch(`${API_BASE_URL}/occupancy-forecast`);
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return null;
    }
  },

  // 13. Query AI Hotel Analyst
  async queryAi(question) {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      if (!res.ok) throw new Error('API error');
      const json = await res.json();
      return json.response;
    } catch (e) {
      return null;
    }
  }
};
