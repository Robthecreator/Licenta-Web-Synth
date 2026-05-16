import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import Studio from './pages/Studio.jsx'

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

  return <Studio />;
}

export default App
