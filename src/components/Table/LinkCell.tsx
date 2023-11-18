import React from 'react';
import { Link } from 'react-router-dom';

type LinkCellProps = {
  readonly linkUrl: string;
};

export const LinkCell: React.FC<LinkCellProps> = ({ linkUrl }) => {
  return (
    <div>
      <Link to={`/holidays/${linkUrl}`}>View holiday list</Link>
    </div>
  );
};
