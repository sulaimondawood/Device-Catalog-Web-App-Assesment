import { ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl [text-wrap:balance] leading-[1.12]">
            Own the devices you work with. Repay in predictable monthly plans.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Explore smartphones, laptops, tablets, and accessories with transparent Naira pricing. Select any device to review availability and submit your financing interest in under two minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#catalog"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gray-700 px-5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
            >
              <span>Explore Catalog</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 whitespace-nowrap shrink-0"
            >
              How Financing Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
