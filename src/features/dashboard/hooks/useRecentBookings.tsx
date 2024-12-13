import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../../services/apiBookings";

function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings, isPending: isLoadingRecentBookings } = useQuery(
    {
      queryKey: ["bookings", `last-${numDays}`],
      queryFn: () => getBookingsAfterDate(queryDate),
    }
  );
  return { recentBookings, isLoadingRecentBookings };
}

export default useRecentBookings;
