export const metadata = {
  title: "Privacy Policy - Magnify",
  description: "Privacy Policy for Magnify Photo Frames",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pt-16 lg:pt-20 text-slate-900">
      {/* Header */}
      <section className="border-b border-slate-200 bg-[#F7F8FC]">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl py-10 text-center sm:py-14 lg:py-16">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#B73B2B] sm:text-sm sm:tracking-[0.2em]">
              Magnify Creations
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-3 text-xs text-[#B73B2B] sm:mt-4 sm:text-sm">
              Last Updated: July 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
        <article className="mx-auto w-full max-w-3xl">
          {/* Introduction */}
          <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="text-sm leading-7 text-slate-700 sm:text-base">
              At Magnify Creations, we respect your privacy and are committed
              to protecting the personal information and photos you share with
              us when using our website and services.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-10 sm:space-y-12">
            {/* Section 1 */}
            <section>
              <SectionTitle
                number="01"
                title="Information We Collect"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                When you use our website or place an order, we may collect:
                Full Name, Email Address, Phone Number, Delivery Address,
                Uploaded Photos, Order Details, and messages submitted through
                our contact form.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <SectionTitle
                number="02"
                title="How We Use Your Information"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                We use your information to process and fulfill orders, create
                your custom fridge magnets and frames, contact you regarding
                your order, provide customer support, and improve our products
                and services. We do not sell or rent your personal information
                to third parties.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <SectionTitle
                number="03"
                title="Your Photos"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                The photos you upload are used solely for creating your custom
                fridge magnets and frames. Your photos are treated as private
                and confidential. We do not sell, share, publish, or use your
                photos for any purpose other than fulfilling your order.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <SectionTitle
                number="04"
                title="Payment Security"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                We use secure payment methods to protect your transactions.
                Magnify Creations does not store your complete debit or credit
                card information.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <SectionTitle
                number="05"
                title="Data Protection"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                We take appropriate technical and organizational measures to
                protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. However, no method of
                online transmission or storage is completely secure.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <SectionTitle
                number="06"
                title="Cookies"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                Our website may use cookies to improve your browsing experience,
                remember your preferences, and analyze website performance.
                You may disable cookies through your browser settings.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <SectionTitle
                number="07"
                title="Third-Party Services"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                We may use trusted third-party services for secure payment
                processing, website analytics, email communication, and courier
                & delivery services. These providers receive only the
                information necessary to perform their services.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <SectionTitle
                number="08"
                title="Your Rights"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                You may request access to, correction of, or deletion of your
                personal information where applicable by contacting us.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <SectionTitle
                number="09"
                title="Changes to This Privacy Policy"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                Magnify Creations may update this Privacy Policy from time to
                time. Any changes will be published on this page with the
                updated revision date.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <SectionTitle
                number="10"
                title="Contact Us"
              />

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="space-y-5 text-sm">
                  {/* Email */}
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Email
                    </p>

                    <a
                      href="mailto:magnifyofficials@gmail.com"
                      className="break-all font-medium text-slate-800 transition-colors hover:text-blue-900"
                    >
                      magnifyofficials@gmail.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Phone
                    </p>

                    <a
                      href="tel:+94753912534"
                      className="font-medium text-slate-800 transition-colors hover:text-blue-900"
                    >
                      +94 75 391 2534
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3 sm:gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900 text-[11px] font-bold text-white sm:h-9 sm:w-9 sm:text-xs">
        {number}
      </span>

      <h2 className="pt-0.5 text-xl font-bold leading-tight tracking-tight text-blue-900 sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}