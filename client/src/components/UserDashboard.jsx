import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ReportForm from "../components/ReportForm";
import ReportCard from "../components/ReportCard";
import { useState } from "react";

const UserDashboard = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Pothole on Main Street",
      description: "There is a large pothole on Main Street near the intersection with 5th Avenue.",
      location: "Main Street and 5th Avenue",
      status: "In Progress",
    }
  ]);

  const handleSubmit = (newReport) => {
    setReports([...reports, newReport]);
  }

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <h2>Welcome to your Dashboard</h2>
          <ReportForm onSubmit={handleSubmit} />
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
}