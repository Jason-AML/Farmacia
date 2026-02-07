import { Link, useLocation } from "react-router-dom";

export const SideNavbar = () => {
  const navItems = [
    { name: "Dashboard", icon: "dashboard", path: "/dashboard" },
    {
      name: "Inventario",
      icon: "inventory_2",

      path: "/inventario",
    },
    {
      name: "Ventas",
      icon: "shopping_cart",

      path: "/ventas",
    },
    { name: "Clientes", icon: "group", path: "/clientes" },
    { name: "Reportes", icon: "bar_chart", path: "/reportes" },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col fixed h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary/20 p-2 rounded-lg">
          <span className="material-symbols-outlined text-primary text-2xl font-bold">
            medical_services
          </span>
        </div>
        <div>
          <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
            FarmaciaRosa
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
            Sistema de inventario
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              to={item.path}
              key={item.name}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              } transition-colors`}
            >
              <span
                className={`material-symbols-outlined ${!isActive && "font-light"}`}
              >
                {item.icon}
              </span>
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined font-light">settings</span>
          <span className="text-sm">Settings</span>
        </a>
        <div className="flex items-center gap-3 px-3 py-4 mt-2">
          <div
            className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_C0bazYmt6unvKXd6MP645XPcCD5KjuZ1JUZ5Ab24QVbhEHhB47nI8po-usMGXjPf51f5ZsQW7cWr7IwSRHiToQkWIp4vPrknl_ItINpmUKLzKimbTax-5YukY_2gpNqhEZqpfd9e0ZF0eZ8Dy_Qp5iCZglmamFU7NIFl02eyjlc2KW_oZsYPNEAyIReUDOEAjNjYMc79NKlJ2Pg39hFgzeRSyKVsVj1UV-TJHuPkevclX_fGTZLmk2DXxSZVFuJItL3_7LigX3o')",
            }}
          />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">
              Dr. Sarah Smith
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Pharmacist
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
