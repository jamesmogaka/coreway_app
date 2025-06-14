import { NavLink } from "react-router-dom";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className = "" }: SidebarProps) {
  return (
    <div 
      className={`h-full bg-white shadow-md overflow-y-auto ${className}`}
      style={{ width: '16rem' }}
    >
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Admin Panel
        </h2>
      </div>
      <nav className="p-4 space-y-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 text-sm rounded-md ${
              isActive
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
          end
        >
          <svg
            className="mr-3 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 text-sm rounded-md ${
              isActive
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <svg
            className="mr-3 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0116 8H4a5 5 0 014.5 2.67A6.97 6.97 0 007 16c0 .34.024.673.07 1h5.86z" />
          </svg>
          Users
        </NavLink>

        <NavLink
          to="/admin/contacts"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 text-sm rounded-md ${
              isActive
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <svg
            className="mr-3 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Contact Submissions
        </NavLink>
      </nav>
    </div>
  );
}
