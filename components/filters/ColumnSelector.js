import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { wineProps } from 'store/wineList';
import styled from 'styled-components';
import Checkbox from 'components/Checkbox';

const ColumnWrapper = styled.div`
  width: 100%;
`;

const Box = styled.div.attrs(() => ({
  className: 'box animate__animated animate__faster'
}))`
  position: fixed;
  width: 50vw;
  left: 50vw;
`;

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export default function ColumnSelector() {
  const [isOpen, setOpen] = useState(false);

  const [propList, setWineProps] = useRecoilState(wineProps);

  const onToggleProp = (checked, name) => {
    const item = propList.find(x => x.name === name);
    const newItem = { ...item, isSelected: !checked };
    const index = propList.findIndex(x => x.name === name);
    const newList = replaceItemAtIndex(propList, index, newItem);
    setWineProps(newList);
  };

  const n = 3;
  const chunksOfProps = [[], [], []]; //we create it, then we'll fill it

  const chunkSize = Math.ceil(propList.length / n);

  for (let line = 0; line < n; line++) {
    for (let i = 0; i < chunkSize; i++) {
      const value = propList[i + line * chunkSize];
      if (!value) continue; //avoid adding "undefined" values
      chunksOfProps[line].push(value);
    }
  }

  return (
    <>
      <button className="button" onClick={() => setOpen(!isOpen)}>
        Columns
      </button>
      <Box className={`${isOpen ? 'animate__fadeIn' : 'animate__fadeOut'}`}>
        {isOpen && (
          <ColumnWrapper>
            <div className="columns">
              {chunksOfProps.map((x, i) => (
                <div key={i} className="column">
                  {x.map(y => (
                    <Checkbox
                      key={y.name}
                      displayText={y.name}
                      checked={y.isSelected}
                      onChange={onToggleProp}
                    />
                  ))}
                </div>
              ))}
            </div>
          </ColumnWrapper>
        )}
      </Box>
    </>
  );
}
