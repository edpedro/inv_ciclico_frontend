import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useApi from "../../services/api";
import { toast } from "react-toastify";
import {
  UInameList,
  UInameCreate,
  UINameProtocoloList,
  UIProtocoloList,
  UIStatusJobs,
  UIBaseCreate,
} from "../../types";
import { useAuth } from "./Auth";

type Props = {
  children?: ReactNode;
};

interface ReversaContextData {
  nameProtocoloData?: UINameProtocoloList[];
  protocoloData?: UIProtocoloList[];
  idProtocoloData?: UIProtocoloList[];
  updateNameData?: UInameList;
  codigoData?: string[];
  statusJobs?: UIStatusJobs[];
  createName: (data: UInameCreate) => void;
  deleteName: (id: string) => void;
  loadNameProtocoloData: () => void;
  loadProtocoloData: () => void;
  loadCodigoData: () => void;
  loadStatusData: () => void;
  downloadProtocolo: (id: string, name: string, date: string) => Promise<void>;
  listNameData: (id: string) => void;
  updateName: (id: string, data: UInameCreate) => Promise<void>;
  listIdProtocoloData: (id: string) => void;
  deleteCodigoBaseSerial: (codigo: string) => void;
  uploadBaseSerial: (newData: UIBaseCreate) => Promise<void>;
}

const RversaContext = createContext<ReversaContextData>(
  {} as ReversaContextData
);

export const ReversaProvider = ({ children }: Props) => {
  const [nameProtocoloData, setNameProtocoloData] =
    useState<UINameProtocoloList[]>();
  const [protocoloData, setProtocoloData] = useState<UIProtocoloList[]>();
  const [idProtocoloData, setIdProtocoloData] = useState<UIProtocoloList[]>();
  const [updateNameData, setUpdateNameData] = useState<UInameList>();
  const [codigoData, setCodigo] = useState<string[]>();
  const [statusJobs, setStatusJobs] = useState<UIStatusJobs[]>();
  const [update, setUpdate] = useState(false);

  const api = useApi();

  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      loadNameProtocoloData();
      loadProtocoloData();
      loadCodigoData();
      loadStatusData();
    }

    setUpdate(false);
  }, [update]);

  async function loadNameProtocoloData() {
    try {
      const { data } = await api.get("/nameprotocol");

      setNameProtocoloData(data);
    } catch (error) {}
  }

  async function loadProtocoloData() {
    try {
      const { data } = await api.get("/protocol");

      setProtocoloData(data);
    } catch (error) {
      setProtocoloData(undefined);
    }
  }

  async function loadCodigoData() {
    try {
      const { data } = await api.get("/baseserial/codigo");

      setCodigo(data);
    } catch (error) {
      setCodigo(undefined);
    }
  }

  async function loadStatusData() {
    try {
      const { data } = await api.get("/baseserial/status");

      setStatusJobs(data);
    } catch (error) {
      setStatusJobs(undefined);
    }
  }

  const listIdProtocoloData = useCallback(async (id: string) => {
    try {
      const { data } = await api.get(`/protocol/${id}`);

      setIdProtocoloData(data);
    } catch (error) {
      setIdProtocoloData(undefined);
    }
  }, []);

  const deleteCodigoBaseSerial = useCallback(async (codigo: string) => {
    try {
      const { data } = await api.delete(`/baseserial/codigo?codigo=${codigo}`);

      toast.success(`Processo inciado Nº${data.jobId}`);

      setUpdate(true);
    } catch (error) {
      toast.error("Erro ao deletar codigo");
    }
  }, []);

  const uploadBaseSerial = useCallback(async (newData: UIBaseCreate) => {
    try {
      const { data } = await api.post("/baseserial", newData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`Upload inciado Nº${data.jobId}`);

      setUpdate(true);
    } catch (error) {
      toast.error("Erro no upload");
    }
  }, []);

  const downloadProtocolo = useCallback(
    async (id: string, name: string, date: string) => {
      try {
        const response = await api.get(`/export/protocolo/${id}`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `protocolo_${name}-${date}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);

        toast.success("Download com sucesso.");
      } catch (error) {
        toast.error("Erro ao fazer download do arquivo");
      }
    },
    []
  );

  async function listNameData(id: string) {
    try {
      const { data } = await api.get(`/nameinv/${id}`);

      setUpdateNameData(data);
    } catch (error) {}
  }

  const createName = useCallback(async (newData: UInameCreate) => {
    try {
      await api.post("/nameinv", newData);

      setUpdate(true);

      toast.success("Cadastro realizado com sucesso.");
    } catch (error) {
      toast.error("Nome do inventario já cadastrado");
    }
  }, []);

  const deleteName = useCallback(async (id: string) => {
    try {
      await api.delete(`/nameinv/${id}`);

      setUpdate(true);

      toast.success("Deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar");
    }
  }, []);

  const updateName = useCallback(async (id: string, newData: UInameCreate) => {
    try {
      await api.patch(`/nameinv/${id}`, newData);

      setUpdate(true);

      toast.success("Atualizado com sucesso.");
    } catch (error) {
      toast.error("Erro ao atualizar");
    }
  }, []);

  return (
    <RversaContext.Provider
      value={{
        nameProtocoloData,
        listIdProtocoloData,
        protocoloData,
        idProtocoloData,
        loadProtocoloData,
        downloadProtocolo,
        codigoData,
        loadCodigoData,
        deleteCodigoBaseSerial,
        loadStatusData,
        statusJobs,
        uploadBaseSerial,
        createName,
        loadNameProtocoloData,
        deleteName,
        updateNameData,
        listNameData,
        updateName,
      }}
    >
      {children}
    </RversaContext.Provider>
  );
};

export function useProtocolo(): ReversaContextData {
  const context = useContext(RversaContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
