import React, { useState, useEffect } from 'react';
import { storage, downloadFile, user, uploadFile, dellFile, dellUser } from "../api/router";
import './css/admin.css';
import UserRegistrationForm from './UserRegistrationForm';

function Admin() { 
  const [files, setFiles] = useState([]); // фалы
  const [error, setError] = useState(null); // ошибка
  const [loading, setLoading] = useState(true); // загрузка
  const [search, setSearch] = useState(''); // поисковая строка
  const [users, setUsers] = useState('') // поьзователи
  const [isModalOpen, setIsModalOpen] = useState(false); // форма создания пользователя 
  useEffect(() => {
    const file = async () => {
      try {
        const res = await storage();
        const users = await user();
        
        setUsers(users)
        if (res) {
          setLoading(false);
        }
        setFiles(res);
      } catch (err) {
        if (err.response?.status === 401 || 403) {
          window.location.href = '/login';
        } else {
          setError('Попробуйте позже');
        }
      }
    };
    file();
  }, []);
  const uploadfile = async(event) => {
    const file = event.target.files[0]
    if (file){ // Проверяет, загрузили ли мы файл в браузер | если этого не сделать то браузер будет отпровлять на сервер пйстой формат и сервер будет отвечать ошибкой что не ок
      const formData = new FormData();
      formData.append('file', file);
      const files = await uploadFile(formData)
      setFiles(files)
    }

  }
  const dellfile = async(id) => {
    try{
      const files = await dellFile(id)
      setFiles(files)
    }catch(e){
      console.log(e)
    }
  }
  // Фильтруем файлы по оригинальному имени
  const filteredFiles = files.filter(file => // (.filter - как .map) он говорит: "перебирает files и записать каждый отдельный элемент в file и если он будет = true то записать его в filteredFiles"
    file.originalName.toLowerCase().includes(search.toLowerCase()) // он говорит: "если file.originalName.с_нижним_регистром включает в себя search.с_нижним_регистром то true"
  );
  const userDell = async(id) => {
    const users = await dellUser(id)
    setUsers(users)
  }
  if (loading) return <div>Загрузка...</div>;
  return (
    <div className="main-layout">
      <aside className="sidebar">
        <h3>Пользователи</h3>
        {/* Кнопка для добавления нового пользователя */}
        <button className="btn-add-user" onClick={() => setIsModalOpen(true)}> 
          Добавить
        </button>
        {/*              ФОРМА               */}
        {isModalOpen && (
          <UserRegistrationForm 
            onClose={() => setIsModalOpen(false)} 
            onUserAdded={(updatedUsers) => setUsers(updatedUsers)} 
          />
        )}
        {/*              ПОЛЬЗОВАТЕЛИ               */}
      <ul className="user-list">
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.id} className="user-item">
              <span className="user-email">{user.email}</span>
              <button className="btn-delete-user" onClick={() => userDell(user.id)}>Удалить</button>
            </li>
          ))
        ) : (
          <p>Нет пользователей</p>
        )}
      </ul>
      </aside>
      {/*              ФАЙЛЫ               */}   
      <div className="storage-container">
        <h2>📂 Файлы на сервере</h2>
        <div className="upload-section">
          <label className="upload-file">
            Загрузить файл
            <input type="file" onChange={uploadfile} hidden />
          </label>
        </div>
        <input
          type="text"
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <ul className="file-list">
          {filteredFiles.length > 0 ? (
            filteredFiles.map(file => (
              <li key={file.id} className="file-item">
                <span className="file-name">📄 {file.originalName}</span>
                <div className="file-actions">
                  <button className="btn-download" onClick={() => downloadFile(file.id)}>Скачать</button>
                  <button className="btn-delete" onClick={() => dellfile(file.id)}>Удалить</button>
                </div>
              </li>
            ))
          ) : (
            <p>Ничего не найдено</p>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Admin;


  /*

    Что происходит по шагам:

    Пользователь вводит текст в <input>
      → onChange срабатывает
      → setSearch(e.target.value) обновляет значение search.

    React видит, что состояние (search) изменилось
      → Перерисовывает компонент Storage.

    Во время перерисовки:
      Снова вычисляется filteredFiles = files.filter(...), потому что это обычная переменная внутри тела компонента.
      JSX в return снова отрисовывается, уже с новым filteredFiles.
      Итог: Отображается только то, что соответствует текущему search.

  */
