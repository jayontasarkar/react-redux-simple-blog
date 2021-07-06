import React from 'react'

const Button = ({ type, label, variant, onClick }) => {
  return (
    <button 
        type={ type || 'button' } 
        className={'button button-' + (variant || 'primary')} 
        onClick={onClick}
    >{label || 'Save'}</button>
  );
}
 
export default Button;