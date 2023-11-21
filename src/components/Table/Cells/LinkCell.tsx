import React from 'react';
import { Link } from 'react-router-dom';
import { CellWrapper } from '../CellWrapper/CelllWrapper';

type LinkCellProps = {
  readonly linkUrl: string;
};

export const LinkCell: React.FC<LinkCellProps> = ({ linkUrl }) => {
  return (
    <CellWrapper>
      <Link to={`/holidays/${linkUrl}`}>View holiday list</Link>
    </CellWrapper>
  );
};
