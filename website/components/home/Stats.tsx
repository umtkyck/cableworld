export default function Stats() {
  const stats = [
    { value: '10,000+', label: 'Happy customers' },
    { value: '1M+', label: 'Harnesses manufactured' },
    { value: '95%', label: 'On-time delivery' },
    { value: '150+', label: 'Countries served' },
  ]

  return (
    <section className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200 dark:divide-slate-800">
          {stats.map((stat, index) => (
            <div key={index} className="py-12 px-4 text-center">
              <div className="text-3xl lg:text-4xl font-semibold text-slate-900 dark:text-white mb-1 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
