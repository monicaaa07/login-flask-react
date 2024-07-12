import React, {useState,useEffect} from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import Slider from '@mui/material/Slider';

const SimpleScatterChart = ({data}) => {
  const [selectedMetric, setSelectedMetric] = useState('sepal.width');
  const [yBounds, setYBounds] = useState([0, 10]);
  const maxYValue = Math.max(...data.map(item => item[selectedMetric] || 0));

  const handleCheckboxChange = (metric) => {
    setSelectedMetric(metric);
  };


  useEffect(() => {
    const maxYValue = Math.max(...data.map(item => item[selectedMetric] || 0));
    setYBounds([0, maxYValue]);
  }, [selectedMetric, data]);


  return (
    <>
    <div>
        <label>
          <input
            type="radio"
            name="yMetric"
            value="sepalWidth"
            checked={selectedMetric === 'sepal.width'}
            onChange={() => handleCheckboxChange('sepal.width')}
          />
          Sepal Width
        </label>
        <label>
          <input
            type="radio"
            name="yMetric"
            value="petalLength"
            checked={selectedMetric === 'petal.length'}
            onChange={() => handleCheckboxChange('petal.length')}
          />
          Petal Length
        </label>
        <label>
          <input
            type="radio"
            name="yMetric"
            value="petalWidth"
            checked={selectedMetric === 'petal.width'}
            onChange={() => handleCheckboxChange('petal.width')}
          />
          Petal Width
        </label>
      </div>
      <div style={{ margin: '20px 0' }}>
        <span>Y Axis Bounds: {yBounds[0]} - {yBounds[1]}</span>
        <Slider
          value={yBounds}
          onChange={(e, newValue) => setYBounds(newValue)}
          min={0}
          max={maxYValue}
          step={0.01}
          valueLabelDisplay="auto"
        />
      </div>
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey="sepal.length" name="X Axis" />
        <YAxis type="number" dataKey={selectedMetric} domain={yBounds} name="Y Axis" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Sample Data" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
    </>
  );
};

export default SimpleScatterChart;
