import React from 'react';
import { NumberCell } from '../../components/Table/NumberCell';
import { NameCell } from '../../components/Table/NameCell';
import { HolidaysType } from './Holidays';
import { DateCell } from '../../components/Table/DateCell';
import { WeekdayCell } from '../../components/Table/WeekdayCell';
import { PublicCell } from '../../components/Table/PublicCell';
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
