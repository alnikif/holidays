import React from 'react';

type NumberCellProps = {
  readonly number: string | number;
};

export const NumberCell: React.FC<NumberCellProps> = ({ number }) => {
  return <div>{number}</div>;
};
