import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Storage from '../pages/Storage';
import Admin from '../pages/Admin';
import Auth from '../pages/Auth';
import NavBar from './NevBar';


import UserStore from '../store/UserStore'; 

function AppRouter() {

  const user = UserStore.user.role;
 
  return (
    <>
      {(user === 'ADMIN' || user === 'USER') && <NavBar />}
      <Routes>
        <Route path="/storage" element={user === 'ADMIN' ? <Navigate to="/admin"/> : <Storage /> } // {isAuth ? <Storage /> : <Navigate to="/auth" replace />}
        /> 
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={user === 'ADMIN' ? <Admin /> : <Navigate to='/storage'/>} />
        
        <Route path="*" element={<Navigate to={user ? "/storage" : "/auth"} replace />} />
      </Routes>
    </>
  );
}

export default AppRouter;
