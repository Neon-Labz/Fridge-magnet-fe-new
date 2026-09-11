export const metadata = {
  title: "Terms of Service - Magnify",
  description: "Terms of Service for Magnify Photo Frames",
};

export default function TermsPage() {
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
              Terms of Service
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
              Please read these Terms of Service carefully before using the
              Magnify Creations website or placing an order. By using our
              services, you agree to comply with the terms outlined below.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-10 sm:space-y-12">

            {/* Section 1 */}
            <section>
              <SectionTitle
                number="01"
                title="Acceptance of Terms"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                By accessing or placing an order through the Magnify Creations
                website, you agree to these Terms of Service.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <SectionTitle
                number="02"
                title="Custom Products"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                All products are custom-made using the photos provided by the
                customer. Please ensure all uploaded images are accurate and of
                suitable quality before placing an order.
              </p>

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
                <p className="text-sm leading-6 text-slate-700">
                  <span className="font-semibold text-blue-900">
                    Important:
                  </span>{" "}
                  Please review your uploaded photos carefully before
                  completing your order.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <SectionTitle
                number="03"
                title="Orders"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                Orders will be processed after successful confirmation and
                payment (where applicable). Once production has started, custom
                orders cannot be cancelled or modified.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <SectionTitle
                number="04"
                title="Pricing"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                All prices are displayed in Sri Lankan Rupees (LKR) and may
                change without prior notice.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <SectionTitle
                number="05"
                title="Payments"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                We accept approved payment methods available on our website.
                Orders will only be processed after payment confirmation where
                advance payment is required.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <SectionTitle
                number="06"
                title="Delivery"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                Delivery times may vary depending on your location and courier
                services. Magnify Creations is not responsible for delays
                caused by third-party delivery providers.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <SectionTitle
                number="07"
                title="Returns & Refunds"
              />

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                <p className="text-sm leading-7 text-slate-700 sm:text-base">
                  As all products are personalized, returns or refunds are
                  generally not accepted unless you receive the wrong product,
                  the product arrives damaged, or there is a manufacturing
                  defect.
                </p>

                <div className="mt-4 border-t border-amber-200 pt-4">
                  <p className="text-sm font-medium leading-6 text-slate-700">
                    Contact us within{" "}
                    <span className="font-bold text-blue-900">
                      48 hours
                    </span>{" "}
                    of receiving your order.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <SectionTitle
                number="08"
                title="Intellectual Property"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                All website content, including logos, graphics, text, and
                designs, belongs to Magnify Creations and may not be copied or
                reproduced without permission.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <SectionTitle
                number="09"
                title="Limitation of Liability"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                Magnify Creations shall not be liable for indirect, incidental,
                or consequential damages resulting from the use of our products
                or website.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <SectionTitle
                number="10"
                title="Changes to These Terms"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                We reserve the right to update these Terms of Service at any
                time.
              </p>
            </section>

            {/* Contact */}
            <section>
              <SectionTitle
                number="11"
                title="Contact Us"
              />

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                <div className="space-y-5">

                  {/* Email */}
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Email
                    </p>

                    <a
                      href="mailto:magnifyofficials@gmail.com"
                      className="break-all text-sm font-medium text-slate-800 transition-colors hover:text-blue-900 sm:text-base"
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
                      className="text-sm font-medium text-slate-800 transition-colors hover:text-blue-900 sm:text-base"
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