"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { fadeUp, staggerContainer } from "@/lib/motion";
import {
  ArrowRight,
  Magnet,
 
  Truck,
  ImagePlus,
  UploadCloud,
  Headphones,
  ChevronLeft,
  ChevronRight,
  Printer,
  Package,
  Heart,
  Image as ImageIcon,
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
import ProductsSection from "@/components/Products";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Eyebrow } from "@/components/ui/Eyebro";


const CONTAINER = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

/* ===================== New Pricing section types/data ===================== */

type PriceCard = {
  title: string;
  price: string;
  details: string[];
  image: string;
  imageAlt: string;
  magnetImages?: {
    src: string;
    alt: string;
    className: string;
  }[];
  secondaryImage?: string;
  secondaryImageAlt?: string;
  tone: "cream" | "blue";
  popular?: boolean;
  icon: "photos" | "frame";
};

type FeatureCard = {
  icon: IconName;
  title: string;
  description: string;
};

const priceCards: PriceCard[] = [
  {
    title: "Photo Magnets",
    price: "Rs. 1,500",
    details: ["Minimum 4 pieces", "Square magnetic tiles"],
    image:
      "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/v-cutout.png",
    imageAlt: "Printed photo magnet tiles stacked together",
    tone: "cream",
    icon: "photos",
  },
  {
    title: "Magnet Frame Set",
    price: "Rs. 2,500",
    details: ["Black or white frame", "Holds 4 tiles"],
    image:
      "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/v2-cutout.png",
    imageAlt: "Black magnet frame set holding printed photo tiles",
    secondaryImage:
      "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/white-frame-product.png",
    secondaryImageAlt: "White magnet frame set behind the black frame set",
    tone: "blue",
    popular: true,
    icon: "frame",
  },
];

const featureCards: FeatureCard[] = [
  {
    icon: "printer",
    title: "Premium HD Printing",
    description: "Sharp, vibrant prints that last.",
  },
  {
    icon: "magnet",
    title: "Strong Magnetic Hold",
    description: "Powerful magnets keep memories secure.",
  },
  {
    icon: "shield",
    title: "Durable & Waterproof",
    description: "Scratch resistant and made to last.",
  },
  {
    icon: "truck",
    title: "Islandwide Delivery",
    description: "Fast, reliable delivery to your doorstep.",
  },
  {
    icon: "box",
    title: "Secure Packaging",
    description: "Carefully packed to ensure safe delivery.",
  },
  {
    icon: "heart",
    title: "Made with Care",
    description: "Crafted with love for your special moments.",
  },
];

const pricingOccasionCards: OccasionCard[] = [
  {
    icon: "rings",
    title: "Weddings",
    image:
      "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-clean-weddings.png",
    imageAlt: "Wedding couple photo printed for a special keepsake",
    position: "object-center",
  },
  {
    icon: "graduation",
    title: "Graduations",
    image:
      "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-clean-graduations.png",
    imageAlt: "Graduation memory displayed on a photo magnet",
    position: "object-[52%_46%]",
  },
  {
    icon: "cake",
    title: "Birthdays",
    image:
      "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-clean-birthdays.png",
    imageAlt: "Birthday memory printed on colorful photo magnets",
    position: "object-[58%_62%]",
  },
  {
    icon: "family",
    title: "Families",
    image:
      "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-families.png",
    imageAlt: "Family memories arranged in a magnetic frame",
    position: "object-center",
  },
  {
    icon: "heart",
    title: "Couples",
    image:
      "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-clean-couples.png",
    imageAlt: "Couple photo memory presented in a magnet frame",
    position: "object-[52%_52%]",
  },
  {
    icon: "building",
    title: "Corporate",
    image:
      "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-corporate.png",
    imageAlt: "Corporate portrait used for a professional memory gift",
    position: "object-center",
  },
];

