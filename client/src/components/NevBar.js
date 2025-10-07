import React from 'react';
import './navbar.css';
import UserStore from '../store/UserStore';

import { logout } from '../api/router';

function NavBar() {
  const user = UserStore.user.role
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
      {(user === 'ADMIN' || user === 'USER') && (
        <>
          <div className="nav-left">📂 Файлы</div>    
          <button className="logout-button" onClick={handleLogout}>
            Выйти
          </button>
        </>
      )}
    </nav>
  );

}

export default NavBar;


