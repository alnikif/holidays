import React from 'react';

type NameCellProps = {
  readonly name: string;
};

export const NameCell: React.FC<NameCellProps> = ({ name }) => {
  return <div>{name}</div>;
};
