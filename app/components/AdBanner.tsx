"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: "top" | "bottom" | "sidebar" | "in-content";
  size?: "leaderboard" | "medium-rectangle" | "responsive";
}

export default function AdBanner({ slot, size = "responsive" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  return (
    <div className="flex justify-center w-full py-2" ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2105872295580232"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
