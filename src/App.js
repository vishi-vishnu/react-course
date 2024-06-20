import "./App.css";
import { useGetCat } from "./useGetCat";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "axios";

function App() {
  const useGetCat = () => {
    const { data, refetch, isLoading: isCatLoading } = useGetCat();
    return (
      <div>
        <button onClick={refetch}>Refetch</button>
        <h1>{data?.fact}</h1>
      </div>
    );
  };
}

export default App;
