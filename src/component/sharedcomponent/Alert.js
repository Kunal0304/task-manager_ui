import React, { useEffect } from 'react';

export default function Alert({ setAlert, message, statusCode }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setAlert]);

  // Define the color scheme based on the status code
  let backgroundColor, textColor;
  if (statusCode === 200) {
    backgroundColor = '#d1e7dd';
    textColor = '#0f5132';
  } else if (statusCode >= 400 && statusCode < 500) {
    backgroundColor = '#f8d7da';
    textColor = '#721c24';
  } else if (statusCode >= 500) {
    backgroundColor = '#f8d7da';
    textColor = '#721c24';
  } else {
    backgroundColor = '#fff3cd';
    textColor = '#856404';
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        backgroundColor: backgroundColor,
        color: textColor,
        padding: '10px 20px',
        border: `1px solid ${textColor}`,
        borderRadius: '5px',
        textAlign: 'center',
        maxWidth: '300px',
        width: '100%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontSize: '14px',
      }}
      role="alert"
    >
      <strong className="font-bold">
        {statusCode === 200
          ? 'Success!'
          : statusCode >= 400 && statusCode < 500
            ? 'Error!'
            : statusCode >= 500
              ? 'Server Error!'
              : 'Warning!'}
      </strong>
      <p className="ml-2">{message }</p>
    </div>
  );
}
