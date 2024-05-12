import React from 'react';
import './Header.css';

function Header({ setView }) {
  return (
    <header className="header">
      <h1>PZ Cheeseria</h1>
      <nav>
        <ul>
          <li><a href="#create" onClick={() => setView('create')}>Create</a></li>
          <li><a href="#read" onClick={() => setView('read')}>Read</a></li>
          <li><a href="#update" onClick={() => setView('update')}>Update</a></li>
          <li><a href="#delete" onClick={() => setView('delete')}>Delete</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
