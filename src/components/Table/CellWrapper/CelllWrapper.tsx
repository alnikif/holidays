import React, { ReactNode } from 'react';
import './CellWrapper.scss';

type CellWrapperPropsType = {
  readonly children: ReactNode;
};

export const CellWrapper: React.FC<CellWrapperPropsType> = ({ children }) => {
  return <div className="CellContainer">{children}</div>;
};
