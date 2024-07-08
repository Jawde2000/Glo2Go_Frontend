import React, { useState, useEffect } from 'react';
import { Snackbar } from '@mui/material';

const Toast = ({ message, duration = 3000, open, onClose }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
        onClose();
      }, duration);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, duration, onClose]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration}
      onClose={() => {
        setIsOpen(false);
        onClose();
      }}
      message={message}
    />
  );
};

export default Toast;
