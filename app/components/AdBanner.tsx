"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: "top" | "bottom" | "sidebar" | "in-content";
  size?: "leaderboard" | "medium-rectangle" | "responsive";
}

let adsenseLoaded = false;
function loadAdsense() {
  if (adsenseLoaded || typeof window === "undefined") return;
  adsenseLoaded = true;
  const s = document.createElement("script");
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2105872295580232";
  s.async = true;
  s.crossOrigin = "anonymous";
  s.onerror = () => {};
  document.head.appendChild(s);
}

export default function AdBanner({ slot, size = "responsive" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    loadAdsense();
    // Wait a bit for the script to load before pushing
    const timer = setTimeout(() => {
      if (pushed.current) return;
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        pushed.current = true;
      } catch {
        // AdSense not loaded yet
      }
    }, 1000);
    return () => clearTimeout(timer);
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
