import React, { useState } from 'react';
import { registerUser } from "../api/router";
import './css/admin.css';

function UserRegistrationForm({ onClose, onUserAdded }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email: login, password, role };
      const users = await registerUser(newUser); // предположим, registerUser - это запрос на сервер
      onUserAdded(users); // передаём нового пользователя в родительский компонент
      onClose(); // закрываем форму

    } catch (err) {
      setError('Попробуйте позже');
      console.log(err)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Добавить пользователя</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleAddUser} className="modal-form">
          <label>
            Email:
            <input
              name="email"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </label>
          <label>
            Пароль:
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Роль:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegistrationForm;
