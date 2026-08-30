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
  ImageIcon,
  Printer,
  Package,
  Heart,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import {
  features,
  IconName,
  OccasionCard,
  occasionCards,
  testimonials,
  TrustItem,
  trustItems,
} from "@/lib/data";

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

function OccasionImageCard({ title, image, imageAlt, position }: OccasionCard) {
  return (
    <article className="group relative h-[160px] w-[250px] min-w-[250px] shrink-0 flex-none basis-[250px] overflow-hidden rounded-[18px] shadow-[0_12px_24px_rgba(12,28,61,0.16)] transition duration-300 hover:-translate-y-1 sm:h-[165px] sm:w-[260px] sm:min-w-[260px] sm:basis-[260px] md:h-[165px] md:w-[210px] md:min-w-[210px] md:basis-[210px] lg:w-[220px] lg:min-w-[220px] lg:basis-[220px] xl:h-[175px] xl:w-[240px] xl:min-w-[240px] xl:basis-[240px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(max-width: 639px) 78vw, (max-width: 767px) 48vw, (max-width: 1279px) 30vw, 190px"
        className={`object-cover transition duration-500 group-hover:scale-105 ${position}`}
      />

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07102F]/85 via-[#07102F]/38 to-transparent" />

      <h3 className="absolute bottom-4 left-3 right-3 text-center font-manrope text-[15px] font-extrabold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
        {title}
      </h3>
    </article>
  );
}

