import React from 'react';
import { NameCell } from '../Cells/NameCell';
import { HeaderCellType } from '../Table';
import styles from './HeaderRow.module.scss';

type HeaderRowCellType = {
  readonly headerRow: HeaderCellType[];
};

export const HeaderRow: React.FC<HeaderRowCellType> = (props) => {
  const { headerRow } = props;
  return (
    <div className={styles.headerRowWrapper}>
      {headerRow.map((headerCell) => (
        <NameCell key={headerCell.key} name={headerCell.label} />
      ))}
    </div>
  );
};
