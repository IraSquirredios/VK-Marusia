interface AssetIconProps {
  name: string;
  className?: string;
}

function AssetIcon({ name, className }: AssetIconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <use href={`/assets/icons/icons.svg#${name}`} />
    </svg>
  );
}

export const SearchIcon = () => <AssetIcon name="search" />;

export const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <AssetIcon name={filled ? 'favorite-on' : 'favorite-off'} className={filled ? 'filled' : ''} />
);
export const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 7v5h-5M4 17v-5h5" />
    <path d="M6.1 9a7 7 0 0 1 11.8-2L20 12M4 12l2.1 5a7 7 0 0 0 11.8-2" />
  </svg>
);
export const CloseIcon = () => <AssetIcon name="close" />;
export const UserIcon = () => <AssetIcon name="user-outline" />;
export const MailIcon = () => <AssetIcon name="mail" />;
export const BackIcon = () => <AssetIcon name="chevron" />;
export const MenuIcon = () => <AssetIcon name="burger" />;
export const GenresIcon = () => <AssetIcon name="genres" />;
export const PlayIcon = () => <AssetIcon name="play" />;
export const VkIcon = () => <AssetIcon name="vk" />;
export const YoutubeIcon = () => <AssetIcon name="youtube" />;
export const OkIcon = () => <AssetIcon name="ok" />;
export const TelegramIcon = () => <AssetIcon name="telegram" />;