function FigmaIcon({ name, className = "h-8 w-8" }: { name: IconName; className?: string }) {
  const stroke = "#002B73";
  const red = "#EF3A3A";
  const yellow = "#F6B544";

  if (name === "heart") {
    return (
      <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
        <path
          d="M20 31s-11-6.6-11-15.2c0-4 3.1-6.8 6.8-6.8 2.1 0 3.7 1 4.2 2.4C20.5 10 22.1 9 24.2 9c3.7 0 6.8 2.8 6.8 6.8C31 24.4 20 31 20 31Z"
          fill={red}
          opacity="0.9"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {name === "printer" && (
        <>
          <path d="M13 15V8h14v7" fill="none" stroke={stroke} strokeWidth="2" />
          <rect x="10" y="16" width="20" height="12" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M14 24h12v8H14z" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M15 12h10M27 20h1" stroke={red} strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {name === "magnet" && (
        <>
          <path
            d="M14 13v9a6 6 0 0 0 12 0v-9"
            fill="none"
            stroke={stroke}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M14 13h5M21 13h5"
            stroke={stroke}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <rect x="12" y="8" width="6" height="5" rx="1" fill={red} />
          <rect x="22" y="8" width="6" height="5" rx="1" fill={red} />
          <path
            d="M29 7 32 4M30 12h4M25 5V2"
            stroke={red}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}

      {name === "shield" && (
        <>
          <path d="M20 6 30 10v8c0 7-4.2 12-10 15-5.8-3-10-8-10-15v-8L20 6Z" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="m15 19 3 3 7-7" fill="none" stroke={red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {name === "truck" && (
        <>
          <path d="M8 14h17v12H8zM25 18h5l4 4v4h-9z" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="M13 29a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM29 29a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="white" stroke={stroke} strokeWidth="2" />
          <path d="M4 15h6M2 19h8M5 23h5" stroke={red} strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {name === "box" && (
        <>
          <path d="m20 7 12 6-12 6-12-6 12-6Z" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 13v14l12 6 12-6V13M20 19v14M14 10l12 6" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
        </>
      )}

      {name === "rings" && (
        <>
          <circle
            cx="17"
            cy="24"
            r="5.8"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <circle
            cx="23"
            cy="24"
            r="5.8"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="m20 9 2.8 3H17.2L20 9Z"
            fill={yellow}
            stroke={stroke}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M20 5v2.5M15 9l-2-2M25 9l2-2"
            stroke={yellow}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}

      {name === "graduation" && (
        <>
          <path d="m20 10 15 7-15 7-15-7 15-7Z" fill={stroke} />
          <path d="M12 21v5c4 3 12 3 16 0v-5" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M31 18v7" stroke={red} strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {name === "cake" && (
        <>
          <path d="M11 18h18v14H11zM9 24h22" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="M15 18v-5M20 18v-5M25 18v-5" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <path d="M15 10c2-2 2-3 0-5-2 2-2 3 0 5ZM20 10c2-2 2-3 0-5-2 2-2 3 0 5ZM25 10c2-2 2-3 0-5-2 2-2 3 0 5Z" fill={yellow} />
          <path d="M11 27c4 3 6-3 9 0s5-3 9 0" fill="none" stroke={red} strokeWidth="1.6" />
        </>
      )}

      {name === "family" && (
        <>
          <circle cx="15" cy="14" r="4" fill={yellow} />
          <circle cx="25" cy="14" r="4" fill="#7DB7EA" />
          <path
            d="M9 29c.8-5.2 4.4-8.2 8.8-8.2h4.4c4.4 0 8 3 8.8 8.2"
            fill="none"
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M15 27c.4-3 2.2-4.8 5-4.8s4.6 1.8 5 4.8"
            fill="none"
            stroke={stroke}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </>
      )}

      {name === "building" && (
        <>
          <path
            d="M13 32V9h15v23M10 32h21"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M17 14h3M23 14h2M17 19h3M23 19h2"
            stroke="#35A8D8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M19 32v-6h4v6"
            stroke={red}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}

      {name === "support" && (
        <>
          <path d="M10 22v-3a10 10 0 0 1 20 0v3" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M10 21h5v8h-5zM25 21h5v8h-5z" fill="none" stroke={red} strokeWidth="2" />
          <path d="M25 31h-4" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {name === "cash" && (
        <>
          <rect x="7" y="12" width="26" height="17" rx="2" fill="none" stroke={stroke} strokeWidth="2" />
          <circle cx="20" cy="20.5" r="4" fill="none" stroke={red} strokeWidth="2" />
          <path d="M11 17h3M26 24h3" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {name === "trusted" && (
        <>
          <path d="m20 6 4 5 6 .5-1.5 6 3.5 5-5.5 3-2 5.5-4.5-3.5-4.5 3.5-2-5.5-5.5-3 3.5-5-1.5-6 6-.5 4-5Z" fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
          <path d="m16 20 3 3 6-7" fill="none" stroke={red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

function TrustBarItem({ icon, title, description }: TrustItem) {
  return (
    <article className="flex min-h-[78px] items-center gap-2 px-2 py-3 text-left sm:gap-4 sm:px-3 sm:py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#002B73] shadow-[0_8px_18px_rgba(12,28,61,0.08)] sm:h-11 sm:w-11">
        <FigmaIcon name={icon} className="h-6 w-6 sm:h-7 sm:w-7" />
      </div>

      <div className="min-w-0">
        <h3 className="font-manrope text-[11px] font-extrabold leading-tight text-[#061447] sm:text-[13px]">
          {title}
        </h3>
        <p className="mt-1 font-inter text-[9px] leading-[13px] text-[#6B7284] sm:text-[10px] sm:leading-[15px]">
          {description}
        </p>
      </div>
    </article>
  );
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
  "/images/product-1.png",
  "/images/product-3.png",
  "/images/product-4.png",
  "/images/product-5.png",
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayPlugin.current,
  ]);

  const testimonialAutoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );
  const [testimonialRef, testimonialApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [testimonialAutoplayPlugin.current],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTestimonialPrev = useCallback(
    () => testimonialApi?.scrollPrev(),
    [testimonialApi],
  );
  const scrollTestimonialNext = useCallback(
    () => testimonialApi?.scrollNext(),
    [testimonialApi],
  );

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
    <div className="min-h-screen pt-10">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/NON%20TEXT%20HERO%20SECTION.png"
            alt="Custom fridge magnets background"
            fill
            priority
            className="object-cover object-right"
          />
          {/* Overlay for text legibility — adjust opacity here */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/1" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
        </div>

        {/* Decorative blurs sit above the overlay, below the text */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-100 text-red-500 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Sparkles size={16} />
              Custom Fridge Magnets
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 mb-6">
              Personalized Fridge <span className="text-red-700">Magnets</span>{" "}
              You'll Love.
            </h1>

            <p className="text-lg text-slate-700 leading-relaxed mb-8 max-w-xl">
              Print your favorite photos on premium magnetic tiles and create a
              gallery of memories in your home.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-900 text-white px-8 py-4 rounded-2xl font-bold text-base hover:shadow-xl hover:shadow-cyan-200 transition-all hover:-translate-y-1"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-base hover:border-blue-300 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                View Gallery
              </Link>
            </div>

            <div className="mt-7 h-px w-full max-w-[268px] bg-[#E2E2E7] min-[390px]:max-w-[286px] min-[430px]:max-w-[300px] md:mt-6 md:max-w-[350px] lg:max-w-[420px] xl:mt-9 xl:max-w-[600px]" />

            <div className="mt-5 grid w-full max-w-[268px] grid-cols-1 gap-4 min-[390px]:max-w-[286px] min-[430px]:max-w-[300px] md:max-w-[350px] md:grid-cols-2 md:gap-x-8 md:gap-y-4 lg:max-w-[430px] lg:gap-x-10 xl:mt-6 xl:max-w-[600px] xl:gap-x-14">
              <div className="flex min-w-0 items-center gap-4 xl:gap-5">
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#F0F2F8] text-[#002B73] shadow-[0_8px_18px_rgba(0,43,115,0.06)] md:h-[38px] md:w-[38px] xl:h-[48px] xl:w-[48px]">
                  <Magnet size={16} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-inter text-[12px] font-extrabold leading-[15px] text-[#002B73] md:text-[12px] xl:text-[16px]">
                    Strong
                  </p>
                  <p className="mt-1 whitespace-nowrap font-inter text-[8px] uppercase leading-[12px] tracking-[0.5px] text-[#434652] md:text-[8px] xl:mt-1.5 xl:text-[11px]">
                    Magnetic Hold
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-4 xl:gap-5">
                <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#F0F2F8] text-[#002B73] shadow-[0_8px_18px_rgba(0,43,115,0.06)] md:h-[38px] md:w-[38px] xl:h-[48px] xl:w-[48px]">
                  <ImageIcon size={16} strokeWidth={2} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-inter text-[12px] font-extrabold leading-[15px] text-[#002B73] md:text-[12px] xl:text-[16px]">
                    Vibrant
                  </p>
                  <p className="mt-1 whitespace-nowrap font-inter text-[8px] uppercase leading-[12px] tracking-[0.5px] text-[#434652] md:text-[8px] xl:mt-1.5 xl:text-[11px]">
                    Print Quality
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-3">
                {["SJ", "MC", "EW", "AL"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 text-sm mb-0.5">★★★★★</div>
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-800">2,400+</span> happy
                  customers
                </p>
              </div>
            </div> */}
          </motion.div>
        </div>
      </section>
      {/* Features Bar */}
      <section className="bg-gradient-to-r from-red-700 to-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: "Fast Shipping", sub: "2-3 days" },
              {
                icon: ShieldCheck,
                label: "Premium Quality",
                sub: "UV-resistant prints",
              },
              { icon: Magnet, label: "Easy to Apply", sub: "No tools needed" },
              {
                icon: Headphones,
                label: "24/7 Support",
                sub: "Always here to help",
              },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">{label}</p>
                  <p className="text-blue-100 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* video section */}
      <section className="w-full bg-[#f9f9fe] py-12 sm:py-16 lg:py-[60px]">
        <div className="mx-auto max-w-[2200px] px-4 sm:px-6 lg:px-[80px] xl:px-[50px]">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 sm:gap-10 lg:gap-[60px]">
            {/* Text */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
              <h2 className="font-manrope text-[26px] sm:text-[32px] lg:text-[40px] font-bold leading-[34px] sm:leading-[42px] lg:leading-[50px] text-[#002B73]">
                Turn Moments Into Lasting Memories
              </h2>

              <div className="mt-3 sm:mt-[14px] mx-auto lg:mx-0 h-[3px] w-[70px] sm:w-[90px] bg-red-700" />

              <p className="mt-4 sm:mt-6 lg:mt-[34px] text-[14px] sm:text-[16px] lg:text-[20px] leading-[1.6] lg:leading-[36px] text-black/80 max-w-[520px] mx-auto lg:mx-0">
                Transform your favorite photos into premium custom fridge
                magnets. Beautifully crafted with vibrant printing and lasting
                quality, they&apos;re the perfect way to preserve and display
                your cherished memories every day.
              </p>
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="w-full max-w-[380px] sm:max-w-[440px] lg:max-w-[500px] aspect-[3/2] flex items-center justify-center">
                <Image
                  src="/images/homepage-video.gif"
                  alt="Magnet Frame Demo"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover rounded-[16px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Our Collection
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2 mb-4">
                Curated <span className="gradient-text">Classics</span>
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Choose from our curated selection of premium magnetic photo
                products.
              </p>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-slate-100 rounded-3xl h-80 animate-pulse"
                  />
                ))}
              </div>
            ) : displayProducts.length === 0 ? (
              <motion.div variants={fadeUp} className="text-center py-16">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Magnet size={32} className="text-blue-400" />
                </div>
                <p className="text-slate-500">
                  No products yet. Check back soon!
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={fadeUp}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover shadow-sm"
                  >
                    <div className="relative h-52 bg-gradient-to-br from-blue-50 to-teal-50 overflow-hidden">
                      {product.galleryImages &&
                      product.galleryImages.length > 0 ? (
                        <Image
                          src={product.galleryImages[0]}
                          alt={product.productName}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Frame size={48} className="text-blue-300" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-red-500">
                        {product.imageCount} photos
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-800 mb-1 text-base">
                        {product.productName}
                      </h3>
                      <p className="text-slate-500 text-xs mb-4 line-clamp-2">
                        {product.description
                          ? product.description.replace(/<[^>]+>/g, "")
                          : "Premium magnetic photo tile"}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-blue-600">
                          {formatPrice(product.price)}
                        </span>
                        <Link
                          href={`/shop/${product.id}`}
                          className="bg-gradient-to-r from-blue-900 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-cyan-200 transition-all"
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
                  className="inline-flex items-center gap-2 bg-white border-2 border-blue-900 text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 hover:border-blue-400 transition-all hover:-translate-y-0.5"
                >
                  Show More Products <ArrowRight size={18} />
                </Link>
              </motion.div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Inspiration
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2 mb-4">
                Gallery <span className="gradient-text">Showcase</span>
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                See how our customers have transformed their spaces with Magnify
                tiles.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
              <div className="flex">
                {carouselImages.map((img, i) => (
                  <div
                    key={i}
                    className="flex-none w-full sm:w-1/2 lg:w-1/3 px-3"
                  >
                    <div className="relative h-82 rounded-2xl overflow-hidden shadow-lg">
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
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors z-10"
            >
              <ChevronLeft size={20} className="text-slate-700" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors z-10"
            >
              <ChevronRight size={20} className="text-slate-700" />
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Simple Process
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2 mb-4">
                How It <span className="gradient-text">Works</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* dashed "stick line" connecting the tiles */}
              <svg
                className="hidden md:block absolute top-16 left-0 w-full h-4"
                viewBox="0 0 1000 20"
                preserveAspectRatio="none"
              >
                <line
                  x1="120"
                  y1="10"
                  x2="880"
                  y2="10"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeDasharray="1 12"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a5f3fc" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#5eead4" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 gap-x-8">
                {[
                  {
                    step: "01",
                    icon: "📸",
                    title: "Choose Your Photos",
                    desc: "Select your favorite memories from your device. Upload up to the photo count for your chosen product.",
                    rotate: "-rotate-2",
                  },
                  {
                    step: "02",
                    icon: "🎨",
                    title: "Pick Your Product",
                    desc: "Choose from our range of magnetic tile sets, frames, and collections to match your style.",
                    rotate: "rotate-1",
                  },
                  {
                    step: "03",
                    icon: "✨",
                    title: "Receive & Display",
                    desc: "We print and deliver your premium tiles. Simply stick them anywhere and rearrange whenever you like!",
                    rotate: "-rotate-1",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.step}
                    variants={fadeUp}
                    whileHover={{ rotate: 0, y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className={`relative ${item.rotate} bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_-8px_rgba(15,118,110,0.18)] px-6 pt-8 pb-7 text-center`}
                  >
                    {/* magnet dot */}
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-red-600 shadow-md ring-4 ring-white" />

                    {/* oversized ghost numeral */}
                    <span className="pointer-events-none select-none absolute -top-3 right-3 text-7xl font-black text-blue-50">
                      {item.step}
                    </span>

                    <div className="relative w-16 h-16 mx-auto mb-5 text-3xl flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100">
                      {item.icon}
                    </div>

                    <h3 className="relative text-lg font-black text-slate-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="relative text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* why choose us  */}
      <section className="w-full overflow-x-clip bg-[#FBFBFE] py-10 xl:py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-[60px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
            {/* LEFT — Pricing */}
            <div className="w-full lg:w-1/2 lg:pr-[10px]">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <span className="h-px w-6 bg-red-700/40" />
                <span className="text-[12px] font-bold tracking-[1.5px] text-red-700 uppercase">
                  Our Products
                </span>
                <span className="h-px w-6 bg-red-700/40" />
              </div>

              <h2 className="mt-4 font-manrope text-[28px] sm:text-[34px] font-bold text-blue-900 text-center lg:text-left">
                Simple, honest pricing.
              </h2>

              <p className="mt-2 text-[15px] sm:text-[16px] text-black/60 text-center lg:text-left">
                No hidden costs. Cash on delivery available across the island.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Card 1 */}
                <div className="relative rounded-2xl bg-[#FCEDE9] p-6 flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <ImageIcon
                      size={20}
                      className="text-red-700"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="mt-5 font-manrope text-[19px] font-bold text-blue-900">
                    Photo Magnets
                  </h3>

                  <p className="mt-1 text-[13px] text-black/60">
                    from{" "}
                    <span className="text-[20px] font-extrabold text-red-700">
                      Rs. 1,500
                    </span>
                  </p>

                  <div className="mt-4 h-px w-full bg-black/10" />

                  <div className="mt-4 space-y-1.5 text-[13px] text-black/70">
                    <p>Minimum 4 pieces</p>
                    <p>Square magnetic tiles</p>
                  </div>

                  <div className="mt-auto pt-8 flex justify-center">
                    <Image
                      src="/images/product-6.jpg"
                      width={100}
                      height={150}
                      alt="Photo magnets"
                      className="w-full object-contain max-w-[300px]"
                    />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="relative rounded-2xl bg-[#EEF0FB] p-6 flex flex-col overflow-hidden">
                  <div className="absolute -right-8 top-4 rotate-45 bg-red-700 text-white text-[10px] font-bold tracking-wide px-9 py-1">
                    POPULAR
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Frame
                      size={20}
                      className="text-blue-900"
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="mt-5 font-manrope text-[19px] font-bold text-blue-900">
                    Magnet Frame Set
                  </h3>

                  <p className="mt-1 text-[13px] text-black/60">
                    from{" "}
                    <span className="text-[20px] font-extrabold text-red-700">
                      Rs. 2,500
                    </span>
                  </p>

                  <div className="mt-4 h-px w-full bg-black/10" />

                  <div className="mt-4 space-y-1.5 text-[13px] text-black/70">
                    <p>Black or white frame</p>
                    <p>Holds 4 tiles</p>
                  </div>

                  <div className="mt-auto pt-6 flex justify-center">
                    <Image
                      src="/images/product-5.png"
                      width={100}
                      height={150}
                      alt="Photo magnets"
                      className="w-full object-contain max-w-[300px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-black/10 mx-[40px]" />
            <div className="lg:hidden h-px w-full bg-black/10" />

            {/* RIGHT — Features */}
            <div className="w-full lg:w-1/2 lg:pl-0">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <span className="h-px w-6 bg-red-700/40" />
                <span className="text-[12px] font-bold tracking-[1.5px] text-red-700 uppercase">
                  Why Choose Magnify
                </span>
                <span className="h-px w-6 bg-red-700/40" />
              </div>

              <h2 className="mt-4 font-manrope text-[28px] sm:text-[34px] font-bold text-blue-900 text-center lg:text-left">
                Premium quality you can trust.
              </h2>

              <p className="mt-2 text-[15px] sm:text-[16px] text-black/60 text-center lg:text-left max-w-[440px] mx-auto lg:mx-0">
                We combine high quality materials with vibrant prints to bring
                your memories to life.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {features.map(({ icon: Icon, title, desc }, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/10 p-5 flex flex-col items-center text-center hover:shadow-md hover:border-[#002B73]/20 transition-all"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#F0F2F8] flex items-center justify-center">
                      <Icon
                        size={18}
                        className="text-[#002B73]"
                        strokeWidth={2}
                      />
                    </div>
                    <h4 className="mt-3 text-[13px] sm:text-[14px] font-bold text-[#002B73] leading-tight">
                      {title}
                    </h4>
                    <p className="mt-1.5 text-[11px] sm:text-[12px] text-black/50 leading-snug">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Every occasion  */}
      <div className="px-4 pt-10 text-center sm:px-6 sm:pt-14">
        <div className="flex items-center gap-3 justify-center lg:justify-center">
          <span className="h-px w-6 bg-red-700/40" />
          <span className="text-[12px] font-bold tracking-[1.5px] text-red-700 uppercase">
            Perfect for Every Occasion
          </span>
          <span className="h-px w-6 bg-red-700/40" />
        </div>

        <h2 className="font-manrope mx-auto mt-3 max-w-[90%] text-[24px] font-extrabold leading-tight text-[#061447] sm:max-w-none sm:text-[28px] xl:text-[34px]">
          Make every moment memorable.
        </h2>

        {/* Scroll track — full-bleed on mobile so cards can peek off-screen */}
        <div className="relative mt-6 w-full overflow-hidden pb-4 sm:mt-8">
          <div className="occasion-scroll-track flex w-max flex-nowrap gap-4 will-change-transform sm:gap-5">
            {[...occasionCards, ...occasionCards].map((card, index) => (
              <OccasionImageCard key={`${card.title}-${index}`} {...card} />
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <div className="mx-auto mt-6 grid max-w-[900px] grid-cols-2 gap-y-3 rounded-[24px] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(12,28,61,0.08)] sm:grid-cols-4 sm:gap-y-0 sm:rounded-[28px] sm:px-6 sm:py-3 xl:max-w-[1180px] xl:rounded-full xl:py-0">
          {trustItems.map((item, i) => (
            <div
              key={item.title}
              className={`flex items-center justify-center px-2 ${
                i % 2 === 0 ? "sm:border-r sm:border-[#E7EAF3]" : ""
              } ${i < 2 ? "border-b border-[#E7EAF3] pb-3 sm:border-b-0 sm:pb-0" : ""}`}
            >
              <TrustBarItem {...item} />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <section className="py-10 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Reviews
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-2 mb-4">
                What Customers <span className="gradient-text">Say</span>
              </h2>
            </motion.div>

            <div className="relative">
              <div className="overflow-hidden" ref={testimonialRef}>
                <div className="flex gap-6 pb-5">
                  {testimonials.map((t, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-1"
                    >
                      <div className="bg-white rounded-3xl p-6 shadow-lg border border-blue-50 card-hover h-full">
                        <div className="flex text-yellow-400 text-lg mb-3">
                          {"★".repeat(t.rating)}
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-5 italic min-h-[120px]">
                          &ldquo;{t.review}&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {t.initials}
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 text-sm block">
                              {t.name}
                            </span>
                            <span className="text-xs text-slate-500">
                              {t.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={scrollTestimonialPrev}
                  className="w-11 h-11 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center hover:bg-blue-50 transition-colors"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft size={18} className="text-slate-700" />
                </button>
                <button
                  onClick={scrollTestimonialNext}
                  className="w-11 h-11 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center hover:bg-blue-50 transition-colors"
                  aria-label="Next testimonials"
                >
                  <ChevronRight size={18} className="text-slate-700" />
                </button>
              </div>
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
              className="relative bg-gradient-to-r from-blue-800 via-blue-900 to-red-700 rounded-[2.5rem] p-12 text-center overflow-hidden"
            >
              {/* magnetic board dot texture */}
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* scattered photo tiles */}
              <div className="absolute top-6 left-6 w-20 h-20 bg-white/95 rounded-lg shadow-xl -rotate-12 hidden sm:flex items-center justify-center text-2xl">
                👨‍👩‍👧
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-blue-400 ring-2 ring-white" />
              </div>
              <div className="absolute bottom-8 right-10 w-16 h-16 bg-white/95 rounded-lg shadow-xl rotate-6 hidden md:flex items-center justify-center text-xl">
                🐾
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-teal-400 ring-2 ring-white" />
              </div>
              <div className="absolute top-10 right-16 w-14 h-14 bg-white/90 rounded-lg shadow-lg rotate-12 hidden lg:flex items-center justify-center text-lg">
                👶
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-300 ring-2 ring-white" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl lg:text-5xl font-black text-white mb-4">
                  Start Your Memory Gallery Today
                </h2>
                <p className="text-blue-50 text-lg mb-8 max-w-xl mx-auto">
                  Join thousands of happy customers who have transformed their
                  walls with Magnify.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    Shop Now <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/gallery"
                    className="inline-flex items-center gap-2 bg-white/15 text-white border-2 border-white/50 px-8 py-4 rounded-2xl font-bold backdrop-blur-sm hover:bg-white/25 transition-all"
                  >
                    View Gallery
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
