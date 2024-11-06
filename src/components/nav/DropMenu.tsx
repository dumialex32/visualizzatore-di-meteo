import { NavLink } from "react-router-dom";

const DropMenu: React.FC = () => {
  return (
    <div className="absolute right-0 p-2 bg-white rounded-md shadow-md">
      <ul className="flex flex-col gap-2 text-sm w-28">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-main-color" : "text-gray-800 hover:text-main-color"
          }
          to={"/fav-cities"}
        >
          Città preferite
        </NavLink>
      </ul>
    </div>
  );
};

export default DropMenu;
