import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../../services/apiBookings";

const useBooking = () => {
  const { bookingId } = useParams();

  const {
    isPending: isLoadingBooking,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoadingBooking, booking, error };
};

export default useBooking;
