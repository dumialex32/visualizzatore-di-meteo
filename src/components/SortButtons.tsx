import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

interface SortButtonsProps {
  sortDirection: string | undefined;
  label?: string;
  onHandleSortDesc: () => void;
  onHandleSortAsc: () => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({
  sortDirection,
  onHandleSortDesc,
  onHandleSortAsc,
  label,
}) => {
  return (
    <div className="flex items-center gap-1">
      <p>{label}</p>
      {sortDirection === "asc" ? (
        <button onClick={onHandleSortDesc}>
          <ArrowDropDownIcon />
        </button>
      ) : (
        <button onClick={onHandleSortAsc}>
          <ArrowDropUpIcon />
        </button>
      )}
    </div>
  );
};

export default SortButtons;
