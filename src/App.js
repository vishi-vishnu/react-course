import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [predictAge,setPrdictAge]=useEffect(null);

  const fetchCatFact = () => {
    axios
      .get("https://catfact.ninja/fact") // Corrected method
      .then((res) => {
        setCatFact(res.data.fact);
      });
  };
  useEffect(() => {
    fetchCatFact();
  }, []);

  return (
    <div className="App">
      <button onClick={fetchCatFact}>Generate Cat fact</button> <p>{catFact}</p>
    </div>
  );
}

export default App;
