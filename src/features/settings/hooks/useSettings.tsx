import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../../services/apiSettings";
import { TSettings } from "../settings.types";

function useSettings() {
  const {
    data: settings,
    isPending: isLoadingSettings,
    error,
  } = useQuery<TSettings>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoadingSettings, error, settings };
}

export default useSettings;
