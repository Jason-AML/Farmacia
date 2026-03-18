import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";

export const BuscadorProducto = ({ onAgregar }) => {
  const [busqueda, setBusqueda] = useState("");

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const productosFiltrados =
    busqueda.length >= 2
      ? products.filter((p) =>
          p.name.toLowerCase().includes(busqueda.toLowerCase()),
        )
      : [];

  return (
    <div className="relative">
      <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-900">
        <span className="material-symbols-outlined text-slate-400">search</span>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar producto..."
          className="flex-1 outline-none text-sm bg-transparent text-slate-900 dark:text-white"
        />
      </div>

      {productosFiltrados.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
          {productosFiltrados.map((producto) => (
            <li
              key={producto.id}
              onClick={() => {
                onAgregar(producto);
                setBusqueda("");
              }}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {producto.name}
                </p>
                <p className="text-xs text-slate-500">
                  Stock: {producto.cantidad}
                </p>
              </div>
              <p className="text-sm font-semibold text-primary">
                ${producto.precio_venta}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
