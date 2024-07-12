import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/data');
    setData(response.data);
};

  useEffect(() => {
    fetchData();
  }, []);


}

export default App
