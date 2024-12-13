import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const {
    mutate: signUp,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success("Account created successfully");
    },
    onError: () => toast.error("User could not be signed up"),
  });

  return { signUp, isCreating, error };
}

export default useSignup;
