"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import {
  isValidEmail,
  isValidName,
  isValidPhone,
  trimValue,
} from "@/lib/form-validation";
import { SITE } from "@/lib/content";
import { useCareerApplyMutation } from "@/hooks/api/use-career-apply-mutation";

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_FILES =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const inputClass =
  "w-full px-3.5 py-3 rounded-lg border border-[var(--border-subtle)] bg-white text-base sm:text-sm outline-none focus:border-[var(--color-brand-deep)] focus:ring-2 focus:ring-[var(--color-brand)]/15 min-h-[2.75rem]";

type Props = {
  careerId: string;
  roleTitle: string;
};

type FieldValidation = { submitted: boolean; touched: Record<string, boolean> };

const initialValidation: FieldValidation = { submitted: false, touched: {} };

function isValidResumeFile(file: File | null): boolean {
  if (!file || file.size === 0) return false;
  if (file.size > MAX_FILE_BYTES) return false;
  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return allowed.includes(file.type);
}

export function CareerApplyForm({ careerId, roleTitle }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverLetterText, setCoverLetterText] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [validation, setValidation] =
    useState<FieldValidation>(initialValidation);
  const mutation = useCareerApplyMutation();

  const showField = (key: string) =>
    validation.submitted || Boolean(validation.touched[key]);

  const errors = useMemo(
    () => ({
      fullName: !isValidName(fullName) ? "Enter your full name." : "",
      email: !isValidEmail(email) ? "Enter a valid email." : "",
      phoneNumber: !isValidPhone(phoneNumber, { required: true })
        ? "Enter a valid phone number."
        : "",
      resume: !isValidResumeFile(resume)
        ? resume && resume.size > MAX_FILE_BYTES
          ? "Resume must be 5 MB or smaller."
          : "Attach your resume (PDF or Word)."
        : "",
      coverLetterFile:
        coverLetterFile && !isValidResumeFile(coverLetterFile)
          ? coverLetterFile.size > MAX_FILE_BYTES
            ? "Cover letter file must be 5 MB or smaller."
            : "Cover letter must be PDF or Word."
          : "",
    }),
    [fullName, email, phoneNumber, resume, coverLetterFile],
  );

  const canSubmit =
    isValidName(fullName) &&
    isValidEmail(email) &&
    isValidPhone(phoneNumber, { required: true }) &&
    isValidResumeFile(resume) &&
    (!coverLetterFile || isValidResumeFile(coverLetterFile));

  const isSubmitting = mutation.isPending;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidation((v) => ({ ...v, submitted: true }));
    if (!canSubmit || isSubmitting || !resume) return;

    try {
      await mutation.mutateAsync({
        careerId,
        fullName: trimValue(fullName),
        email: trimValue(email),
        phoneNumber: trimValue(phoneNumber),
        coverLetterText: trimValue(coverLetterText) || undefined,
        resume,
        coverLetterFile: coverLetterFile ?? undefined,
      });
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCoverLetterText("");
      setResume(null);
      setCoverLetterFile(null);
      setValidation(initialValidation);
      toast.success("Application sent", {
        description: `Thanks for applying for ${roleTitle}. Our team will review your application and get back to you.`,
      });
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : `Email ${SITE.contact.careersEmail} if the form fails.`,
      );
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
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

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
          Phone number *
        </span>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onBlur={() =>
            setValidation((v) => ({
              ...v,
              touched: { ...v.touched, phoneNumber: true },
            }))
          }
          className={`${inputClass} ${showField("phoneNumber") && errors.phoneNumber ? "border-red-400" : ""}`}
          autoComplete="tel"
        />
        {showField("phoneNumber") && errors.phoneNumber ? (
          <span className="text-xs text-red-600">{errors.phoneNumber}</span>
        ) : null}
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
          Resume *{" "}
          <span className="font-normal text-[var(--text-muted)]">
            (PDF or Word, max 5 MB)
          </span>
        </span>
        <input
          type="file"
          accept={ACCEPTED_FILES}
          onChange={(e) => setResume(e.target.files?.[0] ?? null)}
          onBlur={() =>
            setValidation((v) => ({
              ...v,
              touched: { ...v.touched, resume: true },
            }))
          }
          className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-brand-muted)] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-[var(--color-brand-deep)] ${showField("resume") && errors.resume ? "border-red-400" : ""}`}
        />
        {showField("resume") && errors.resume ? (
          <span className="text-xs text-red-600">{errors.resume}</span>
        ) : null}
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
          Cover letter{" "}
          <span className="font-normal text-[var(--text-muted)]">
            (optional text)
          </span>
        </span>
        <textarea
          value={coverLetterText}
          onChange={(e) => setCoverLetterText(e.target.value)}
          rows={4}
          placeholder="Tell us why you're a fit for this role…"
          className={`${inputClass} resize-y min-h-[100px]`}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-[var(--color-brand-dark)]">
          Cover letter file{" "}
          <span className="font-normal text-[var(--text-muted)]">
            (optional PDF or Word)
          </span>
        </span>
        <input
          type="file"
          accept={ACCEPTED_FILES}
          onChange={(e) => setCoverLetterFile(e.target.files?.[0] ?? null)}
          onBlur={() =>
            setValidation((v) => ({
              ...v,
              touched: { ...v.touched, coverLetterFile: true },
            }))
          }
          className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-brand-muted)] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-[var(--color-brand-deep)] ${showField("coverLetterFile") && errors.coverLetterFile ? "border-red-400" : ""}`}
        />
        {showField("coverLetterFile") && errors.coverLetterFile ? (
          <span className="text-xs text-red-600">{errors.coverLetterFile}</span>
        ) : null}
      </label>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto justify-center"
        disabled={!canSubmit || isSubmitting}
      >
        {isSubmitting ? "Submitting…" : "Submit application"}
        <Send className="size-4" />
      </Button>

      <p className="text-xs text-[var(--text-muted)] m-0">
        Prefer email? Send your CV to{" "}
        <a
          href={`mailto:${SITE.contact.careersEmail}?subject=${encodeURIComponent(`Application: ${roleTitle}`)}`}
          className="font-medium text-[var(--color-brand)] hover:underline underline-offset-2"
        >
          {SITE.contact.careersEmail}
        </a>
        .
      </p>
    </form>
  );
}
