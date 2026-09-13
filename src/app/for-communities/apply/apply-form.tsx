"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "motion/react";
import { submitApplication, type ApplyState } from "./actions";
import { applyPage } from "@/content/owner";
import { buttonClasses, useButtonMotion } from "@/components/ui";

const initialState: ApplyState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  const buttonMotion = useButtonMotion();
  return (
    <motion.button
      type="submit"
      disabled={pending}
      className={buttonClasses()}
      {...buttonMotion}
    >
      {pending ? "Sending…" : applyPage.submitLabel}
    </motion.button>
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
    "mt-2 w-full rounded-xl border-2 border-line bg-surface px-4 py-3 text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

  return (
    <label className="block text-base font-bold text-ink">
      {label}
      {required && <span className="text-accent"> *</span>}
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
