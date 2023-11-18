import React from 'react';

type CodeCellProps = {
  readonly code: string | number;
};

export const CodeCell: React.FC<CodeCellProps> = ({ code }) => {
  return <div>{code}</div>;
};
