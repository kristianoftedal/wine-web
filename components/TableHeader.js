/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const TableHeader = styled.th`
  text-transform: capitalize;
`;

function Th({ name, onClick, ...props }) {
  return (
    <TableHeader className="is-clickable" onClick={() => onClick(name)} {...props}>
      {name
        .match(/([A-Z]?[^A-Z]*)/g)
        .slice(0, -1)
        .join(' ')}
    </TableHeader>
  );
}

export default Th;
