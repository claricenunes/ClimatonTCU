import { useEffect, useRef, type ReactNode } from "react";
import { IconX } from "../../lib/icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidthClass?: string;
}

export function Modal({ open, onClose, title, children, maxWidthClass = "max-w-lg" }: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-[#0b1f10]/50 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`surface relative z-10 max-h-[85vh] w-full ${maxWidthClass} animate-scale-in overflow-y-auto rounded-2xl border border-[#d7e8da] bg-white p-6 shadow-xl`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-xl font-bold text-[#17301c]">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Fechar janela"
            className="-m-1.5 shrink-0 rounded-lg p-1.5 text-[#3f5b45] hover:bg-brand-50 hover:text-brand-800"
          >
            <IconX className="size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
