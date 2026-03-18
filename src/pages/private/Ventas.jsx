import { useState } from "react";
import { Layout } from "../../layout/Layout";
import { TopNavbar } from "../../layout/TopNavbar";
import { Carrito } from "../../components/ventas/Carrito";
import { ResumenVenta } from "../../components/ventas/ResumenVenta";
import { BuscadorProducto } from "../../components/ventas/BuscadorProducto";
export const Ventas = () => {
  const [carrito, setCarrito] = useState([]);
  const [clienteId, setClienteId] = useState(null);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p,
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (id) => () => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const actualizarCantidad = (id, cantidad) => () => {
    if (cantidad <= 0) return eliminarProducto(id);
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad } : p)),
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
    setClienteId(null);
  };

  const total = carrito.reduce(
    (acc, p) => acc + p.precio_venta * p.cantidad,
    0,
  );

  return (
    <Layout>
      <TopNavbar />
      <div className="flex gap-6 p-6 h-full">
        {/* Lado izquierdo — buscar productos */}
        <div className="flex-1 flex flex-col gap-4">
          <BuscadorProducto onAgregar={agregarProducto} />
          <Carrito
            carrito={carrito}
            onEliminar={eliminarProducto}
            onActualizar={actualizarCantidad}
          />
        </div>

        {/* Lado derecho — resumen y procesar */}
        <div className="w-80">
          <ResumenVenta
            carrito={carrito}
            total={total}
            clienteId={clienteId}
            onClienteChange={setClienteId}
            onVentaExitosa={limpiarCarrito}
          />
        </div>
      </div>
    </Layout>
  );
};
