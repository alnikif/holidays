import React from 'react';

type LanguagesListCellProps = {
  readonly languagesListCell: string[];
};

export const LanguagesListCell: React.FC<LanguagesListCellProps> = ({ languagesListCell }) => {
  return (
    <div>
      {languagesListCell.map((el) => {
        return <span key={el}>{el}</span>;
      })}
    </div>
  );
};
