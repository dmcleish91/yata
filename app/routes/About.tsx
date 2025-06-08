export default function About() {
  return (
    <div className='min-h-screen bg-base-200 flex flex-col items-center justify-center p-8'>
      <div className='hero bg-base-100 shadow-xl rounded-lg p-8 max-w-5xl'>
        <div className='hero-content flex flex-col lg:flex-row gap-8'>
          {/* Left Section */}
          <div className='flex-1'>
            <h1 className='text-4xl font-bold mb-4'>To do or not to do?</h1>
            <p className='text-lg text-gray-600'>
              Manage your tasks effortlessly with our feature-packed Todo App. Built with
              modern technologies, it’s designed to enhance your productivity and
              collaboration.
            </p>
          </div>

          {/* Right Section */}
          <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='card bg-base-300 shadow-md p-4'>
              <h2 className='text-xl font-semibold'>🚀 Features</h2>
              <ul className='list-disc list-inside text-gray-600 text-sm'>
                <li>Tag and categorize tasks</li>
                <li>Set priorities and due dates</li>
                <li>Recurring tasks</li>
              </ul>
            </div>
            <div className='card bg-base-300 shadow-md p-4'>
              <h2 className='text-xl font-semibold'>📊 Insights</h2>
              <ul className='list-disc list-inside text-gray-600 text-sm'>
                <li>Track task completion</li>
                <li>View weekly/monthly reports</li>
                <li>Analyze productivity trends</li>
              </ul>
            </div>
            <div className='card bg-base-300 shadow-md p-4'>
              <h2 className='text-xl font-semibold'>🌐 Collaboration</h2>
              <ul className='list-disc list-inside text-gray-600 text-sm'>
                <li>Share tasks with others</li>
                <li>Real-time updates</li>
                <li>Comment on tasks</li>
              </ul>
            </div>
            <div className='card bg-base-300 shadow-md p-4'>
              <h2 className='text-xl font-semibold'>📱 Mobile-Friendly</h2>
              <ul className='list-disc list-inside text-gray-600 text-sm'>
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
