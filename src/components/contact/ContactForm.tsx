"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/content";
import {
  contactServiceLabel,
  resolveContactServiceId,
  type ContactServiceOption,
} from "@/lib/api/contact";
import { useContactServicesQuery } from "@/hooks/api/use-contact-services-query";
import {
  isValidEmail,
  isValidMessage,
  isValidName,
  isValidPhone,
  trimValue,
} from "@/lib/form-validation";
import { useContactMutation } from "@/hooks/api/use-contact-mutation";
import { ContactFormSkeleton } from "@/components/ui/skeletons";

type FieldValidation = { submitted: boolean; touched: Record<string, boolean> };

const initialValidation: FieldValidation = { submitted: false, touched: {} };

const inputClass =
  "w-full px-3.5 py-3 rounded-lg border border-[var(--border-subtle)] bg-white text-base sm:text-sm outline-none focus:border-[var(--color-brand-deep)] focus:ring-2 focus:ring-[var(--color-brand)]/15 min-h-[2.75rem]";

type FormProps = {
  serviceOptions?: ContactServiceOption[];
};

function ContactFormFields({ serviceOptions: propOptions }: FormProps) {
  const { data: queryOptions = [], isPending: servicesLoading } =
    useContactServicesQuery();
  const serviceOptions = propOptions ?? queryOptions;
  const searchParams = useSearchParams();
  const serviceParam = resolveContactServiceId(
    searchParams.get("service"),
    serviceOptions,
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [serviceId, setServiceId] = useState(serviceParam ?? "");
  const [message, setMessage] = useState("");
  const [validation, setValidation] =
    useState<FieldValidation>(initialValidation);
  const mutation = useContactMutation();

  const selectedServiceName = contactServiceLabel(serviceId, serviceOptions);

  const showField = (key: string) =>
    validation.submitted || Boolean(validation.touched[key]);

  const errors = useMemo(
    () => ({
      fullName: !isValidName(fullName) ? "Enter your full name." : "",
      email: !isValidEmail(email) ? "Enter a valid email." : "",
      phone: !isValidPhone(phone) ? "Enter a valid phone number." : "",
      message: !isValidMessage(message, 20)
        ? "Please write at least 20 characters."
        : "",
    }),
    [fullName, email, phone, message],
  );

  const canSubmit =
    isValidName(fullName) &&
    isValidEmail(email) &&
    isValidPhone(phone) &&
    isValidMessage(message, 20);

  const isSubmitting = mutation.isPending;

  if (!propOptions && servicesLoading) {
    return <ContactFormSkeleton />;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidation((v) => ({ ...v, submitted: true }));
    if (!canSubmit || isSubmitting) return;

    const services: number[] = [];
    const serviceNote = selectedServiceName
      ? `Service of interest: ${selectedServiceName}\n\n`
      : serviceId === "other"
        ? "Service of interest: Other / not sure yet\n\n"
        : "";

    try {
      await mutation.mutateAsync({
        fullName: trimValue(fullName),
        email: trimValue(email),
        phone: trimValue(phone),
        address: trimValue(address) || undefined,
        companyName: trimValue(companyName) || undefined,
        subject:
          trimValue(subject) ||
          (selectedServiceName
            ? `Enquiry: ${selectedServiceName}`
            : "Project enquiry"),
        message: `${serviceNote}${trimValue(message)}`,
        services,
        serviceLabel:
          selectedServiceName ?? (serviceId === "other" ? "Other" : undefined),
      });
      setFullName("");
      setEmail("");
      setCompanyName("");
      setAddress("");
      setPhone("");
      setSubject("");
      setServiceId("");
      setMessage("");
      setValidation(initialValidation);
      toast.success("Message sent", {
        description:
          "Thanks — our team will review your enquiry and respond within one business day.",
      });
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : `Email us at ${SITE.contact.email} if the form fails.`,
      );
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {selectedServiceName ? (
        <p className="m-0 rounded-lg border border-[var(--color-brand)]/25 bg-[var(--color-brand-muted)]/40 px-4 py-3 text-sm text-[var(--color-brand-dark)]">
          You&apos;re enquiring about{" "}
          <strong className="font-semibold">{selectedServiceName}</strong>.
          Change the selection below if needed.
        </p>
      ) : null}

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
          Service of interest
        </span>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className={`${inputClass} cursor-pointer`}
          aria-label="Service of interest"
        >
          <option value="">Select a service (optional)</option>
          {serviceOptions.map((opt) => (
            <option key={opt.id} value={String(opt.id)}>
              {opt.name}
            </option>
          ))}
          <option value="other">Other / not sure yet</option>
        </select>
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
            Full name *
          </span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() =>
              setValidation((v) => ({
                ...v,
                touched: { ...v.touched, fullName: true },
              }))
            }
            className={`${inputClass} ${showField("fullName") && errors.fullName ? "border-red-400" : ""}`}
            autoComplete="name"
          />
          {showField("fullName") && errors.fullName ? (
            <span className="text-xs text-red-600">{errors.fullName}</span>
          ) : null}
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
            Email *
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>
              setValidation((v) => ({
                ...v,
                touched: { ...v.touched, email: true },
              }))
            }
            className={`${inputClass} ${showField("email") && errors.email ? "border-red-400" : ""}`}
            autoComplete="email"
          />
          {showField("email") && errors.email ? (
            <span className="text-xs text-red-600">{errors.email}</span>
          ) : null}
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
            Company
          </span>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className={inputClass}
            autoComplete="organization"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
            Phone *
          </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() =>
              setValidation((v) => ({
                ...v,
                touched: { ...v.touched, phone: true },
              }))
            }
            className={`${inputClass} ${showField("phone") && errors.phone ? "border-red-400" : ""}`}
            autoComplete="tel"
          />
          {showField("phone") && errors.phone ? (
            <span className="text-xs text-red-600">{errors.phone}</span>
          ) : null}
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
            Address
          </span>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={inputClass}
            autoComplete="street-address"
            placeholder="City, state, or office location"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
            Subject
          </span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClass}
            placeholder="e.g. Attendance system for two campuses"
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
          How can we help? *
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onBlur={() =>
            setValidation((v) => ({
              ...v,
              touched: { ...v.touched, message: true },
            }))
          }
          rows={5}
          placeholder={
            selectedServiceName
              ? `Tell us about your ${selectedServiceName.toLowerCase()} requirements, timeline, and constraints…`
              : "Describe the process you want to improve, the system you have in mind, and your timeline…"
          }
          className={`${inputClass} resize-y min-h-[120px] ${showField("message") && errors.message ? "border-red-400" : ""}`}
        />
        {showField("message") && errors.message ? (
          <span className="text-xs text-red-600">{errors.message}</span>
        ) : null}
      </label>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto justify-center"
        disabled={!canSubmit || isSubmitting}
      >
        {isSubmitting ? "Sending…" : "Send message"}
        <Send className="size-4" />
      </Button>
    </form>
  );
}

function ContactFormFallback() {
  return <ContactFormSkeleton />;
}

function ContactFormWithParams({ serviceOptions }: FormProps) {
  const searchParams = useSearchParams();
  return (
    <ContactFormFields
      key={searchParams.get("service") ?? "default"}
      serviceOptions={serviceOptions}
    />
  );
}

export function ContactForm({ serviceOptions }: FormProps = {}) {
  return (
    <Suspense fallback={<ContactFormFallback />}>
      <ContactFormWithParams serviceOptions={serviceOptions} />
    </Suspense>
  );
}
