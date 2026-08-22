


export default function Dashboard() {



  const stats = [
    {
      title: "Total Donations",
      value: "NPR 2,45,000",
    },
    {
      title: "Active Projects",
      value: "8",
    },
    {
      title: "Volunteers",
      value: "56",
    },
    {
      title: "Website Visitors",
      value: "12,430",
    },
  ];

  const activities = [
    "Homepage updated",
    "New donation received",
    "Gallery image uploaded",
    "Volunteer added",
  ];

  return (
    <div className="flex min-h-screen w-full ml-62">

      {/* Sidebar */}

     

      {/* Main */}

      <main className="flex flex-1 flex-col">

        {/* Navbar */}

        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5">

          <div>
            <h2 className="text-2xl font-semibold">
              Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Welcome back, Admin
            </p>
          </div>

          <div className="flex items-center gap-4">

            <input
              placeholder="Search..."
              className="rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-sky-400"
            />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white">
              A
            </div>

          </div>

        </header>

        {/* Content */}

        <div className="flex flex-col gap-6 p-8">

          {/* Stats */}

          <div className="flex flex-wrap gap-6">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="flex min-w-[220px] flex-1 flex-col rounded-2xl border border-gray-200 bg-white p-6"
              >
                <span className="text-sm text-gray-500">
                  {stat.title}
                </span>

                <h3 className="mt-2 text-3xl font-semibold">
                  {stat.value}
                </h3>
              </div>
            ))}

          </div>

          {/* Bottom */}

          <div className="flex gap-6">

            {/* Recent Donations */}

            <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6">

              <h3 className="mb-6 text-lg font-semibold">
                Recent Donations
              </h3>

              <table className="w-full">

                <thead>

                  <tr className="border-b border-gray-200 text-left text-gray-500">

                    <th className="pb-3">Donor</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Date</th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-b border-gray-100">

                    <td className="py-4">John Doe</td>
                    <td>NPR 5,000</td>
                    <td>31 Jul</td>

                  </tr>

                  <tr className="border-b border-gray-100">

                    <td className="py-4">Sarah Smith</td>
                    <td>NPR 10,000</td>
                    <td>30 Jul</td>

                  </tr>

                  <tr>

                    <td className="py-4">Michael</td>
                    <td>NPR 2,500</td>
                    <td>29 Jul</td>

                  </tr>

                </tbody>

              </table>

            </div>

            {/* Right */}

            <div className="flex w-80 flex-col gap-6">

              {/* Quick Actions */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6">

                <h3 className="mb-5 text-lg font-semibold">
                  Quick Actions
                </h3>

                <div className="flex flex-col gap-3">

                  <button className="rounded-xl bg-sky-500 py-3 text-white">
                    Add Project
                  </button>

                  <button className="rounded-xl border border-gray-200 py-3">
                    Upload Gallery
                  </button>

                  <button className="rounded-xl border border-gray-200 py-3">
                    Edit Homepage
                  </button>

                </div>

              </div>

              {/* Activity */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6">

                <h3 className="mb-5 text-lg font-semibold">
                  Recent Activity
                </h3>

                <div className="flex flex-col gap-4">

                  {activities.map((activity) => (
                    <div
                      key={activity}
                      className="border-b border-gray-100 pb-3 last:border-0"
                    >
                      <p>{activity}</p>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}