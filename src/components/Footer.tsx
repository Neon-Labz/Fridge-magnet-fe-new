import Link from "next/link";
import Image from "next/image";
import { Share2, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                <Image src="/images/logo.png" alt="Magnify" fill className="object-cover" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Magnify
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Print your favorite photos on premium magnetic tiles and create a gallery of memories in your home.
            </p>
            <div className="flex gap-3">
              {[Share2, Share2, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/10 hover:bg-cyan-500 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-cyan-400 mb-4">Quick Links</h3>
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
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-cyan-400 mb-4">Products</h3>
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
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-cyan-400 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                123 Memory Lane, Photo City, PC 12345
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={16} className="text-cyan-400 flex-shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-cyan-400 flex-shrink-0" />
                hello@magnify.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Magnify. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
