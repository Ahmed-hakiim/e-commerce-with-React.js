import { ToastContainer } from "react-toastify";
import MainRoutes from "./MainRoutes.jsx";

function App() {
  return (
    <>
      <MainRoutes />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
