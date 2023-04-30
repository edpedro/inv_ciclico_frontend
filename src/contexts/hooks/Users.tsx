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
import { UIuser, UIuserList } from "../../types";
import { useNavigate } from "react-router-dom";
import { useLoading } from "./Loanding";

type Props = {
  children?: ReactNode;
};

interface UserContextData {
  lisUserData?: UIuserList[];
  userFindData?: UIuserList;
  listAllUserData: () => Promise<void>;
  registerUsers: (
    name: string,
    username: string,
    password: string,
    rules: string
  ) => Promise<void>;
  deleteUser: (id: string) => void;
  updateUser: (id: string, data: UIuser) => void;
  listUserFindOneData: (id: string) => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UsersProvider = ({ children }: Props) => {
  const [lisUserData, setListUserData] = useState<UIuserList[]>();
  const [userFindData, setUserFindData] = useState<UIuserList>();
  const [update, setUpdate] = useState(false);

  const { setLoadingFetch } = useLoading();

  const navigate = useNavigate();

  useEffect(() => {
    listAllUserData();

    setUpdate(false);
  }, [update]);

  async function registerUsers(
    name: string,
    username: string,
    password: string,
    rules: string
  ): Promise<void> {
    try {
      setLoadingFetch(true);
      await api.post("users", {
        name,
        username,
        password,
        rules,
      });

      navigate("/users");

      setLoadingFetch(false);
      setUpdate(true);

      toast.success("Cadastro efetuado com sucesso!");
    } catch (error) {
      setLoadingFetch(false);
      toast.error("Informações invalida!");
    }
  }

  async function listUserFindOneData(id: string) {
    try {
      setLoadingFetch(true);
      const { data } = await api.get(`/users/${id}`);

      setUserFindData(data);
      setLoadingFetch(false);
    } catch (error) {
      setLoadingFetch(false);
    }
  }

  async function listAllUserData() {
    setLoadingFetch(true);
    const { data } = await api.get("users");

    const dataUser = localStorage.getItem("@data");

    if (dataUser) {
      const _data: UIuser = JSON.parse(dataUser);

      const filterName = data!.filter(
        (user: UIuserList) => user.name !== _data.name
      );

      setListUserData(filterName);
    }

    setLoadingFetch(false);
  }

  const deleteUser = useCallback(async (id: string) => {
    try {
      setLoadingFetch(true);
      await api.delete(`/users/${id}`);

      setUpdate(true);
      setLoadingFetch(false);
      toast.success("Deletado com sucesso.");
    } catch (error) {
      setLoadingFetch(false);
      toast.error("Erro ao deletar");
    }
  }, []);

  const updateUser = useCallback(async (id: string, newData: UIuser) => {
    try {
      setLoadingFetch(true);
      await api.patch(`/users/${id}`, newData);

      setUpdate(true);
      setLoadingFetch(false);
      toast.success("Atualizado com sucesso.");
    } catch (error) {
      setLoadingFetch(false);
      toast.error("Erro ao atualizar");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        updateUser,
        registerUsers,
        userFindData,
        listUserFindOneData,
        lisUserData,
        listAllUserData,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUsers(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
