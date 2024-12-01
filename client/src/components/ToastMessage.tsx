/**
 * A simple toast message component that displays a message in a styled container.
 *
 * @param message - The message to display in the toast.
 * @returns A React component that renders the toast message.
 */
import React from 'react';
import styles from '../styles/ToastMessage.module.scss';

interface ToastMessageProps {
  message: string;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message }) => (
  <div className={styles.toast}>
    {message}
  </div>
);

export default ToastMessage;
