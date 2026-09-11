const express = require('express');
const router = express.Router();
const seedData = require('../data/seedData');

// 1. Aggregated / Branch-specific KPIs
router.get('/kpis', (req, res) => {
  const { branch } = req.query;
  if (!branch || branch === 'all') {
    return res.json({
      success: true,
      data: seedData.kpis,
      branch: 'all',
      isMock: true
    });
  }

  const target = seedData.branches.find(b => b.key.toLowerCase() === branch.toLowerCase());
  if (!target) {
    return res.status(404).json({ success: false, message: 'Branch not found' });
  }

  return res.json({
    success: true,
    data: {
      totalBranches: 1,
      totalRooms: target.roomsTotal,
      occupiedRooms: target.roomsOccupied,
      occupancyRate: target.occupancyRate,
      occupancyGrowth: target.growthPercent,
      revenueLakhs: target.revenueLakhs,
      revenueGrowth: target.growthPercent,
      bookingsCount: target.bookingsCount,
      bookingsGrowth: Math.round(target.growthPercent * 0.9),
      foodOrdersCount: target.foodOrdersCount,
      foodGrowth: Math.round(target.growthPercent * 1.1),
      staffCount: target.staffCount,
      staffGrowth: 1.5,
      guestRating: target.rating,
      ratingGrowth: 2.1,
      branchName: target.name,
      isMock: true
    }
  });
});

// 2. All Branches Performance
router.get('/branches', (req, res) => {
  res.json({
    success: true,
    count: seedData.branches.length,
    data: seedData.branches
  });
});

// Single Branch
router.get('/branches/:key', (req, res) => {
  const target = seedData.branches.find(b => b.key.toLowerCase() === req.params.key.toLowerCase());
  if (!target) {
    return res.status(404).json({ success: false, message: 'Branch not found' });
  }
  res.json({ success: true, data: target });
});

// 3. AI Alerts & Recommendations
router.get('/alerts', (req, res) => {
  res.json({
    success: true,
    count: seedData.alerts.length,
    data: seedData.alerts
  });
});

router.post('/alerts/:id/acknowledge', (req, res) => {
  const alert = seedData.alerts.find(a => a.alertId === req.params.id);
  if (alert) {
    alert.isAcknowledged = true;
    return res.json({ success: true, message: 'Alert acknowledged', data: alert });
  }
  res.status(404).json({ success: false, message: 'Alert not found' });
});

// 4. Occupancy 7-Day Trend
router.get('/occupancy-trend', (req, res) => {
  res.json({
    success: true,
    data: seedData.occupancyTrend
  });
});

// 5. Booking Analytics
router.get('/bookings', (req, res) => {
  res.json({
    success: true,
    types: seedData.bookingTypes,
    sevenDayPace: seedData.bookingTrend7Days,
    totalBookings: 1284,
    wowGrowth: 16.5
  });
});

// 6. Room Category Analytics
router.get('/room-categories', (req, res) => {
  res.json({
    success: true,
    mostRevenueGeneratingCategory: 'Deluxe',
    data: seedData.roomCategories
  });
});

// 7. Food & Restaurant Analytics
router.get('/restaurant', (req, res) => {
  res.json({
    success: true,
    data: seedData.restaurant
  });
});

// 8. Staff Analytics
router.get('/staff', (req, res) => {
  res.json({
    success: true,
    data: seedData.staff
  });
});

// 9. Revenue Breakdown
router.get('/revenue-breakdown', (req, res) => {
  res.json({
    success: true,
    data: seedData.revenueBreakdown
  });
});

// 10. Guest Experience
router.get('/guest-experience', (req, res) => {
  res.json({
    success: true,
    data: seedData.guestExperience
  });
});

// 11. AI Occupancy Forecast
router.get('/occupancy-forecast', (req, res) => {
  res.json({
    success: true,
    data: seedData.occupancyForecast
  });
});

