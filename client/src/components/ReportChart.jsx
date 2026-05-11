import { useEffect, useState } from 'react';
import { Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, Cell, Legend } from 'recharts';

function ReportChart() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  // FETCH FROM BACKEND API
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
    }
  };

  // REPORTS PER DAY (LINE CHART)
  const reportsPerDay = Object.values(
    reports.reduce((acc, report) => {

      const date = new Date(report.created_at)
        .toISOString()
        .split('T')[0];

      if (!acc[date]) {
        acc[date] = { 
          date, 
          count: 0,
        };
      }
      acc[date].count++;
      return acc;
    }, {})
  );

  // STATUS COUNTS (FOR PIE CHART)
  const statusCounts = [
    {
      name: "Pending",
      value: reports.filter(r => r.status === "pending").length,
    },
    {
      name: "In Progress",
      value: reports.filter(r => r.status === "in progress").length,
    },
    {
      name: "Resolved",
      value: reports.filter(r => r.status === "resolved").length,
    },
  ]

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"]; // yellow, blue, green

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      
        {/* LINE CHART */}
        <div className='bg-white border border-stone-200 p-5 rounded-xl'>
          <h1 className='text-sm font-semibold text-stone-800 mb-4'>Reports this week</h1>

          <ResponsiveContainer width={"100%"} height={220}>
            <LineChart data={reportsPerDay}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#a8a29e' }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '0.5px solid #e7e5e4' }} 
               />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={{ r: 3, fill: '#3b82f6' }} 
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* pie chart */}
        <div className='bg-white border border-stone-200 rounded-xl p-5'>
          <h1 className='text-sm font-semibold text-stone-800 mb-4'>Status overview</h1>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusCounts}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={3}
                >
                  {statusCounts.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '0.5px solid #e7e5e4' }}
                />
                <Legend
                  iconType='circle'
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, color: '#78716c'}}
                />
            </PieChart>
          </ResponsiveContainer>
        </div>
      
    </div>
  )
}

export default ReportChart