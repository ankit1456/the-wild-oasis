import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

type Props = {
  options: { value: string; label: string }[];
};

function SortBy({ options }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") ?? "";

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleSelect}
      type="white"
    />
  );
}

export default SortBy;
