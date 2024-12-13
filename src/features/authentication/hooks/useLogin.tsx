import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: () => toast.error("Email or password are incorrect"),
  });

  return { loginMutate, isPending };
}

export default useLogin;
