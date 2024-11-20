import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/App.css";
import Layout from "./Layout";
import SecretKey from "./SecretKey";

function App() {
  return (
    <div>
      <Layout>
        <div className="text-center my-2 text-2xl text-[red] lg:hidden visible w-full max-w-full">
          Your device screen is not suitable for this application, please try to
          use larger screen.
        </div>
        <SecretKey />
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
