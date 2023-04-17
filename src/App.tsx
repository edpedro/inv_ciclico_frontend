import { BrowserRouter } from "react-router-dom";
import Routes from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppProvider from "./contexts";

function App() {
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
