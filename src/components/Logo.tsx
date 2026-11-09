import { Link } from 'react-router-dom';
export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="VK Маруся, на главную">
      <span className="logo__art" aria-hidden="true">
        <img className="logo__orb" src={`${import.meta.env.BASE_URL}assets/icons/marusia-orb-cropped.png`} alt="" />
        <img className="logo__word" src={`${import.meta.env.BASE_URL}assets/icons/marusia-logo.svg`} alt="" />
      </span>
    </Link>
  );
}
