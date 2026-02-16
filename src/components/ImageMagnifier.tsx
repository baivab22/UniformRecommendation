import { useState, useRef } from "react";

interface ImageMagnifierProps {
  src: string;
  alt: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
  containerClassName?: string;
  imageClassName?: string;
  isMobile?: boolean;
}

export const ImageMagnifier = ({
  src,
  alt,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2.5,
  containerClassName = "",
  imageClassName = "",
  isMobile = false,
}: ImageMagnifierProps) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[innerWidth, innerHeight], setSize] = useState([0, 0]);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();

    // Calculate cursor position on the image
    const x = e.clientX - left;
    const y = e.clientY - top;
    setXY([x, y]);
  };

  const handleMouseLeave = () => {
    setXY([0, 0]);
  };

  return (
    <div className={`relative overflow-hidden rounded-lg bg-gray-100 ${containerClassName}`}>
      <div
        ref={imgRef}
        className="relative w-full group"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain ${imageClassName}`}
        />

        {/* Magnifier */}
        {x !== 0 && y !== 0 && (
          <div
            style={{
              backgroundImage: `url('${src}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${innerWidth * zoomLevel}px ${innerHeight * zoomLevel}px`,
              backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
              backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
              left: `${x - magnifierWidth / 2}px`,
              top: `${y - magnifierHeight / 2}px`,
              position: "absolute",
              pointerEvents: "none",
              width: `${magnifierWidth}px`,
              height: `${magnifierHeight}px`,
              opacity: 1,
              border: "2px solid #3b82f6",
              backgroundColor: "white",
              backgroundBlendMode: "darken",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        )}

        {/* Hint text */}
        {x === 0 && y === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-gray-400 font-medium bg-white/60 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Hover to magnify
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
