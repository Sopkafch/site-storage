import React, {useEffect, useState} from 'react'
import { BrowserRouter } from 'react-router-dom';

import { auth } from './api/router';
import UserStore from './store/UserStore';
import AppRouter from './components/AppRouter';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lol = async () => {
      try {
        const decodeToken = await auth();

        UserStore.setUser(decodeToken);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        if (window.location.pathname !== '/login') { // если пользователь не находится на странице /login то перебросить его /\ сделано для того что бы избежать бесконечного цикла || Переход на /login вызывает перезагрузку всей страницы, App монтируется заново → снова auth() → снова 401 → снова redirect → бесконечный цикл.
          window.location.href = '/login';
          
        }
      }
    };
    lol();
  }, []);

  if (loading) return <div>Загрузка...</div>; // <-- блокируем отрисовку AppRouter | Ползволяет получить данные с сервера про пользователя!

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
