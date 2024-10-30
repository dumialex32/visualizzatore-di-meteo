import { Outlet } from "react-router-dom";
import MainNav from "./components/MainNav";

function App() {
  return (
    <div className="container mx-auto shadow-md h-screen my-8">
      <MainNav />

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
