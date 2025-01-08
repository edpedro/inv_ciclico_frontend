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
  UIexpedicaoList,
  UIExpedicaoCreate,
  UIexpedicaoUpdate,
  UIexpedicaoUpload,
  UInotafiscalList,
} from "../../types";
import { useAuth } from "./Auth";

type Props = {
  children?: ReactNode;
};

interface NewExpedicaoContextData {
  expedicaoData?: UIexpedicaoList[];
  updateExpedicaoData?: UIexpedicaoList;
  notafiscalData?: UInotafiscalList[];
  expedicaoBlocked?: boolean;
  createExpedicao: (data: UIExpedicaoCreate) => void;
  deleteExpedicao: (id: string) => void;
  loadExpedicaoData: () => void;
  listIdExpedicaoData: (id: string) => void;
  updateExpedicao: (id: string, data: UIexpedicaoUpdate) => Promise<void>;
  uploadPDFExpedicao: (data: UIexpedicaoUpload) => void;
  LisIdNotaFiscalData: (id: string) => void;
  DeleteNotaFiscalData: (id: string) => void;
  downloadExpedicao: (id: string, name: string, date: string) => void;
  Releaseblocked: (id: string) => void;
  setExpedicaoBlocked: (blocked: boolean) => void;
}

const NewExpedicaoContext = createContext<NewExpedicaoContextData>(
  {} as NewExpedicaoContextData
);

export const NewExpedicaoProvider = ({ children }: Props) => {
  const [expedicaoData, setExpedicaoData] = useState<UIexpedicaoList[]>();
  const [notafiscalData, setNotafiscalData] = useState<UInotafiscalList[]>();
  const [updateExpedicaoData, setUpdateExpedicaoData] =
    useState<UIexpedicaoList>();
  const [update, setUpdate] = useState(false);
  const [expedicaoBlocked, setExpedicaoBlocked] = useState<boolean>();

  const api = useApi();

  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      loadExpedicaoData();
    }

    setUpdate(false);
  }, [update]);

  async function loadExpedicaoData() {
    try {
      const { data } = await api.get("/expedicao");

      setExpedicaoData(data);
      return data;
    } catch (error) {}
  }

  async function listIdExpedicaoData(id: string) {
    try {
      const { data } = await api.get(`/expedicao/${id}`);

      const expedicaoItem = data[0];

      setUpdateExpedicaoData(expedicaoItem);
    } catch (error) {}
  }

  const createExpedicao = useCallback(async (newData: UIExpedicaoCreate) => {
    try {
      await api.post("/expedicao", newData);

      setUpdate(true);

      toast.success("Cadastro realizado com sucesso.");
    } catch (error) {
      toast.error("Nome da expedição já cadastrado");
    }
  }, []);

  const deleteExpedicao = useCallback(async (id: string) => {
    try {
      await api.delete(`/expedicao/${id}`);

      setUpdate(true);

      toast.success("Deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar");
    }
  }, []);

  const updateExpedicao = useCallback(
    async (id: string, newData: UIexpedicaoUpdate) => {
      try {
        await api.patch(`/expedicao/${id}`, newData);

        setUpdate(true);

        toast.success("Atualizado com sucesso.");
      } catch (error) {
        toast.error("Erro ao atualizar");
      }
    },
    []
  );

  async function LisIdNotaFiscalData(id: string) {
    try {
      const { data } = await api.get(`/notafiscal/${id}`);

      const { blocked } = data;
      setExpedicaoBlocked(blocked);

      setNotafiscalData(data);
    } catch (error) {}
  }

  async function DeleteNotaFiscalData(id: string) {
    try {
      await api.delete(`/notafiscal/${id}`);

      toast.success("Deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar");
    }
  }

  async function Releaseblocked(id: string) {
    try {
      const { data } = await api.post(`/expedicao/blocked/${id}`);

      const { blocked } = data;
      setExpedicaoBlocked(blocked);
      setUpdate(true);

      toast.success("Conferência desbloqueada");
    } catch (error) {
      toast.error("Erro ao desbloquear");
    }
  }

  const uploadPDFExpedicao = useCallback(async (data: UIexpedicaoUpload) => {
    try {
      const formData = new FormData();

      // Adiciona o ID da base
      formData.append("baseExpedicao_id", data.baseExpedicao_id);

      // Adiciona cada arquivo ao FormData com o nome 'files'
      data.files.forEach((file) => {
        formData.append("files", file);
      });

      // Envia o formData ao invés do objeto data
      await api.post("/notafiscal/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Upload com sucesso.");
    } catch (error) {
      toast.error("Erro ao fazer upload");
    }
  }, []);

  const downloadExpedicao = useCallback(
    async (id: string, name: string, date: string) => {
      try {
        const response = await api.get(`/export/expedicao/${id}`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `expedicao_${name}-${date}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);

        toast.success("Download com sucesso.");
      } catch (error) {
        toast.error("Erro ao fazer download do arquivo");
      }
    },
    []
  );

  return (
    <NewExpedicaoContext.Provider
      value={{
        expedicaoData,
        notafiscalData,
        createExpedicao,
        loadExpedicaoData,
        deleteExpedicao,
        updateExpedicaoData,
        listIdExpedicaoData,
        updateExpedicao,
        uploadPDFExpedicao,
        LisIdNotaFiscalData,
        DeleteNotaFiscalData,
        downloadExpedicao,
        Releaseblocked,
        expedicaoBlocked,
        setExpedicaoBlocked,
      }}
    >
      {children}
    </NewExpedicaoContext.Provider>
  );
};

export function useExpedicao(): NewExpedicaoContextData {
  const context = useContext(NewExpedicaoContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
