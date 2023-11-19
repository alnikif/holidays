import React from 'react';
import { CellWrapper } from './CellWrapper/CelllWrapper';

type NameCellProps = {
  readonly name: string;
};

export const NameCell: React.FC<NameCellProps> = ({ name }) => {
  return <CellWrapper>{name}</CellWrapper>;
};
