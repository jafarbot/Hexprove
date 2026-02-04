# Objection Handling Playbook

## Framework: Acknowledge → Explore → Respond → Confirm

1. **Acknowledge** — Show you heard them, don't dismiss
2. **Explore** — Ask a question to understand the real concern
3. **Respond** — Address with relevant proof/logic
4. **Confirm** — Check if you've addressed it

## Project-Based & Commitment Objections

### "We just need help with one thing / short-term"

**The real concern:** They don't want ongoing commitment

**Response:**
```
"Totally get it — that's actually how a lot of our engagements start.

We do project-based work all the time: pre-launch QA, specific feature testing, one-off sprints. No long-term commitment required.

What's the specific thing you need help with? I can scope something out that fits."
```

**Key:** This is an opportunity, not an objection. Project-based is a great entry point.

---

### "That's more than we budgeted"

**The real concern:** Price anchoring or genuine budget constraint

**Response:**
```
"What did you have in mind?

We're flexible on structure. If a full retainer doesn't fit, we can do project-based — maybe a 2-week sprint for your upcoming launch, or focused testing on a specific feature.

What's the scope you're trying to cover? Let's see if there's a way to make it work."
```

---

### "We only need QA for our launch"

**The real concern:** They think QA is a one-time thing

**Response:**
```
"Launch QA is actually our sweet spot. We can do a focused 2-3 week engagement leading up to go-live.

Here's what I'd suggest: intensive pre-launch testing, then we part ways. If you find you want ongoing coverage after launch, we can talk about that — but no pressure.

When's your launch date?"
```

---

### "We're bootstrapped / tight on budget"

**The real concern:** Limited funds, need to prioritize

**Response:**
```
"Respect that — been there myself.

Here's an option: we do a focused project instead of an ongoing retainer. Maybe a one-week QA audit, or testing just your core flow before launch. Something in the $1,500-2,500 range.

Gets you expert eyes on the most critical stuff without a big commitment. If it works out and you raise or grow, we can expand from there.

What's the one thing you're most worried about shipping with bugs?"
```

---

## Common Objections

### "We do QA ourselves / engineers test their own code"

**The real concern:** They think dedicated QA is unnecessary overhead

**Response:**
```
"That's how most teams start — makes sense when you're small and moving fast.

The challenge is: engineers testing their own code have blind spots. They know how it's supposed to work, so they test the happy path. Fresh eyes catch what familiarity misses.

At Uniswap, after we implemented dedicated QA, we caught 60% more bugs before production. The engineers were initially skeptical, but it freed them up to build instead of test.

What's your current release process like? Are things slipping through that you wish were caught earlier?"
```

---

### "We use automation / we're automating everything"

**The real concern:** They believe automation solves QA

**Response:**
```
"Automation is great — we're fans of it. But here's the thing: automation catches what you anticipate. You write tests for known scenarios.

Crypto has edge cases that are hard to automate: wallet disconnects mid-transaction, network switching, gas price spikes, weird token behaviors. That stuff needs human judgment.

We actually complement automation well. You automate the regression suite; we catch the unexpected stuff. At OpenSea, we worked alongside their automation and still found critical bugs every sprint.

What's your automation coverage like right now?"
```

---

### "We already have a QA vendor"

**The real concern:** Switching is a hassle

**Response:**
```
"Got it. Curious — what's working about that, and what's not?

Most teams we talk to tried crowdsourced vendors first. The frustration is usually: different testers every week who don't know your product, testers who don't understand crypto (reporting gas fees as bugs), and extra fees for 'account management.'

If that's not your experience, great — sounds like you found a good one. But if any of that resonates, might be worth a conversation.

What would need to be true for you to consider a change?"
```

---

### "We're too early / not ready yet"

**The real concern:** They don't see urgency or think QA is a later-stage problem

**Response:**
```
"When are you planning to launch?

Here's the thing: the bugs that hurt most are the ones that hit your first users. Early reputation is everything in crypto — one bad launch and Twitter doesn't forget.

Pre-launch is actually ideal timing. We can help build your test framework before users hit bugs. The cost of fixing post-launch (engineering time, reputation damage, support load) far exceeds the investment now.

What's keeping you up at night about the launch?"
```

---

### "It's too expensive"

**The real concern:** Price anchoring or budget mismatch

