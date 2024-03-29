import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useApi from "../../services/api";
import {
  UIAlocateEnd,
  UIDataAlocate,
  UIhistoricList,
  UIinventarioCreate,
  UIinventarioList,
  UIitemHistoric,
  UIsecondUpdate,
  UIwmsUpdate,
} from "../../types";
import { toast } from "react-toastify";
import { useAuth } from "./Auth";

type Props = {
  children?: ReactNode;
};

interface InventarioContextData {
  inventarioData?: UIinventarioList[];
  historicData?: UIhistoricList[];
  alocateAddressData?: UIAlocateEnd[];
  listIdInventarioData: (id: string) => Promise<void>;
  deleteInventario: (id: string) => Promise<void>;
  downloadInventario: (id: string, name: string, date: string) => Promise<void>;
  createInventario: (data: UIinventarioCreate) => Promise<void>;
  updateAdminSecondCount: (id: string, data: UIsecondUpdate) => Promise<void>;
  updateAdminWms: (id: string, data: UIwmsUpdate) => Promise<void>;
  historicAllItem: (dataItem: UIitemHistoric) => Promise<void>;
  alocateAddress: (id: string, data: UIDataAlocate) => Promise<void>;
  getAllAlocateAddress: (id: string) => Promise<void>;
  removeAlocateAddress: (id: string, data: UIDataAlocate) => Promise<void>;
}

const InventarioContext = createContext<InventarioContextData>(
  {} as InventarioContextData
);

export const InventarioProvider = ({ children }: Props) => {
  const api = useApi();

  const [inventarioData, setInventarioData] = useState<UIinventarioList[]>();
  const [historicData, setHistoricData] = useState<UIhistoricList[]>();
  const [alocateAddressData, setAlocateAddressData] =
    useState<UIAlocateEnd[]>();

  const listIdInventarioData = useCallback(async (id: string) => {
    try {
      const { data } = await api.get(`/ciclico/${id}`);
      setInventarioData(data);
    } catch (error) {
      setInventarioData(undefined);
    }
  }, []);

  const createInventario = useCallback(async (data: UIinventarioCreate) => {
    try {
      await api.post("/ciclico/file", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      listIdInventarioData("");
      toast.success("Upload com sucesso.");
    } catch (error) {
      toast.error("Erro ao fazer upload");
    }
  }, []);

  const deleteInventario = useCallback(async (id: string) => {
    try {
      await api.delete(`/ciclico/endereco/${id}`);

      listIdInventarioData(id);
      toast.success("Deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar");
    }
  }, []);

  const updateAdminSecondCount = useCallback(
    async (id: string, data: UIsecondUpdate) => {
      try {
        await api.patch(`/ciclico/second/${id}`, data);

        listIdInventarioData(id);

        toast.success("Atualizado com sucesso.");
      } catch (error) {
        toast.error("Não autorizado");
      }
    },
    []
  );

  const updateAdminWms = useCallback(async (id: string, data: UIwmsUpdate) => {
    try {
      await api.patch(`/ciclico/wms/${id}`, data);

      listIdInventarioData(id);

      toast.success("Atualizado com sucesso.");
    } catch (error) {
      toast.error("Não autorizado");
    }
  }, []);

  const downloadInventario = useCallback(
    async (id: string, name: string, date: string) => {
      try {
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
      } catch (error) {
        toast.error("Erro ao fazer download do arquivo");
      }
    },
    []
  );

  const historicAllItem = useCallback(async (dataItem: UIitemHistoric) => {
    const { data } = await api.post("/ciclico/historico", dataItem);
    setHistoricData(data);
  }, []);

  const alocateAddress = useCallback(
    async (id: string, data: UIDataAlocate) => {
      try {
        await api.post(`/ciclico/endereco/user/${id}`, data);

        getAllAlocateAddress(id);

        toast.success("Atualizado com sucesso.");
      } catch (error) {
        toast.error("Não autorizado");
      }
    },
    []
  );

  const getAllAlocateAddress = useCallback(async (id: string) => {
    const { data } = await api.get(`/ciclico/endereco/user/${id}`);

    setAlocateAddressData(data);
  }, []);

  const removeAlocateAddress = useCallback(
    async (id: string, data: UIDataAlocate) => {
      try {
        await api.delete(`/ciclico/endereco/user/${id}`, { data });

        getAllAlocateAddress(id);

        toast.success("Deletado com sucesso.");
      } catch (error) {
        toast.error("Não autorizado");
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
        updateAdminSecondCount,
        updateAdminWms,
        historicAllItem,
        historicData,
        alocateAddressData,
        getAllAlocateAddress,
        alocateAddress,
        removeAlocateAddress,
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
