import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 rounded-sm"
        >
          Sapphire
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex"
        >
          <Link
            href="#catalog"
            className="transition-colors hover:text-slate-900 hover:underline underline-offset-4"
          >
            Device Catalog
          </Link>
        </nav>

        <div className="flex items-center">
          <Link
            href="#catalog"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-700 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2"
          >
            Browse Devices
          </Link>
        </div>
      </div>
    </header>
  );
}