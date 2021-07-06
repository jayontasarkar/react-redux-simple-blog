import React from 'react';

const Alert = ({ message, variant, onClose }) => {
  return (
    <div className={'alert alert-' + (variant || 'primary')}>
      { message }
      {onClose && (
        <button type="button" onClick={onClose} className="alert-close">X</button>
      )}
    </div>
  );
}
 
export default Alert;