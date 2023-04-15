import { ReactNode } from "react";

import { AuthProvider } from "./hooks/Auth";
import { LoadingProvider } from "./hooks/Loanding";
import { NewNameProvider } from "./hooks/NewName";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <LoadingProvider>
        <NewNameProvider>{children}</NewNameProvider>
      </LoadingProvider>
    </AuthProvider>
  );
};

export default AppProvider;
