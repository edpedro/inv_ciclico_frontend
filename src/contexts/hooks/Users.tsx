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
import { UIuser, UIuserList } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

type Props = {
  children?: ReactNode;
};

interface UserContextData {
  lisUserData?: UIuserList[];
  userFindData?: UIuserList;
  listAllUserData: () => void;
  registerUsers: (
    name: string,
    username: string,
    password: string,
    role: string,
    createdById: string
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

  const api = useApi();

  const { authenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      listAllUserData();
    }

    setUpdate(false);
  }, [update]);

  async function registerUsers(
    name: string,
    username: string,
    password: string,
    role: string,
    createdById: string
  ): Promise<void> {
    try {
      await api.post("users", {
        name,
        username,
        password,
        role,
        createdById,
      });

      navigate("/users");

      setUpdate(true);

      toast.success("Cadastro efetuado com sucesso!");
    } catch (error) {
      toast.error("Informações invalida!");
    }
  }

  async function listUserFindOneData(id: string) {
    try {
      const { data } = await api.get(`/users/${id}`);

      setUserFindData(data);
    } catch (error) {}
  }

  async function listAllUserData() {
    const { data } = await api.get("/points/users/");

    setListUserData(data);
  }

  const deleteUser = useCallback(async (id: string) => {
    try {
      await api.delete(`/users/${id}`);

      setUpdate(true);

      toast.success("Deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar");
    }
  }, []);

  const updateUser = useCallback(async (id: string, newData: UIuser) => {
    try {
      await api.patch(`/users/${id}`, newData);

      setUpdate(true);

      toast.success("Atualizado com sucesso.");
    } catch (error) {
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
