import React, { useRef, useState, useEffect } from 'react';
// Check if treeshacking atherwise: Check this for d3 import https://gist.github.com/oscarmorrison/efa6f1213cc7bc5f410993d4139f0007
import * as d3 from 'd3';
import { useRecoilValue } from 'recoil';
import { selectedWines } from 'store/wineList';
import { getNumericModelById } from 'data/data';
import Axis from './Axis';

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

const initHeatmap = (rootRef, data) => {
  // set the dimensions and margins of the graph
  var margin = { top: 80, right: 25, bottom: 30, left: 40 },
    width = 1300 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select('#heatmap')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var groups = data.map(x => x.group);
  var props = data.map(x => x.variable);

  debugger;
  var x = d3.scaleBand().range([0, width]).domain(groups).padding(0.05);

  svg
    .append('g')
    .style('font-size', 15)
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickSize(0))
    .select('.domain')
    .remove();

  // Build Y scales and axis:
  var y = d3.scaleBand().range([height, 0]).domain(props).padding(0.05);
  svg
    .append('g')
    .style('font-size', 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select('.domain')
    .remove();

  // Build color scale
  var myColor = d3.scaleSequential().interpolator(d3.interpolateInferno).domain([1, 100]);

  // create a tooltip
  var tooltip = d3
    .select('#heatmap')
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '5px');

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function (d) {
    tooltip.style('opacity', 1);
    d3.select(this).style('stroke', 'black').style('opacity', 1);
  };
  var mousemove = function (d) {
    tooltip
      .html('The exact value of<br>this cell is: ' + d.value)
      .style('left', d3.mouse(this)[0] + 70 + 'px')
      .style('top', d3.mouse(this)[1] + 'px');
  };
  var mouseleave = function (d) {
    tooltip.style('opacity', 0);
    d3.select(this).style('stroke', 'none').style('opacity', 0.8);
  };

  // add the squares
  svg
    .selectAll()
    .data(data, function (d) {
      return d.group + ':' + d.variable;
    })
    .enter()
    .append('rect')
    .attr('x', function (d) {
      return x(d.group);
    })
    .attr('y', function (d) {
      return y(d.variable);
    })
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .style('fill', function (d) {
      return myColor(d.value);
    })
    .style('stroke-width', 4)
    .style('stroke', 'none')
    .style('opacity', 0.8)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave);

  // Add title to graph
  svg
    .append('text')
    .attr('x', 0)
    .attr('y', -50)
    .attr('text-anchor', 'left')
    .style('font-size', '22px')
    .text('A d3.js heatmap');

  // Add subtitle to graph
  svg
    .append('text')
    .attr('x', 0)
    .attr('y', -20)
    .attr('text-anchor', 'left')
    .style('font-size', '14px')
    .style('fill', 'grey')
    .style('max-width', 400)
    .text('A short description of the take-away message of this chart.');
};

export default function HeatmapComparison() {
  const taggedWines = useRecoilValue(selectedWines);
  // eslint-disable-next-line no-undef

  const productNames = [];
  const models = [];
  for (let i = 0; i < taggedWines.length; i += 1) {
    const model = getNumericModelById(taggedWines[i].id)[0];
    if (!model) continue;
    productNames.push(model.name);
    models.push(model);
  }

  const propList = Object.keys(models[0]).filter(x => x !== 'productId' && x !== 'name');
  const data = [];
  for (let i = 0; i < models.length; i += 1) {
    for (let j = 0; j < propList.length; j += 1) {
      const item = {
        group: models[i].name,
        variable: propList[j],
        value: models[i][propList[j]]
      };
      data.push(item);
    }
  }

  useEffect(() => {
    initHeatmap('#heatmap', data);
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title has-text-centered">Heatmap</h1>
        <div id="heatmap"></div>
      </div>
    </div>
  );
}
