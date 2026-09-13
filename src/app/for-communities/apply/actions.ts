"use server";

export type ApplyState = {
  status: "idle" | "success" | "error";
  message?: string;
};

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
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const groupName = String(formData.get("groupName") ?? "").trim();
  const groupPlatform = String(formData.get("groupPlatform") ?? "").trim();
  const groupSize = String(formData.get("groupSize") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

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
