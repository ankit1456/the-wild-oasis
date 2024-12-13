import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPi } from "../../../services";

const useDeleteBooking = () => {
  const client = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingAPi,
    onSuccess: () => {
      toast.success("Booking deleted successfully");

      client.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => toast.error("Booking could not be deleted"),
  });
  return { deleteBooking, isDeletingBooking };
};

export default useDeleteBooking;
