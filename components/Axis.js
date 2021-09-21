import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import styled from 'styled-components';

const StyledLine = styled.line`
  && {
    stroke: #374249;
    stroke-width: 2;
  }
`;

const Axis = ({ dimensions, scale, axis, ...props }) => {
  const line =
    axis === 'x' ? <StyledLine x2={dimensions.width} /> : <StyledLine y2={dimensions.height} />;

  const ticks = scale.domain();

  const renderTicks = () => {
    const transform = tick => (axis === 'x' ? `${scale(tick)}, 0` : `0, ${scale(tick)}`);
    console.log('19', transform());
    return ticks.map(tick => (
      <text key={tick} transform={`translate(${transform(tick)})`}>
        {tick}
      </text>
    ));
  };

  return (
    <g {...props}>
      {line}
      {renderTicks()}
    </g>
  );
};

export default Axis;
