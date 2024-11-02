import { Outlet } from "react-router-dom";
import MainNav from "./components/MainNav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="h-screen">
      <ToastContainer />
      <div className="container mx-auto border h-full">
        <MainNav />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
