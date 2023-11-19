import React from 'react';
import { CellWrapper } from './CellWrapper/CelllWrapper';

type LanguagesListCellProps = {
  readonly languagesListCell: string[];
};

export const LanguagesListCell: React.FC<LanguagesListCellProps> = ({ languagesListCell }) => {
  return (
    <CellWrapper>
      props=
      {languagesListCell.map((el) => {
        return <span key={el}>{el}</span>;
      })}
    </CellWrapper>
  );
};
