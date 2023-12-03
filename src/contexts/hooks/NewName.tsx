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
import { UInameList, UInameCreate } from "../../types";
import { useAuth } from "./Auth";

type Props = {
  children?: ReactNode;
};

interface NewNameContextData {
  nameData?: UInameList[];
  updateNameData?: UInameList;
  createName: (data: UInameCreate) => void;
  deleteName: (id: string) => void;
  loadNameData: () => void;
  listNameData: (id: string) => void;
  updateName: (id: string, data: UInameCreate) => Promise<void>;
}

const NewNameContext = createContext<NewNameContextData>(
  {} as NewNameContextData
);

export const NewNameProvider = ({ children }: Props) => {
  const [nameData, setNameData] = useState<UInameList[]>();
  const [updateNameData, setUpdateNameData] = useState<UInameList>();
  const [update, setUpdate] = useState(false);

  const api = useApi();

  const { authenticated } = useAuth();

  useEffect(() => {
    if (authenticated) {
      loadNameData();
    }

    setUpdate(false);
  }, [update]);

  async function loadNameData() {
    try {
      const { data } = await api.get("/nameinv");

      setNameData(data);
    } catch (error) {}
  }

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
    <NewNameContext.Provider
      value={{
        nameData,
        createName,
        loadNameData,
        deleteName,
        updateNameData,
        listNameData,
        updateName,
      }}
    >
      {children}
    </NewNameContext.Provider>
  );
};

export function useName(): NewNameContextData {
  const context = useContext(NewNameContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
