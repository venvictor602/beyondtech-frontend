"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { isValidEmail, trimValue } from "@/lib/form-validation";
import { useSubscribeMutation } from "@/hooks/api/use-subscribe-mutation";

const inputClass =
  "flex-1 min-w-0 px-3.5 py-2.5 rounded-lg border border-white/15 bg-white/5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[var(--color-brand-on-dark)]/50 focus:ring-2 focus:ring-[var(--color-brand)]/15";

export function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const mutation = useSubscribeMutation();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = trimValue(email);
    if (!isValidEmail(value)) {
      toast.error("Enter a valid email address.");
      return;
    }

    try {
      await mutation.mutateAsync(value);
      setEmail("");
      toast.success("You're subscribed. Thanks for joining our list.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Subscription failed. Try again.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted-on-dark)] m-0 mb-3">
        Newsletter
      </p>
      <div className="flex flex-row items-stretch gap-2 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className={inputClass}
          aria-label="Email for newsletter"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          aria-label="Subscribe"
          className="inline-flex items-center justify-center shrink-0 size-11 rounded-lg bg-[var(--color-brand)] text-white border-0 cursor-pointer hover:bg-[var(--color-brand-deep)] transition-colors disabled:opacity-60"
        >
          {mutation.isPending ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
        </button>
      </div>
    </form>
  );
}
