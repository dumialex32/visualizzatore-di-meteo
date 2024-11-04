import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainNav from "./components/nav/MainNav";

function App() {
  return (
    <div className="h-screen">
      <ToastContainer />
      <div className="container mx-auto h-full bg-orange-50">
        <MainNav />

        <main className="p-8 bg-orange-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
