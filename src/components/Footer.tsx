import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-900 border-t border-slate-200">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative -ml-3 mt-[-40px] mb-[-40px] h-[110px] w-[190px] sm:h-[150px] sm:w-[250px] sm:mt-[-55px] sm:mb-[-50px]">
                <Image
                  src="/logo.png"
                  alt="Magnify Logo"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 190px, 250px"
                />
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              © 2026 Magnify. Premium photo framing for curated memories. Elevating everyday moments into lasting legacies.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-blue-900 mb-4">
              Useful Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/gallery", label: "Gallery" },
                { href: "/shop", label: "Gift" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-blue-900 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-blue-900 mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/shipping", label: "Shipping Policy" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-blue-900 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit Us - Google Map */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-blue-900 mb-4">
              Visit Us
            </h3>
            <div className="relative w-full h-[150px] sm:h-[120px] bg-slate-100 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.8305814987602!2d80.01146597478936!3d9.695496890394892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afe552ffb6c417d%3A0x427b75dc7b4e8b5a!2sMagnify%20creations!5e0!3m2!1sen!2slk!4v1788234300408!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Magnify Creations Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 text-center sm:text-left">
            <p>© 2026 Magnify Photo Frames. Curated Memories.</p>
            <p>
              Developed by{" "}
              <a
                href="https://theneonlabz.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-900 font-semibold hover:underline"
              >
                NeonLabz (Pvt) Ltd.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}