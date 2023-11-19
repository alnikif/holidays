import React from 'react';
import { CellWrapper } from './CellWrapper/CelllWrapper';

type ImageCellProps = {
  readonly flag: string;
};

export const ImageCell: React.FC<ImageCellProps> = ({ flag: imageFlagUrl }) => {
  return (
    <CellWrapper>
      <img src={imageFlagUrl} alt="Flag" />
    </CellWrapper>
  );
};
