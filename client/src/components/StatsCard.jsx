
const StatsCard = ({ reports }) => {
  const safeReports = reports || [];

  const stats = [
    {
      label: "Total Reports",
      value: safeReports.length,
    },
    {
      label: "Pending Reports",
      value: safeReports.filter(r => r.status === "pending").length,
    },
    {
      label: "In Progress Reports",
      value: safeReports.filter(r => r.status === "in progress").length,
    },
    {
      label: "Resolved Reports",
      value: safeReports.filter(r => r.status === "resolved").length,
    },
  ]

  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 my-2'>
      {stats.map((stat) => (
        <div key={stat.label} className='border border-stone-200 rounded-2xl p-4 flex flex-col gap-1'>
          <p className='text-xs text-stone-400'>{stat.label}</p>
          <p className='text-3xl font-medium'>{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsCard
