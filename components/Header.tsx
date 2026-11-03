'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/work', label: 'Work' },
    { href: '/process', label: 'Process' },
    { href: '/about', label: 'About' },
    { href: '/dispatch', label: 'Dispatch' },
    { href: '/contact', label: 'Contact' },
  ];

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
            type="button"
            className={styles.menuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className={`${styles.menuIcon} ${mobileMenuOpen ? styles.menuIconOpen : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-nav" className={styles.mobileNav} role="region" aria-label="Mobile Navigation">
          <div className="container">
            <ul className={styles.mobileList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className={styles.mobileActionItem}>
                <Link
                  href="/quote"
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get a quote
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
