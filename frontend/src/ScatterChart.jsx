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

const SimpleScatterChart = ({data, xAxis, yAxis}) => {
  const [selectedMetric, setSelectedMetric] = useState('sepal.width');
  const [yBounds, setYBounds] = useState([0, 10]);

  const handleCheckboxChange = (metric) => {
    setSelectedMetric(metric);
  };


  useEffect(() => {
    const maxYValue = Math.max(...data.map(item => item[selectedMetric] || 0));
    setYBounds([0, maxYValue]);
  }, [selectedMetric, data]);

  const handleSliderChange = (newValue) => {
    setYBounds(newValue);
  };


  return (
    <div>
    <div>
        {yAxis.map((metric) => (
          <label key={metric}>
            <input
              type="radio"
              name="yMetric"
              value={metric}
              checked={selectedMetric === metric}
              onChange={() => handleCheckboxChange(metric)}
            />
            {metric}
          </label>))}
      </div>
      <div style={{ margin: '20px 0' }}>
        <span>Y Axis Bounds: {yBounds[0]} - {yBounds[1]}</span>
        <Slider
          value={yBounds}
          onChange={(e, newValue) => handleSliderChange(newValue)}
          min={0}
          max={Math.max(...data.map(item => item[selectedMetric] || 0))}
          step={0.01}
          valueLabelDisplay="auto"
        />
      </div>
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey={xAxis} name="X Axis" />
        <YAxis type="number" dataKey={selectedMetric} domain={[yBounds[0],yBounds[1]]} name="Y Axis" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Sample Data" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
    </div>
  );
};

export default SimpleScatterChart;
