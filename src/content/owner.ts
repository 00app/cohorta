// Group-owner track copy (for-communities, apply).
//
// Rules this content follows (from the owner-outreach findings — 22 cold
// DMs naming the category got almost no response, one hostile):
// - Never name their group's category ("dating group" etc).
// - Never imply their community is lacking something.
// - Every benefit stated must be theirs, not their members'.
// - Lead with symptoms they already feel: feed clutter, playing informal
//   matchmaker, handling complaints — not a labelled solution.
// - State commercial intent upfront; no "I'm in your group" framing.
// - No revenue-share number anywhere on this track — it isn't live.

export const ownerHome = {
  eyebrow: "run a community?",
  h1: "Stop being the *unofficial matchmaker* of your own group",
  lede:
    "If your feed's full of people posting about themselves hoping someone gets in touch, if you're the one being asked to introduce people, and you're the one who picks up the complaints when it goes wrong — that's real work, and nobody's paying you for it. Cohorta takes it off your plate.",
  primaryCta: { href: "/for-communities/apply", label: "Talk to us" },
  points: [
    {
      title: "Your group stays exactly as it is",
      body: "The chat, the events, the banter — none of it changes, and none of it moves. Cohorta sits alongside your group, not instead of it.",
    },
    {
      title: "Nothing to set up, nothing it costs you",
      body: "There's no work on your end. Members who want profiles, search, and private messaging use our app instead of your feed.",
    },
    {
      title: "Complaints come to us",
      body: "If someone behaves badly, the report lands with Cohorta — not with you. You carry none of the risk.",
    },
    {
      title: "Leave whenever you like",
      body: "There's no contract holding you in. If it's not for your group, you walk away.",
    },
  ],
  honest: {
    heading: "Straight, upfront",
    body: "We're a company, not a member of your group, and we're telling you that outright: this is a commercial approach, not a favour we're asking for. We think it's a fair trade — you'll want to judge that for yourself, so ask us anything.",
  },
};

export const applyPage = {
  eyebrow: "for group owners",
  h1: "Tell us about *your group*",
  lede:
    "Ten minutes on the phone is usually enough to know if this is worth your time. Fill this in and we'll get back to you — no obligation, no pressure.",
  successMessage:
    "Got it — thank you. We'll be in touch within a couple of days.",
  fields: {
    name: "Your name",
    email: "Email",
    groupName: "Group name",
    groupPlatform: "Where does your group live? (Facebook, WhatsApp, etc.)",
    groupSize: "Roughly how many members?",
    message: "Anything else worth knowing?",
  },
  submitLabel: "Send",
};
