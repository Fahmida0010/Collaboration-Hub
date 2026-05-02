
export default function DashboardLayout({ children }) {
  return (
    <div className="flex">


      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        
        {children}
      </div>

    </div>
  );
}