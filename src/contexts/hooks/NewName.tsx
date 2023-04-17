import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { UInameList, UInameCreate } from "../../types";
import { useLoading } from "./Loanding";
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

  const { setLoadingFetch } = useLoading();
  const { authData } = useAuth();

  useEffect(() => {
    loadNameData();

    setUpdate(false);
  }, [update]);

  async function loadNameData() {
    try {
      setLoadingFetch(true);
      const { data } = await api.get("/nameinv");

      const filteredData = data.filter(
        (value: UInameList) => value.user.id === authData?.sub
      );

      setNameData(filteredData);
      setLoadingFetch(false);
    } catch (error) {
      setLoadingFetch(false);
    }
  }

  async function listNameData(id: string) {
    try {
      setLoadingFetch(true);
      const { data } = await api.get(`/nameinv/${id}`);

      setUpdateNameData(data);
      setLoadingFetch(false);
    } catch (error) {
      setLoadingFetch(false);
    }
  }

  const createName = useCallback(async (newData: UInameCreate) => {
    try {
      setLoadingFetch(true);
      await api.post("/nameinv", newData);

      setUpdate(true);
      setLoadingFetch(false);
      toast.success("Cadastro realizado com sucesso.");
    } catch (error) {
      setLoadingFetch(false);
      toast.error("Nome do inventario já cadastrado");
    }
  }, []);

  const deleteName = useCallback(async (id: string) => {
    try {
      setLoadingFetch(true);
      await api.delete(`/nameinv/${id}`);

      setUpdate(true);
      setLoadingFetch(false);
      toast.success("Deletado com sucesso.");
    } catch (error) {
      setLoadingFetch(false);
      toast.error("Erro ao deletar");
    }
  }, []);

  const updateName = useCallback(async (id: string, newData: UInameCreate) => {
    try {
      setLoadingFetch(true);
      await api.patch(`/nameinv/${id}`, newData);

      setUpdate(true);
      setLoadingFetch(false);
      toast.success("Atualizado com sucesso.");
    } catch (error) {
      setLoadingFetch(false);
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
