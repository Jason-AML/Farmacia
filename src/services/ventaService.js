import { supabase } from "../supabase/Client";

export const getVenta = async () => {
  const { data, error } = await supabase
    .from("ventas_detalle")
    .select(
      "*, venta_id(id,total, estado, cliente_id(nombre, apellido)),producto_id(name)",
    )
    .order("created_at", { ascending: false })
    .limit("10");

  if (error) throw error;
  return data;
};

export const sumaVentaHoy = async () => {
  const { data, error } = await supabase.rpc("get_suma_ventas_hoy");
  if (error) throw error;
  return data;
};
export const sumaVentaMes = async () => {
  const { data, error } = await supabase.rpc("get_suma_ventas_mes");
  if (error) throw error;
  return data;
};
export const actualizarEstadoVenta = async (ventaId, nuevoEstado) => {
  const { data, error } = await supabase
    .from("ventas")
    .update({ estado: nuevoEstado })
    .eq("id", ventaId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
export const registrarVenta = async ({ clienteId, total, carrito }) => {
  const { error } = await supabase.rpc("registrar_venta", {
    p_cliente_id: clienteId,
    p_total: total,
    p_items: carrito.map(({ id, cantidad, precio_venta }) => ({
      id,
      cantidad,
      precio_venta,
    })),
  });

  if (error) throw error;
};
