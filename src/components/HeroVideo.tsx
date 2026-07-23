"use client";

import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/img";

/**
 * Full-width media hero, HUF style: silent looping video with page margins.
 * Drop the real assets into /public:
 *   /public/hero.mp4         - the campaign video
 *   /public/hero-poster.jpg  - first frame, shown while loading / as fallback
 * Until they exist we fall back to placeholder photography so the page
 * never renders a black hole.
 */
const FALLBACK = "https://picsum.photos/seed/kepter-dala-campaign/1800/760";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // The load can fail before hydration attaches onError: check for an
    // already-recorded error, and re-check once the browser gives up.
    if (video.error || video.networkState === video.NETWORK_NO_SOURCE) {
      setFailed(true);
      return;
    }
    // Respect reduced motion: keep the poster, never autoplay.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.removeAttribute("autoplay");
    }
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-4 sm:px-6">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-2 sm:aspect-[12/5]">
        {failed ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={FALLBACK}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={withBase("/hero.mp4")}
            poster={withBase("/hero-poster.jpg")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </section>
  );
}
