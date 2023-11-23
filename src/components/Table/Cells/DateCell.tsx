import React from 'react';

type DateCellProps = {
  readonly date: string;
};

export const DateCell: React.FC<DateCellProps> = ({ date }) => {
  return <div>{date}</div>;
};
