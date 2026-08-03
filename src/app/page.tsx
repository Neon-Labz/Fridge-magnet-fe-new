"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp, staggerContainer } from "@/lib/motion";
import {
  ArrowRight,
  Magnet,
  Frame,
  Sparkles,
  ShieldCheck,
  Truck,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  productId: string;
  productName: string;
  description: string | null;
  imageCount: number;
  stock: number;
  price: string;
  galleryImages: string[];
}

function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const carouselImages = [
  "https://images.pexels.com/photos/10821416/pexels-photo-10821416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/5137955/pexels-photo-5137955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/13699200/pexels-photo-13699200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "/images/product-1.jpg",
  "/images/product-2.jpg",
  "/images/product-3.jpg",
  "/images/product-4.jpg",
];

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Absolutely love my magnetic tiles! The quality is stunning and they look amazing on my wall.",
    avatar: "SJ",
  },
  {
    name: "Mike Chen",
    rating: 5,
    text: "So easy to rearrange and the print quality is incredible. My family gallery looks perfect!",
    avatar: "MC",
  },
  {
    name: "Emma Wilson",
    rating: 5,
    text: "Best gift I've ever given. The tiles are high quality, easy to apply and look gorgeous.",
    avatar: "EW",
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const autoplayPlugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayPlugin.current]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const displayProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen hero-gradient overflow-hidden flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                <Sparkles size={16} />
                Premium Magnetic Photo Tiles
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6">
                Turn Memories Into{" "}
                <span className="gradient-text">Magnetic</span> Art
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                Print your favorite photos on premium magnetic tiles and create a stunning gallery of memories in your home. Easy to apply, easy to rearrange, always beautiful.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-base hover:shadow-xl hover:shadow-cyan-200 transition-all hover:-translate-y-1"
                >
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-base hover:border-cyan-300 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  View Gallery
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  {["SJ", "MC", "EW", "AL"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm mb-0.5">★★★★★</div>
                  <p className="text-sm text-slate-500">
                    <span className="font-bold text-slate-800">2,400+</span> happy customers
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="float-animation rounded-3xl overflow-hidden shadow-2xl h-48">
                    <Image src="/images/product-1.jpg" alt="Gallery" width={300} height={200} className="w-full h-full object-cover" />
                  </div>
                  <div className="float-animation rounded-3xl overflow-hidden shadow-2xl h-64" style={{ animationDelay: "1s" }}>
                    <Image src="https://images.pexels.com/photos/5137955/pexels-photo-5137955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Gallery" width={300} height={260} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="float-animation rounded-3xl overflow-hidden shadow-2xl h-64" style={{ animationDelay: "0.5s" }}>
                    <Image src="https://images.pexels.com/photos/10821416/pexels-photo-10821416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Gallery" width={300} height={260} className="w-full h-full object-cover" />
                  </div>
                  <div className="float-animation rounded-3xl overflow-hidden shadow-2xl h-48" style={{ animationDelay: "1.5s" }}>
                    <Image src="/images/product-3.jpg" alt="Gallery" width={300} height={200} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-cyan-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <Magnet size={20} className="text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Premium Quality</p>
                    <p className="font-bold text-slate-800 text-sm">Magnetic Tiles</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-slate-400 uppercase tracking-widest">Scroll</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Bar */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
              { icon: ShieldCheck, label: "Premium Quality", sub: "UV-resistant prints" },
              { icon: Magnet, label: "Easy to Apply", sub: "No tools needed" },
              { icon: Headphones, label: "24/7 Support", sub: "Always here to help" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">{label}</p>
                  <p className="text-cyan-100 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Our Collection</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2 mb-4">
                Featured <span className="gradient-text">Products</span>
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Choose from our curated selection of premium magnetic photo products.
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-slate-100 rounded-3xl h-80 animate-pulse" />
                ))}
              </div>
            ) : displayProducts.length === 0 ? (
              <motion.div variants={fadeUp} className="text-center py-16">
                <div className="w-20 h-20 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Magnet size={32} className="text-cyan-400" />
                </div>
                <p className="text-slate-500">No products yet. Check back soon!</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={fadeUp}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover shadow-sm"
                  >
                    <div className="relative h-52 bg-gradient-to-br from-cyan-50 to-teal-50 overflow-hidden">
                      {product.galleryImages && product.galleryImages.length > 0 ? (
                        <Image
                          src={product.galleryImages[0]}
                          alt={product.productName}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Frame size={48} className="text-cyan-300" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cyan-700">
                        {product.imageCount} photos
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-800 mb-1 text-base">{product.productName}</h3>
                      <p className="text-slate-500 text-xs mb-4 line-clamp-2">
                        {product.description
                          ? product.description.replace(/<[^>]+>/g, "")
                          : "Premium magnetic photo tile"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-cyan-600">
                          {formatPrice(product.price)}
                        </span>
                        <Link
                          href={`/shop/${product.id}`}
                          className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-cyan-200 transition-all"
                        >
                          Order
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {products.length > 0 && (
              <motion.div variants={fadeUp} className="text-center mt-10">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-white border-2 border-cyan-200 text-cyan-600 px-8 py-4 rounded-2xl font-bold hover:bg-cyan-50 hover:border-cyan-400 transition-all hover:-translate-y-0.5"
                >
                  Show More Products <ArrowRight size={18} />
                </Link>
              </motion.div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Inspiration</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2 mb-4">
                Gallery <span className="gradient-text">Showcase</span>
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                See how our customers have transformed their spaces with Magnify tiles.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
              <div className="flex">
                {carouselImages.map((img, i) => (
                  <div key={i} className="flex-none w-full sm:w-1/2 lg:w-1/3 px-3">
                    <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={img}
                        alt={`Gallery ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-cyan-50 transition-colors z-10"
            >
              <ChevronLeft size={20} className="text-slate-700" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-cyan-50 transition-colors z-10"
            >
              <ChevronRight size={20} className="text-slate-700" />
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2 mb-4">
                How It <span className="gradient-text">Works</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-cyan-200 via-cyan-400 to-teal-200" />
              {[
                { step: "01", icon: "📸", title: "Choose Your Photos", desc: "Select your favorite memories from your device. Upload up to the photo count for your chosen product." },
                { step: "02", icon: "🎨", title: "Pick Your Product", desc: "Choose from our range of magnetic tile sets, frames, and collections to match your style." },
                { step: "03", icon: "✨", title: "Receive & Display", desc: "We print and deliver your premium tiles. Simply stick them anywhere and rearrange whenever you like!" },
              ].map((item) => (
                <motion.div key={item.step} variants={fadeUp} className="text-center relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg border-2 border-cyan-200">
                    {item.icon}
                  </div>
                  <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">{item.step}</span>
                  <h3 className="text-xl font-black text-slate-800 mt-1 mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">Reviews</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2 mb-4">
                What Customers <span className="gradient-text">Say</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-cyan-50 card-hover"
                >
                  <div className="flex text-yellow-400 text-lg mb-3">{"★".repeat(t.rating)}</div>
                  <p className="text-slate-600 leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.avatar}
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{t.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div
              variants={fadeUp}
              className="relative bg-gradient-to-r from-cyan-500 via-cyan-600 to-teal-600 rounded-[2.5rem] p-12 text-center overflow-hidden"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-300/20 rounded-full blur-2xl" />
              </div>
              <div className="relative z-10">
                <div className="text-5xl mb-4">🧲</div>
                <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
                  Start Your Memory Gallery Today
                </h2>
                <p className="text-cyan-100 text-lg mb-8 max-w-xl mx-auto">
                  Join thousands of happy customers who have transformed their walls with Magnify.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-white text-cyan-600 px-8 py-4 rounded-2xl font-black hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    Shop Now <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 bg-white/20 text-white border-2 border-white/40 px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-all"
                  >
                    View Gallery
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
