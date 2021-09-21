import React from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';
import { alcoholRange } from 'store/wineFilter';
import { useRecoilState } from 'recoil';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1em;
`;
const marks = {
  10: '10',
  11: '11',
  12: '12',
  13: '13',
  14: '14',
  15: '15',
  16: '16',
  17: '17',
  18: '18'
};

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function AlcoholRange() {
  const [range, setRange] = useRecoilState(alcoholRange);

  const updateRange = values => {
    setRange(values);
  };

  return (
    <Wrapper>
      <p>Set alcohol range</p>
      <Range
        min={10}
        max={18}
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
