import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, LayoutDashboard, Calendar, DollarSign, Users } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const links = [
    { to: "/app", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/app/agenda", label: "Agenda", icon: <Calendar size={20} /> },
    { to: "/app/financeiro", label: "Financeiro", icon: <DollarSign size={20} /> },
    { to: "/app/clientes", label: "Clientes", icon: <Users size={20} /> },
  ];

  return (
    <div
      className={`${
        open ? "w-56" : "w-16"
      } bg-gray-900 text-white flex flex-col transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-lg font-semibold ${!open && "hidden"}`}>BarberPro</h1>
        <button onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>

      <nav className="flex flex-col gap-2 mt-6">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors ${
              location.pathname === link.to ? "bg-gray-800" : ""
            }`}
          >
            {link.icon}
            <span className={`${!open && "hidden"} text-sm font-medium`}>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
