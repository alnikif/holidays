import React, { ChangeEvent } from 'react';

type SearchPropsType = {
  readonly value: string;
  readonly onChange: (nextValue: string) => void;
};

export const Search: React.FC<SearchPropsType> = ({ value, onChange }) => {
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);
  return <input type="text" value={value} onChange={onChangeInput} />;
};
