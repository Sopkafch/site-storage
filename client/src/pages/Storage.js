import React, { useState, useEffect } from 'react';
import { storage, downloadFile } from "../api/router";
import './css/storage.css';

function Storage() {
  const [files, setFiles] = useState([]); // фалы
  const [error, setError] = useState(null); // ошибка
  const [loading, setLoading] = useState(true); // загрузка
  const [search, setSearch] = useState(''); // поисковая строка

  useEffect(() => {
    const file = async () => {
      try {
        const res = await storage();

        if (res) {
          setLoading(false);
        }
        setFiles(res);

      } catch (err) {
        if (err.response?.status === 401) { // если server ответил с кодом (401 - не авторизован) перекидывает на /login
          window.location.href = '/login';
        } else {
          setError('Попробуйте позже');
        }
      }
    };
    file();
  }, []);

  // Фильтруем файлы по оригинальному имени
  const filteredFiles = files.filter(file => // (.filter - как .map) он говорит: "перебирает files и записать каждый отдельный элемент в file и если он будет = true то записать его в filteredFiles"
    file.originalName.toLowerCase().includes(search.toLowerCase()) // он говорит: "если file.originalName.с_нижним_регистром включает в себя search.с_нижним_регистром то true"
  );

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="storage-container">
      <h2>📂 Файлы</h2>
  
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
              <span>📄 {file.originalName}</span>
              <button onClick={() => downloadFile(file.id)}>Скачать</button>
            </li>
          ))
        ) : (
          <p>Ничего не найдено</p>
        )}
      </ul>
    </div>
  );

}

export default Storage;


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
