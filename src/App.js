import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [generateExcuse, setgenerateExcuse] = useState("");

  const fetchExcuse = (excuse) => {
    axios
      .get(`https://excuser-three.vercel.app/v1/excuse/${excuse}/`)
      .then((res) => {
        setgenerateExcuse(res.data[0].excuse);
      });
  };

  return (
    <div className="App">
      <h1>Generate An Excuse</h1>
      <button
        onClick={() => {
          fetchExcuse("party");
        }}
      >
        Party
      </button>
      <button
        onClick={() => {
          fetchExcuse("family");
        }}
      >
        Family
      </button>
      <button
        onClick={() => {
          fetchExcuse("office");
        }}
      >
        Office
      </button>
      <p>{generateExcuse}</p>
    </div>
  );
}

export default App;
