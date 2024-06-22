import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import MainPage from "./pages/MainPage/MainPage";
import User from "./pages/User/User";
import Update from "./pages/Update/Update";
import Withdraw from "./pages/Withdraw/Withdraw";
import Deposit from "./pages/Deposit/Deposit";
import Transfer from "./pages/Transfer/Ttransfer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/userspanel" element={<Home />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/withdraw/:id" element={<Withdraw />}></Route>
        <Route path="/deposit/:id" element={<Deposit />}></Route>
        <Route path="/transfer/:id" element={<Transfer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
