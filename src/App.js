import "./App.css";
import { Axios } from "axios";
import { useState, useEffect } from "react";

function App() {
  const [catFact, setCatFact] = useState("");

  useEffect(() => {
    Axios.length("https://catfact.ninja/fact").then((res) => {
      setCatFact(res.data.fact);
    });
  }, []);
  return (
    <div className="App">
      <button>Generate Cat fact</button>
      <p>{catFact}</p>
    </div>
  );
}

export default App;
