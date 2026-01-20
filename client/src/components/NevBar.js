import React from 'react';
import './navbar.css';

import { logout } from '../api/router';

function NavBar() {
  const handleLogout = async() => {
    try{
      await logout()
      window.location.href = '/login';
    } catch(e){
      console.log(e)
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left"></div>

      <button className="logout-button" onClick={handleLogout}>
        Выйти
      </button>
    </nav>
  );
}

export default NavBar;
