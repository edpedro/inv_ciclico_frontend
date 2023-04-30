import { ReactNode } from "react";

import { AuthProvider } from "./hooks/Auth";
import { LoadingProvider } from "./hooks/Loanding";
import { NewNameProvider } from "./hooks/NewName";
import { InventarioProvider } from "./hooks/Inventario";
import { UsersProvider } from "./hooks/Users";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <UsersProvider>
          <NewNameProvider>
            <InventarioProvider>{children}</InventarioProvider>
          </NewNameProvider>
        </UsersProvider>
      </AuthProvider>
    </LoadingProvider>
  );
};

export default AppProvider;
