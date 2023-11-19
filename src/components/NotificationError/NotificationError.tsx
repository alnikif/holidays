import React, { useState } from 'react';
import './NotificationError.scss';

type NotificationProps = {
  readonly message: string;
  readonly title: string;
};

export const NotificationError: React.FC<NotificationProps> = ({ message, title }) => {
  return (
    <div className="notification__container">
      <p>{title}</p>
      <p className="errorMsg">{message}</p>
    </div>
  );
};
