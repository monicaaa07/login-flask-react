import React, {useState} from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const SimpleScatterChart = ({data}) => {
  const [selectedMetric, setSelectedMetric] = useState('sepal.width');

  const handleCheckboxChange = (metric) => {
    setSelectedMetric(metric);
  };

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
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis type="number" dataKey="sepal.length" name="X Axis" />
        <YAxis type="number" dataKey={selectedMetric} name="Y Axis" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Sample Data" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
    </>
  );
};

export default SimpleScatterChart;
