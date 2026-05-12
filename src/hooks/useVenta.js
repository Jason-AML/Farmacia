import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getVenta,
  registrarVenta,
  sumaVentaHoy,
  sumaVentaMes,
  getTopMedicines
} from "../services/ventaService";

export const useVenta = () => {
  const queryClient = useQueryClient();

  const { data: venta = [], isLoading: loadingVenta } = useQuery({
    queryKey: ["ventas"],
    queryFn: getVenta,
  });

  const { data: sumaVentas, isLoading: loadingSumaVenta } = useQuery({
    queryKey: ["sumaVentas"],
    queryFn: sumaVentaHoy,
  });

  const { data: sumaVentasMes, isLoading: loadingSumaVentaMes } = useQuery({
    queryKey: ["sumaVentasMes"],
    queryFn: sumaVentaMes,
  });

  const { data: topMedicines, isLoading: loadingTopMedicines } = useQuery({
    queryKey: ["topMedicines"],
    queryFn: getTopMedicines,
  });

  const { mutateAsync: registrar, isPending: loadingRegistro } = useMutation({
    mutationFn: registrarVenta,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["ventas"] });
    },
  });

  return {
    venta, loadingVenta,
    sumaVentas, loadingSumaVenta,
    sumaVentasMes, loadingSumaVentaMes,
    topMedicines, loadingTopMedicines,
    registrar, loadingRegistro,
  };
};