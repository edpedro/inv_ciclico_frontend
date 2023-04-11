import { ReactNode } from "react";

import { AuthProvider } from "./hooks/Auth";
import { LoadingProvider } from "./hooks/Loanding";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <LoadingProvider>{children} </LoadingProvider>
    </AuthProvider>
  );
};

export default AppProvider;
