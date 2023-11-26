import React, { ChangeEvent } from 'react';
import { inspect } from 'util';
import styles from './Search.module.scss';

type SearchPropsType = {
  readonly value: string;
  readonly title: string;
  readonly onChange: (nextValue: string) => void;
};

export const Search: React.FC<SearchPropsType> = ({ value, title, onChange }) => {
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  return (
    <div className={styles.searchContainer}>
      <p>{title}</p>
      <input type="text" value={value} onChange={onChangeInput} />
    </div>
  );
};
