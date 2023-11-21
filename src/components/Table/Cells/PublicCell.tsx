import React from 'react';
import { CellWrapper } from '../CellWrapper/CelllWrapper';

export type PublicCellProps = {
  readonly isPublic: boolean;
};

export const PublicCell: React.FC<PublicCellProps> = ({ isPublic }) => {
  return <CellWrapper>{isPublic ? 'Public' : ''}</CellWrapper>;
};
