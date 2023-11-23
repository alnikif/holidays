import React from 'react';
import { CellType } from '../CellType';
import { NameCell } from '../Cells/NameCell';
import { ImageCell } from '../Cells/ImageCell';
import { CodeCell } from '../Cells/CodeCell';
import { CurrenciesListCell } from '../Cells/CurrenciesListCell';
import { LanguagesListCell } from '../Cells/LanguagesListCell';
import { LinkCell } from '../Cells/LinkCell';
import styles from './BodyRow.module.scss';
import { DateCell } from '../Cells/DateCell';
import { WeekdayCell } from '../Cells/WeekdayCell';
import { PublicCell } from '../Cells/PublicCell';
import { CellWrapper } from '../CellWrapper/CelllWrapper';
import { HeaderCellType } from '../HeaderRow/HeaderRow';

export type BodyCellType = {
  key: string;
  columnKey: string;
  cellType: CellType;
  value: unknown;
};

export type BodyRowType = {
  key: string;
  cells: BodyCellType[];
};

export type ColumnDetailsType = Record<string, HeaderCellType>;

type BodyRowCellType = {
  readonly bodyRow: BodyRowType;
  readonly columnDetailsMap: ColumnDetailsType;
};

export const BodyRows: React.FC<BodyRowCellType> = (props) => {
  const { bodyRow, columnDetailsMap } = props;

  return (
    <div className={styles.bodyRowContainer}>
      {bodyRow.cells.map((bodyCell: BodyCellType) => {
        const { width } = columnDetailsMap[bodyCell.columnKey];
        const cellContent = () => {
          switch (bodyCell.cellType) {
            case CellType.index:
              return String(bodyCell.value);
            case CellType.name:
              return <NameCell name={bodyCell.value as string} />;
            case CellType.flag:
              return <ImageCell flag={bodyCell.value as string} />;
            case CellType.code:
              return <CodeCell code={bodyCell.value as string} />;
            case CellType.currencies:
              return <CurrenciesListCell currenciesListCell={bodyCell.value as Record<string, string>[]} />;
            case CellType.languages:
              return <LanguagesListCell languagesListCell={bodyCell.value as string[]} />;
            case CellType.link:
              return <LinkCell linkUrl={bodyCell.value as string} />;
            case CellType.date:
              return <DateCell date={bodyCell.value as string} />;
            case CellType.weekday:
              return <WeekdayCell weekday={bodyCell.value as string} />;
            case CellType.public:
              return <PublicCell isPublic={bodyCell.value as boolean} />;
            default:
              null;
          }
        };

        return (
          <CellWrapper key={String(bodyCell.value)} width={width}>
            {cellContent()}
          </CellWrapper>
        );
      })}
    </div>
  );
};
