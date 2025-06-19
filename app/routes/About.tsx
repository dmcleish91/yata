export default function About() {
  return (
    <div className="bg-base-200 flex min-h-screen flex-col items-center justify-center p-8">
      <div className="hero bg-base-100 max-w-5xl rounded-lg p-8 shadow-xl">
        <div className="hero-content flex flex-col gap-8 lg:flex-row">
          {/* Left Section */}
          <div className="flex-1">
            <h1 className="mb-4 text-4xl font-bold">To do or not to do?</h1>
            <p className="text-lg text-gray-600">
              Manage your tasks effortlessly with our feature-packed Todo App.
              Built with modern technologies, it’s designed to enhance your
              productivity and collaboration.
            </p>
          </div>

          {/* Right Section */}
          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
            <div className="card bg-base-300 p-4 shadow-md">
              <h2 className="text-xl font-semibold">🚀 Features</h2>
              <ul className="list-inside list-disc text-sm text-gray-600">
                <li>Tag and categorize tasks</li>
                <li>Set priorities and due dates</li>
                <li>Recurring tasks</li>
              </ul>
            </div>
            <div className="card bg-base-300 p-4 shadow-md">
              <h2 className="text-xl font-semibold">📊 Insights</h2>
              <ul className="list-inside list-disc text-sm text-gray-600">
                <li>Track task completion</li>
                <li>View weekly/monthly reports</li>
                <li>Analyze productivity trends</li>
              </ul>
            </div>
            <div className="card bg-base-300 p-4 shadow-md">
              <h2 className="text-xl font-semibold">🌐 Collaboration</h2>
              <ul className="list-inside list-disc text-sm text-gray-600">
                <li>Share tasks with others</li>
                <li>Real-time updates</li>
                <li>Comment on tasks</li>
              </ul>
            </div>
            <div className="card bg-base-300 p-4 shadow-md">
              <h2 className="text-xl font-semibold">📱 Mobile-Friendly</h2>
              <ul className="list-inside list-disc text-sm text-gray-600">
                <li>Responsive design</li>
                <li>Offline support</li>
                <li>Installable as a PWA</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
