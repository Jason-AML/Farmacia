export const Card = ({ products }) => {
  const getStatus = () => {
    if (products.cantidad <= products.cantidad_minima) return "critical";
    if (products.cantidad > products.cantidad_minima && products.cantidad < 20)
      return "low";
    return "healthy";
  };
  const status = getStatus();
  const getStatusClasses = (status) => {
    const classes = {
      critical: {
        badge: "bg-red-100 text-red-600",
        text: "text-red-500",
        bar: "bg-red-500",
        border: "hover:border-red-200",
      },
      low: {
        badge: "bg-amber-100 text-amber-600",
        text: "text-amber-500",
        bar: "bg-amber-500",
        border: "hover:border-amber-200",
      },
      healthy: {
        badge: "bg-emerald-100 text-emerald-600",
        text: "text-emerald-500",
        bar: "bg-emerald-500",
        border: "",
      },
    };
    return classes[status];
  };
  const statusClasses = getStatusClasses(status);
  return (
    <div
      className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl ${statusClasses.border} transition-all`}
    >
      <div className="relative aspect-4/3 bg-slate-50 dark:bg-slate-800 overflow-hidden">
        <img
          alt={products.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={products.imagen_url}
        />
        <div className="absolute top-2 right-2">
          <span
            className={`${statusClasses.badge} text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm`}
          >
            {status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-slate-900 dark:text-white leading-tight truncate">
            {products.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase font-semibold">
            {products.category}
          </p>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-black text-slate-900 dark:text-white">
            ${products.precio_venta}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs font-bold">
            <span className="">{products.cantidad} units left</span>
            <span className="text-slate-400">
              {products.cantidad_minima} min
            </span>
          </div>
        </div>
        {status === "critical" || status === "low" ? (
          <button className="cursor-pointer w-full py-2.5 bg-primary text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-base">
              {status === "critical"
                ? "shopping_cart_checkout"
                : "shopping_cart"}
            </span>
            {status === "critical" ? "Restock Now" : "Restock"}
          </button>
        ) : (
          <button className="cursor-pointer w-full py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-base">
              visibility
            </span>
            View Details
          </button>
        )}
      </div>
    </div>
  );
};
