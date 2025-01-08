import { ReactNode } from "react";

import { AuthProvider } from "./hooks/Auth";
import { LoadingProvider } from "./hooks/Loanding";
import { NewNameProvider } from "./hooks/NewName";
import { InventarioProvider } from "./hooks/Inventario";
import { UsersProvider } from "./hooks/Users";
import { DashboardProvider } from "./hooks/Dashboard";
import { ReversaProvider } from "./hooks/Reversa";
import { NewExpedicaoProvider } from "./hooks/Expedicao";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <UsersProvider>
          <NewNameProvider>
            <InventarioProvider>
              <DashboardProvider>
                <ReversaProvider>
                  <NewExpedicaoProvider>{children}</NewExpedicaoProvider>
                </ReversaProvider>
              </DashboardProvider>
            </InventarioProvider>
          </NewNameProvider>
        </UsersProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
