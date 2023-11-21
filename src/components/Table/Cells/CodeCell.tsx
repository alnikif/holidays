import React from 'react';
import { CellWrapper } from '../CellWrapper/CelllWrapper';

type CodeCellProps = {
  readonly code: string;
};

export const CodeCell: React.FC<CodeCellProps> = ({ code }) => {
  return <CellWrapper>{code}</CellWrapper>;
};
