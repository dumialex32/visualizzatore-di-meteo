import { Outlet } from "react-router-dom";
import MainNav from "./components/MainNav";

function App() {
  return (
    <div className="container mx-auto border-x h-full">
      <MainNav />

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
