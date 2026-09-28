import { Modal } from './Modal';
export function TrailerModal({
  youtubeId,
  title,
  onClose,
}: {
  youtubeId: string;
  title: string;
  onClose(): void;
}) {
  return (
    <Modal onClose={onClose} label={`Трейлер фильма ${title}`} wide>
      <div className="trailer">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={`Трейлер ${title}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <div className="trailer__caption">{title}</div>
      </div>
    </Modal>
  );
}
