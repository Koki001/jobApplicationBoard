const Dashboard = () => {
  return (
    <div className="dashboardContent">
      <h2>Dashboard</h2>
      <ul className="dashboardStats">
        <li>Visitors</li>
        <li>Shortlisted</li>
        <li>Views</li>
        <li>Applied Jobs</li>
      </ul>
      <div className="dashboardSummary">
        <div className="summaryChart">chart</div>
        <div className="recentlyApplied">recent applications</div>
      </div>
    </div>
  );
}

export default Dashboard