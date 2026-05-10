import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([]);

  //backend -> frontend
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <section id="center">
        
        <div>
          <h1>Web Synth</h1>
          {
            array.map((fruit, index) => (
              <div key = {index}>
                <p>{fruit}</p>
                <br></br>
              </div>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default App
