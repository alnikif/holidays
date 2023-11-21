import React from 'react';
import { CellType } from './CellType';

export type HeaderCellType = {
  label: string;
  cellType: CellType;
};

export type BodyCellType = {
  cellType: CellType;
  value: string | number;
};

type TableProps = {
  readonly title: string;
  readonly headerRow: HeaderCellType[];
  readonly bodyRows: BodyCellType[][];
};

export const Table: React.FC<TableProps> = (props) => {
  const { title, headerRow, bodyRows } = props;
  return (
    <div className={styles.countriesTableContainer}>
      <NumberCell number={number} />
      <NameCell name={name} />
      <ImageCell flag={flag} />
      <CodeCell code={code} />
      <CurrenciesListCell currenciesListCell={currencies} />
      <LinkCell linkUrl={code} />
    </div>
  );
};
