const STEPS = [
  {
    number: '01',
    title: 'Select a verified device',
    description:
      'Filter by category or search by model name to compare upfront Naira pricing and real-time stock status.',
  },
  {
    number: '02',
    title: 'Choose your repayment schedule',
    description:
      'Preview monthly installments across 3, 6, 9, or 12 months directly on the device detail view before applying.',
  },
  {
    number: '03',
    title: 'Submit financing interest',
    description:
      'Provide your contact details and preferred tenure. Our underwriting team follows up within one business day.',
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-t border-slate-200 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            How device financing works
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
            Structured for salaried professionals, business owners, and remote teams across Nigeria.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="border-t border-slate-200 pt-5"
            >
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
