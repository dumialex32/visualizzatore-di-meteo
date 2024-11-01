import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import SearchCity from "./SearchCity";

const MainNav: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-orange-50 px-8 py-2">
      <Link to="/">
        <Logo height="sm" />
      </Link>

      <div className="flex-1 flex justify-center">
        <SearchCity />
      </div>

      <NavMenu />
    </nav>
  );
};

export default MainNav;
