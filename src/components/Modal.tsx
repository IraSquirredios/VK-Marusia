import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './Icons';

export function Modal({
  children,
  onClose,
  wide = false,
  label,
}: {
  children: ReactNode;
  onClose(): void;
  wide?: boolean;
  label: string;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', close);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', close);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);
  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-label={label} onMouseDown={onClose}>
      <div
        className={`modal__body ${wide ? 'modal__body--wide' : ''}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal__close icon-button" onClick={onClose} aria-label="Закрыть">
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!,
  );
}
