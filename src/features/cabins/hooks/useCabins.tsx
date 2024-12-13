import { useQuery } from "@tanstack/react-query";
import { TCabin } from "../cabin.types";
import { getCabins } from "../../../services/apiCabins";

const useCabins = () => {
  const {
    data: cabins,
    isPending: isLoadingCabins,
    error,
  } = useQuery<TCabin[]>({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoadingCabins, cabins, error };
};

export default useCabins;
