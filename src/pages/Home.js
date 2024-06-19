import { useQuery } from "@tanstack/react-query";
import Axios from "axios"; // for fetching data from an api thats we use axios

export const Home = () => {
  const {
    data: catData, // you can change variable name, originally its "data" but catData is then changed by "data:catData"
    isLoading,
    isError,
    refetch,
  } = useQuery(["cat"], () => {
    return Axios.get("https://catfact.ninja/fact").then((res) => res.data);
  });

  if (isError) {
    return <h1> Sorry, there was an error </h1>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  return (
    <h1>
      This is the home page <p>{catData?.fact}</p> {/* -name changed */}
      <button onClick={refetch}> Update Data </button> {/*refetching data again, Easy is in't?? */}
    </h1>
  );
};