**Response:**
```
"Fair — it's an investment. What are you comparing against?

If it's hiring: a senior QA engineer runs $150K+ all-in (salary, benefits, management time), and they still need to learn crypto. We're a fraction of that with day-one expertise.

If it's crowdsourced: they quote $65/hour, but add account management fees and the time you spend retraining rotating testers, and it often ends up more expensive with worse results.

If it's doing nothing: what's the cost of a bug hitting production? Engineering time to fix, support load, user trust. Usually way more than a month of QA.

What would the right number look like for your budget?"
```

---

### "Can you guarantee you'll find bugs?"

**The real concern:** They want certainty of ROI

**Response:**
```
"If we don't find bugs, that's actually great news — it means your product is solid.

But realistically, every product we've tested has had bugs. It's not a reflection of your team; it's just how software works.

What I can guarantee: we'll test comprehensively, report clearly, and bring expertise you won't find elsewhere. At our previous companies, we consistently reduced production bugs by 20-60%.

If after a month you don't see value, we can part ways. No long-term contracts required to start."
```

---

### "We're talking to other vendors"

**The real concern:** They're shopping / not committed

**Response:**
```
"Smart to compare options. Who else are you looking at?

[If they mention crowdsourced like Testlio/Applause:]
"The main difference is model: they're crowdsourced (different testers each time), we're dedicated (same team, every sprint). And we're crypto-native — not a general QA firm with a blockchain page.

What's most important to you in making this decision?"
```

---

### "We need to think about it"

**The real concern:** Something is unresolved

**Response:**
```
"Totally fair. Is there something specific you need to think through?

Sometimes 'think about it' means budget, sometimes it means timing, sometimes it means someone else needs to weigh in. If you can share what's on your mind, I might be able to help."
```

---

### "Can we do a pilot / trial first?"

**The real concern:** They want to de-risk

**Response:**
```
"We can do a shorter initial engagement — say, one month. That gives you time to see how we work without a big commitment.

What I'd want to avoid is a 'free trial' — the problem is we'd be splitting focus and you wouldn't see our best work. A paid pilot month lets us go all-in.

Does that work?"
```

---

### "Send me more information"

**The real concern:** Either genuinely needs info or polite brush-off

**Response:**
```
"Happy to. Is there something specific you want to see?

I can send our standard overview, but if there's a particular question — pricing, process, case studies — I'd rather send something relevant than a generic deck.

What would be most useful?"
```

---

### "We're focused on other priorities right now"

**The real concern:** QA isn't urgent enough

**Response:**
```
"Totally get it — there's always more to do than time allows.

Out of curiosity, when do you think QA might become a priority? I'm happy to follow up then rather than bug you now.

And if anything changes — like a bug hits production that shouldn't have — feel free to reach back out."
```

---

### "Our CTO / VP Eng needs to be involved"

**The real concern:** You're not talking to the decision maker

**Response:**
```
"Makes sense. Would it help to set up a quick call with them included? I can adjust what I present based on what they care about.

What would they need to see to feel good about moving forward?"
```

---

### "How do we know you'll understand our product?"

**The real concern:** Trust / crypto expertise doubt

**Response:**
```
"Fair question. Here's what I'd say:

I spent 2 years at Uniswap testing swaps, pools, governance — the full DeFi stack. Then 2 years at OpenSea testing marketplace flows, wallet connections, NFT transfers. Been in crypto since 2017.

Your product is a [type] — we've tested similar. We won't need a crypto 101. First week, we'll dig into your docs and staging, and we'll have intelligent questions, not 'what's a gas fee.'

Want to do a quick technical call where we can show you how we'd approach testing your product specifically?"
```

---

## Reframing Techniques

**If they see QA as cost center:**
→ Reframe as risk mitigation: "What's the cost of a bug hitting your users?"

**If they think automation is enough:**
→ Reframe as complementary: "We catch what automation can't anticipate"

**If they're comparing to hiring:**
→ Reframe as expertise + flexibility: "Fractional expertise without the overhead"

**If they had bad vendor experience:**
→ Reframe as different model: "That's crowdsourced. We're dedicated."

## When to Walk Away

Some objections mean they're not a fit:
- Zero budget and no path to budget
- Can't access decision maker after multiple attempts
- Need free/unpaid extensive trial
- Timeline is "maybe next year"
- Already signed with another vendor recently
- Company is clearly imploding

It's okay to say:
```
"Sounds like the timing might not be right. No worries — if things change, reach out. Good luck with [Company]."
```

Don't chase bad-fit deals. Your time is better spent on the next lead.
