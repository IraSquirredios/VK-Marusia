import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MailIcon, UserIcon } from '../components/Icons';
import { Loader } from '../components/Loader';
import { MovieGrid } from '../components/MovieGrid';

export function AccountPage() {
  const { user, favorites, loading, logout, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'favorites' | 'settings'>('favorites');
  if (loading)
    return (
      <main className="page">
        <Loader />
      </main>
    );
  if (!user) return <Navigate to="/" replace />;
  const exit = async () => {
    await logout();
    navigate('/');
  };
  return (
    <main className="page">
      <div className="container">
        <h1 className="page__title">Мой аккаунт</h1>
        <div className="tabs">
          <button
            className={tab === 'favorites' ? 'active' : ''}
            onClick={() => setTab('favorites')}
          >
            ♡ <span>Избранные фильмы</span>
          </button>
          <button className={tab === 'settings' ? 'active' : ''} onClick={() => setTab('settings')}>
            <UserIcon />
            <span>Настройка аккаунта</span>
          </button>
        </div>
        {tab === 'favorites' ? (
          favorites.length ? (
            <MovieGrid movies={favorites} onRemove={toggleFavorite} />
          ) : (
            <div className="empty-state">
              <h2>Здесь пока пусто</h2>
              <p>Добавляйте фильмы в избранное, чтобы вернуться к ним позже.</p>
            </div>
          )
        ) : (
          <div className="profile">
            <div className="profile__row">
              <span className="profile__icon">
                {user.name[0]}
                {user.surname[0]}
              </span>
              <div>
                <small>Имя Фамилия</small>
                <strong>
                  {user.name} {user.surname}
                </strong>
              </div>
            </div>
            <div className="profile__row">
              <span className="profile__icon">
                <MailIcon />
              </span>
              <div>
                <small>Электронная почта</small>
                <strong>{user.email}</strong>
              </div>
            </div>
            <button className="button button--primary" onClick={exit}>
              Выйти из аккаунта
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
