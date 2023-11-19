import React from 'react';
import { CellWrapper } from './CellWrapper/CelllWrapper';

type DateCellProps = {
  readonly date: string;
};

export const DateCell: React.FC<DateCellProps> = ({ date }) => {
  return <CellWrapper>{date}</CellWrapper>;
};
