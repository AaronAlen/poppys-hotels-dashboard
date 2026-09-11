/**
 * POPPYS HOTELS - HOTEL MANAGEMENT & AI ANALYTICS DASHBOARD
 * Core Interactive Logic, Analytics Visualizations & AI Engine
 */

// Global state
let currentBranchFilter = 'all';
let currentSortCol = null;
let isAscending = true;

// Chart Instances
let charts = {};

// Mock Data Store for Branches
const branchData = {
  all: {
    name: 'All Branches (8 Properties)',
    branchesCount: 8,
    rooms: 420,
    occupancy: '78.4%',
    revenue: '₹48.6L',
    bookings: '1,284',
    foodOrders: '3,842',
    staff: 186,
    rating: '4.4',
    occupancyGrowth: '↑ 8.2%',
    revenueGrowth: '↑ 13.5%',
    bookingsGrowth: '↑ 16.5%',
    foodGrowth: '↑ 19.7%',
    ratingGrowth: '↑ 4.8%',
    staffGrowth: '↑ 2.2%'
  },
  Madurai: {
    name: 'Madurai (Central Hub)',
    branchesCount: 1,
    rooms: 95,
    occupancy: '84.2%',
    revenue: '₹11.2L',
    bookings: '298',
    foodOrders: '940',
    staff: 44,
    rating: '4.6',
    occupancyGrowth: '↑ 10.4%',
    revenueGrowth: '↑ 16.8%',
    bookingsGrowth: '↑ 18.2%',
    foodGrowth: '↑ 21.0%',
    ratingGrowth: '↑ 5.2%',
    staffGrowth: '↑ 3.1%',
    status: 'Strong Performance',
    notes: 'Leading group revenue with high banquet bookings and temple pilgrimage guests.'
  },
  Rameswaram: {
    name: 'Rameswaram Beach Resort',
    branchesCount: 1,
    rooms: 65,
    occupancy: '79.5%',
    revenue: '₹8.4L',
    bookings: '215',
    foodOrders: '620',
    staff: 30,
    rating: '4.5',
    occupancyGrowth: '↑ 8.8%',
    revenueGrowth: '↑ 12.1%',
    bookingsGrowth: '↑ 14.5%',
    foodGrowth: '↑ 15.4%',
    ratingGrowth: '↑ 4.1%',
    staffGrowth: '↑ 1.8%',
    status: 'Strong Performance',
    notes: 'Beachfront villas showing 95% weekend booking pace with high pilgrimage family arrivals.'
  },
  Kumbakonam: {
    name: 'Kumbakonam Heritage',
    branchesCount: 1,
    rooms: 50,
    occupancy: '74.1%',
    revenue: '₹5.8L',
    bookings: '162',
    foodOrders: '485',
    staff: 22,
    rating: '4.3',
    occupancyGrowth: '↑ 6.2%',
    revenueGrowth: '↑ 9.4%',
    bookingsGrowth: '↑ 11.0%',
    foodGrowth: '↑ 12.8%',
    ratingGrowth: '↑ 3.5%',
    staffGrowth: '↑ 0.0%',
    status: 'Moderate',
    notes: 'Heritage cultural tours maintaining steady bookings; opportunity to bundle temple pooja packages.'
  },
  Ooty: {
    name: 'Ooty Mountain Retreat',
    branchesCount: 1,
    rooms: 55,
    occupancy: '71.2%',
    revenue: '₹7.1L',
    bookings: '194',
    foodOrders: '530',
    staff: 26,
    rating: '4.2',
    occupancyGrowth: '↓ -3.5%',
    revenueGrowth: '↑ 4.2%',
    bookingsGrowth: '↓ -2.1%',
    foodGrowth: '↑ 8.5%',
    ratingGrowth: '↑ 1.2%',
    staffGrowth: '↑ 1.5%',
    status: 'Needs Attention',
    notes: 'High OTA cancellations (+18%) over weekends. Need stricter deposit terms and direct perks.'
  },
  Kodaikanal: {
    name: 'Kodaikanal Hill Resort',
    branchesCount: 1,
    rooms: 48,
    occupancy: '58.4%',
    revenue: '₹4.9L',
    bookings: '138',
    foodOrders: '410',
    staff: 20,
    rating: '4.1',
    occupancyGrowth: '↓ -6.2%',
    revenueGrowth: '↓ -4.8%',
    bookingsGrowth: '↓ -5.5%',
    foodGrowth: '↑ 3.2%',
    ratingGrowth: '↑ 0.8%',
    staffGrowth: '↑ 0.0%',
    status: 'Needs Attention',
    notes: 'Weekday occupancy dipped to 54%. Requires mid-week corporate/wellness discount drive.'
  },
  Pondicherry: {
    name: 'Pondicherry Coastal',
    branchesCount: 1,
    rooms: 52,
    occupancy: '82.6%',
    revenue: '₹6.7L',
    bookings: '175',
    foodOrders: '512',
    staff: 24,
    rating: '4.7',
    occupancyGrowth: '↑ 11.2%',
    revenueGrowth: '↑ 14.3%',
    bookingsGrowth: '↑ 15.6%',
    foodGrowth: '↑ 18.2%',
    ratingGrowth: '↑ 6.4%',
    staffGrowth: '↑ 2.5%',
    status: 'Strong Performance',
    notes: 'Highest guest satisfaction rating (4.7) driven by French-colonial dining & coastal promenade.'
  },
  Anaikatti: {
    name: 'Anaikatti Jungle Lodge',
    branchesCount: 1,
    rooms: 35,
    occupancy: '69.8%',
    revenue: '₹3.1L',
    bookings: '82',
    foodOrders: '260',
    staff: 14,
    rating: '4.4',
    occupancyGrowth: '↑ 4.5%',
    revenueGrowth: '↑ 5.6%',
    bookingsGrowth: '↑ 7.2%',
    foodGrowth: '↑ 10.1%',
    ratingGrowth: '↑ 3.2%',
    staffGrowth: '↑ 1.0%',
    status: 'Improving',
    notes: 'Eco-resort safari packages showing positive traction with weekend eco-tourists.'
  },
  Other: {
    name: 'Other Managed Units',
    branchesCount: 1,
    rooms: 20,
    occupancy: '64.0%',
    revenue: '₹1.4L',
    bookings: '20',
    foodOrders: '85',
    staff: 6,
    rating: '4.2',
    occupancyGrowth: '↑ 2.0%',
    revenueGrowth: '↑ 3.0%',
    bookingsGrowth: '↑ 3.5%',
    foodGrowth: '↑ 4.0%',
    ratingGrowth: '↑ 1.5%',
    staffGrowth: '↑ 0.0%',
    status: 'Stable',
    notes: 'Transit units maintaining consistent baseline corporate occupancy.'
  }
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  initEventListeners();
  initBranchFilterDropdown();
  initHeaderSelects();
  selectBranchFromMap('Madurai');
});

