import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-logo">POSTAPP</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/posts" className="nav-link">Posts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
 
export default Navigation;