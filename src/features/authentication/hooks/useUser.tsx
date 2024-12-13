import { useQuery } from "@tanstack/react-query";
import { self } from "../../../services/apiAuth";

function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: self,
  });

  return {
    user,
    isPending,
    isAuthenticated: user?.role === "authenticated",
  };
}

export default useUser;
