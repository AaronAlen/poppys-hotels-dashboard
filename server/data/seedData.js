/**
 * Seed data for Poppys Hotels Management & AI Analytics Dashboard
 * Embedded database representation for MongoDB & in-memory fallback
 */

const seedData = {
  kpis: {
    totalBranches: 8,
    totalRooms: 420,
    occupiedRooms: 329,
    occupancyRate: 78.4,
    occupancyGrowth: 8.2,
    revenueLakhs: 48.6,
    revenueGrowth: 13.5,
    bookingsCount: 1284,
    bookingsGrowth: 16.5,
    foodOrdersCount: 3842,
    foodGrowth: 19.7,
    staffCount: 186,
    staffGrowth: 2.2,
    guestRating: 4.4,
    ratingGrowth: 4.8,
    isMock: true
  },

  branches: [
    {
      key: 'Madurai',
      name: 'Madurai',
      subTitle: 'Central Hub & Banquets',
      region: 'Central Tamil Nadu',
      roomsTotal: 95,
      roomsOccupied: 80,
      occupancyRate: 84.2,
      revenueLakhs: 11.2,
      bookingsCount: 298,
      foodOrdersCount: 940,
      rating: 4.6,
      growthPercent: 16.8,
      growthIsPositive: true,
      operationalStatus: 'Strong Performance',
      staffCount: 44,
      pinCoords: { x: 290, y: 360 },
      executiveNotes: 'Leading group revenue with high banquet bookings and temple pilgrimage guests.'
    },
    {
      key: 'Rameswaram',
      name: 'Rameswaram',
      subTitle: 'Beach Resort & Pilgrimage',
      region: 'Coastal Tamil Nadu',
      roomsTotal: 65,
      roomsOccupied: 52,
      occupancyRate: 79.5,
      revenueLakhs: 8.4,
      bookingsCount: 215,
      foodOrdersCount: 620,
      rating: 4.5,
      growthPercent: 12.1,
      growthIsPositive: true,
      operationalStatus: 'Strong Performance',
      staffCount: 30,
      pinCoords: { x: 390, y: 420 },
      executiveNotes: 'Beachfront villas showing 95% weekend booking pace with high pilgrimage family arrivals.'
    },
    {
      key: 'Kumbakonam',
      name: 'Kumbakonam',
      subTitle: 'Heritage & Temple Sanctuary',
      region: 'Cauvery Delta',
      roomsTotal: 50,
      roomsOccupied: 37,
      occupancyRate: 74.1,
      revenueLakhs: 5.8,
      bookingsCount: 162,
      foodOrdersCount: 485,
      rating: 4.3,
      growthPercent: 9.4,
      growthIsPositive: true,
      operationalStatus: 'Moderate',
      staffCount: 22,
      pinCoords: { x: 370, y: 260 },
      executiveNotes: 'Heritage cultural tours maintaining steady bookings; opportunity to bundle temple pooja packages.'
    },
    {
      key: 'Ooty',
      name: 'Ooty',
      subTitle: 'Mountain Retreat & Villas',
      region: 'Nilgiris Highlands',
      roomsTotal: 55,
      roomsOccupied: 39,
      occupancyRate: 71.2,
      revenueLakhs: 7.1,
      bookingsCount: 194,
      foodOrdersCount: 530,
      rating: 4.2,
      growthPercent: -3.5,
      growthIsPositive: false,
      operationalStatus: 'Needs Attention',
      staffCount: 26,
      pinCoords: { x: 175, y: 230 },
      executiveNotes: 'High OTA cancellations (+18%) over weekends. Need stricter deposit terms and direct perks.'
    },
    {
      key: 'Kodaikanal',
      name: 'Kodaikanal',
      subTitle: 'Hill Station Resort',
      region: 'Palani Hills',
      roomsTotal: 48,
      roomsOccupied: 28,
      occupancyRate: 58.4,
      revenueLakhs: 4.9,
      bookingsCount: 138,
      foodOrdersCount: 410,
      rating: 4.1,
      growthPercent: -6.2,
      growthIsPositive: false,
      operationalStatus: 'Needs Attention',
      staffCount: 20,
      pinCoords: { x: 230, y: 330 },
      executiveNotes: 'Weekday occupancy dipped to 54%. Requires mid-week corporate/wellness discount drive.'
    },
    {
      key: 'Pondicherry',
      name: 'Pondicherry',
      subTitle: 'French Quarter Boutique',
      region: 'Coromandel Coast',
      roomsTotal: 52,
      roomsOccupied: 43,
      occupancyRate: 82.6,
      revenueLakhs: 6.7,
      bookingsCount: 175,
      foodOrdersCount: 512,
      rating: 4.7,
      growthPercent: 14.3,
      growthIsPositive: true,
      operationalStatus: 'Strong Performance',
      staffCount: 24,
      pinCoords: { x: 425, y: 185 },
      executiveNotes: 'Highest guest satisfaction rating (4.7) driven by French-colonial dining & coastal promenade.'
    },
    {
      key: 'Anaikatti',
      name: 'Anaikatti',
      subTitle: 'Jungle Valley Eco-Resort',
      region: 'Western Ghats',
      roomsTotal: 35,
      roomsOccupied: 24,
      occupancyRate: 69.8,
      revenueLakhs: 3.1,
      bookingsCount: 82,
      foodOrdersCount: 260,
      rating: 4.4,
      growthPercent: 5.6,
      growthIsPositive: true,
      operationalStatus: 'Improving',
      staffCount: 14,
      pinCoords: { x: 195, y: 275 },
      executiveNotes: 'Eco-resort safari packages showing positive traction with weekend eco-tourists.'
    },
    {
      key: 'Other',
      name: 'Other',
      subTitle: 'Transit & Managed Units',
      region: 'Regional Hubs',
      roomsTotal: 20,
      roomsOccupied: 13,
      occupancyRate: 64.0,
      revenueLakhs: 1.4,
      bookingsCount: 20,
      foodOrdersCount: 85,
      rating: 4.2,
      growthPercent: 3.0,
      growthIsPositive: true,
      operationalStatus: 'Stable',
      staffCount: 6,
      pinCoords: { x: 280, y: 210 },
      executiveNotes: 'Transit units maintaining consistent baseline corporate occupancy.'
    }
  ],

  alerts: [
    {
      alertId: 'alert-ooty',
      priority: 'HIGH',
      branchName: 'Ooty Branch',
      title: 'Ooty Cancellation Rate',
      description: 'Cancellation rate increased by 18% over the last 4 days.',
      recommendation: 'Analyze OTA bookings.',
      actionLabel: 'Analyze OTA Bookings',
      actionType: 'analyze_ota',
      timestamp: '42 mins ago',
      isAcknowledged: false
    },
    {
      alertId: 'alert-kodai',
      priority: 'ATTENTION',
      branchName: 'Kodaikanal Branch',
      title: 'Kodaikanal Occupancy',
      description: 'Weekday occupancy dropped to 54%.',
      recommendation: 'Launch a weekday package.',
      actionLabel: 'Launch Weekday Package',
      actionType: 'launch_package',
      timestamp: '2 hrs ago',
      isAcknowledged: false
    },
    {
      alertId: 'alert-madurai',
      priority: 'POSITIVE',
      branchName: 'Madurai Branch',
      title: 'Madurai Revenue',
      description: 'Revenue increased by 16.8%.',
      recommendation: 'Maintain current strategy.',
      actionLabel: 'Maintain Strategy',
      actionType: 'maintain_strategy',
      timestamp: 'Today, 08:30 AM',
      isAcknowledged: false
    }
  ],

  bookingTypes: [
    { channel: 'Direct Website', percent: 38, count: 488, color: '#2563eb' },
    { channel: 'OTA', percent: 27, count: 347, color: '#0d9488' },
    { channel: 'Corporate', percent: 14, count: 180, color: '#6366f1' },
    { channel: 'Walk-in', percent: 12, count: 154, color: '#f59e0b' },
    { channel: 'Travel Agent', percent: 6, count: 77, color: '#a855f7' },
    { channel: 'Other', percent: 3, count: 38, color: '#94a3b8' }
  ],

  bookingTrend7Days: [
    { day: 'Mon', count: 152 },
    { day: 'Tue', count: 145 },
    { day: 'Wed', count: 178 },
    { day: 'Thu', count: 169 },
    { day: 'Fri', count: 210 },
    { day: 'Sat', count: 248 },
    { day: 'Sun', count: 182 }
  ],

  occupancyTrend: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    thisWeek: [72, 75, 78, 80, 84, 91, 86],
    lastWeek: [68, 69, 71, 73, 76, 82, 78]
  },

  roomCategories: [
    {
      name: 'Standard',
      totalRooms: 110,
      occupied: 82,
      occupancyPercent: 74.5,
      averagePrice: 3200,
      revenueLakhs: 7.8,
      isTopSeller: false
    },
    {
      name: 'Deluxe',
      totalRooms: 160,
      occupied: 134,
      occupancyPercent: 83.8,
      averagePrice: 4800,
      revenueLakhs: 19.2,
      isTopSeller: true // Most revenue generating category
    },
    {
      name: 'Premium',
      totalRooms: 80,
      occupied: 61,
      occupancyPercent: 76.3,
      averagePrice: 6500,
      revenueLakhs: 11.8,
      isTopSeller: false
    },
    {
      name: 'Suite',
      totalRooms: 40,
      occupied: 32,
      occupancyPercent: 80.0,
      averagePrice: 10500,
      revenueLakhs: 10.1,
      isTopSeller: false
    },
    {
      name: 'Family',
      totalRooms: 30,
      occupied: 20,
      occupancyPercent: 66.7,
      averagePrice: 7200,
      revenueLakhs: 4.3,
      isTopSeller: false
    }
  ],

  restaurant: {
    pastWeekOrders: [
      { day: 'Monday', orders: 421 },
      { day: 'Tuesday', orders: 398 },
      { day: 'Wednesday', orders: 512 },
      { day: 'Thursday', orders: 487 },
      { day: 'Friday', orders: 601 },
      { day: 'Saturday', orders: 782 },
      { day: 'Sunday', orders: 641 }
    ],
    categories: ['South Indian', 'North Indian', 'Chinese', 'Continental', 'Beverages', 'Desserts'],
    topFoodItems: [
      { rank: 1, name: 'Chicken Biryani', count: 428, sharePct: 100 },
      { rank: 2, name: 'Masala Dosa', count: 371, sharePct: 86 },
      { rank: 3, name: 'Parotta', count: 318, sharePct: 74 },
      { rank: 4, name: 'Paneer Butter Masala', count: 286, sharePct: 66 },
      { rank: 5, name: 'Fresh Juice', count: 251, sharePct: 58 }
    ]
  },

  staff: {
    total: 186,
    ratio: '1:2.3',
    breakdown: [
      { department: 'Housekeeping', count: 62, percent: 33.3, color: '#2563eb' },
      { department: 'Kitchen', count: 38, percent: 20.4, color: '#f59e0b' },
      { department: 'Front Office', count: 29, percent: 15.6, color: '#0d9488' },
      { department: 'Restaurant', count: 31, percent: 16.7, color: '#8b5cf6' },
      { department: 'Management', count: 8, percent: 4.3, color: '#0f172a' },
      { department: 'Maintenance', count: 18, percent: 9.7, color: '#64748b' }
    ]
  },

  revenueBreakdown: {
    totalRevenueLakhs: 48.6,
    streams: [
      { stream: 'Rooms', percent: 64.2, amountLakhs: 31.2, color: '#0f172a' },
      { stream: 'Restaurant', percent: 19.3, amountLakhs: 9.4, color: '#f59e0b' },
      { stream: 'Events', percent: 8.4, amountLakhs: 4.1, color: '#0d9488' },
      { stream: 'Other Services', percent: 8.0, amountLakhs: 3.9, color: '#94a3b8' }
    ]
  },

  guestExperience: {
    overallRating: 4.4,
    categories: [
      { name: 'Cleanliness', score: 4.6, percent: 92 },
      { name: 'Room Quality', score: 4.5, percent: 90 },
      { name: 'Staff Courtesy', score: 4.5, percent: 90 },
      { name: 'Food', score: 4.3, percent: 86 },
      { name: 'Service', score: 4.2, percent: 84 }
    ],
    positiveFeedback: [
      'Clean rooms',
      'Friendly staff',
      'Good location',
      'Scenic mountain views'
    ],
    needsImprovement: [
      'Check-in waiting time',
      'Restaurant waiting time',
      'Parking availability'
    ]
  },

  occupancyForecast: {
    days: [
      { day: 'Today', occupancy: 78, status: 'Moderate' },
      { day: 'Tomorrow', occupancy: 81, status: 'Rising' },
      { day: 'Saturday', occupancy: 92, status: 'Near Capacity', isPeak: true },
      { day: 'Sunday', occupancy: 88, status: 'High Inflow' },
      { day: 'Monday', occupancy: 63, status: 'Check-out Dip' },
      { day: 'Tuesday', occupancy: 59, status: 'Mid-week Low' },
      { day: 'Wednesday', occupancy: 68, status: 'Recovery' }
    ],
    aiRecommendation: 'High weekend demand predicted. Consider increasing room/package availability and dynamic pricing.'
  }
};

module.exports = seedData;
