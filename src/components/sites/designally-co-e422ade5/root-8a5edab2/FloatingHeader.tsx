"use client";

/**
 * designally.co — floating overlay header ("header-2", .elementor-element-0722474).
 *
 * A compact, page-level overlay that is separate from SiteHeader: it sits over
 * the page content, fades in once the user scrolls past 1000px (Elementor
 * `sticky_effects_offset: 1000`) and carries the only navigation available on
 * mobile.
 *
 * Every measurement below is taken from getComputedStyle on the live site at
 * 1440x900 and is identical at all three breakpoints — including the root's
 * 375px width, which is intentional: the header does not span the viewport.
 */

import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { DsgNavItem } from "@/types/designally";

import { CloseIcon, DMonogramIcon, MenuBarsIcon } from "../shared/icons";

/** Scroll offset at which the header reveals itself. */
const REVEAL_OFFSET = 1000;

/** Dropdown links, in the order the live site renders them. */
const NAV_ITEMS: readonly DsgNavItem[] = [
  { label: "SERVICES", href: "https://designally.co/services/" },
  { label: "WORKS", href: "https://designally.co/works/" },
  { label: "ABOUT", href: "https://designally.co/about/" },
  { label: "THOUGHTS", href: "https://designally.co/thoughts/" },
  { label: "CONTACT", href: "https://designally.co/contact-us/" },
];

/** 5 links x 28px — the open max-height the collapse animates to. */
const NAV_OPEN_MAX_HEIGHT = NAV_ITEMS.length * 28;

interface FloatingHeaderProps {
  className?: string;
}

export function FloatingHeader({ className }: FloatingHeaderProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsRevealed((current) => {
        const next = window.scrollY >= REVEAL_OFFSET;
        // Collapse the dropdown whenever the header retreats out of view.
        if (!next && current) setIsOpen(false);
        return next;
      });
    };

    // Read once on mount so a page restored mid-scroll paints the right state.
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-[999] flex h-[147px] w-[375px] items-start justify-between",
        "bg-transparent px-[80px] py-[40px] transition-all duration-300",
        isRevealed
          ? "visible translate-y-0 opacity-100"
          : "invisible translate-y-[-134px] opacity-0",
        !isRevealed && "pointer-events-none",
        className,
      )}
    >
      <a
        href="https://designally.co"
        aria-label="Designally home"
        className="inline-block h-[52px] w-[52px] text-dsg-orange"
      >
        <DMonogramIcon width={52} height={52} className="block h-[52px] w-[52px]" />
      </a>

      <div className="flex flex-col items-end">
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Menu Toggle"
          aria-expanded={isOpen}
          className={cn(
            "ml-[2.75px] flex h-[51px] w-[51px] items-center justify-center p-[6px]",
            "rounded-[500px] border-[1.5px] border-dsg-orange bg-transparent",
            "text-dsg-orange transition-all duration-300",
          )}
        >
          <span className="flex h-[36px] w-[36px] items-center justify-center">
            {isOpen ? (
              <CloseIcon width={24} height={24} className="block h-[24px] w-[24px]" />
            ) : (
              <MenuBarsIcon width={24} height={24} className="block h-[24px] w-[24px]" />
            )}
          </span>
        </button>

        <nav
          aria-label="Floating menu"
          aria-hidden={!isOpen}
          style={{ maxHeight: isOpen ? NAV_OPEN_MAX_HEIGHT : 0 }}
          className={cn(
            "mt-[16px] overflow-hidden bg-transparent",
            "transition-[max-height,transform,visibility] duration-300",
            isOpen ? "visible" : "invisible",
          )}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              tabIndex={isOpen ? undefined : -1}
              className={cn(
                "flex h-[28px] items-center justify-end py-[4px] pl-[40px]",
                "font-sans text-[16px] leading-[20px] font-medium uppercase",
                "text-dsg-ink-strong transition-colors duration-300 hover:text-dsg-orange",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
