import { useState } from 'react';
import styled from 'styled-components';
import FreshnessRange from './FreshnessRange';
import FullnessRange from './FullnessRange';
import PriceRange from './PriceRange';
import AcidRange from './AcidRange';
import AlcoholRange from './AlcoholRange';
import SugarRange from './SugarRange';

const ColumnWrapper = styled.div`
  width: 100%;
`;

const Box = styled.div.attrs(() => ({
  className: 'box animate__animated animate__faster'
}))`
  position: fixed;
  width: 50vw;
  left: 15vw;
`;

export default function RangeFilters() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button className="button" onClick={() => setOpen(!isOpen)}>
        Range Filters
      </button>
      <Box className={`${isOpen ? 'animate__fadeIn' : 'animate__fadeOut'}`}>
        {isOpen && (
          <ColumnWrapper>
            <div className="columns">
              <div className="column">
                <PriceRange />
                <AlcoholRange />
              </div>
              <div className="column">
                <AcidRange />
                <FreshnessRange />
                <FullnessRange />
                <SugarRange />
              </div>
            </div>
          </ColumnWrapper>
        )}
      </Box>
    </>
  );
}
