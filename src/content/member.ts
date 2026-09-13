// Member-track copy (home, how it works, trust, faq).
//
// Rules this content follows (from the Cohorta brand reference):
// - Lead with community/events, not dating — dating is supported, not led.
// - Never make a member declare a dating motive publicly. This site is
//   private to visit, so it can say more than a public Facebook post could —
//   but the category we lead with is still "somewhere to meet people from
//   your community", not "a dating app".
// - State what a step involves before asking someone to take it (low
//   digital confidence, not low intelligence).
// - No emoji, sentence case headings, contractions are fine, "first month
//   free, then £4.99 a month" is the only correct pricing line.
// - Never mention the group-owner revenue share.

import { appUrl } from "@/lib/config";

export const memberHome = {
  eyebrow: "no strangers. nobody watching.",
  h1: "Meet people from the group *you're already in*",
  lede:
    "Cohorta takes a community you're already part of and gives it a place to actually meet up — for dating, for friendship, for turning up to the next thing. Nobody outside your group gets in. Nobody in it can see what you're here for.",
  primaryCta: { href: appUrl, label: "Get started", external: true },
  secondaryCta: { href: "/how-it-works", label: "See how it works" },
  pillars: [
    {
      title: "No strangers",
      body: "Everyone on here already belongs to your group. Not a stranger from across the country — someone from the same place you already are.",
    },
    {
      title: "Nobody watching",
      body: "The people who run your group can't see who you've liked, who you've matched with, or what you're here for. That's yours.",
    },
    {
      title: "Somewhere to go",
      body: "Real events, not just another chat window. Cohorta is for meeting up, not scrolling forever.",
    },
  ],
  honest: {
    heading: "Why we built it this way",
    body: "Most apps put you in a queue of strangers and leave you to do the filtering — swipe, block, report, repeat. That's a lot of work for not much trust. Cohorta starts from the other direction: the filtering already happened, because everyone here is from a community you chose to join in the first place. All that's left is finding the right person in it.",
  },
  howItWorksPreview: {
    heading: "Three steps, about ten minutes total",
    steps: [
      {
        title: "Get your code",
        body: "Your group's owner shares a code inside your existing group. That's your way in — nobody else's.",
      },
      {
        title: "Set up your profile",
        body: "About five minutes. You'll want four photos and a few lines about yourself — worth picking your photos before you start.",
      },
      {
        title: "Add it to your home screen",
        body: "Cohorta runs in your browser, not the app store. Say yes when it asks to add itself to your home screen — that's how it can actually notify you.",
      },
    ],
  },
};

export const howItWorks = {
  eyebrow: "how it works",
  h1: "Nothing to download. *About ten minutes* to set up.",
  lede:
    "Cohorta is a web app, not something from an app store. That trips a few people up the first time, so here's the whole thing, upfront.",
  // No leading "1. " etc — how-it-works/page.tsx renders the number as its
  // own circular badge above each title, not as text inside it.
  steps: [
    {
      title: "Get a code from your group",
      body: "Every Cohorta community starts with a code, shared by the person who runs your group. Without one, there's no way in — that's deliberate. It's what keeps this to people from your community, not the whole internet.",
    },
    {
      title: "Go to cohorta.app and enter it",
      body: "Type in your code and you're straight into setting up your profile.",
    },
    {
      title: "Build your profile — about five minutes",
      body: "You'll need four photos and a short bit about yourself (we call it 'At a glance'). Have a think about which photos you want before you start — that's the bit people usually pause on.",
    },
    {
      title: "Say yes to adding it to your home screen",
      body: "You'll be asked whether to add Cohorta to your home screen. Say yes. Until you do, your phone has nowhere to send a notification from, so you won't know if someone's messaged you. After that, it opens like any other app, from its own icon.",
    },
    {
      title: "Have a look at who's nearby",
      body: "Discover shows you people from your group, near you. From there it's the usual things — a look, a message, meeting up.",
    },
  ],
  faqNote:
    "Stuck partway through, or the code's not working? Check the FAQ — signup is the bit most people get stuck on, and most of it's a quick fix.",
};

export const trust = {
  eyebrow: "trust & privacy",
  h1: "The person who runs your group *can't see any of this*",
  lede:
    "This is the part of Cohorta that matters most, so we'd rather say it plainly than bury it in a policy page.",
  points: [
    {
      title: "Your activity is yours",
      body: "Whoever runs your group cannot see who you've liked, who you've matched with, what you've said to anyone, or whether you're here for dating, friendship, or both. We built it that way on purpose, before anything else.",
    },
    {
      title: "Reports come to us, not them",
      body: "If you report someone, it comes to Cohorta. Not to your group's owner. They have no say in what happens next, and no visibility into why.",
    },
    {
      title: "No ads. No selling your data.",
      body: "Your subscription pays for Cohorta. We don't run advertising and we don't sell your data — to anyone, for anything.",
    },
    {
      title: "Membership stays closed",
      body: "You can only join with a code from a community you're genuinely part of. Cohorta isn't an open pool, and it isn't trying to become one.",
    },
  ],
  closing:
    "If any of that changes, we'll tell you before it happens — not after.",
};

export const faq = {
  eyebrow: "faq",
  h1: "Questions people *actually ask*",
  items: [
    {
      q: "Is this a dating app?",
      a: "It's somewhere your community can meet — for dating, for friendship, or for finding out what's on. Most people are there for one of the first two, some for both. Either way, it's private to you: nobody in your group sees why you joined.",
    },
    {
      q: "Do I need to download anything?",
      a: "No. Cohorta runs in your browser at cohorta.app. When it asks to add itself to your home screen, say yes — after that it behaves like any other app on your phone.",
    },
    {
      q: "How much does it cost?",
      a: "Your first month is free. After that it's £4.99 a month, and that covers being part of more than one group if you're in several.",
    },
    {
      q: "Can the person who runs my group see who I've liked or matched with?",
      a: "No. That's kept from them entirely — see Trust & privacy for the detail.",
    },
    {
      q: "What happens if I report someone?",
      a: "It goes straight to Cohorta, not to your group's owner.",
    },
    {
      q: "I'm stuck on signup — what's the most common issue?",
      a: "Usually it's the photos step (you need four) or missing the prompt to add Cohorta to your home screen — without that step, you won't get notified when someone messages you. Go back through How it works if you're not sure where you got to.",
    },
    {
      q: "Does anyone make money when I subscribe?",
      a: "Yes, and we'd rather tell you plainly. Your £4.99 pays for Cohorta — there's no advertising and we don't sell your data, and we're not going to.",
    },
  ],
};
