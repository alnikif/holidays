import React, { useState } from 'react';
import styles from './NotificationError.module.scss';

type NotificationProps = {
  readonly message: string;
  readonly title: string;
};

export const NotificationError: React.FC<NotificationProps> = ({ message, title }) => {
  return (
    <div className={styles.notification__container}>
      <p>{title}</p>
      <p className={styles.errorMsg}>{message}</p>
    </div>
  );
};
