{/*
  AdBanner Component
  ------------------
  This component renders placeholder ad slots for Google AdSense.

  To integrate Google AdSense:
  1. Add your AdSense script tag to app/layout.tsx <head>:
     <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>
  2. Replace the placeholder div contents below with:
     <ins className="adsbygoogle"
       style={{ display: "block" }}
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="XXXXXXXXXX"
       data-ad-format="auto"
       data-full-width-responsive="true"
     />
     <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
*/}

interface AdBannerProps {
  slot: "top" | "bottom" | "sidebar" | "in-content";
  size?: "leaderboard" | "medium-rectangle" | "responsive";
}

const sizeMap = {
  leaderboard: { width: "728px", height: "90px", label: "728x90 Leaderboard" },
  "medium-rectangle": { width: "300px", height: "250px", label: "300x250 Medium Rectangle" },
  responsive: { width: "100%", height: "90px", label: "Responsive Ad" },
};

export default function AdBanner({ slot, size = "leaderboard" }: AdBannerProps) {
  const dimensions = sizeMap[size];

  return (
    <div className="flex justify-center w-full py-2">
      {/* Google AdSense Ad Slot — Replace this div with your AdSense ad unit */}
      <div
        data-ad-slot={slot}
        data-ad-size={size}
        className="flex items-center justify-center border border-dashed border-card-border bg-card-bg text-gray-500 text-xs rounded"
        style={{
          maxWidth: dimensions.width,
          width: "100%",
          height: dimensions.height,
          minHeight: dimensions.height,
        }}
      >
        Ad Slot: {dimensions.label} ({slot})
      </div>
    </div>
  );
}
