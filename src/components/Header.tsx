import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { MenuIcon, SearchIcon } from './Icons';
import { AuthModal } from './AuthModal';
import { SearchModal } from './SearchModal';

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header className="header">
        <Logo />
        <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Основная навигация">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Главная
          </NavLink>
          <NavLink to="/genres" onClick={() => setMenuOpen(false)}>
            Жанры
          </NavLink>
        </nav>
        <button className="header__search" onClick={() => setSearchOpen(true)}>
          <SearchIcon />
          <span>Поиск</span>
        </button>
        <button
          className="header__account"
          onClick={() => (user ? navigate('/account') : setAuthOpen(true))}
        >
          {user ? user.name : 'Войти'}
        </button>
        <button
          className="header__menu icon-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <MenuIcon />
        </button>
      </header>
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
