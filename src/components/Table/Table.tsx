import React from 'react';
import { CellType } from './CellType';
import { NameCell } from './Cells/NameCell';
import { ImageCell } from './Cells/ImageCell';
import { CodeCell } from './Cells/CodeCell';
import { CurrenciesListCell } from './Cells/CurrenciesListCell';
import { LanguagesListCell } from './Cells/LanguagesListCell';
import { LinkCell } from './Cells/LinkCell';
import styles from './Table.module.scss';
import { HeaderRow } from './HeaderRow/HeaderRow';

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

      <div className={styles.tableBodyContainer}>
        {bodyRows.map((bodyRow, index) => (
          <div key={bodyRow.key} className={styles.bodyRowContainer}>
            {bodyRow.cells.map((bodyCell) => {
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
