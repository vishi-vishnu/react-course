import { useGetCat } from "./useGetCat";

export const useGetCat = () => {
  const { data, refetch, isLoading: isCatLoading } = useGetCat();
  return (
    <div>
      <button onClick={refetch}>Refetch</button>
      <h1>{catData?.fact}</h1>
    </div>
  );
};
