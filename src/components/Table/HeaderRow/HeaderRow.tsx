import React from 'react';
import { NameCell } from '../Cells/NameCell';
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
    <>
      {headerRow.map((headerCell) => (
        <CellWrapper key={headerCell.key}>
          <NameCell name={headerCell.label} />
        </CellWrapper>
      ))}
    </>
  );
};
