"use client";
import React, { useRef, useState } from "react";
import ProductVideoModal from "./ProductVideoModal";

const videoList = [
  {
    title: "Femi9 Napkin XL 330mm 9 Pads",
    file: "/videos/video1.mp4",
    price: 255,
    originalPrice: 255,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20231025-WA0323_55250954.jpg",
    id: 19562,
    description: 'Femi Anion offers 100% organic, chemical-free sanitary pads made with surgical cotton and advanced technology. They provide superior comfort, absorption, and protection while being antibacterial, eco-friendly, and biodegradable — promoting healthy, stress-free periods for women.'
  },
  {
    title: "Femi9 Napkin XL 330mm 9 Pads",
    file: "/videos/video2.mp4",
    price: 235,
    originalPrice: 249,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20231025-WA0323_55250954.jpg",
    id: 19562,
    description: 'Femi Anion promotes women’s health with 100% organic, chemical-free sanitary pads made from surgical cotton. Designed for comfort, absorption, and leak protection, they’re eco-friendly, antibacterial, and support stress-free, healthy periods and menopause.'
  },
  {
    title: "Femi9 Napkin XL 330mm 9 Pads",
    file: "/videos/video12.mp4",
    price: 235,
    originalPrice: 249,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20231025-WA0323_55250954.jpg",
    id: 19562,
    description: 'Femi Anion promotes women’s health with 100% organic, chemical-free sanitary pads made from surgical cotton. Designed for comfort, absorption, and leak protection, they’re eco-friendly, antibacterial, and support stress-free, healthy periods and menopause.'
  },
  {
    title: "Femi9 Napkin L 280mm 12 Pads",
    file: "/videos/video3.mp4",
    price: 235,
    originalPrice: 249,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20240118-WA0021_26109872.jpg",
    id: 19560,
    description: 'Femi Anion raises awareness about the harmful chemicals in regular sanitary napkins and provides a safe, 100% organic alternative. Made with surgical cotton and advanced technology, these pads offer superior absorption, leak protection, and antibacterial benefits. Eco-friendly and biodegradable, Femi Anion ensures a healthy, comfortable, and stress-free period experience for every woman.'
  },
  {
    title: "Femi 9 XXL 410mm 5 Pads",
    file: "/videos/video4.mp4",
    price: 235,
    originalPrice: 249,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20240118-WA0022_87364772.jpg",
    id: 19559,
    description: 'Femi Anion creates awareness about the harmful chemicals in regular sanitary pads and offers a 100% organic, safe alternative. Made with surgical cotton and advanced technology, these pads ensure comfort, absorption, and leak protection while being antibacterial, eco-friendly, and biodegradable — supporting healthy, stress-free periods and menopause for every woman.'
  },
  {
    title: "Femi9 Napkin XL 320mm 10 Pads",
    file: "/videos/video5.mp4",
    price: 235,
    originalPrice: 249,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20240118-WA0019_13796683.jpg",
    id: 19558,
    description: 'Femi Anion spreads awareness about the harmful chemicals in regular sanitary napkins and offers a 100% organic, safe alternative made with surgical cotton and advanced technology. These pads ensure high absorption, zero leakage, and antibacterial protection while balancing hormones and preventing irritation. Eco-friendly and biodegradable, Femi Anion promotes healthy, stress-free periods and menopause for every woman.'
  },

  {
    title: "Femi9 Napkin XL 330mm 9 Pads",
    file: "/videos/video6.mp4",
    price: 255,
    originalPrice: 255,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20231025-WA0323_55250954.jpg",
    id: 19562,
    description: 'Femi Anion offers 100% organic, chemical-free sanitary pads made with surgical cotton and advanced technology. They provide superior comfort, absorption, and protection while being antibacterial, eco-friendly, and biodegradable — promoting healthy, stress-free periods for women.'
  },
  {
    title: "Femi9 Ultra-Thin Daily Wear Mini Pad 180mm 30 Pads",
    file: "/videos/video7.mp4",
    price: 235,
    originalPrice: 249,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20231025-WA0323_55250954.jpg",
    id: 19562,
    description: 'Femi Anion promotes women’s health with 100% organic, chemical-free sanitary pads made from surgical cotton. Designed for comfort, absorption, and leak protection, they’re eco-friendly, antibacterial, and support stress-free, healthy periods and menopause.'
  },
  {
    title: "Femi9 Ultra-Thin Daily Wear Mini Pad 180mm 30 Pads",
    file: "/videos/video8.mp4",
    price: 235,
    originalPrice: 249,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20231025-WA0323_55250954.jpg",
    id: 19562,
    description: 'Femi Anion promotes women’s health with 100% organic, chemical-free sanitary pads made from surgical cotton. Designed for comfort, absorption, and leak protection, they’re eco-friendly, antibacterial, and support stress-free, healthy periods and menopause.'
  },
  {
    title: "Femi9 Napkin L 280mm 12 Pads",
    file: "/videos/video9.mp4",
    price: 235,
    originalPrice: 249,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20240118-WA0021_26109872.jpg",
    id: 19560,
    description: 'Femi Anion raises awareness about the harmful chemicals in regular sanitary napkins and provides a safe, 100% organic alternative. Made with surgical cotton and advanced technology, these pads offer superior absorption, leak protection, and antibacterial benefits. Eco-friendly and biodegradable, Femi Anion ensures a healthy, comfortable, and stress-free period experience for every woman.'
  },
  {
    title: "Femi 9 XXL 410mm 5 Pads",
    file: "/videos/video10.mp4",
    price: 235,
    originalPrice: 249,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20240118-WA0022_87364772.jpg",
    id: 19559,
    description: 'Femi Anion creates awareness about the harmful chemicals in regular sanitary pads and offers a 100% organic, safe alternative. Made with surgical cotton and advanced technology, these pads ensure comfort, absorption, and leak protection while being antibacterial, eco-friendly, and biodegradable — supporting healthy, stress-free periods and menopause for every woman.'
  },
  {
    title: "Femi9 Napkin XL 320mm 10 Pads",
    file: "/videos/video11.mp4",
    price: 235,
    originalPrice: 249,
    thumbnail: "https://ecomapi.ftdigitalsolutions.org/media/IMG-20240118-WA0019_13796683.jpg",
    id: 19558,
    description: 'Femi Anion spreads awareness about the harmful chemicals in regular sanitary napkins and offers a 100% organic, safe alternative made with surgical cotton and advanced technology. These pads ensure high absorption, zero leakage, and antibacterial protection while balancing hormones and preventing irritation. Eco-friendly and biodegradable, Femi Anion promotes healthy, stress-free periods and menopause for every woman.'
  },
];


export default function VideoSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = scrollRef.current;
    if (!slider) return;
    setIsDragging(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Shop By Videos</h2>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 cursor-grab active:cursor-grabbing scrollbar-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {videoList.map((video: any, index) => (
          <div
            key={index}
            className="relative min-w-[220px] rounded-lg shadow-md overflow-hidden"
            onClick={() => setSelectedIndex(index)}
          >
            <video
              src={video.file}
              className="w-full h-[350px] object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-2 text-sm">
              <p className="font-semibold">{video.title}</p>
              <div className="flex items-center gap-2">
                <span>₹{video.price}</span>
                {video?.price === video?.originalPrice || video?.originalPrice === 0 || video?.originalPrice === '' ?
                  ('') : (
                    <>
                      <span className="line-through text-gray-300 text-xs">
                        ₹{video.originalPrice}
                      </span>

                    </>
                  )}



              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <ProductVideoModal
          videoList={videoList}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}