import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getVenta,
  registrarVenta,
  sumaVentaHoy,
  sumaVentaMes,
} from "../services/ventaService";

export const useVenta = () => {
  const { data: venta = [], isLoading: loadingVenta } = useQuery({
    queryKey: ["ventas"],
    queryFn: getVenta,
  });

  return { venta, loadingVenta };
};

export const useSumaVenta = () => {
  const { data: sumaVentas, isLoading: loadingSumaVenta } = useQuery({
    queryKey: ["sumaVentas"],
    queryFn: sumaVentaHoy,
  });

  return { sumaVentas, loadingSumaVenta };
};

export const useSumaVentaMes = () => {
  const { data: sumaVentasMes, isLoading: loadingSumaVentaMes } = useQuery({
    queryKey: ["sumaVentasMes"],
    queryFn: sumaVentaMes,
  });

  return { sumaVentasMes, loadingSumaVentaMes };
};

export const useRegistrarVenta = (onVentaExitosa) => {
  const queryClient = useQueryClient();

  const { mutateAsync: registrar, isPending: loadingRegistro } = useMutation({
    mutationFn: registrarVenta,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["products"] });
      onVentaExitosa();
    },
  });

  return { registrar, loadingRegistro };
};
