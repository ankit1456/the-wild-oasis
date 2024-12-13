import { useSearchParams } from "react-router-dom";
import { Menus, Spinner, Table } from "../../ui";
import { sort } from "../../utils/helpers";
import { TCabin } from "./cabin.types";
import CabinRow from "./CabinRow";
import useCabins from "./hooks/useCabins";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { cabins, isLoadingCabins } = useCabins();

  if (isLoadingCabins) return <Spinner />;

  const filterValue = searchParams.get("discount") ?? "all";

  let filteredCabins = cabins;

  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") ?? "name-asc";
  const [field, direction] = sortBy.split("-");

  const sortedCabins = sort(
    filteredCabins,
    field as keyof TCabin,
    direction as "asc" | "desc"
  );

  return (
    <Menus>
      <Table columns="0.6fr 2fr 1.8fr 1fr 1fr .1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin: TCabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
