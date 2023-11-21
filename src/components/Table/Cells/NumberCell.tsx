import React from 'react';
import { CellWrapper } from '../CellWrapper/CelllWrapper';

type NumberCellProps = {
  readonly number: string | number;
};

export const NumberCell: React.FC<NumberCellProps> = ({ number }) => {
  return <CellWrapper>{number}</CellWrapper>;
};