// 12. AI Hotel Analyst Query Endpoint
router.post('/ai/query', (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ success: false, message: 'Question string is required' });
  }

  const query = question.toLowerCase();

  // Knowledge Base Responses
  if (query.includes('best') || query.includes('top branch')) {
    return res.json({
      success: true,
      query: question,
      response: {
        title: 'Top Performing Branch This Week',
        summary: 'Madurai Central Hub outperformed across all group operational metrics.',
        positive: [
          'Revenue reached ₹11.2 Lakhs (+16.8% WoW growth)',
          'Occupancy peaked at 84.2% with strong banquet utilization',
          '940 food orders fulfilled with high guest CSAT (4.6/5)'
        ],
        needsAttention: [
          'Kitchen prep backlog during Saturday evening wedding rush'
        ],
        recommendation: 'Replicate the temple heritage thali package in Kumbakonam and Rameswaram.'
      }
    });
  }

  if (query.includes('attention') || query.includes('cancellation') || query.includes('worst')) {
    return res.json({
      success: true,
      query: question,
      response: {
        title: 'Branches Requiring Management Attention',
        summary: 'Operational anomalies detected in Ooty and Kodaikanal properties.',
        positive: [
          'Ooty weekend room rate held firm at ₹6,200 ADR',
          'Kodaikanal guest satisfaction remains solid at 4.1 ⭐'
        ],
        needsAttention: [
          'Ooty cancellation rate increased by 18% over the past 4 days',
          'Kodaikanal weekday occupancy dropped to 54%'
        ],
        recommendation: 'Increase weekday promotional packages in Kodaikanal and investigate OTA cancellations in Ooty.'
      }
    });
  }

  if (query.includes('revenue') || query.includes('money') || query.includes('earnings') || query.includes('last week')) {
    return res.json({
      success: true,
      query: question,
      response: {
        title: 'Weekly Group Revenue Summary',
        summary: 'Total group revenue reached ₹48.6 Lakhs, beating the prior week by 13.5%.',
        positive: [
          'Room Revenue: ₹31.2L (64.2% share)',
          'Restaurant & F&B: ₹9.4L (19.3% share)',
          'Events & Banquets: ₹4.1L (8.4% share)',
          'Other Services: ₹3.9L (8.0% share)'
        ],
        needsAttention: [
          'Transit properties yield represents only 2.8% of total revenue'
        ],
        recommendation: 'Maintain current rate card and enforce dynamic weekend pricing surges.'
      }
    });
  }

  if (query.includes('room') || query.includes('category') || query.includes('profitable') || query.includes('deluxe')) {
    return res.json({
      success: true,
      query: question,
      response: {
        title: 'Room Category Profitability Analysis',
        summary: 'Deluxe Room Category is the #1 profit generator across Poppys Hotels.',
        positive: [
          'Deluxe accounts for ₹19.2L (39.5% of total revenue)',
          'Highest category occupancy at 83.8% (134 of 160 rooms occupied)',
          'Average Daily Rate (ADR) of ₹4,800 provides optimal margin balance'
        ],
        needsAttention: [
          'Family Villas occupancy is lagging at 66.7%'
        ],
        recommendation: 'Package Family Villas with complimentary dinner buffet to boost weekend leisure stays.'
      }
    });
  }

  if (query.includes('food') || query.includes('restaurant') || query.includes('dish') || query.includes('biryani')) {
    return res.json({
      success: true,
      query: question,
      response: {
        title: 'Restaurant & F&B Intelligence',
        summary: 'Past week generated 3,842 orders (+19.7% growth) with Saturday peak of 782 orders.',
        positive: [
          '1. Chicken Biryani — 428 orders (74% gross margin)',
          '2. Masala Dosa — 371 orders (Breakfast volume leader)',
          '3. Parotta & Salna — 318 orders',
          '4. Paneer Butter Masala — 286 orders',
          '5. Fresh Cold-Pressed Juice — 251 orders'
        ],
        needsAttention: [
          'Continental menu items show slower turnover in hill station outlets'
        ],
        recommendation: 'Feature signature South Indian heritage items prominently in Ooty & Kodaikanal room menus.'
      }
    });
  }

  // Default / Generic query response
  return res.json({
    success: true,
    query: question,
    response: {
      title: `Executive Intelligence for "${question}"`,
      summary: 'Overall hotel performance improved by 12.8% compared with last week.',
      positive: [
        'Revenue increased 13.5% (₹48.6L total)',
        'Occupancy increased 10.1% group-wide (78.4% avg)',
        'Food orders increased 19.7% (3,842 total)'
      ],
      needsAttention: [
        'Kodaikanal weekday occupancy is low (54%)',
        'Ooty cancellation rate increased (+18%)'
      ],
      recommendation: 'Increase weekday promotional packages in Kodaikanal and investigate OTA cancellations in Ooty.'
    }
  });
});

module.exports = router;
