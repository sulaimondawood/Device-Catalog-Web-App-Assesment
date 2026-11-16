import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-bold text-slate-900">Sapphire</span>
          <span aria-hidden="true">·</span>
          <span>Device Financing Catalog</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500">
          <Link
            href="#"
            className="hover:text-slate-900 transition-colors"
          >
            Terms
          </Link>
          <span>© {year} Sapphire Device Finance</span>
        </div>
      </div>
    </footer>
  );
}
