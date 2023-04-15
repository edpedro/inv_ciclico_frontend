import { BrowserRouter } from "react-router-dom";
import Routes from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "./contexts";
import { useLoading } from "./contexts/hooks/Loanding";
import Loading from "./components/loanding";

function App() {
  const { isLoadingFetch } = useLoading();

  if (isLoadingFetch) {
    return <Loading />;
  }
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Routes />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            className="toast-container"
          />
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
