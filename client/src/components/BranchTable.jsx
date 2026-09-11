import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  RefreshCw, 
  Star, 
  Landmark, 
  Waves, 
  Sun, 
  MountainSnow, 
  Trees, 
  Anchor, 
  Compass, 
  Building 
} from 'lucide-react';

const branchIcons = {
  Madurai: Landmark,
  Rameswaram: Waves,
  Kumbakonam: Sun,
  Ooty: MountainSnow,
  Kodaikanal: Trees,
  Pondicherry: Anchor,
  Anaikatti: Compass,
  Other: Building
};

export default function BranchTable({ branches, selectedBranch, onSelectBranch, onRefresh }) {
  const [sortField, setSortField] = useState('revenueLakhs');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortedBranches = [...(branches || [])].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (typeof valA === 'string') {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortAsc ? valA - valB : valB - valA;
  });

  return (
    <div className="content-card" id="branches">
      <div className="card-header-bar">
        <div>
          <h3 className="card-title">Branch-wise Performance</h3>
          <p className="card-subtitle">Comprehensive operational metrics across all 8 Poppys properties</p>
        </div>
        <div className="table-actions">
          <span className="table-counter">Showing 8 of 8 Branches</span>
          <button 
            className="btn-refresh" 
            onClick={onRefresh}
            title="Reload Table Data"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="styled-table" id="branchTable">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Branch Property <ArrowUpDown size={11} className="sort-icon" />
              </th>
              <th onClick={() => handleSort('occupancyRate')}>
                Occupancy <ArrowUpDown size={11} className="sort-icon" />
              </th>
              <th onClick={() => handleSort('revenueLakhs')}>
                Revenue <ArrowUpDown size={11} className="sort-icon" />
              </th>
              <th onClick={() => handleSort('bookingsCount')}>
                Bookings <ArrowUpDown size={11} className="sort-icon" />
              </th>
              <th onClick={() => handleSort('foodOrdersCount')}>
                Food Orders <ArrowUpDown size={11} className="sort-icon" />
              </th>
              <th onClick={() => handleSort('rating')}>
                Rating <ArrowUpDown size={11} className="sort-icon" />
              </th>
              <th onClick={() => handleSort('growthPercent')}>
                Growth <ArrowUpDown size={11} className="sort-icon" />
              </th>
              <th>Operational Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedBranches.map((branch) => {
              const IconComponent = branchIcons[branch.key] || Building;
              const isSelected = selectedBranch === branch.key;

              let barClass = 'blue-bar';
              if (branch.occupancyRate >= 80) barClass = 'green-bar';
              else if (branch.occupancyRate < 60) barClass = 'orange-bar';
              else if (branch.growthPercent < 0) barClass = 'red-bar';

              let statusClass = 'status-moderate';
              if (branch.operationalStatus === 'Strong Performance') statusClass = 'status-strong';
              else if (branch.operationalStatus === 'Needs Attention') statusClass = 'status-attention';
              else if (branch.operationalStatus === 'Improving') statusClass = 'status-improving';

              return (
                <tr 
                  key={branch.key}
                  className={`branch-row ${isSelected ? 'active-branch-row' : ''}`}
                  onClick={() => onSelectBranch(branch.key)}
                >
                  <td>
                    <div className="branch-cell">
                      <div className="branch-avatar">
                        <IconComponent size={16} />
                      </div>
                      <div>
                        <strong>{branch.name}</strong>
                        <span className="cell-sub">{branch.subTitle}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress-cell">
                      <div className="bar-bg">
                        <div className={`bar-fill ${barClass}`} style={{ width: `${branch.occupancyRate}%` }}></div>
                      </div>
                      <span>{branch.occupancyRate}%</span>
                    </div>
                  </td>
                  <td><span className="cell-value">₹{branch.revenueLakhs}L</span></td>
                  <td>{branch.bookingsCount}</td>
                  <td>{branch.foodOrdersCount}</td>
                  <td>
                    <div className="rating-cell">
                      <Star size={13} className="star-icon" /> {branch.rating}
                    </div>
                  </td>
                  <td>
                    <span className={`growth-badge ${branch.growthIsPositive ? 'positive' : 'negative'}`}>
                      {branch.growthIsPositive ? `↑ ${branch.growthPercent}%` : `↓ ${branch.growthPercent}%`}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${statusClass}`}>
                      {branch.operationalStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-footer-hint">
        <span>💡 Click on any branch row to isolate property analytics or drill down into room/F&B specifics.</span>
      </div>
    </div>
  );
}
