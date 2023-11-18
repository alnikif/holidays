import React from 'react';

type ImageCellProps = {
  readonly flag: string;
};

export const ImageCell: React.FC<ImageCellProps> = ({ flag: imageFlagUrl }) => {
  return (
    <div>
      <img src={imageFlagUrl} alt="Flag" />
    </div>
  );
};
