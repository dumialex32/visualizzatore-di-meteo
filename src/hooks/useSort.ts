import { useMemo, useState } from "react";

const useSort = <T extends object>(data: T[], key: keyof T) => {
  const [sortDirection, setSortDirection] = useState<
    "asc" | "desc" | undefined
  >();

  const sortedData = useMemo(() => {
    if (!sortDirection) return data; // restituisci i dati originali se non e definita la direzione di ordinamento

    return [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return 0; // gestisci i casi non definiti
      }
    });
  }, [data, key, sortDirection]);

  const handleSortDirectionAsc = () => {
    setSortDirection("asc");
  };

  const handleSortDirectionDesc = () => {
    setSortDirection("desc");
  };

  const resetSort = () => {
    setSortDirection(undefined);
  };

  return {
    sortDirection,
    sortedData,
    handleSortDirectionAsc,
    handleSortDirectionDesc,
    resetSort,
  };
};

export default useSort;
