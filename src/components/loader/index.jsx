import React from 'react'
import "./styles.scss";

const Loader = ({ text }) => {
  return (
    <p className="loading-text">{text}</p>
  );
}
 
export default Loader;