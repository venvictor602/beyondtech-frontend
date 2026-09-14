"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Horizontal travel in pixels per second */
  speed?: number;
  /** Milliseconds to wait after interaction before resuming */
  resumeDelay?: number;
  "aria-label"?: string;
};

const DEFAULT_SPEED = 36;
const DEFAULT_RESUME_DELAY = 2500;

function withDuplicateKeys(children: ReactNode, suffix: string) {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    return cloneElement(child, { key: `${String(child.key)}${suffix}` });
  });
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function normalizeOffset(offset: number, half: number) {
  if (half <= 0) return offset;
  let next = offset;
  while (next >= half) next -= half;
  while (next < 0) next += half;
  return next;
}

export function HorizontalAutoScroll({
  children,
  className = "",
  speed = DEFAULT_SPEED,
  resumeDelay = DEFAULT_RESUME_DELAY,
  "aria-label": ariaLabel,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, offset: 0 });
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
  }, []);

  const halfWidth = useCallback(() => {
    const set = setRef.current;
    return set ? set.scrollWidth / 2 : 0;
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
      const half = halfWidth();
      offsetRef.current = normalizeOffset(offsetRef.current, half);
      applyTransform();
    }, resumeDelay);
  }, [applyTransform, halfWidth, resumeDelay]);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set || prefersReducedMotion) return;

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const half = halfWidth();
      if (
        !pausedRef.current &&
        !draggingRef.current &&
        half > (viewportRef.current?.clientWidth ?? 0)
      ) {
        offsetRef.current = normalizeOffset(
          offsetRef.current + speed * delta,
          half,
        );
        applyTransform();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onVisibility = () => {
      if (document.hidden) {
        pausedRef.current = true;
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      } else {
        scheduleResume();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [applyTransform, halfWidth, prefersReducedMotion, scheduleResume, speed]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    draggingRef.current = true;
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    dragStartRef.current = {
      x: event.clientX,
      offset: offsetRef.current,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || prefersReducedMotion) return;
    const dx = dragStartRef.current.x - event.clientX;
    const half = halfWidth();
    offsetRef.current = normalizeOffset(dragStartRef.current.offset + dx, half);
    applyTransform();
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    scheduleResume();
  };

  if (prefersReducedMotion) {
    return (
      <div
        ref={viewportRef}
        className={`clients-scroll-manual flex gap-4 overflow-x-scroll pb-2 scrollbar-none overscroll-x-contain w-full min-w-0 ${className}`}
        role="list"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={viewportRef}
      className={`clients-scroll overflow-hidden w-full min-w-0 select-none ${className}`}
      role="list"
      aria-label={ariaLabel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <div ref={setRef} className="flex gap-4 shrink-0">
          {children}
          <div className="flex gap-4 shrink-0" aria-hidden>
            {withDuplicateKeys(children, "-dup")}
          </div>
        </div>
      </div>
    </div>
  );
}
