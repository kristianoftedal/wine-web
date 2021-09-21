import React from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';
import { sugarRange } from 'store/wineFilter';
import { useRecoilState } from 'recoil';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1em;
`;
const marks = {
  1: '1',
  5: '5',
  10: '10',
  15: '15',
  20: '20',
  25: '25'
};

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function SugarRange() {
  const [range, setRange] = useRecoilState(sugarRange);

  const updateRange = values => {
    setRange(values);
  };

  return (
    <Wrapper>
      <p>Set sugar range</p>
      <Range
        min={1}
        max={25}
        marks={marks}
        onChange={updateRange}
        defaultValue={range}
        tipFormatter={value => `${value}`}
      />
      <p className="has-text-centered" style={{ marginTop: '2em' }}>
        {range[0]} - {range[1]}
      </p>
    </Wrapper>
  );
}
