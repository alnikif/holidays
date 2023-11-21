import React from 'react';
import { CellType } from './CellType';
import { NameCell } from './Cells/NameCell';
import { ImageCell } from './Cells/ImageCell';
import { CodeCell } from './Cells/CodeCell';
import { CurrenciesListCell } from './Cells/CurrenciesListCell';
import { LanguagesListCell } from './Cells/LanguagesListCell';
import { LinkCell } from './Cells/LinkCell';
import styles from './Table.module.scss';

export type HeaderCellType = {
  label: string;
  cellType: CellType;
};

export type BodyCellType = {
  cellType: CellType;
  value: string | number | (string | number)[] | Record<string, string>[];
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
      <div className={styles.headerRowContainer}>
        {headerRow.map((headerCell) => (
          <NameCell key={headerCell.label} name={headerCell.label} />
        ))}
      </div>
      <div className={styles.tableBodyContainer}>
        {bodyRows.map((bodyRow, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={String(index)} className={styles.bodyRowContainer}>
            {bodyRow.map((bodyCell) => {
              switch (bodyCell.cellType) {
                case CellType.name:
                  return <NameCell key={String(bodyCell.value)} name={bodyCell.value as string} />;
                case CellType.flag:
                  return <ImageCell key={String(bodyCell.value)} flag={bodyCell.value as string} />;
                case CellType.code:
                  return <CodeCell key={String(bodyCell.value)} code={bodyCell.value as string} />;
                case CellType.currencies:
                  return <CurrenciesListCell key={bodyCell.cellType} currenciesListCell={bodyCell.value as Record<string, string>[]} />;
                case CellType.languages:
                  return <LanguagesListCell key={bodyCell.cellType} languagesListCell={bodyCell.value as string[]} />;
                case CellType.link:
                  return <LinkCell key={String(bodyCell.value)} linkUrl={bodyCell.value as string} />;
                default:
                  null;
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
