import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { UIuser } from "../../types";
import { useNavigate } from "react-router-dom";
import { LoadingProvider, useLoading } from "./Loanding";

type Props = {
  children?: ReactNode;
};

interface UItoken {
  token: undefined | string;
}

interface AuthContextData {
  authData?: UIuser;
  token?: UItoken;
  authenticated: boolean;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: Props) => {
  const [authData, setAuthData] = useState<UIuser>();
  const [token, setToken] = useState<UItoken>();
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  // const { setLoading } = useLoading();

  const navigate = useNavigate();

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    const token = localStorage.getItem("@token");
    const data = localStorage.getItem("@data");
    try {
      if (token && data) {
        const _token: UItoken = JSON.parse(token);
        const _data: UIuser = JSON.parse(data);

        api.defaults.headers.authorization = `Bearer ${_token}`;

        setAuthenticated(true);
        setToken(_token);
        setAuthData(_data);
      }
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  }

  async function signIn(username: string, password: string): Promise<void> {
    try {
      const {
        data: { payload, token },
      } = await api.post("/auth/login", {
        username,
        password,
      });

      setAuthData(payload);
      setToken(token);

      setAuthenticated(true);

      localStorage.setItem("@data", JSON.stringify(payload));
      localStorage.setItem("@token", JSON.stringify(token));

      api.defaults.headers.authorization = `Bearer ${token}`;
      toast.success("Login efetuado com sucesso!");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login e Senha invalida!");
    }
  }

  async function signOut() {
    setAuthData(undefined);
    setAuthenticated(false);

    localStorage.removeItem("@data");
    localStorage.removeItem("@token");
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, token, authData, signIn, isLoading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
