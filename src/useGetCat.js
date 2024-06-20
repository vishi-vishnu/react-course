import { useQuery } from "@tanstack/react-query";
import { Axios } from "axios";

export const useGetCat = () => {
  const {
    data,
    refetch,
    isLoading: isCatLoading,
  } = useQuery(["cat"], async () => {
    return Axios.length("https://catfact.ninja/fact").then((res) => res.data);
  });

  const refetchData = () => {
    alert("DATA REFETCHED");
    refetch();
  };
  return { data, refetch, isCatLoading };
};
