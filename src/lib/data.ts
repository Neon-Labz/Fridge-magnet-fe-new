import {
  Heart,
  Magnet,
  Package,
  Printer,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { ReactNode } from "react";

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

export type IconName =
  | "printer"
  | "magnet"
  | "shield"
  | "truck"
  | "box"
  | "heart"
  | "rings"
  | "graduation"
  | "cake"
  | "family"
  | "building"
  | "support"
  | "cash"
  | "trusted";

export type OccasionCard = {
  icon: IconName;
  title: string;
  image: string;
  imageAlt: string;
  position: string;
};

export type TrustItem = {
  icon: IconName;
  title: string;
  description: ReactNode;
};


export const trustItems: TrustItem[] = [
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

export const priceCards: PriceCard[] = [
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

export const features = [
  {
    icon: Printer,
    title: "Premium HD Printing",
    desc: "Sharp, vibrant prints that last.",
  },
  {
    icon: Magnet,
    title: "Strong Magnetic Hold",
    desc: "Powerful magnets keep memories secure.",
  },
  {
    icon: ShieldCheck,
    title: "Durable & Waterproof",
    desc: "Scratch resistant and made to last.",
  },
  {
    icon: Truck,
    title: "Islandwide Delivery",
    desc: "Fast, reliable delivery to your doorstep.",
  },
  {
    icon: Package,
    title: "Secure Packaging",
    desc: "Carefully packed to ensure safe delivery.",
  },
  {
    icon: Heart,
    title: "Made with Care",
    desc: "Crafted with love for your special moments.",
  },
];


  export const testimonials = [
  {
    name: "Sureka Appuththurai",
    role: "Google Review",
      initials: "S",
    rating:5,
    review:
      "Very satisfied with the fridge magnets! The print quality is amazing, photos are clear, and the finishing looks premium. Fast delivery and great customer service. Highly recommended.",
  },
  {
    name: "Vaishu Sutha",
    role: "Google Review",
    initials: "V",
    rating:5,
    review:
      "Excellent quality fridge magnets 😍 Photos came out very clear and beautiful. Fast delivery and easy ordering process. Really happy with the product and highly recommend it!",
  },
  {
    name: "Rakshana Varatharajan",
    role: "Google Review",
    initials: "R",
    rating:5,
    review:
      "Thank you for this amazing idea. Packaging was good and the magnets stick well. I'm happy to order this product.",
  },
  {
    name: "Geerthiga",
    role: "Google Review",
    initials: "G",
    rating:5,
    review:
      "Good quality fridge magnet with a clear photo print. Looks nice and delivery was smooth. Happy with the order.",
  },
  {
    name: "Infinite Bliss",
    role: "Google Review",
    initials: "I",
    rating:5,
    review:
      "Really liked the fridge magnet. The print quality and finishing were good, and it came exactly as expected.",
  },
  {
    name: "Jalani Kaneswaran",
    role: "Google Review",
    initials: "J",
    rating:5,
    review:
      "Good quality magnet frame with a strong magnet and nice finishing. Looks beautiful and worth the price. Happy with the purchase! 😊🥰",
  },
];

export const occasionCards: OccasionCard[] = [
  {
    icon: "rings",
    title: "Weddings",
    image: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-clean-weddings.png",
    imageAlt: "Wedding couple photo printed for a special keepsake",
    position: "object-center",
  },
  {
    icon: "graduation",
    title: "Graduations",
    image: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-clean-graduations.png",
    imageAlt: "Graduation memory displayed on a photo magnet",
    position: "object-[52%_46%]",
  },
  {
    icon: "cake",
    title: "Birthdays",
    image: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-clean-birthdays.png",
    imageAlt: "Birthday memory printed on colorful photo magnets",
    position: "object-[58%_62%]",
  },
  {
    icon: "family",
    title: "Families",
    image: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-families.png",
    imageAlt: "Family memories arranged in a magnetic frame",
    position: "object-center",
  },
  {
    icon: "heart",
    title: "Couples",
    image: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-clean-couples.png",
    imageAlt: "Couple photo memory presented in a magnet frame",
    position: "object-[52%_52%]",
  },
  {
    icon: "building",
    title: "Corporate",
    image: "https://pub-57b44696f3e243acb6e5fdb88145606e.r2.dev/images/public/occasion-corporate.png",
    imageAlt: "Corporate portrait used for a professional memory gift",
    position: "object-center",
  },
];
export interface Product {
  _id: string;
  productId: string;
  productName: string;
  description: string | null;
  imagecount: number;
  stock: number;
  price: number;
  primaryImage: { secure_url: string; public_id: string };
  galleryImages: { secure_url: string; public_id: string; _id: string }[];
  status: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  imageCount: number;
  uploadedImageUrls: string[];
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  fullName: string
  email: string
  password: string
  phoneNumber: string
  customerAddress: string
}

export interface ForgotPasswordPayload {
  email: string
}

export type AuthResponseData = {
  token?: string
  user?: {
    id?: string
    fullName?: string
    email?: string
    role?: string
  }
}


