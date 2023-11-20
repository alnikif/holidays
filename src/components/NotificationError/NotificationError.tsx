import React, { useState, useEffect, useRef } from 'react';
import styles from './NotificationError.module.scss';

type NotificationProps = {
  readonly title: string;
  readonly message: string | undefined;
};

export const NotificationError: React.FC<NotificationProps> = ({ message, title }) => {
  const isShownRef = useRef(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (message && !isShownRef.current) {
      setShowNotification(true);
      isShownRef.current = true;
    }

    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message, showNotification]);

  if (!showNotification) return null;

  return (
    <div className={styles.notification__container}>
      <p>{title}</p>
      <p className={styles.errorMsg}>{message}</p>
    </div>
  );
};
