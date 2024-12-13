import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../../services/apiCabins";
import { TCabin, TCabinFormData } from "../cabin.types";

const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabin } = useMutation<
    TCabin,
    Error,
    {
      editCabinPayload: TCabinFormData;
      id: number;
    }
  >({
    mutationFn: ({ editCabinPayload, id }) =>
      createEditCabin(editCabinPayload, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
};

export default useEditCabin;
