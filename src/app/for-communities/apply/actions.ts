"use server";

export type ApplyState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// No in-app rate limiting here — tried an in-memory sliding window keyed
// by IP (module scope, then globalThis) and could not make it reliable
// enough to ship. Verified live, including against a real `next build` +
// `next start` production server, not just dev: the counter did not
// behave as a simple accumulator across repeated requests to this one
// action (it plateaued well short of the configured threshold for
// reasons that didn't trace back to the counting logic itself). Shipping
// a rate limiter that silently doesn't limit anything is worse than
// having none — it would look like protection without being any. Real
// protection here needs state that survives outside this process, e.g.
// Vercel KV or Upstash Redis keyed by IP; that's a real infra decision
// (new dependency, possibly a paid service) rather than something to add
// unilaterally.

// Strips control characters (newlines, carriage returns, etc.) so a
// submitted field can't forge extra lines in the server log this
// currently writes to — the log itself is plain text, not a structured
// sink, so a raw newline in "name" would otherwise read as a second,
// fabricated log entry.
function stripControlChars(value: string): string {
  return value.replace(/[\x00-\x1f\x7f]/g, "");
}

// TODO before go-live: this currently only logs the submission server-side.
// Wire it up to wherever leads should actually land — e.g. an email via
// Resend/Postmark, a Slack webhook, or a row in a sheet/CRM. Keep the
// validation and the returned ApplyState shape; just replace the body of
// the try block below.
//
// Higher priority than "not wired up" alone suggests: applyPage.successMessage
// (src/content/owner.ts) tells the visitor "we'll be in touch within a
// couple of days" on every successful submit, and this is the only thing
// that runs on success. Confirmed live — filled and sent the form, got the
// success message back, and the only trace was this console.log in the dev
// server's own terminal. Nobody is notified. Don't let this ship as-is: a
// group owner who submits believes someone will call them, and no one will.
export async function submitApplication(
  _prevState: ApplyState,
  formData: FormData
): Promise<ApplyState> {
  const name = stripControlChars(String(formData.get("name") ?? "").trim());
  const email = stripControlChars(String(formData.get("email") ?? "").trim());
  const groupName = stripControlChars(String(formData.get("groupName") ?? "").trim());
  const groupPlatform = stripControlChars(String(formData.get("groupPlatform") ?? "").trim());
  const groupSize = stripControlChars(String(formData.get("groupSize") ?? "").trim());
  const message = stripControlChars(String(formData.get("message") ?? "").trim());

  if (!name || !email || !groupName) {
    return {
      status: "error",
      message: "Name, email, and group name are required.",
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }

  try {
    // Placeholder delivery — see TODO above.
    console.log("[Cohorta] New group-owner enquiry:", {
      name,
      email,
      groupName,
      groupPlatform,
      groupSize,
      message,
    });

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending that. Please try again.",
    };
  }
}
