import { Cafe } from "@/lib/types";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";

export type CafeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cafe: Cafe | null;
};

const TRANSITION_MS = 200;

export function CafeModal({ isOpen, onClose, cafe }: CafeModalProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const portalEl = useMemo(() => {
    if (typeof window === "undefined") return null;
    return document.getElementById("modal-portal") ?? document.body;
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setShouldRender(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  function finishClose() {
    setIsClosing(false);
    setShouldRender(false);
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function startClose() {
    if (isClosing) return;

    setIsClosing(true);
    onClose();

    closeTimerRef.current = window.setTimeout(finishClose, TRANSITION_MS + 50);
  }

  useEffect(() => {
    if (!shouldRender) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") startClose();
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [shouldRender]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  if (!portalEl) return null;
  if (!shouldRender) return null;

  const backdropClasses = isClosing ? "opacity-0" : "opacity-100";
  const panelClasses = isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100";

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      onClick={startClose}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-200 ease-out dark:bg-black/60 ${backdropClasses}`}
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          if (isClosing) finishClose();
        }}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-lg rounded-2xl border border-amber-200/70 bg-white/90 p-5 shadow-xl transform transition duration-200 ease-out sm:p-6 dark:border-white/10 dark:bg-zinc-950/90 dark:shadow-2xl dark:shadow-black/40 ${panelClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {cafe ? cafe.name : "Cafe Details"}
            </h2>
            <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">
              {cafe ? cafe.location : "No cafe selected"}
            </p>
          </div>

          <button
            onClick={startClose}
            className="rounded-full border border-amber-200/70 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition focus:outline-none focus:ring-2 focus:ring-amber-300/60 dark:border-white/10 dark:bg-white/4 dark:text-zinc-200 dark:hover:bg-white/8 dark:focus:ring-violet-500/40"
          >
            Close
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/3">
          {cafe ? (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-amber-200/70 bg-amber-50/60 p-3 dark:border-white/10 dark:bg-white/3">
                  <div className="text-xs uppercase tracking-wide text-amber-900/60 dark:text-zinc-400">
                    Location
                  </div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {cafe.location}
                  </div>
                </div>

                <div className="rounded-xl border border-amber-200/70 bg-amber-50/60 p-3 dark:border-white/10 dark:bg-white/3">
                  <div className="text-xs uppercase tracking-wide text-amber-900/60 dark:text-zinc-400">
                    Overall rating
                  </div>
                  <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {cafe.ratings.overall} / 5
                  </div>
                </div>
              </div>

              <Link
                href={`/cafes/${cafe.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-600/90 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300/60 dark:bg-violet-500/90 dark:hover:bg-violet-500 dark:focus:ring-violet-500/40"
                onClick={(e) => e.stopPropagation()}
              >
                View Full Page <span aria-hidden>→</span>
              </Link>
            </>
          ) : (
            <p className="text-sm text-zinc-700 dark:text-zinc-400">
              No cafe selected.
            </p>
          )}
        </div>
      </div>
    </div>,
    portalEl
  );
}
