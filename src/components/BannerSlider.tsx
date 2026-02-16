import React, { useEffect, useState } from "react";

type BannerSliderProps = {
  images?: { src: string; title?: string; subtitle?: string }[];
  autoplay?: boolean;
  interval?: number;
};

const BannerSlider: React.FC<BannerSliderProps> = ({
  images = [
    { src: "/shoes1.png", title: "Shoes", subtitle: "Step up your style" },
    { src: "/shirt1.png", title: "Shirts", subtitle: "Perfect fit shirts" },
    { src: "/shirt3.png", title: "Shirts", subtitle: "Casual & formal" },
    { src: "/pant1.png", title: "Pants", subtitle: "Comfortable pants" },
  ],
  autoplay = true,
  interval = 4000,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [autoplay, interval, images.length]);

  // navigation handled via autoplay and dots; no arrow controls per design

  return (
    <div className="w-full h-96 sm:h-[520px] lg:h-[640px] relative bg-orange-50 rounded-lg overflow-visible">
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-all duration-700 ease-out transform ${
            i === index
              ? "opacity-100 scale-100 z-10 pointer-events-auto"
              : "opacity-0 scale-95 z-0 pointer-events-none"
          }`}
        >
          <img
            src={img.src}
            alt={img.title || `slide-${i}`}
            className="w-full h-full object-contain object-center p-6 shadow-none border-0"
            onError={(e) => {
              // fallback to an existing image if requested file is missing
              const target = e.target as HTMLImageElement;
              if (target && target.src && !target.dataset.fallback) {
                target.dataset.fallback = "true";
                target.src = "/shirt3.png";
              }
            }}
          />
          <div className="absolute left-6 bottom-8 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">{img.title}</h3>
            <p className="text-sm text-gray-700">{img.subtitle}</p>
          </div>
        </div>
      ))}

      {/* No arrow controls — navigation via dots and autoplay */}

      {/* Dots */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              i === index ? "bg-orange-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
