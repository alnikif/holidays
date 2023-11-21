import React from 'react';
import { CellWrapper } from '../CellWrapper/CelllWrapper';

type WeekdayCellProps = {
  readonly weekday: { date?: { name: string } } | string;
};

export const WeekdayCell: React.FC<WeekdayCellProps> = ({ weekday }) => {
  const weekdayName = typeof weekday === 'object' && weekday?.date?.name ? weekday.date.name : weekday;

  return <CellWrapper>{typeof weekdayName === 'string' ? weekdayName : 'N/A'}</CellWrapper>;
};
