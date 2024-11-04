import { formatDate } from "../../utils/formatters";

const DailyTab: React.FC<{
  date: string;
  onClick: () => void;
  isActive: boolean;
}> = ({ date, onClick, isActive }) => {
  return (
    <li
      className={`cursor-pointer p-2 rounded-md text-center font-semibold transition-all duration-300 ${
        isActive
          ? "bg-main-color text-white"
          : "bg-orange-100 hover:bg-main-color hover:text-white"
      }`}
      onClick={onClick}
    >
      {formatDate(date)
        .slice(0, 1)
        .toUpperCase()
        .concat(formatDate(date).slice(1))}
    </li>
  );
};

export default DailyTab;
