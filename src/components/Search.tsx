import React from 'react';

type SearchPropsType = {
  readonly value: string;
  readonly onChange: (e: { target: { value: string } }) => void;
};

export const Search: React.FC<SearchPropsType> = ({ value, onChange }) => {
  return <input type="text" value={value} onChange={onChange} />;
};
