import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [predictAge, setPrdictAge] = useState(null);

  const fetchData = () => {
    axios.get(`https://api.agify.io/?name=${name}`).then((res) => {
      setPrdictAge(res.data); 
    });
  };


  return (
    <div className="App">
      <input
        placeholder="Ex:vishnu..."
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <button onClick={fetchData}> Predict Age</button>
      <h1>Name: {predictAge?.name}</h1>
      <h1>predictAge: {predictAge?.age}</h1>
      <h1>Count: {predictAge?.count}</h1>
    </div>
  );
}

export default App;