const pricingTrustItems: TrustItem[] = [
  {
    icon: "shield",
    title: "100% Satisfaction",
    description: "We ensure you love your magnets or we make it right.",
  },
  {
    icon: "support",
    title: "Customer Support",
    description: "We're here to help you 7 days a week.",
  },
  {
    icon: "cash",
    title: "Cash on Delivery",
    description: "Pay only when you receive your order.",
  },
  {
    icon: "trusted",
    title: "Trusted by 1000+",
    description: "Thousands of happy customers trust Magnify.",
  },
];

function ProductTopIcon({ type }: { type: PriceCard["icon"] }) {
  return (
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[10px] bg-white text-[#002B73] shadow-[0_6px_14px_rgba(0,43,115,0.10)]">
      {type === "frame" ? (
        <span className="relative block h-[22px] w-[22px] rounded-[2px] border-[1.8px] border-[#002B73]">
          <span className="absolute inset-[3px] rounded-[1px] border border-[#002B73]" />
          <span className="absolute -bottom-[3px] -right-[3px] h-[18px] w-[18px] rounded-[2px] border border-[#9DA8C7]" />
        </span>
      ) : (
        <span className="relative block h-[22px] w-[22px]">
          <span className="absolute left-[2px] top-[3px] h-[17px] w-[17px] -rotate-[9deg] rounded-[2px] border border-[#9DA8C7] bg-white" />
          <span className="absolute right-[1px] top-[1px] h-[17px] w-[17px] rotate-[8deg] rounded-[2px] border-[1.6px] border-[#002B73] bg-white" />
          <Heart
            size={10}
            strokeWidth={2}
            className="absolute left-[8px] top-[7px] text-[#D80000]"
            aria-hidden="true"
          />
        </span>
      )}
    </div>
  );
}

/* ===================== Shared icon / card components ===================== */

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

function FigmaIcon({
  name,
  className = "h-8 w-8",
}: {
  name: IconName;
  className?: string;
}) {
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
          <rect
            x="10"
            y="16"
            width="20"
            height="12"
            rx="2"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="M14 24h12v8H14z"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="M15 12h10M27 20h1"
            stroke={red}
            strokeWidth="2"
            strokeLinecap="round"
          />
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
          <path
            d="M20 6 30 10v8c0 7-4.2 12-10 15-5.8-3-10-8-10-15v-8L20 6Z"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="m15 19 3 3 7-7"
            fill="none"
            stroke={red}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {name === "truck" && (
        <>
          <path
            d="M8 14h17v12H8zM25 18h5l4 4v4h-9z"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M13 29a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM29 29a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            fill="white"
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="M4 15h6M2 19h8M5 23h5"
            stroke={red}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}

      {name === "box" && (
        <>
          <path
            d="m20 7 12 6-12 6-12-6 12-6Z"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 13v14l12 6 12-6V13M20 19v14M14 10l12 6"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
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
          <path
            d="M12 21v5c4 3 12 3 16 0v-5"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="M31 18v7"
            stroke={red}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}

      {name === "cake" && (
        <>
          <path
            d="M11 18h18v14H11zM9 24h22"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M15 18v-5M20 18v-5M25 18v-5"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M15 10c2-2 2-3 0-5-2 2-2 3 0 5ZM20 10c2-2 2-3 0-5-2 2-2 3 0 5ZM25 10c2-2 2-3 0-5-2 2-2 3 0 5Z"
            fill={yellow}
          />
          <path
            d="M11 27c4 3 6-3 9 0s5-3 9 0"
            fill="none"
            stroke={red}
            strokeWidth="1.6"
          />
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
          <path
            d="M10 22v-3a10 10 0 0 1 20 0v3"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="M10 21h5v8h-5zM25 21h5v8h-5z"
            fill="none"
            stroke={red}
            strokeWidth="2"
          />
          <path
            d="M25 31h-4"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}

      {name === "cash" && (
        <>
          <rect
            x="7"
            y="12"
            width="26"
            height="17"
            rx="2"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="20.5"
            r="4"
            fill="none"
            stroke={red}
            strokeWidth="2"
          />
          <path
            d="M11 17h3M26 24h3"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}

      {name === "trusted" && (
        <>
          <path
            d="m20 6 4 5 6 .5-1.5 6 3.5 5-5.5 3-2 5.5-4.5-3.5-4.5 3.5-2-5.5-5.5-3 3.5-5-1.5-6 6-.5 4-5Z"
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="m16 20 3 3 6-7"
            fill="none"
            stroke={red}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

function TrustBarItem({ icon, title, description }: TrustItem) {
  return (
    <article className="flex min-h-[78px] items-center gap-2 px-2 py-3 text-left sm:gap-4 sm:px-3 sm:py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-blue-900 shadow-[0_8px_18px_rgba(12,28,61,0.08)] sm:h-11 sm:w-11">
        <FigmaIcon name={icon} className="h-6 w-6 sm:h-7 sm:w-7" />
      </div>

      <div className="min-w-0">
        <h3 className="font-manrope text-[11px] font-extrabold leading-tight text-blue-900 sm:text-[13px]">
          {title}
        </h3>
        <p className="mt-1 font-inter text-[9px] leading-[13px] text-[#6B7284] sm:text-[10px] sm:leading-[15px]">
          {description}
        </p>
      </div>
    </article>
  );
}

/* ===================== pricing-card components ===================== */

function ProductPriceCard({
  title,
  price,
  details,
  image,
  imageAlt,
  magnetImages,
  secondaryImage,
  secondaryImageAlt,
  tone,
  popular,
  icon,
}: PriceCard) {
  const toneClasses =
    tone === "cream"
      ? "border-[#F4DCDC] bg-[#FFF3F0]"
      : "border-[#DDE5FA] bg-[#F1F5FF]";

  return (
    <article
      className={`relative flex min-h-[286px] flex-col overflow-hidden rounded-[14px] border p-4 shadow-[0_10px_24px_rgba(12,28,61,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(12,28,61,0.12)] sm:min-h-[300px] lg:min-h-[292px] xl:min-h-[306px] ${toneClasses}`}
    >
      {popular && (
        <div className="absolute -right-8 top-4 z-10 rotate-45 bg-[#E00012] px-9 py-1 font-inter text-[8px] font-extrabold uppercase tracking-[0.7px] text-white shadow-md">
          POPULAR
        </div>
      )}

      <div className="relative z-10">
        <ProductTopIcon type={icon} />

        <h3 className="font-manrope text-[18px] font-extrabold leading-tight text-[#061447] sm:text-[19px] xl:text-[20px]">
          {title}
        </h3>

        <div className="mt-1.5 flex items-end gap-2 font-inter">
          <span className="pb-1 text-[12px] text-[#687086]">from</span>
          <span className="text-[22px] font-black leading-none text-[#D80000] sm:text-[24px]">
            {price}
          </span>
        </div>

        <div className="my-3 h-px w-full bg-[#E5DDE0]" />

        <ul className="space-y-1.5 font-inter text-[11px] leading-tight text-[#4E566B]">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>

      <div className="relative -mx-2 mt-auto h-[128px] sm:h-[140px] lg:h-[132px] xl:h-[150px]">
        {magnetImages ? (
          <div className="absolute inset-x-0 bottom-0 h-full">
            {magnetImages.map((magnet) => (
              <div
                key={magnet.alt}
                className={`absolute overflow-hidden rounded-[6px] bg-white p-1 shadow-[0_12px_18px_rgba(12,28,61,0.22)] ${magnet.className}`}
              >
                <Image
                  src={magnet.src}
                  alt={magnet.alt}
                  fill
                  sizes="90px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : secondaryImage ? (
          <>
            <div
              aria-label={secondaryImageAlt}
              className="absolute bottom-0 right-0 h-[104px] w-[58%] rotate-[5deg] opacity-95 sm:h-[116px] lg:h-[108px] xl:h-[124px]"
            >
              <Image
                src={secondaryImage}
                alt={secondaryImageAlt ?? ""}
                fill
                sizes="(max-width: 767px) 48vw, (max-width: 1279px) 24vw, 160px"
                className="object-contain object-bottom drop-shadow-[0_12px_12px_rgba(12,28,61,0.16)]"
              />
            </div>

            <div
              aria-label={imageAlt}
              className="absolute bottom-0 left-0 h-[112px] w-[78%] -rotate-[4deg] sm:h-[124px] lg:h-[116px] xl:h-[132px]"
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 767px) 68vw, (max-width: 1279px) 32vw, 220px"
                className="object-contain object-bottom drop-shadow-[0_14px_14px_rgba(12,28,61,0.22)]"
              />
            </div>
          </>
        ) : (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 767px) 82vw, (max-width: 1279px) 38vw, 260px"
            className="object-contain object-bottom drop-shadow-[0_12px_12px_rgba(12,28,61,0.18)]"
          />
        )}
      </div>
    </article>
  );
}

function FeatureQualityCard({ icon, title, description }: FeatureCard) {
  return (
    <article className="group flex min-h-[140px] flex-col items-center justify-center rounded-[14px] border border-[#EEF0F6] bg-white px-4 py-5 text-center shadow-[0_10px_24px_rgba(12,28,61,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#DDE5FA] hover:shadow-[0_16px_30px_rgba(12,28,61,0.10)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F6FC] text-[#002B73] transition duration-300 group-hover:bg-[#EAF0FF]">
        <FigmaIcon name={icon} className="h-8 w-8" />
      </div>

      <h3 className="font-manrope text-[13px] font-extrabold leading-tight text-[#061447]">
        {title}
      </h3>

      <p className="mt-2 max-w-[150px] font-inter text-[11px] leading-[17px] text-[#6B7284]">
        {description}
      </p>
    </article>
  );
}


const carouselImages = [
  "https://images.pexels.com/photos/10821416/pexels-photo-10821416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/5137955/pexels-photo-5137955.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/13699200/pexels-photo-13699200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "/images/product-1.png",
  "/images/product-4.png",
  "/images/product-5.png",
];

/* How-it-works steps — icon is the actual component reference (not a
   string) so it can be rendered directly as <StepIcon ... />. */
const howItWorksSteps = [
  {
    step: "01",
    Icon: UploadCloud,
    title: "Upload Your Photo",
    desc: "Choose your favorite photo and upload it easily.",
    rotate: "-rotate-2",
  },
  {
    step: "02",
    Icon: ImagePlus,
    title: "Customize & Preview",
    desc: "Select size, style and preview your magnet before printing.",
    rotate: "rotate-1",
  },
  {
    step: "03",
    Icon: Truck,
    title: "We Print & Deliver",
    desc: "We print with premium quality and deliver to your doorstep.",
    rotate: "-rotate-1",
  },
];

export default function HomePage() {
  const autoplayPlugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));
  const testimonialAutoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayPlugin.current]);
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

  return (
    <div className="min-h-screen pt-10">
      {/* ================= Hero Section — bg 1: white ================= */}
      <section className="relative overflow-hidden flex items-center bg-white">
        {/* RIGHT SIDE IMAGE ONLY */}
        <div className="absolute inset-y-0 right-0 w-[58%]">
          <Image
            src="https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/NON%20TEXT%20HERO%20SECTION.png"
            alt="Custom fridge magnets"
            fill
            priority
            className="object-cover object-[60%_center]"
          />

          <div className="absolute inset-y-0 left-[-1] w-64 pointer-events-none bg-gradient-to-r from-white via-white/80 via-40% to-transparent" />
          {/* EXTRA BLUR AT CENTER */}
          <div className="absolute inset-y-0 left-0 w-20 pointer-events-none backdrop-blur-[3px] [mask-image:linear-gradient(to_right,black,transparent)]" />
        </div>

        {/* LEFT SIDE WHITE CONTENT */}
        <div className="relative z-10 w-full">
          <div className={`${CONTAINER} pt-20 pb-16`}>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[48%] max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 text-[#B73B2B] text-xs font-bold uppercase tracking-widest mb-5"
              >
                Custom Fridge Magnets
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight">
                Personalized Fridge{" "}
                <span className="text-[#D64532]">Magnets</span> You&apos;ll
                Love.
              </h1>

              <p className="text-base lg:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                Turn your favorite photos into premium custom fridge magnets.
                Beautifully crafted with vibrant printing and lasting quality.
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
                  className="inline-flex items-center gap-2 bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-base hover:bg-[#F9F9FE] hover:border-blue-300 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  View Gallery
                </Link>
              </div>

              <div className="mt-7 h-px w-full max-w-[420px] bg-[#E2E2E7]" />

              <div className="mt-6 grid grid-cols-2 gap-10 max-w-[430px]">
                {/* Strong */}
                <div className="flex items-center gap-4">
                  <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#F0F2F8] text-blue-900">
                    <Magnet size={18} strokeWidth={2} />
                  </div>

                  <div>
                    <p className="font-bold text-sm text-blue-900">Strong</p>
                    <p className="text-[9px] uppercase tracking-[0.5px] text-[#434652]">
                      Magnetic Hold
                    </p>
                  </div>
                </div>

                {/* Vibrant */}
                <div className="flex items-center gap-4">
                  <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#F0F2F8] text-blue-900">
                    <ImageIcon size={18} strokeWidth={2} />
                  </div>

                  <div>
                    <p className="font-bold text-sm text-blue-900">Vibrant</p>
                    <p className="text-[9px] uppercase tracking-[0.5px] text-[#434652]">
                      Print Quality
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= Video section — bg 2: #F9F9FE ================= */}
      <section className="w-full bg-[#F9F9FE] py-12 sm:py-16 lg:py-[60px]">
        <div className={CONTAINER}>
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 sm:gap-10 lg:gap-[60px]">
            {/* Text */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
              <h2 className="font-manrope text-[26px] sm:text-[32px] lg:text-[40px] font-bold leading-[34px] sm:leading-[42px] lg:leading-[50px] text-blue-900">
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

      {/* ================= Products Section — bg 3: white ================= */}
      <ProductsSection />

      {/* ================= How it works — bg 4: #F9F9FE ================= */}
      <section className="py-24 bg-[#F9F9FE] overflow-hidden">
        <div className={CONTAINER}>
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <div className="flex justify-center">
                <Eyebrow>How It Works</Eyebrow>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-blue-900 mt-2 mb-4">
                In 3 Simple Steps
              </h2>
            </motion.div>

            <div className="relative">
              {/* dashed "stick line" connecting the tiles — solid blue-900 */}
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
                  stroke="#1e3a8a"
                  strokeWidth="2"
                  strokeDasharray="1 12"
                  strokeLinecap="round"
                />
              </svg>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 gap-x-8">
                {howItWorksSteps.map((item) => (
                  <motion.div
                    key={item.step}
                    variants={fadeUp}
                    whileHover={{ rotate: 0, y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className={`relative ${item.rotate} bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_-8px_rgba(15,118,110,0.18)] px-6 pt-8 pb-7 text-center`}
                  >
                    {/* magnet dot */}
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-900 to-blue-900 shadow-md ring-4 ring-white" />

                    {/* oversized ghost numeral */}

                    <div className="relative w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-100">
                      <item.Icon
                        size={28}
                        className="text-blue-900"
                        strokeWidth={2}
                      />
                    </div>

                    <h3 className="relative text-lg font-black text-blue-900 mb-2">
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

      {/* ================= Pricing — new design, merged inline ================= */}
      <section className="w-full overflow-x-clip bg-[#FBFBFE] py-10 xl:py-12">
        {/* Infinite auto-scroll animation for the occasion cards track below.
            The list is rendered twice ([...cards, ...cards]) so translating
            it by -50% loops seamlessly. */}
        <style jsx global>{`
          .occasion-scroll-track {
            animation: occasion-scroll 28s linear infinite;
          }
          .occasion-scroll-track:hover {
            animation-play-state: paused;
          }
          @keyframes occasion-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
        <div className="mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-[120px]">
          <div className="rounded-[24px] bg-white px-5 py-8 shadow-[0_16px_45px_rgba(12,28,61,0.08)] sm:px-8 lg:px-10 xl:px-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12 xl:gap-14">
              <div className="lg:border-r lg:border-[#EEF0F6] lg:pr-10 xl:pr-12">
                <Eyebrow>Our Products</Eyebrow>

                <h2 className="font-manrope text-[28px] font-extrabold leading-[1.08] text-blue-900 sm:text-[34px] lg:text-[31px] xl:text-[36px]">
                  Simple, honest pricing.
                </h2>

                <p className="mt-3 max-w-[470px] font-inter text-[14px] leading-[23px] text-[#687086] sm:text-[16px] lg:text-[14px] xl:text-[16px]">
                  No hidden costs. Cash on delivery available across the island.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:gap-4 xl:gap-6">
                  {priceCards.map((card) => (
                    <ProductPriceCard key={card.title} {...card} />
                  ))}
                </div>
              </div>

              <div>
                <Eyebrow>Why Choose Magnify</Eyebrow>

                <h2 className="font-manrope text-[28px] font-extrabold leading-[1.08] text-blue-900 sm:text-[34px] lg:text-[31px] xl:text-[36px]">
                  Premium quality you can trust.
                </h2>

                <p className="mt-3 max-w-[560px] font-inter text-[14px] leading-[23px] text-[#687086] sm:text-[16px] lg:text-[14px] xl:text-[16px]">
                  We combine high quality materials with vibrant prints to bring
                  your memories to life.
                </p>

                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-4 xl:gap-5">
                  {featureCards.map((card) => (
                    <FeatureQualityCard key={card.title} {...card} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-7 text-center">
            <div className="flex justify-center">
              <Eyebrow>Perfect for Every Occasion</Eyebrow>
            </div>

            <h2 className="font-manrope text-[26px] font-extrabold leading-tight text-blue-900 sm:text-[31px] xl:text-[34px]">
              Make every moment memorable.
            </h2>

            <div className="relative mt-6 w-full overflow-hidden pb-4">
              <div className="occasion-scroll-track flex w-max flex-nowrap gap-5 will-change-transform">
                {[...pricingOccasionCards, ...pricingOccasionCards].map(
                  (card, index) => (
                    <OccasionImageCard
                      key={`${card.title}-${index}`}
                      {...card}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="mx-auto mt-6 grid max-w-[900px] grid-cols-2 rounded-[28px] bg-white px-3 py-2 shadow-[0_12px_30px_rgba(12,28,61,0.08)] sm:px-4 xl:max-w-[1180px] xl:grid-cols-4 xl:rounded-full xl:py-0">
              {pricingTrustItems.map((item) => (
                <TrustBarItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= Testimonials — bg 6: #F9F9FE ================= */}
      <section className="py-10 bg-[#F9F9FE]">
        <div className={CONTAINER}>
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <div className="flex justify-center">
                <Eyebrow>Reviews</Eyebrow>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-blue-900 mt-2 mb-4">
                What Customers Say
              </h2>
            </motion.div>

            <div className="relative">
              <div className="overflow-hidden" ref={testimonialRef}>
                <div className="flex gap-2 pb-5">
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
                            <span className="font-bold text-blue-900 text-sm block">
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
                  className="w-11 h-11 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center hover:bg-[#F9F9FE] transition-colors"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft size={18} className="text-slate-700" />
                </button>
                <button
                  onClick={scrollTestimonialNext}
                  className="w-11 h-11 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center hover:bg-[#F9F9FE] transition-colors"
                  aria-label="Next testimonials"
                >
                  <ChevronRight size={18} className="text-slate-700" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
