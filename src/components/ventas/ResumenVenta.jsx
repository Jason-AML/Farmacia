import { useState } from "react";
import { supabase } from "../../supabase/Client";
import { BuscadorCliente } from "./BuscadorCliente";
import { actualizarStock } from "../../services/productService";
import { useQueryClient } from "@tanstack/react-query";
export const ResumenVenta = ({
  carrito,
  total,
  clienteId,
  onClienteChange,
  onVentaExitosa,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const procesarVenta = async () => {
    if (carrito.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Crear la venta
      const { data: venta, error: ventaError } = await supabase
        .from("ventas")
        .insert({ cliente_id: clienteId, total, estado: "pendiente" })
        .select()
        .single();

      if (ventaError) throw ventaError;

      // 2. Insertar detalle
      const detalle = carrito.map((item) => ({
        venta_id: venta.id,
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio_venta,
      }));

      const { error: detalleError } = await supabase
        .from("ventas_detalle")
        .insert(detalle);

      if (detalleError) throw detalleError;

      await actualizarStock(carrito);
      await queryClient.refetchQueries({
        queryKey: ["products"],
      });
      onVentaExitosa();
    } catch (err) {
      setError(err.message ?? "Error al procesar la venta");
    } finally {
      setLoading(false);
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
        {loading ? "Procesando..." : "Procesar venta"}
      </button>
    </div>
  );
};
