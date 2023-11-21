import React from 'react';
import { NumberCell } from '../../components/Table/Cells/NumberCell';
import { NameCell } from '../../components/Table/Cells/NameCell';
import { HolidaysType } from './Holidays';
import { DateCell } from '../../components/Table/Cells/DateCell';
import { WeekdayCell } from '../../components/Table/Cells/WeekdayCell';
import { PublicCell } from '../../components/Table/Cells/PublicCell';
import styles from './HolidaysTable.module.scss';

export const HolidaysTable: React.FC<HolidaysType> = (props) => {
  const { number, name, date, weekday, isPublic } = props;
  return (
    <div className={styles.holidaysTableContainer}>
      <NumberCell number={number} />
      <NameCell name={name} />
      <DateCell date={date} />
      <WeekdayCell weekday={weekday} />
      <PublicCell isPublic={isPublic} />
    </div>
  );
};
