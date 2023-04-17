import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { useLoading } from "./Loanding";
import api from "../../services/api";
import { UIinventarioCreate, UIinventarioList } from "../../types";
import { toast } from "react-toastify";

type Props = {
  children?: ReactNode;
};

interface InventarioContextData {
  inventarioData?: UIinventarioList[];
  listIdInventarioData: (id: string) => Promise<void>;
  deleteInventario: (id: string) => Promise<void>;
  downloadInventario: (id: string, name: string, date: string) => Promise<void>;
  createInventario: (data: UIinventarioCreate) => Promise<void>;
}

const InventarioContext = createContext<InventarioContextData>(
  {} as InventarioContextData
);

export const InventarioProvider = ({ children }: Props) => {
  const { setLoadingFetch } = useLoading();

  const [inventarioData, setInventarioData] = useState<UIinventarioList[]>();

  const listIdInventarioData = useCallback(async (id: string) => {
    try {
      setLoadingFetch(true);
      const { data } = await api.get(`/ciclico/${id}`);
      setInventarioData(data);
      setLoadingFetch(false);
    } catch (error) {
      setInventarioData(undefined);
      setLoadingFetch(false);
    }
  }, []);

  const createInventario = useCallback(async (data: UIinventarioCreate) => {
    try {
      setLoadingFetch(true);
      await api.post("/ciclico/file", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setLoadingFetch(false);
      listIdInventarioData("");
      toast.success("Inventario cadastrado com sucesso.");
    } catch (error) {
      setLoadingFetch(false);
      toast.error("Nome já cadastrado");
    }
  }, []);

  const deleteInventario = useCallback(async (id: string) => {
    try {
      setLoadingFetch(true);
      await api.delete(`/ciclico/endereco/${id}`);

      setLoadingFetch(false);
      listIdInventarioData(id);
      toast.success("Deletado com sucesso.");
    } catch (error) {
      setLoadingFetch(false);
      toast.error("Erro ao deletar");
    }
  }, []);

  const downloadInventario = useCallback(
    async (id: string, name: string, date: string) => {
      try {
        setLoadingFetch(true);

        const response = await api.get(`/export/${id}`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `ficha_${name}-${date}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);

        toast.success("Download com sucesso.");

        setLoadingFetch(false);
      } catch (error) {
        setLoadingFetch(false);
        toast.error("'Erro ao fazer download do arquivo");
      }
    },
    []
  );
  return (
    <InventarioContext.Provider
      value={{
        listIdInventarioData,
        createInventario,
        inventarioData,
        deleteInventario,
        downloadInventario,
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
};

export function useInventario(): InventarioContextData {
  const context = useContext(InventarioContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
