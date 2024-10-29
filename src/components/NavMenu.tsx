import ListIcon from "@mui/icons-material/List";
import { useEffect, useRef, useState } from "react";
import DropMenu from "./DropMenu";

const NavMenu: React.FC = () => {
  const [isOpen, setisOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setisOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setisOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="relative">
      <div ref={menuRef} className="cursor-pointer" onClick={toggleMenu}>
        <ListIcon />
      </div>
      {isOpen && <DropMenu />}
    </div>
  );
};

export default NavMenu;
