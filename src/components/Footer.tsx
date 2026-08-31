import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-50 h-20 rounded-xl overflow-hidden">
                <Image src="/logo.png" alt="Magnify" fill className="object-cover" />
              </div>
             
            </div>
            <p className="text-slate-400 text-md leading-relaxed mb-6">
              Print your favorite photos on premium magnetic tiles and create a gallery of memories in your home.
            </p>

            {/* social icons */}
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-white/10 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
             
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-blue-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 text-md transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-blue-400 mb-4">Products</h3>
            <ul className="space-y-2">
              {[
                "Magnetic Tiles",
                "Photo Frames",
                "Gallery Sets",
                "Custom Prints",
                "Gift Collections",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="text-slate-400 hover:text-blue-400 text-md transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-blue-400 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-md text-slate-400">
                <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
              125A, KKS Road, Kokuvil, Jaffna, Sri Lanka
              </li>
              <li className="flex items-center gap-3 text-md text-slate-400">
                <Phone size={16} className="text-blue-400 flex-shrink-0" />
                +94 (77) 123-4567
              </li>
              <li className="flex items-center gap-3 text-md text-slate-400">
                <Mail size={16} className="text-blue-400 flex-shrink-0" />
                info@magnifycreation.lk
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Magnify Photo Frames. Curated Memories.
          </p>
          <p className="text-slate-500 text-sm">
            Designed and Developed by{" "}
            <a href="https://theneonlabz.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Neon Labz
            </a>
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
