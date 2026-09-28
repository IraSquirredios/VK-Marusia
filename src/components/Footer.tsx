import { OkIcon, TelegramIcon, VkIcon, YoutubeIcon } from './Icons';

export function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 VK Маруся</p>
      <div className="footer__social">
        <a href="https://vk.com" aria-label="ВКонтакте">
          <VkIcon />
        </a>
        <a href="https://youtube.com" aria-label="YouTube">
          <YoutubeIcon />
        </a>
        <a href="https://ok.ru" aria-label="Одноклассники">
          <OkIcon />
        </a>
        <a href="https://t.me" aria-label="Telegram">
          <TelegramIcon />
        </a>
      </div>
    </footer>
  );
}
