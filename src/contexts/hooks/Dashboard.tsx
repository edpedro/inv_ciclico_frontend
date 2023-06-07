import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import useApi from "../../services/api";
import { UIdashboardList } from "../../types";
import { toast } from "react-toastify";

type Props = {
  children?: ReactNode;
};

interface DashboardContextData {
  dashboardData?: UIdashboardList;
  ListDashboard: (id: string) => Promise<void>;
  setUIRemoveData: () => void;
}

const DashboardContext = createContext<DashboardContextData>(
  {} as DashboardContextData
);

export const DashboardProvider = ({ children }: Props) => {
  const api = useApi();

  const [dashboardData, setDashboardData] = useState<UIdashboardList>();

  const ListDashboard = useCallback(async (id: string) => {
    try {
      const { data } = await api.get(`/dashboard/${id}`);

      setDashboardData(data);
    } catch (error) {
      setDashboardData(undefined);
      toast.error("Dados não encontrados");
    }
  }, []);

  const setUIRemoveData = () => {
    setDashboardData(undefined);
  };

  return (
    <DashboardContext.Provider
      value={{ dashboardData, ListDashboard, setUIRemoveData }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboard(): DashboardContextData {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
