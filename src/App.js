import "./assets/css/style.css";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeContainer from "./routes/homeContainer";
import PublicContainer from "./routes/publicContainer";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "primereact/resources/primereact.min.css";  
import 'primeflex/primeflex.css';
import "primereact/resources/themes/fluent-light/theme.css";

function App() {
  
  const params = new URLSearchParams({
    client_id: "WebMvcClient",
    client_secret: "secret",
    grant_type: "client_credentials"
  });


  return (
    <div className="App h-full">
      <Routes>
        <Route exact path="/home/*" element={<HomeContainer />} />
        <Route exact path="/*" element={<PublicContainer />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
