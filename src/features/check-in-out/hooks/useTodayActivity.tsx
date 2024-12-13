import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../../services/apiBookings";
import { TBooking } from "../../bookings/booking.types";

function useTodayActivity() {
  const { data: activities, isPending: isLoadingTodayActivities } = useQuery<
    TBooking[]
  >({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { activities, isLoadingTodayActivities };
}

export default useTodayActivity;
