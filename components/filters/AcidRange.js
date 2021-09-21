import React from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';
import { acidRange } from 'store/wineFilter';
import { useRecoilState } from 'recoil';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1em;
`;

const marks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: '11',
  12: '12'
};

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function AcidRange() {
  const [range, setRange] = useRecoilState(acidRange);

  const updateRange = values => {
    setRange(values);
  };

  return (
    <Wrapper>
      <p>Set acid range</p>
      <Range
        min={1}
        max={12}
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
