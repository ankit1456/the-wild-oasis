import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../../services/apiBookings";
import { Status } from "../../../utils/types";

function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isPending: isLoadingStays } = useQuery({
    queryKey: ["recent-stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) =>
      stay.status === Status.CHECKED_IN || stay.status === Status.CHECKED_OUT
  );

  return { stays, confirmedStays, isLoadingStays, numDays };
}

export default useRecentStays;
