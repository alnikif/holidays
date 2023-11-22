import React from 'react';
import { CellType } from './CellType';
import styles from './Table.module.scss';
import { HeaderRow } from './HeaderRow/HeaderRow';
import { BodyRows } from './BodyCountriesRow/BodyCountriesRow';

export type HeaderCellType = {
  key: string;
  label: string;
  cellType: CellType;
};

export type BodyCellType = {
  key: string;
  cellType: CellType;
  value: string | number | (string | number)[] | Record<string, string>[];
};

export type BodyRowType = {
  key: string;
  cells: BodyCellType[];
};

type TableProps = {
  readonly title: string;
  readonly headerRow: HeaderCellType[];
  readonly bodyRows: BodyRowType[];
};

export const Table: React.FC<TableProps> = (props) => {
  const { title, headerRow, bodyRows } = props;

  return (
    <div className={styles.countriesTableContainer}>
      <div>{title}</div>
      <HeaderRow headerRow={headerRow} />

      {bodyRows.map((bodyRow, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <BodyRows key={index} bodyRow={bodyRow} />
      ))}
    </div>
  );
};
