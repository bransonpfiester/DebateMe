import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex justify-between items-center px-6 md:px-12 py-6 md:py-7 border-t border-dark/[0.06]">
      <span className="text-[11px] tracking-[1.5px] uppercase text-muted">
        Debate Me &copy;{new Date().getFullYear()}
      </span>
      <ul className="flex gap-8 list-none">
        {["Twitter", "Discord", "Github", "Terms"].map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="text-[11px] tracking-[1.5px] uppercase text-muted no-underline hover:text-dark transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
