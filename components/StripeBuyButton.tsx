"use client";

import { useEffect, useRef, useState } from "react";

const STRIPE_SCRIPT = "https://js.stripe.com/v3/buy-button.js";
const PUBLISHABLE_KEY =
  "pk_live_51T8qARF3f6ZqC3t8hIauPMEJ5V5jz8bwXPSaIQhU4cYdGGWi7zHwrUk4F3XMkQ9Bb8h4qzFsE7KfMGpOFWAooBM200askh7rFI";

function loadStripeScript(): Promise<void> {
  const existing = document.querySelector(`script[src="${STRIPE_SCRIPT}"]`);
  if (existing) return Promise.resolve();
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = STRIPE_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
}

export function StripeBuyButton({ buyButtonId }: { buyButtonId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadStripeScript().then(() => {
      if (!mounted || !containerRef.current) return;
      const el = document.createElement("stripe-buy-button");
      el.setAttribute("buy-button-id", buyButtonId);
      el.setAttribute("publishable-key", PUBLISHABLE_KEY);
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(el);
      setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, [buyButtonId]);

  if (!ready) {
    return (
      <div className="h-10 w-40 animate-pulse rounded-lg bg-slate-200" aria-hidden />
    );
  }
  return <div ref={containerRef} className="min-h-[40px]" />;
}
