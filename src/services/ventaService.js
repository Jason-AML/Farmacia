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
