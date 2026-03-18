import { useState } from "react";
import { supabase } from "../../supabase/Client";

export const BuscadorCliente = ({ onSeleccionar }) => {
  const [busqueda, setBusqueda] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const buscarCliente = async (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.length < 2) return setClientes([]);

    const { data } = await supabase
      .from("clientes")
      .select("id, nombre, apellido, documento")
      .or(`nombre.ilike.%${valor}%,documento.ilike.%${valor}%`)
      .limit(5);

    setClientes(data ?? []);
  };

  const seleccionar = (cliente) => {
    setClienteSeleccionado(cliente);
    setBusqueda("");
    setClientes([]);
    onSeleccionar(cliente.id);
  };

  const limpiar = () => {
    setClienteSeleccionado(null);
    onSeleccionar(null);
  };

  if (clienteSeleccionado) {
    return (
      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}
          </p>
          <p className="text-xs text-slate-500">
            {clienteSeleccionado.documento}
          </p>
        </div>
        <button onClick={limpiar} className="text-slate-400 hover:text-red-500">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={busqueda}
        onChange={buscarCliente}
        placeholder="Buscar cliente (opcional)"
        className="w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
      />
      {clientes.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              onClick={() => seleccionar(cliente)}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {cliente.nombre} {cliente.apellido}
              </p>
              <p className="text-xs text-slate-500">{cliente.documento}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
