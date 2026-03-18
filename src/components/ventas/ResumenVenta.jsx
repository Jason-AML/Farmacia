import { useState } from "react";
import { BuscadorCliente } from "./BuscadorCliente";
import { useRegistrarVenta } from "../../hooks/useVenta";
export const ResumenVenta = ({
  carrito,
  total,
  clienteId,
  onClienteChange,
  onVentaExitosa,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { registrar, loadingRegistro } = useRegistrarVenta(onVentaExitosa);

  const procesarVenta = async () => {
    if (carrito.length === 0) return;
    setError(null);

    try {
      await registrar({ clienteId, total, carrito });
      onVentaExitosa();
    } catch (err) {
      setError(err.message ?? "Error al procesar la venta");
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex flex-col gap-4 bg-white dark:bg-slate-900">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
        Resumen
      </h2>

      <BuscadorCliente onSeleccionar={onClienteChange} />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-500">
          <span>Productos</span>
          <span>{carrito.length}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-slate-900 dark:text-white text-base border-t border-slate-100 dark:border-slate-800 pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        onClick={procesarVenta}
        disabled={carrito.length === 0 || loading}
        className="btn btn-primary w-full disabled:opacity-50"
      >
        {loadingRegistro ? "Procesando..." : "Procesar venta"}
      </button>
    </div>
  );
};
