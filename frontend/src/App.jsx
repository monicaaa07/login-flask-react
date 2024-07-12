import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SimpleScatterChart from './ScatterChart';


function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/data');
    setData(response.data);
};

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <h1>Simple Scatter Chart</h1>
      {data.length > 0 ? (
        <div className="charts-container">
        <SimpleScatterChart data={data} xAxis="sepal.length" yAxis={["sepal.width", "petal.length", "petal.width"]} />
        <SimpleScatterChart data={data} xAxis="petal.length" yAxis={["sepal.width", "sepal.length", "petal.width"]} />
      </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );

}
export default App


