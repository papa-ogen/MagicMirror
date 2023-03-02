import { useContext } from "react";
import { ContextProvider } from "@papa-ogen/craven-ui";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { AuthContext } from "./components/AuthContext";
import NotLoggedIn from "./components/NotLoggedIn";
import Home from "./components/Home";

function App() {
  const user = useContext(AuthContext);

  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={user ? <Home /> : <NotLoggedIn />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
