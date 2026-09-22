import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { MailIcon, UserIcon } from './Icons';
import { Modal } from './Modal';

export function AuthModal({ onClose }: { onClose(): void }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const fields = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    if (Object.values(fields).some((value) => !value.trim())) {
      setError('Заполните все поля');
      setBusy(false);
      return;
    }
    if (mode === 'register' && fields.password !== fields.confirmPassword) {
      setError('Пароли не совпадают');
      setBusy(false);
      return;
    }
    try {
      if (mode === 'login') await login({ email: fields.email, password: fields.password });
      else {
        await register({
          name: fields.name,
          surname: fields.surname,
          email: fields.email,
          password: fields.password,
        });
        setSuccess(true);
      }
      if (mode === 'login') onClose();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Не удалось продолжить');
    } finally {
      setBusy(false);
    }
  };

  if (success)
    return (
      <Modal onClose={onClose} label="Регистрация завершена">
        <div className="auth auth--success">
          <Logo />
          <h2>Регистрация завершена</h2>
          <p>Используйте вашу электронную почту для входа.</p>
          <button className="button button--primary" onClick={onClose}>
            Войти
          </button>
        </div>
      </Modal>
    );
  return (
    <Modal onClose={onClose} label={mode === 'login' ? 'Вход' : 'Регистрация'}>
      <form className="auth" onSubmit={submit} noValidate>
        <Logo />
        <h2>{mode === 'register' ? 'Регистрация' : 'Вход'}</h2>
        {mode === 'register' && (
          <>
            <label className="field">
              <UserIcon />
              <input name="name" placeholder="Имя" aria-label="Имя" />
            </label>
            <label className="field">
              <UserIcon />
              <input name="surname" placeholder="Фамилия" aria-label="Фамилия" />
            </label>
          </>
        )}
        <label className="field">
          <MailIcon />
          <input
            name="email"
            type="email"
            placeholder="Электронная почта"
            aria-label="Электронная почта"
          />
        </label>
        <label className="field">
          <span className="field__lock">●</span>
          <input name="password" type="password" placeholder="Пароль" aria-label="Пароль" />
        </label>
        {mode === 'register' && (
          <label className="field">
            <span className="field__lock">●</span>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Подтвердите пароль"
              aria-label="Подтвердите пароль"
            />
          </label>
        )}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button button--primary" disabled={busy}>
          {busy ? 'Подождите…' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
        </button>
        <button
          className="auth__switch"
          type="button"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login');
            setError('');
          }}
        >
          {mode === 'login' ? 'Регистрация' : 'У меня есть пароль'}
        </button>
      </form>
    </Modal>
  );
}
