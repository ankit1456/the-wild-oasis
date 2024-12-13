import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editSettings as editSettingsApi } from "../../../services/apiSettings";

const useEditSettings = () => {
  const queryClient = useQueryClient();

  const { isPending: isEditting, mutate: editSetting } = useMutation({
    mutationFn: editSettingsApi,
    onSuccess: () => {
      toast.success("Settings updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditting, editSetting };
};

export default useEditSettings;
