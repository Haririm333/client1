'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/work', label: 'Work' },
    { href: '/process', label: 'Process' },
    { href: '/about', label: 'About' },
    { href: '/dispatch', label: 'Dispatch' },
    { href: '/contact', label: 'Contact' },
  ];

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Move focus to first link on open
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 50);
      return () => {
        document.body.style.overflow = originalOverflow;
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Close on Escape key and return focus to button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileMenuOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close on outside tap
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!mobileMenuOpen) return;
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [mobileMenuOpen]);

  const toggleMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    } else {
      setMobileMenuOpen(true);
    }
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        {/* Logo and Wordmark */}
        <Link href="/" className={styles.brand}>
          <span className={styles.logoMark} aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="16" cy="16" r="14" stroke="#1f2326" />
              <circle cx="16" cy="16" r="8" stroke="#1e7bf0" strokeDasharray="3 2" />
              <circle cx="16" cy="16" r="3" fill="#1f2326" />
              <line x1="16" y1="2" x2="16" y2="30" stroke="#5b6570" strokeDasharray="2 2" />
              <line x1="2" y1="16" x2="30" y2="16" stroke="#5b6570" strokeDasharray="2 2" />
            </svg>
          </span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>THE MECHLAB</span>
            <span className={styles.brandTagline}>ENGINEERING</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className={styles.headerActions}>
          <Link href="/quote" className={`btn-primary ${styles.quoteBtn}`}>
            Get a quote
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuToggle}
            onClick={toggleMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="square"
              className={styles.menuIcon}
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
                  <line x1="18.5" y1="5.5" x2="5.5" y2="18.5" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Panel Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className={styles.mobileNav}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <nav className={styles.mobileNavInner} aria-label="Mobile Navigation">
            <ul className={styles.mobileList}>
              {navLinks.map((link, idx) => (
                <li key={link.href} className={styles.mobileItem}>
                  <Link
                    href={link.href}
                    ref={idx === 0 ? firstLinkRef : undefined}
                    className={styles.mobileLink}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.mobileActionBox}>
              <Link
                href="/quote"
                className={`btn-primary ${styles.mobileQuoteBtn}`}
                onClick={handleLinkClick}
              >
                Get a quote
              </Link>
            </div>
          </nav>
          <div
            className={styles.mobileBackdrop}
            onClick={() => {
              setMobileMenuOpen(false);
              menuButtonRef.current?.focus();
            }}
            aria-hidden="true"
          />
        </div>
      )}
    </header>
  );
}
