import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./styles/index.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
