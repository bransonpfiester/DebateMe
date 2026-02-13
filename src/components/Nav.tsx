"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center transition-all duration-400 ${
        scrolled || !isLanding
          ? "py-4 px-6 md:px-12 nav-frosted"
          : "py-7 px-6 md:px-12"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline text-dark">
        <div className="w-7 h-7 rounded-full bg-dark flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0e0e0e"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="w-3.5 h-3.5"
          >
            <path d="M4 12h16M12 5l7 7-7 7" />
          </svg>
        </div>
        <span className="font-serif text-xl italic tracking-[-0.5px]">
          Debate Me
        </span>
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center gap-10 list-none">
        {isLanding ? (
          <>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#principles">Principles</NavLink>
            <NavLink href="#arena">Arena</NavLink>
            <NavLink href="#leaderboard">Rankings</NavLink>
            <NavLink href="#cta">Enter</NavLink>
          </>
        ) : (
          <>
            <NavLink href="/feed">Feed</NavLink>
            <NavLink href="/leaderboard">Leaderboard</NavLink>
            <NavLink href="/profile/me">Profile</NavLink>
            <li>
              <Link
                href="/debate/new"
                className="bg-dark text-cream px-5 py-2.5 rounded-full text-[11px] font-medium tracking-[2px] uppercase no-underline transition-all hover:scale-105"
              >
                Start Debate
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-[1.5px] bg-dark transition-all duration-300 ${
            mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-dark transition-all duration-300 ${
            mobileOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-[1.5px] bg-dark transition-all duration-300 ${
            mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream border-t border-dark/[0.06] p-6 flex flex-col gap-6 md:hidden">
          {isLanding ? (
            <>
              <MobileNavLink href="#about" onClick={() => setMobileOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="#principles" onClick={() => setMobileOpen(false)}>Principles</MobileNavLink>
              <MobileNavLink href="#arena" onClick={() => setMobileOpen(false)}>Arena</MobileNavLink>
              <MobileNavLink href="#leaderboard" onClick={() => setMobileOpen(false)}>Rankings</MobileNavLink>
            </>
          ) : (
            <>
              <MobileNavLink href="/feed" onClick={() => setMobileOpen(false)}>Feed</MobileNavLink>
              <MobileNavLink href="/leaderboard" onClick={() => setMobileOpen(false)}>Leaderboard</MobileNavLink>
              <MobileNavLink href="/profile/me" onClick={() => setMobileOpen(false)}>Profile</MobileNavLink>
            </>
          )}
          <Link
            href={isLanding ? "/auth/signup" : "/debate/new"}
            className="bg-dark text-cream px-5 py-3 rounded-full text-[11px] font-medium tracking-[2px] uppercase no-underline text-center"
            onClick={() => setMobileOpen(false)}
          >
            {isLanding ? "Get Started" : "Start Debate"}
          </Link>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-dark no-underline text-[11.5px] font-medium tracking-[2px] uppercase opacity-50 hover:opacity-100 transition-opacity"
      >
        {children}
      </Link>
    </li>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className="text-dark no-underline text-[11.5px] font-medium tracking-[2px] uppercase opacity-60"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
