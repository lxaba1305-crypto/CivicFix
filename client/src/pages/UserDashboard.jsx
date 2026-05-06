import ReportForm from "../components/ReportForm";
import ReportCard from "../components/ReportCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const UserDashboard = () => {
  const navigate = useNavigate();

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
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
      <div onClick={() => navigate(-1)} className="flex items-center gap-3 cursor-pointer text-sm text-stone-600 hover:text-green-600 transition">
        <FaArrowLeft/>back
      </div>
      <h2 className="text-xl font-medium text-stone-800">Welcome to your Dashboard</h2>
      <ReportForm onSubmit={handleSubmit} />
      <div className="grid grid-cols-3 gap-4">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} role="user" />
      ))}
      </div>
    </div>
  );
}

export default UserDashboard;