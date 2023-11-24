import React from 'react';
import styles from './Table.module.scss';
import { HeaderCellType, HeaderRow } from './HeaderRow/HeaderRow';
import { BodyRows, BodyRowType } from './BodyRow/BodyRows';

type TableProps = {
  readonly title: string;
  readonly headerRow: HeaderCellType[];
  readonly bodyRows: BodyRowType[];
};

export const Table: React.FC<TableProps> = (props) => {
  const { title, headerRow, bodyRows } = props;

  const columnDetailsMap = headerRow.reduce((acc, headerCell) => ({ ...acc, [headerCell.key]: headerCell }), {});

  return (
    <div className={styles.countriesTableContainer}>
      <h1>{title}</h1>
      <HeaderRow headerRow={headerRow} />

      <div>
        {bodyRows.map((bodyRow) => (
          <BodyRows key={bodyRow.key} bodyRow={bodyRow} columnDetailsMap={columnDetailsMap} />
        ))}
      </div>
    </div>
  );
};
