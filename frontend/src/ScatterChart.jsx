import React, { useState, useEffect } from 'react';
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

const SimpleScatterChart = ({ data, xAxis, yAxis }) => {

  const [selectedMetrics, setSelectedMetrics] = useState([...yAxis]);
  const [yBounds, setYBounds] = useState([0, 10]);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#413ea0'];

  const handleCheckboxChange = (metric) => {
    setSelectedMetrics((prev) => {
      if (prev.includes(metric)) {
        return prev.filter((m) => m !== metric);
      } else {
        return [...prev, metric];
      }
    });
  };

  useEffect(() => {
    if (selectedMetrics.length > 0) {
      const maxYValue = Math.max(...data.map(item => Math.max(...selectedMetrics.map(metric => item[metric] || 0))));
      setYBounds([0, maxYValue]);
    }
  }, [selectedMetrics, data]);

  const handleSliderChange = (newValue) => {
    setYBounds(newValue);
  };

  return (
    <div>
      <div>
        {yAxis.map((metric) => (
          <label key={metric}>
            <input
              type="checkbox"
              name="yMetric"
              value={metric}
              checked={selectedMetrics.includes(metric)}
              onChange={() => handleCheckboxChange(metric)}
            />
            {metric}
          </label>
        ))}
      </div>
      <div style={{ margin: '20px 0' }}>
        <span>Y Axis Bounds: {yBounds[0]} - {yBounds[1]}</span>
        <Slider
          value={yBounds}
          onChange={(e, newValue) => handleSliderChange(newValue)}
          min={0}
          max={Math.max(...data.map(item => Math.max(...selectedMetrics.map(metric => item[metric] || 0))))}
          step={0.01}
          valueLabelDisplay="auto"
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey={xAxis} name="X Axis" />
          {selectedMetrics.map((metric, index) => (
            <YAxis key={metric} type="number" dataKey={metric} domain={[yBounds[0], yBounds[1]]} name={`Y Axis (${metric})`} />
          ))}
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          {selectedMetrics.map((metric, index) => (
            <Scatter key={metric} name={`Data for ${metric}`} data={data} fill={colors[index % colors.length]} />
          ))}
        </ScatterChart>
      </ResponsiveContainer>

    </div>
  );
};

export default SimpleScatterChart;
