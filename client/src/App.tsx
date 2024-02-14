import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const App = () => (
  <div className="bg-[#323536] min-h-lvh text-white">
    <Header />

    <div>
      <Outlet />
    </div>
  </div>
);

export default App;
