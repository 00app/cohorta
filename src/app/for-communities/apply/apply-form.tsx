"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitApplication, type ApplyState } from "./actions";
import { applyPage } from "@/content/owner";

const initialState: ApplyState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-[0.95rem] font-semibold text-ground transition-colors hover:bg-ink-2 disabled:opacity-60"
    >
      {pending ? "Sending…" : applyPage.submitLabel}
    </button>
  );
}

export function ApplyForm() {
  const [state, formAction] = useActionState(submitApplication, initialState);

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-xl border border-good/30 bg-good-soft p-6 text-good"
      >
        {applyPage.successMessage}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <Field label={applyPage.fields.name} name="name" required />
      <Field label={applyPage.fields.email} name="email" type="email" required />
      <Field label={applyPage.fields.groupName} name="groupName" required />
      <Field label={applyPage.fields.groupPlatform} name="groupPlatform" />
      <Field label={applyPage.fields.groupSize} name="groupSize" />
      <Field
        label={applyPage.fields.message}
        name="message"
        as="textarea"
        rows={4}
      />

      {state.status === "error" && (
        <p role="alert" className="text-sm text-bad">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  as = "input",
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
}) {
  const baseClasses =
    "mt-1 w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-ink placeholder:text-faint focus:border-clay focus:outline-none";

  return (
    <label className="block text-sm font-semibold text-ink-2">
      {label}
      {required && <span className="text-clay"> *</span>}
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={rows}
          className={baseClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className={baseClasses}
        />
      )}
    </label>
  );
}
