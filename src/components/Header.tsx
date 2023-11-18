import React from 'react';

type HeaderPropsType = {
  readonly title: string;
};

const Header: React.FC<HeaderPropsType> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default Header;
