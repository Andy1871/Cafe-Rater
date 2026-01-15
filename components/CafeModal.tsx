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
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ease-out ${backdropClasses}`}
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          if (isClosing) finishClose();
        }}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-950/90 p-5 sm:p-6 shadow-2xl shadow-black/40 transform transition duration-200 ease-out ${panelClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-zinc-100">
              {cafe ? cafe.name : "Cafe Details"}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {cafe ? cafe.location : "No cafe selected"}
            </p>
          </div>

          <button
            onClick={startClose}
            className="rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs text-zinc-200 hover:bg-white/8 transition focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          >
            Close
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/3 p-4">
          {cafe ? (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/3 p-3">
                  <div className="text-xs uppercase tracking-wide text-zinc-400">
                    Location
                  </div>
                  <div className="mt-1 text-sm text-zinc-100">
                    {cafe.location}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/3 p-3">
                  <div className="text-xs uppercase tracking-wide text-zinc-400">
                    Overall rating
                  </div>
                  <div className="mt-1 text-sm text-zinc-100">
                    {cafe.ratings.overall} / 5
                  </div>
                </div>
              </div>

              <Link
                href={`/cafes/${cafe.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-500/90 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                onClick={(e) => e.stopPropagation()}
              >
                View Full Page <span aria-hidden>→</span>
              </Link>
            </>
          ) : (
            <p className="text-sm text-zinc-400">No cafe selected.</p>
          )}
        </div>
      </div>
    </div>,
    portalEl
  );
}
