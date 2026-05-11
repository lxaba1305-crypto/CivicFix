import { useState, useEffect } from "react";
import ReportForm from "../components/ReportForm";
import ReportCard from "../components/ReportCard";
import BackButton from "../buttons/BackButton";

const UserDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:5000/reports');
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        setReports(data);
      } else {
        console.error('Invalid reports data:', data);
        setReports([]);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (newReport) => {
    setReports((prev) => [newReport, ...prev]);
  };

  if (loading) {
    return (
      <div className="p-6 text-sm text-green-700 animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <BackButton />
      
      <div>
        <h2 className="text-3xl font-medium text-green-900 mb-2">Welcome to your Dashboard</h2>
        <p className="text-sm text-green-700 mb-6">Help Improve your community by reporting local issues quickly and easily.</p>
        <ReportForm onSubmit={handleSubmit} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} role="user" />
      ))}
      </div>
    </div>
  );
}

export default UserDashboard;