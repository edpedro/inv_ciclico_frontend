import { ReactNode } from "react";

import { AuthProvider } from "./hooks/Auth";
import { LoadingProvider } from "./hooks/Loanding";
import { NewNameProvider } from "./hooks/NewName";
import { InventarioProvider } from "./hooks/Inventario";
import { UsersProvider } from "./hooks/Users";
import { DashboardProvider } from "./hooks/Dashboard";
import { ReversaProvider } from "./hooks/Reversa";

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
                <ReversaProvider>{children}</ReversaProvider>
              </DashboardProvider>
            </InventarioProvider>
          </NewNameProvider>
        </UsersProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
