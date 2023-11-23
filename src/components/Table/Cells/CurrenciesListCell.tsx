import React from 'react';

type CurrenciesListCellProps = {
  readonly currenciesListCell: Record<string, string>[];
};

export const CurrenciesListCell: React.FC<CurrenciesListCellProps> = ({ currenciesListCell }) => {
  return (
    <div>
      {currenciesListCell.map((el, i) => (
        <span key={el.alpha}>{el.alpha}</span>
      ))}
    </div>
  );
};
