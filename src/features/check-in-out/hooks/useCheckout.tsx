import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../../services/apiBookings";
import { Status } from "../../../utils/types";

function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkoutMutate, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number | undefined) =>
      updateBooking(bookingId, {
        status: Status.CHECKED_OUT,
      }),

    onSuccess: (data) => {
      toast.success(`Booking ${data.id} checked out successfully`);

      queryClient.invalidateQueries({ type: "active" });
    },

    onError: () => toast.error("Something went wrong while checking out"),
  });

  return { checkoutMutate, isCheckingOut };
}

export default useCheckOut;
