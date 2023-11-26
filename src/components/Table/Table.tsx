import React from 'react';
import styles from './Table.module.scss';
import { HeaderCellType, HeaderRow } from './HeaderRow/HeaderRow';
import { BodyRows, BodyRowType } from './BodyRows/BodyRows';

type TableProps = {
  readonly title: string;
  readonly headerRow: HeaderCellType[];
  readonly bodyRows: BodyRowType[];
};

export const Table: React.FC<TableProps> = (props) => {
  const { title, headerRow, bodyRows } = props;

  const gridTemplateColumns = headerRow.reduce((acc, cellConfig) => `${acc} ${cellConfig.width}fr`, '');

  return (
    <div className={styles.tableContainer}>
      <h1>{title}</h1>

      <div className={styles.tableWrapper} style={{ gridTemplateColumns }}>
        <HeaderRow headerRow={headerRow} />
        <>
          {bodyRows.map((bodyRow) => (
            <BodyRows key={bodyRow.key} bodyRow={bodyRow} />
          ))}
        </>
      </div>
    </div>
  );
};
