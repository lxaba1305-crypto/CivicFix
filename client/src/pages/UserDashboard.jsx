import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ReportForm from "../components/ReportForm";
import ReportCard from "../components/ReportCard";
import BackButton from "../buttons/BackButton";

const UserDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  })

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("Reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setReports(data || []);
    setLoading(false);
  };

  const handleSubmit = (newReport) => {
    setReports((prev) => [newReport, ...prev]);
  };

  if (loading) {
    return (
      <div className="p-6 text-sm text-stone-500">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
      <BackButton />
      
      <div>
        <h2 className="text-xl font-medium text-stone-800">Welcome to your Dashboard</h2>
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