/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;
const Label = styled.label`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 60%;
  border: 1px solid #dbdbdb;
  border-width: 0 0 1px;
  padding: 0.25em 0.5em;
  vertical-align: top;
`;

const Input = styled.input`
  height: 20px;
  width: 20px;
  margin-left: 0.7em;
  margin-top: 0.1em;
`;

const Text = styled.span`
  text-transform: capitalize;
`;

function Checkbox({ className, checked, displayText, onChange, ...props }) {
  return (
    <Wrapper className={className} {...props}>
      <Label>
        <Input type="checkbox" checked={checked} onChange={() => onChange(checked, displayText)} />
        <Text>
          {displayText
            .match(/([A-Z]?[^A-Z]*)/g)
            .slice(0, -1)
            .join(' ')}
        </Text>
      </Label>
    </Wrapper>
  );
}

export default Checkbox;
