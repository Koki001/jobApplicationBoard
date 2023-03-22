import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboardContent">
      <h2>Dashboard</h2>
      <ul className="dashboardStats">
        <li className="visitors">
          <div className="statsText">
            <p>1.7k+</p>
            <span>Total Visitors</span>
          </div>
          <div className="statsLogo">
            <img src="../assets/dashboard/visitors.png" alt="" />
          </div>
        </li>
        <li className="shortlisted">
          <div className="statsText">
            <p>03</p>
            <span>Shortlisted</span>
          </div>
          <div className="statsLogo">
            <img src="../assets/dashboard/shortlisted.png" alt="" />
          </div>
        </li>
        <li className="views">
          <div className="statsText">
            <p>2.1k</p>
            <span>Views</span>
          </div>
          <div className="statsLogo">
            <img src="../assets/dashboard/views.png" alt="" />
          </div>
        </li>
        <li className="applied">
          <div className="statsText">
            <p>07</p>
            <span>Job Applications</span>
          </div>
          <div className="statsLogo">
            <img src="../assets/dashboard/applied.png" alt="" />
          </div>
        </li>
      </ul>
      <div className="dashboardSummary">
        <div className="summaryChart">chart</div>
        <div className="recentlyApplied">recent applications</div>
      </div>
    </div>
  );
};

export default Dashboard;
