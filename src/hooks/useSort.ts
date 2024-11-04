import { useMemo, useState } from "react";

const useSort = (data: any[], key: string) => {
  const [sortDirection, setSortDirection] = useState<
    "asc" | "desc" | undefined
  >();

  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) => (sortDirection === "asc" ? a[key] - b[key] : b[key] - a[key]) // Corrected comparison
    );
  }, [data, key, sortDirection]);

  const handleSortDirectionAsc = () => {
    setSortDirection("asc");
  };

  const handleSortDirectionDesc = () => {
    setSortDirection("desc");
  };

  return {
    sortDirection,
    sortedData,
    handleSortDirectionAsc,
    handleSortDirectionDesc,
  };
};

export default useSort;
