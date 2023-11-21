import React from 'react';
import { CellWrapper } from '../CellWrapper/CelllWrapper';

type CurrenciesListCellProps = {
  readonly currenciesListCell: Record<string, string>[];
};

export const CurrenciesListCell: React.FC<CurrenciesListCellProps> = ({ currenciesListCell }) => {
  return (
    <CellWrapper>
      {currenciesListCell.map((el, i) => (
        <span key={el.alpha}>{el.alpha}</span>
      ))}
    </CellWrapper>
  );
};
