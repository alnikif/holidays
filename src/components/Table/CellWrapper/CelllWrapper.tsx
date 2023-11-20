import React, { ReactNode } from 'react';
import styles from './CellWrapper.module.scss';

type CellWrapperPropsType = {
  readonly children: ReactNode;
};

export const CellWrapper: React.FC<CellWrapperPropsType> = ({ children }) => {
  return <div className={styles.CellContainer}>{children}</div>;
};
