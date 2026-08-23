"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { X, ZoomIn } from "lucide-react";

const galleryImages = [
  { url: "https://images.pexels.com/photos/10821416/pexels-photo-10821416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", caption: "Family Memories Wall" },
  { url: "https://images.pexels.com/photos/5137955/pexels-photo-5137955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", caption: "Polaroid Collection" },
  { url: "https://images.pexels.com/photos/13699200/pexels-photo-13699200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", caption: "Travel Gallery" },
  { url: "https://images.pexels.com/photos/10260849/pexels-photo-10260849.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", caption: "Souvenir Display" },
  { url: "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", caption: "Creative Collage" },
  { url: "https://images.pexels.com/photos/16236467/pexels-photo-16236467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", caption: "Hanging Memories" },
  { url: "/images/product-1.png", caption: "9-Tile Set Display" },
  { url: "/images/product-2.png", caption: "Single Premium Tile" },
  { url: "/images/product-5.png", caption: "Frame Collection" },
  { url: "/images/product-4.png", caption: "Round Tiles" },
  { url: "https://images.pexels.com/photos/10821416/pexels-photo-10821416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", caption: "Living Room Gallery" },
  { url: "https://images.pexels.com/photos/13699200/pexels-photo-13699200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", caption: "Adventure Memories" },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ url: string; caption: string } | null>(null);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Header */}
      <div className="relative pt-24 pb-16 bg-gradient-to-r from-teal-600 to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <span className="inline-block bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            🖼️ Inspiration
          </span>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">Gallery</h1>
          <p className="text-cyan-100 text-lg max-w-xl mx-auto">
            See how our customers have transformed their spaces with Magnify magnetic tiles.
          </p>
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              onClick={() => setLightbox(img)}
            >
              <div className="relative">
                <Image
                  src={img.url}
                  alt={img.caption}
                  width={400}
                  height={500}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <ZoomIn size={24} className="text-white mb-2 mx-auto" />
                  <p className="text-white font-semibold text-sm text-center">{img.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.url}
                alt={lightbox.caption}
                width={1000}
                height={800}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
                <p className="text-white font-semibold text-center">{lightbox.caption}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
