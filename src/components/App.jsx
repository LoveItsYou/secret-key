import "../styles/App.css";
import Layout from "./Layout";
import SecretKey from "./SecretKey";

function App() {
  return (
    <Layout>
      <div className="text-center my-2 text-2xl text-[red] lg:hidden visible w-full max-w-full">
        Your device screen is not suitable for this application, please try to
        use larger screen.
      </div>
      <SecretKey />
    </Layout>
  );
}

export default App;
