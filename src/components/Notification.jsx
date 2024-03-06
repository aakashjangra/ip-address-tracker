import React, { useState, useEffect } from 'react';
import './Notification.css'; // Import CSS for notification styling

function Notification({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Hide notification after 5 seconds
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div className={`notification ${isVisible ? 'show' : ''}`}>
      {message}
    </div>
  );
}

export default Notification;
