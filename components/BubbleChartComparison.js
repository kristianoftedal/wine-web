import React, { useRef, useState } from 'react';
// Check if treeshacking atherwise: Check this for d3 import https://gist.github.com/oscarmorrison/efa6f1213cc7bc5f410993d4139f0007
import * as d3 from 'd3';
import { useRecoilValue } from 'recoil';
import { selectedWines } from 'store/wineList';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getNumericModelById } from 'data/data';

const colors = [
  '#EA2027',
  '#EE5A24',
  '#F79F1F',
  '#FFC312',
  '#C4E538',
  '#A3CB38',
  '#009432',
  '#006266',
  '#1B1464',
  '#0652DD',
  '#1289A7',
  '#12CBC4',
  '#FDA7DF',
  '#ED4C67',
  '#9980FA',
  '#5758BB',
  '#ED4C67',
  '#B53471',
  '#833471',
  '#6F1E51'
];

const BubbleChartComparison = () => {
  const rootRef = useRef(null);
  const taggedWines = useRecoilValue(selectedWines);
  // eslint-disable-next-line no-undef
  const data = [];
  const productNames = [];
  for (let i = 0; i < taggedWines.length; i += 1) {
    const model = getNumericModelById(taggedWines[i].id)[0];
    data.push(model);
  }

  if (data.length === 0) return <div>Not found</div>;

  const width = 1000; // to be dynamic
  const height = 950; // to be dynamic

  const groups = data.map(x => x.name);
  const variables = Object.keys(data[0]).filter(x => x !== 'name');

  const xScale = d3.scaleBand().domain(groups).range([0, width]);

  const yScale = d3.scaleBand().domain(variables).range([0, width]);

  // Build color scale
  var colorScale = d3
    .scaleLinear()
    .range(['white', '#1e3799']) // Primary color
    .domain([1, 200]); // Need to be dynamic

  const renderCells = () => {
    return sortedData.map((tag, i) => {
      return (
        <React.Fragment>
          <rect
            dataGroup={tag.group}
            dataVariable={tag.variable}
            width={xScale.bandwidth()}
            height={yScale.bandwidth()}
            x={xScale(tag.group)}
            y={yScale(tag.variable)}
            style={{
              fill: colorScale(tag.count),
              stroke: 'white',
              strokeWidth: 1
            }}
          />
        </React.Fragment>
      );
    });
  };

  const renderAxes = () => {
    return (
      <React.Fragment>
        <Axis axis="x" scale={xScale} dimensions={{ width, height }} />
        <Axis axis="y" scale={yScale} dimensions={{ width, height }} />
      </React.Fragment>
    );
  };

  return (
    <div className="section">
      <div className="container">
        <h2 className="title">Heatmap</h2>
        <div className="box" style={{ margin: '1em', width: '1450px' }}>
          <LineChart width={1400} height={800} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {productNames.map((x, i) => (
              <Line key={x} type="monotone" dataKey={x} stroke={colors.reverse()[i]} />
            ))}
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default BubbleChartComparison;
