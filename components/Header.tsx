import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-teal-200/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight text-teal-800 hover:text-teal-600 sm:text-2xl"
        >
          Daycare Directories
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-teal-700"
          >
            USA
          </Link>
          <Link
            href="/canada"
            className="text-sm font-medium text-slate-600 hover:text-teal-700"
          >
            Canada
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 hover:text-teal-700"
          >
            Contact
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-600 hover:text-teal-700"
          >
            Blog
          </Link>
          <Link
            href="/advertise"
            className="rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
          >
            Advertise
          </Link>
        </nav>
      </div>
    </header>
  );
}
