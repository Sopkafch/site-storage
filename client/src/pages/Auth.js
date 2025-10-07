import React, { useState } from 'react'; 
import './css/auth.css';
// import { jwtDecode } from "jwt-decode";
import { login } from '../api/router';

import UserStore from '../store/UserStore';

const LoginForm = () => {
  const [email, setEmail] = useState(''); // переменная email, что бы изменить этот email используется setEmail, useState - он гворит "что это хук и он по факту обновляет деномично email"
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  
  const handleSubmit = async(e) => {
    e.preventDefault(); // не обновляет страницу
    
    try{
      await login(email, password) // делает запрос к базе данных тоже самое как -  const res = await axios.post(`localhost:3000/user/login`, {email, password})
      setError('');
      
      if(UserStore.user.role === 'ADMIN'){
        window.location.href = '/admin' // перекидывает на страницу с файлами
      } 

      window.location.href = '/storage'
    } catch(err) {
        if (err.response && err.response.status === 401) {
          setError('Неверный логин или пароль');
        } else {
          setError('Произошла ошибка. Попробуйте позже.');
    }
}

  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
          required
        />

        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          required
        />

        <button type="submit">Войти</button> 
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

// строка 46 "type="submit" вызывает функцию handleSubmit, это происходит блогодоря строке 25 "on ={handleSubmit}"

export default LoginForm;