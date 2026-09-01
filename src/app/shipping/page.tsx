export const metadata = {
  title: "Shipping Policy - Magnify",
  description: "Shipping Policy for Magnify Photo Frames",
};

export default function ShippingPage() {
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
              Shipping Policy
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
              At Magnify Creations, we carefully prepare and dispatch every
              order to ensure your custom photo frames and fridge magnets reach
              you safely and on time.
            </p>
          </div>

          {/* Shipping Sections */}
          <div className="space-y-10 sm:space-y-12">

            {/* Section 1 */}
            <section>
              <SectionTitle
                number="01"
                title="Order Processing"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                Orders are typically processed within 1–3 business days after
                order confirmation. Custom orders may require additional
                production time.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <SectionTitle
                number="02"
                title="Delivery Areas"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                We deliver islandwide across Sri Lanka.
              </p>

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-900 text-white">
                    <span className="text-lg">✓</span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-blue-900">
                      Islandwide Delivery
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Orders can be delivered to locations throughout Sri
                      Lanka.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <SectionTitle
                number="03"
                title="Delivery Time"
              />

              <p className="mb-5 text-sm leading-7 text-slate-600 sm:text-base">
                Estimated delivery times are:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Jaffna */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Jaffna
                  </p>

                  <p className="mt-2 text-xl font-bold text-blue-900">
                    1–2 Days
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Business days
                  </p>
                </div>

                {/* Other Areas */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Other Areas
                  </p>

                  <p className="mt-2 text-xl font-bold text-blue-900">
                    2–5 Days
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Business days
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Delivery times may vary due to courier operations or public
                holidays.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <SectionTitle
                number="04"
                title="Shipping Charges"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                Shipping charges are calculated during checkout based on your
                delivery location. Free shipping promotions may be available
                from time to time.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <SectionTitle
                number="05"
                title="Order Tracking"
              />

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                Once your order has been dispatched, you may receive courier
                details or tracking information where available.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <SectionTitle
                number="06"
                title="Incorrect Address"
              />

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                    !
                  </div>

                  <p className="text-sm leading-7 text-slate-700">
                    Please ensure your delivery address is accurate. Magnify
                    Creations is not responsible for delays or failed
                    deliveries caused by incorrect address information.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <SectionTitle
                number="07"
                title="Damaged Packages"
              />

              <div className="rounded-2xl border border-red-100 bg-red-50/50 p-5 sm:p-6">
                <p className="text-sm leading-7 text-slate-700 sm:text-base">
                  If your package arrives damaged, please contact us within
                  <span className="font-semibold text-blue-900">
                    {" "}48 hours
                  </span>{" "}
                  and include clear photos of the package and product.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <SectionTitle
                number="08"
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