import React from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';
import { priceRange } from 'store/wineFilter';
import { useRecoilState } from 'recoil';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1em;
`;
const marks = {
  100: '100',
  200: '200',
  300: '300',
  400: '400',
  500: '500',
  600: '600',
  700: '700',
  800: '800',
  900: '900',
  1000: '1000'
};

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function PriceRange() {
  const [range, setRange] = useRecoilState(priceRange);

  const updateRange = values => {
    setRange(values);
  };

  return (
    <Wrapper>
      <p>Set price range</p>
      <Range
        min={100}
        max={1000}
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
