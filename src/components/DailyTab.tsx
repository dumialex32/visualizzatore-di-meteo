import { formatDate } from "../utils/formatters";

const DailyTab: React.FC<{
  date: string;
  onClick: () => void;
  isActive: boolean;
}> = ({ date, onClick, isActive }) => {
  return (
    <li
      className={`cursor-pointer p-2 bg-orange-50 rounded-md text-center font-semibold ${
        isActive ? "bg-orange-300" : ""
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
