import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../../services/apiBookings";
import { Status } from "../../../utils/types";
import { TBooking } from "../../bookings/booking.types";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkinMutate, isPending: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number | undefined;
      breakfast?: Partial<TBooking>;
    }) =>
      updateBooking(bookingId, {
        ...breakfast,
        status: Status.CHECKED_IN,
        isPaid: true,
      }),

    onSuccess: (data) => {
      toast.success(`Booking ${data.id} checked in successfully`);

      queryClient.invalidateQueries({ type: "active" });
      navigate("/dashboard");
    },

    onError: () => toast.error("Something went wrong while checking in"),
  });

  return { checkinMutate, isCheckingIn };
}

export default useCheckin;