/**
 * Initialize all Chart.js charts
 */
function initCharts() {
  // Chart Global Defaults
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
  Chart.defaults.color = '#64748b';
  Chart.defaults.plugins.tooltip.backgroundColor = '#0f172a';
  Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
  Chart.defaults.plugins.tooltip.bodyColor = '#e2e8f0';
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;

  // 1. Branch Revenue Comparison (Bar Chart)
  const ctxRevenue = document.getElementById('branchRevenueChart');
  if (ctxRevenue) {
    charts.revenue = new Chart(ctxRevenue, {
      type: 'bar',
      data: {
        labels: ['Madurai', 'Rameswaram', 'Ooty', 'Pondicherry', 'Kumbakonam', 'Kodaikanal', 'Anaikatti', 'Other'],
        datasets: [{
          label: 'Revenue (₹ Lakhs)',
          data: [11.2, 8.4, 7.1, 6.7, 5.8, 4.9, 3.1, 1.4],
          backgroundColor: [
            '#2563eb', // Madurai (Blue)
            '#0d9488', // Rameswaram (Teal)
            '#ef4444', // Ooty (Red alert)
            '#10b981', // Pondi (Green)
            '#3b82f6', // Kumbakonam
            '#f59e0b', // Kodai (Amber)
            '#6366f1', // Anaikatti
            '#94a3b8'  // Other
          ],
          borderRadius: 6,
          borderSkipped: false,
          barThickness: 24
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` Revenue: ₹${context.raw} Lakhs`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11, weight: 600 } }
          },
          y: {
            beginAtZero: true,
            grid: { color: '#f1f5f9' },
            ticks: {
              callback: (val) => `₹${val}L`,
              font: { size: 11 }
            }
          }
        }
      }
    });
  }

  // 2. Occupancy Rate Trend (7-Day Line Chart: This Week vs Last Week)
  const ctxOcc = document.getElementById('occupancyTrendChart');
  if (ctxOcc) {
    charts.occupancy = new Chart(ctxOcc, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'This Week',
            data: [72, 75, 78, 80, 84, 91, 86],
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            fill: true,
            tension: 0.38,
            borderWidth: 3,
            pointBackgroundColor: '#2563eb',
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Last Week',
            data: [68, 69, 71, 73, 76, 82, 78],
            borderColor: '#94a3b8',
            borderDash: [5, 5],
            fill: false,
            tension: 0.38,
            borderWidth: 2,
            pointBackgroundColor: '#94a3b8',
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.dataset.label}: ${context.raw}% Occupancy`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11, weight: 600 } }
          },
          y: {
            min: 50,
            max: 100,
            grid: { color: '#f1f5f9' },
            ticks: {
              callback: (val) => `${val}%`,
              font: { size: 11 }
            }
          }
        }
      }
    });
  }

  // 3. Booking Type Analysis (Donut Chart)
  const ctxBooking = document.getElementById('bookingTypeChart');
  if (ctxBooking) {
    charts.bookingType = new Chart(ctxBooking, {
      type: 'doughnut',
      data: {
        labels: ['Direct Website', 'OTA', 'Corporate', 'Walk-in', 'Travel Agent', 'Other'],
        datasets: [{
          data: [38, 27, 14, 12, 6, 3],
          backgroundColor: ['#2563eb', '#0d9488', '#6366f1', '#f59e0b', '#a855f7', '#94a3b8'],
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
              label: (context) => ` ${context.label}: ${context.raw}%`
            }
          }
        }
      }
    });
  }

  // 4. 7-Day Booking Pace Sparkline Mini Bar
  const ctxPace = document.getElementById('bookingPaceChart');
  if (ctxPace) {
    charts.pace = new Chart(ctxPace, {
      type: 'bar',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          data: [152, 145, 178, 169, 210, 248, 182],
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
  }

  // 5. Revenue Breakdown Donut Chart
  const ctxRevBreak = document.getElementById('revenueBreakdownChart');
  if (ctxRevBreak) {
    charts.revenueBreak = new Chart(ctxRevBreak, {
      type: 'doughnut',
      data: {
        labels: ['Rooms', 'Restaurant & F&B', 'Events & Banquets', 'Other Services'],
        datasets: [{
          data: [64.2, 19.3, 8.4, 8.0],
          backgroundColor: ['#0f172a', '#f59e0b', '#0d9488', '#94a3b8'],
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
              label: (context) => ` ${context.label}: ${context.raw}%`
            }
          }
        }
      }
    });
  }

  // 6. Food & Restaurant Past Week Orders Bar Chart
  const ctxRest = document.getElementById('restaurantOrdersChart');
  if (ctxRest) {
    charts.restaurant = new Chart(ctxRest, {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          label: 'F&B Orders',
          data: [421, 398, 512, 487, 601, 782, 641],
          backgroundColor: [
            '#0d9488', '#0d9488', '#0d9488', '#0d9488', '#0d9488',
            '#ea580c', // Saturday peak orange
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
              label: (context) => ` Orders: ${context.raw}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 10, weight: 600 } }
          },
          y: {
            beginAtZero: true,
            grid: { color: '#f1f5f9' },
            ticks: { font: { size: 10 } }
          }
        }
      }
    });
  }

  // 7. Staff Breakdown Donut Chart
  const ctxStaff = document.getElementById('staffBreakdownChart');
  if (ctxStaff) {
    charts.staff = new Chart(ctxStaff, {
      type: 'doughnut',
      data: {
        labels: ['Housekeeping', 'Kitchen', 'Front Office', 'Restaurant', 'Maintenance', 'Management'],
        datasets: [{
          data: [62, 38, 29, 31, 18, 8],
          backgroundColor: ['#2563eb', '#f59e0b', '#0d9488', '#8b5cf6', '#64748b', '#0f172a'],
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverOffset: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.label}: ${context.raw} Staff`
            }
          }
        }
      }
    });
  }
}

/**
 * Setup Event Listeners
 */
function initEventListeners() {
  // Navigation scrolling & active state
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Table refresh button
  const refreshBtn = document.getElementById('refreshTableBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.style.transform = 'rotate(360deg)';
      setTimeout(() => { refreshBtn.style.transform = 'none'; }, 600);
      showToast('Branch operational table synchronized with central PMS.');
    });
  }

  // Notification button drawer toggle
  const notifBtn = document.getElementById('notifButton');
  if (notifBtn) {
    notifBtn.addEventListener('click', toggleNotifications);
  }

  // Manager Profile quick click
  const profile = document.getElementById('managerProfile');
  if (profile) {
    profile.addEventListener('click', () => {
      showToast('Logged in as Rajesh Kumar (VP Group Operations). Session active.');
    });
  }
}

/**
 * Handle Header Dropdowns & Synchronous State
 */
function initHeaderSelects() {
  const branchSelect = document.getElementById('branchSelect');
  if (branchSelect) {
    branchSelect.addEventListener('change', (e) => {
      applyBranchFilter(e.target.value);
    });
  }

  const dateSelect = document.getElementById('dateRangeSelect');
  if (dateSelect) {
    dateSelect.addEventListener('change', (e) => {
      showToast(`Date range adjusted to "${e.target.options[e.target.selectedIndex].text}". Live metrics updated.`);
    });
  }

  const catSelect = document.getElementById('categorySelect');
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      showToast(`Filtered category: ${e.target.value.toUpperCase()}.`);
    });
  }

  const bookingSelect = document.getElementById('bookingTypeSelect');
  if (bookingSelect) {
    bookingSelect.addEventListener('change', (e) => {
      showToast(`Channel filter applied: ${e.target.value.toUpperCase()}.`);
    });
  }

  const roomSelect = document.getElementById('roomStatusSelect');
  if (roomSelect) {
    roomSelect.addEventListener('change', (e) => {
      showToast(`Room inventory view: ${e.target.value.toUpperCase()}.`);
    });
  }
}

function initBranchFilterDropdown() {
  // placeholder if extra initialization needed
}

/**
 * Dynamic Branch Filtering: Updates KPIs and visual states
 */
function applyBranchFilter(branchKey) {
  currentBranchFilter = branchKey;
  const data = branchData[branchKey] || branchData.all;

  // Update KPI Numbers
  document.getElementById('kpi-branches').textContent = data.branchesCount;
  document.getElementById('kpi-rooms').textContent = data.rooms;
  document.getElementById('kpi-occupancy').textContent = data.occupancy;
  document.getElementById('kpi-revenue').textContent = data.revenue;
  document.getElementById('kpi-bookings').textContent = data.bookings;
  document.getElementById('kpi-food').textContent = data.foodOrders;
  document.getElementById('kpi-staff').textContent = data.staff;
  document.getElementById('kpi-rating').innerHTML = `${data.rating} <span class="max-denom">/ 5</span>`;

  // Update Branch Dropdown
  const branchSelect = document.getElementById('branchSelect');
  if (branchSelect && branchSelect.value !== branchKey) {
    branchSelect.value = branchKey;
  }

  // Highlight Table Row
  document.querySelectorAll('#branchTable tbody tr').forEach(row => {
    if (row.getAttribute('data-branch') === branchKey) {
      row.classList.add('active-branch-row');
    } else {
      row.classList.remove('active-branch-row');
    }
  });

  if (branchKey === 'all') {
    showToast('Viewing aggregated performance for All 8 Poppys Properties.');
  } else {
    showToast(`Focused on ${data.name} (${data.occupancy} Occupancy, ${data.revenue} Revenue).`);
    // Also update map selection card
    selectBranchFromMap(branchKey);
  }
}

/**
 * Branch Row selection from table
 */
function selectBranchFromTable(branchName) {
  applyBranchFilter(branchName);
  // Scroll softly to map or highlight details
  const mapSection = document.getElementById('tamilNaduMapContainer');
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * Interactive SVG Map: Selecting Branch Pin
 */
function selectBranchFromMap(branchName) {
  const data = branchData[branchName];
  if (!data) return;

  const titleEl = document.getElementById('selectedBranchTitle');
  const badgeEl = document.getElementById('selectedBranchBadge');
  const occEl = document.getElementById('selectedBranchOcc');
  const revEl = document.getElementById('selectedBranchRev');
  const bksEl = document.getElementById('selectedBranchBks');
  const rateEl = document.getElementById('selectedBranchRate');
  const notesEl = document.getElementById('selectedBranchNotes');

  if (titleEl) titleEl.textContent = data.name;
  if (occEl) occEl.textContent = data.occupancy;
  if (revEl) revEl.textContent = data.revenue;
  if (bksEl) bksEl.textContent = data.bookings;
  if (rateEl) rateEl.textContent = `${data.rating} ⭐`;
  if (notesEl) notesEl.innerHTML = `<i data-lucide="sparkles"></i><span>"${data.notes}"</span>`;

  if (badgeEl) {
    badgeEl.textContent = data.status;
    badgeEl.className = 'status-pill';
    if (data.status === 'Strong Performance') {
      badgeEl.classList.add('status-strong');
    } else if (data.status === 'Needs Attention') {
      badgeEl.classList.add('status-attention');
    } else {
      badgeEl.classList.add('status-moderate');
    }
  }

  // Highlight SVG Pin
  document.querySelectorAll('.map-pin-group').forEach(pin => {
    if (pin.getAttribute('data-pin') === branchName) {
      pin.style.transform = 'scale(1.25)';
      pin.style.filter = 'drop-shadow(0 0 8px rgba(0,0,0,0.3))';
    } else {
      pin.style.transform = '';
      pin.style.filter = '';
    }
  });

  lucide.createIcons();
}

/**
 * Map button action: Filter dashboard by selected branch
 */
function filterDashboardBySelectedBranch() {
  const titleEl = document.getElementById('selectedBranchTitle');
  if (!titleEl) return;
  const currentName = titleEl.textContent;
  
  // Find key from name
  for (let key in branchData) {
    if (branchData[key].name === currentName || key === currentName) {
      applyBranchFilter(key);
      break;
    }
  }
}

/**
 * Table Sorting Algorithm
 */
function sortTable(columnIndex) {
  const table = document.getElementById('branchTable');
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  isAscending = currentSortCol === columnIndex ? !isAscending : true;
  currentSortCol = columnIndex;

  rows.sort((rowA, rowB) => {
    const cellA = rowA.children[columnIndex].innerText.trim();
    const cellB = rowB.children[columnIndex].innerText.trim();

    // Clean numeric values (remove %, ₹, L, arrows)
    const cleanNum = (str) => {
      return parseFloat(str.replace(/[^0-9.-]/g, '')) || 0;
    };

    const numA = cleanNum(cellA);
    const numB = cleanNum(cellB);

    if (!isNaN(numA) && !isNaN(numB) && columnIndex > 0) {
      return isAscending ? numA - numB : numB - numA;
    } else {
      return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    }
  });

  // Re-append sorted rows
  rows.forEach(row => tbody.appendChild(row));
  showToast(`Table sorted by column ${columnIndex + 1} (${isAscending ? 'Ascending' : 'Descending'}).`);
}

/**
 * AI HOTEL ANALYST CONVERSATION ENGINE
 */
const aiKnowledgeBase = {
  'best-branch': {
    title: 'Top Performing Branch This Week',
    content: `
      <p><strong>Madurai Central Hub</strong> performed best across key profitability metrics this week:</p>
      <ul>
        <li><strong>Revenue:</strong> ₹11.2 Lakhs (+16.8% WoW growth)</li>
        <li><strong>Occupancy:</strong> 84.2% (highest volume in the group)</li>
        <li><strong>F&B Orders:</strong> 940 orders (driven by banquet weddings)</li>
        <li><strong>RevPAR:</strong> ₹1,820 (32% above chain average)</li>
      </ul>
      <div class="brief-recommendation">
        <span class="rec-label"><i data-lucide="award"></i> Key Driver:</span>
        <p>"Temple pilgrimage packages bundled with traditional South Indian thali dinners contributed 41% of incremental room nights."</p>
      </div>
    `
  },
  'needs-attention': {
    title: 'Branches Requiring Operational Intervention',
    content: `
      <p>Two branches are currently flagged with critical operational anomalies:</p>
      <ul>
        <li><strong>Ooty Mountain Retreat:</strong> 18% spike in OTA cancellations over the weekend. Revenue yield is dropping due to last-minute unreleased inventory.</li>
        <li><strong>Kodaikanal Hill Resort:</strong> Weekday occupancy fell to 54% (down 6.2% WoW) despite clear mountain weather.</li>
      </ul>
      <div class="brief-recommendation">
        <span class="rec-label"><i data-lucide="alert-triangle"></i> Action Plan:</span>
        <p>"1. Tighten Ooty cancellation policies to 72 hrs on Booking.com & MakeMyTrip. 2. Launch a 3-night weekday workation/wellness package for Kodaikanal."</p>
      </div>
    `
  },
  'revenue-last-week': {
    title: 'Revenue Comparison Brief',
    content: `
      <p>Poppys Hotels achieved <strong>₹48.6 Lakhs</strong> in total operational revenue this past week, surpassing the prior week's <strong>₹42.8 Lakhs</strong> (+13.5%):</p>
      <ul>
        <li><strong>Rooms:</strong> ₹31.2L (64.2% share, ADR ₹4,820)</li>
        <li><strong>Food & Restaurant:</strong> ₹9.4L (19.3% share, 3,842 orders)</li>
        <li><strong>Events & Banquets:</strong> ₹4.1L (8.4% share, 4 weddings)</li>
        <li><strong>Other Services:</strong> ₹3.9L (Spa, transit & airport transfers)</li>
      </ul>
      <div class="brief-recommendation">
        <span class="rec-label"><i data-lucide="trending-up"></i> Pace:</span>
        <p>"On track to hit ₹2.1 Crore monthly group target if weekend pricing surges are maintained."</p>
      </div>
    `
  },
  'profitable-category': {
    title: 'Most Profitable Room Category',
    content: `
      <p>The <strong>Deluxe Room Category</strong> is our clear profit locomotive:</p>
      <ul>
        <li><strong>Total Inventory:</strong> 160 Rooms across 8 branches</li>
        <li><strong>Occupancy:</strong> 83.8% (134 occupied)</li>
        <li><strong>Revenue Generated:</strong> ₹19.2 Lakhs (39.5% of chain revenue)</li>
        <li><strong>Average Daily Rate (ADR):</strong> ₹4,800</li>
      </ul>
      <div class="brief-recommendation">
        <span class="rec-label"><i data-lucide="check-circle-2"></i> Insight:</span>
        <p>"Deluxe rooms yield 2.4x more total margin than Standard rooms while maintaining 9% higher average occupancy."</p>
      </div>
    `
  },
  'top-food': {
    title: 'Top Food & Dining Items',
    content: `
      <p>The F&B division generated <strong>3,842 total orders</strong> this week. Top 5 culinary favorites:</p>
      <ul>
        <li><strong>1. Poppys Signature Chicken Biryani:</strong> 428 orders (₹1.88L rev)</li>
        <li><strong>2. Crispy Ghee Masala Dosa:</strong> 371 orders (Breakfast leader)</li>
        <li><strong>3. Madurai Bun Parotta & Salna:</strong> 318 orders (Dinner staple)</li>
        <li><strong>4. Paneer Butter Masala:</strong> 286 orders</li>
        <li><strong>5. Fresh Cold-Pressed Juices:</strong> 251 orders</li>
      </ul>
      <div class="brief-recommendation">
        <span class="rec-label"><i data-lucide="coffee"></i> Margin Note:</span>
        <p>"Signature Biryani carries a 74% gross margin. Recommend featuring it as a chef's special in Kodaikanal & Ooty room-dining menus."</p>
      </div>
    `
  },
  'next-week-recommendations': {
    title: 'Executive Recommendations for Next Week',
    content: `
      <p>Strategic 4-point roadmap formulated by Poppys Intelligence Engine:</p>
      <ul>
        <li><strong>1. Dynamic Weekend Pricing:</strong> Increase Saturday rates by 12% across Ooty & Pondicherry given forecasted 92% peak demand.</li>
        <li><strong>2. Mid-week Kodai Promo:</strong> Push 2-night corporate retreat bundles with complimentary lake boating to lift occupancy from 54% to 70%.</li>
        <li><strong>3. OTA Policy Reform:</strong> Mandate 48-hr non-refundable cutoff on OTA channels to eliminate Ooty's 18% cancellation leak.</li>
        <li><strong>4. Banquet Staffing:</strong> Pre-assign 6 additional culinary and housekeeping shifts at Madurai for Friday wedding turnovers.</li>
      </ul>
    `
  }
};

/**
 * Handle clicking a quick question chip
 */
function askAiQuestion(questionText) {
  const input = document.getElementById('aiQueryInput');
  if (input) input.value = questionText;
  processAiQuery(questionText);
}

/**
 * Handle submitting chat query form
 */
function handleAiSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('aiQueryInput');
  if (!input) return;
  const query = input.value.trim();
  if (!query) return;
  processAiQuery(query);
  input.value = '';
}

/**
 * Process AI query and append message
 */
function processAiQuery(query) {
  const chatStream = document.getElementById('aiChatStream');
  if (!chatStream) return;

  // Append User message
  const userMsg = document.createElement('div');
  userMsg.className = 'ai-message user-msg';
  userMsg.innerHTML = `
    <div class="msg-avatar"><i data-lucide="user"></i></div>
    <div class="msg-bubble"><p>${escapeHtml(query)}</p></div>
  `;
  chatStream.appendChild(userMsg);
  lucide.createIcons();

  // Scroll to bottom
  chatStream.scrollTop = chatStream.scrollHeight;

  // Bot typing placeholder
  const botLoading = document.createElement('div');
  botLoading.className = 'ai-message bot-msg typing-temp';
  botLoading.innerHTML = `
    <div class="msg-avatar"><i data-lucide="sparkles"></i></div>
    <div class="msg-bubble"><p><em>Analyzing operations across 8 branches...</em></p></div>
  `;
  chatStream.appendChild(botLoading);
  chatStream.scrollTop = chatStream.scrollHeight;

  // Simulate AI latency
  setTimeout(() => {
    botLoading.remove();
    generateAiResponse(query, chatStream);
  }, 650);
}

/**
 * Generate formatted AI response based on query
 */
function generateAiResponse(query, chatStream) {
  const lower = query.toLowerCase();
  let responseData = null;

  if (lower.includes('best') || lower.includes('top branch')) {
    responseData = aiKnowledgeBase['best-branch'];
  } else if (lower.includes('attention') || lower.includes('worst') || lower.includes('problem') || lower.includes('cancellation')) {
    responseData = aiKnowledgeBase['needs-attention'];
  } else if (lower.includes('revenue') || lower.includes('money') || lower.includes('earnings') || lower.includes('last week')) {
    responseData = aiKnowledgeBase['revenue-last-week'];
  } else if (lower.includes('category') || lower.includes('room') || lower.includes('profitable') || lower.includes('deluxe')) {
    responseData = aiKnowledgeBase['profitable-category'];
  } else if (lower.includes('food') || lower.includes('restaurant') || lower.includes('dish') || lower.includes('biryani')) {
    responseData = aiKnowledgeBase['top-food'];
  } else if (lower.includes('recommend') || lower.includes('next week') || lower.includes('strategy') || lower.includes('advice')) {
    responseData = aiKnowledgeBase['next-week-recommendations'];
  } else {
    // Contextual fallback response
    responseData = {
      title: `Analysis for "${query}"`,
      content: `
        <p>I cross-referenced current operations, reservations, and POS data for <strong>"${escapeHtml(query)}"</strong>:</p>
        <ul>
          <li><strong>Group Occupancy:</strong> 78.4% across 420 keys (329 currently occupied).</li>
          <li><strong>Revenue Trajectory:</strong> ₹48.6 Lakhs (+13.5% WoW) with high weekend RevPAR in Madurai and Pondicherry.</li>
          <li><strong>Staff Efficiency:</strong> Staff-to-guest ratio currently balanced at 1:2.3 across 186 employees.</li>
        </ul>
        <div class="brief-recommendation">
          <span class="rec-label"><i data-lucide="lightbulb"></i> Strategic Note:</span>
          <p>"Consider reviewing Ooty's 18% cancellation rate and boosting Kodaikanal weekday promo packages."</p>
        </div>
      `
    };
  }

  const botMsg = document.createElement('div');
  botMsg.className = 'ai-message bot-msg';
  botMsg.innerHTML = `
    <div class="msg-avatar"><i data-lucide="sparkles"></i></div>
    <div class="msg-bubble">
      <div class="ai-intro-head"><strong>${responseData.title}</strong></div>
      ${responseData.content}
    </div>
  `;
  chatStream.appendChild(botMsg);
  lucide.createIcons();
  chatStream.scrollTop = chatStream.scrollHeight;
}

/**
 * Alert Action Handlers
 */
function triggerAlertAction(actionType) {
  if (actionType === 'ooty') {
    showToast('Redirected to OTA Channel Manager: Stricter 48-hr cancellation rule applied for Ooty.');
    askAiQuestion('Which branch needs attention?');
  } else if (actionType === 'kodai') {
    showToast('Launched "Kodaikanal Mid-Week Rejuvenate" Promo (20% off F&B). Campaign live.');
  } else if (actionType === 'madurai') {
    showToast('Strategy Copied: "Temple Heritage Dining Package" rolled out to Kumbakonam & Rameswaram.');
  }
}

function dismissAlert(btnElement) {
  const card = btnElement.closest('.alert-card');
  if (card) {
    card.style.opacity = '0.5';
    btnElement.textContent = 'Acknowledged ✓';
    btnElement.disabled = true;
    showToast('Alert marked as acknowledged.');
  }
}

function applyYieldRules() {
  showToast('Dynamic Yield Management Rule applied: Weekend rates increased by +12% on Deluxe & Suite keys.');
}

/**
 * Notification Drawer
 */
function toggleNotifications() {
  const drawer = document.getElementById('notifDrawer');
  if (drawer) {
    drawer.classList.toggle('open');
  }
}

/**
 * Toast Notification Helper
 */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="info"></i><span>${message}</span>`;
  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

/**
 * Utility: HTML Escape
 */
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
