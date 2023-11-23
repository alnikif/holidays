import React from 'react';
import { NameCell } from '../Cells/NameCell';
import styles from './HeaderCountriesRow.module.scss';
import { CellType } from '../CellType';
import { CellWrapper } from '../CellWrapper/CelllWrapper';

export type HeaderCellType = {
  key: string;
  label: string;
  cellType: CellType;
  width: number;
};

type HeaderRowCellType = {
  readonly headerRow: HeaderCellType[];
};

export const HeaderRow: React.FC<HeaderRowCellType> = (props) => {
  const { headerRow } = props;
  return (
    <div className={styles.headerRowWrapper}>
      {headerRow.map((headerCell) => (
        <CellWrapper key={headerCell.key} width={headerCell.width}>
          <NameCell name={headerCell.label} />
        </CellWrapper>
      ))}
    </div>
  );
};
