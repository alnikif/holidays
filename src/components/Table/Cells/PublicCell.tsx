import React from 'react';

export type PublicCellProps = {
  readonly isPublic: boolean;
};

export const PublicCell: React.FC<PublicCellProps> = ({ isPublic }) => {
  return <div>{isPublic ? 'Public' : ''}</div>;
};
