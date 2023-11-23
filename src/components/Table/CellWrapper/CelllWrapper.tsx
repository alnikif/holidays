import React, { ReactNode } from 'react';
import styles from './CellWrapper.module.scss';

type CellWrapperPropsType = {
  readonly children: ReactNode | ReactNode[];
  readonly width?: number;
};

export const CellWrapper: React.FC<CellWrapperPropsType> = ({ width, children }) => {
  return (
    <div className={styles.CellContainer} style={{ width }}>
      {children}
    </div>
  );
};
