export const Carrito = ({ carrito, onEliminar, onActualizar }) => {
  if (carrito.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-10">
        <span className="material-symbols-outlined text-4xl">
          shopping_cart
        </span>
        <p className="text-sm">Agrega productos para comenzar</p>
      </div>
    );
  }

  return (
    <div className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 text-xs uppercase">
          <tr>
            <th className="px-4 py-3 text-left">Producto</th>
            <th className="px-4 py-3 text-center">Cantidad</th>
            <th className="px-4 py-3 text-right">Subtotal</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {carrito.map((item) => (
            <tr key={item.id} className="bg-white dark:bg-slate-900">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900 dark:text-white">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500">
                  ${item.precio_venta} c/u
                </p>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={onActualizar(item.id, item.cantidad - 1)}
                    className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <span className="material-symbols-outlined text-sm">
                      remove
                    </span>
                  </button>
                  <span className="w-6 text-center font-medium text-slate-900 dark:text-white">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={onActualizar(item.id, item.cantidad + 1)}
                    className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <span className="material-symbols-outlined text-sm">
                      add
                    </span>
                  </button>
                </div>
              </td>
              <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">
                ${(item.precio_venta * item.cantidad).toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={onEliminar(item.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
