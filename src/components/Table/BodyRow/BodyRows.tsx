import React from 'react';
import { CellType } from '../CellType';
import { NameCell } from '../Cells/NameCell';
import { ImageCell } from '../Cells/ImageCell';
import { CodeCell } from '../Cells/CodeCell';
import { CurrenciesListCell } from '../Cells/CurrenciesListCell';
import { LanguagesListCell } from '../Cells/LanguagesListCell';
import { LinkCell } from '../Cells/LinkCell';
import { BodyCellType, BodyRowType } from '../Table';
import styles from './BodyRow.module.scss';
import { DateCell } from '../Cells/DateCell';
import { WeekdayCell } from '../Cells/WeekdayCell';
import { PublicCell } from '../Cells/PublicCell';

type BodyRowCellType = {
  readonly bodyRow: BodyRowType;
};
export const BodyRows: React.FC<BodyRowCellType> = (props) => {
  const { bodyRow } = props;

  return (
    <div className={styles.bodyRowContainer}>
      {bodyRow.cells.map((bodyCell: BodyCellType) => {
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
          case CellType.date:
            return <DateCell key={String(bodyCell.value)} date={bodyCell.value as string} />;
          case CellType.weekday:
            return <WeekdayCell key={String(bodyCell.value)} weekday={bodyCell.value as string} />;
          case CellType.public:
            return <PublicCell key={String(bodyCell.value)} isPublic={bodyCell.value as string} />;
          default:
            null;
        }
      })}
    </div>
  );
};
