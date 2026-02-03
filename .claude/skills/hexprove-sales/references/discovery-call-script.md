# Discovery Call Script

## Pre-Call Checklist

Before every discovery call, research:
- [ ] Company website and product
- [ ] Recent funding/news
- [ ] Team size and key people
- [ ] LinkedIn profiles of attendees
- [ ] Any public bug reports or complaints
- [ ] Current tech stack if visible
- [ ] Competitors they might be compared to

## Call Structure (30 minutes)

### 1. Opening (2-3 minutes)

**Goal:** Build rapport, set agenda, confirm time

```
"Hey [Name], thanks for taking the time. Before we dive in — we still good for 30 minutes?

Cool. Here's what I'm thinking: I'd love to learn more about what you're building and how you're handling QA today. Then I can share a bit about how we work and we can figure out if there's a fit. Sound good?"
```

**If they seem rushed:**
```
"I know you're busy — want to keep this tight. What's most important for you to learn in our time together?"
```

### 2. Discovery Questions (10-12 minutes)

**Goal:** Understand their situation, pain, and needs

**Start broad, then drill down:**

```
"So give me the quick version — what's [Company] building and where are you in the journey?"
```

**Then dig into QA specifically:**

```
"How are you handling QA and testing today?"
```

Listen for: Engineers self-testing, PM doing QA, no process, outsourced vendor, hiring

**Follow-up questions based on their answer:**

If engineers test:
```
"How's that working? Are things slipping through to production?"
```

If they have a vendor:
```
"What's working about that? What's frustrating?"
```

If no QA:
```
"What's catching bugs before users do right now?"
```

**Pain questions:**

```
"When was the last time a bug hit production that you wish had been caught earlier?"

"What would 'great QA' look like for your team?"

"If QA was solved tomorrow, what would that free up your engineers to do?"
```

**Process questions:**

```
"Walk me through your release process. How often are you shipping?"

"What does your staging/test environment look like?"

"Where do bugs get reported today — Linear, Jira, GitHub?"
```

**Qualification questions:**

```
"Is QA something you're actively looking to solve, or more of a 'someday' thing?"

"Who else would be involved in a decision like this?"

"What's your timeline? When would you ideally have this solved by?"
```

### 3. Present HexProve (5-7 minutes)

**Goal:** Position HexProve as the solution to their specific pain

**Transition:**
```
"Cool, that's helpful context. Let me tell you a bit about how we work and you can tell me if it resonates."
```

**Key points to cover:**

1. **Credibility:**
```
"So my background — I spent 2 years at Uniswap building their QA function from scratch, then 2 years at OpenSea doing the same. I've been in crypto since 2017, so I actually understand the products we test."
```

2. **Dedicated model (if they mentioned crowdsourced frustrations):**
```
"Unlike Testlio or Applause where you get different testers every week, we're a dedicated team. Same people, every sprint. We learn your product deeply."
```

3. **Crypto expertise (always):**
```
"The big thing is — we're crypto-native. We don't report gas fees as bugs. We understand wallet flows, network switching, transaction states. We've tested swaps, bridges, NFT mints, the whole thing."
```

4. **Results:**
```
"At OpenSea, we reduced production bugs by 60% using a shift-left approach. At Uniswap, it was about 23%. Happy to walk through that methodology if useful."
```

5. **How we work:**
```
"We integrate with your workflow — Slack or Discord, Linear or Jira, whatever you use. We test against your staging environment, file detailed bugs, and stay in sync with your sprint cadence."
```

### 4. Fit Discussion (5 minutes)

**Goal:** Qualify budget and scope, set up proposal

**Scope:**
```
"Based on what you've shared, it sounds like [summarize their needs]. Does that feel right?"

"What platforms are we talking — web, mobile, extension?"

"How often are you releasing? Weekly? Daily?"
```

**Budget:**
```
"Have you budgeted for QA, or is this something you're still figuring out?"

"Just to set expectations — we work on monthly retainers, typically in the $X-Y range depending on scope. Does that ballpark feel workable?"
```

**Timeline:**
```
"When would you want to kick something like this off?"
```

### 5. Close & Next Steps (3 minutes)

**Goal:** Get commitment to next step

**If good fit:**
```
"This sounds like a good fit. Here's what I'd suggest: I'll put together a proposal with a few options based on what we discussed. I can have that to you by [date]. Then we can hop on a quick call to walk through it. Does that work?"
```

**Get their commitment:**
```
"What's the best email to send that to?"

"Who else should I copy?"

"Can we book 15 minutes next [day] to review it together?"
```

**If unclear fit:**
```
"I want to make sure this is the right fit for you. Let me send over some information and you can decide if it makes sense to keep talking. Fair?"
```

**If not a fit:**
```
"Honestly, it sounds like you might be better served by [alternative]. But if things change, I'm easy to find. Good luck with [Company]."
```

## Post-Call Actions

Immediately after call:
1. Send quick thank-you email (within 1 hour)
2. Document call notes in pipeline tracker
3. Start proposal (send within 24-48 hours)
4. Add follow-up reminders to calendar

**Thank-you email template:**
```
Subject: Good chatting — proposal coming

Hey [Name],

Thanks for the time today. Good to learn more about what you're building at [Company].

As promised, I'll have a proposal over by [date] with a few options based on what we discussed.

In the meantime, let me know if any questions come up.

Talk soon,
Sino
```

## Objection Handling During Calls

**"We're not ready yet"**
→ "Totally fair. When do you think you will be? I can follow up then. And in the meantime, happy to share some resources on setting up a QA process — might help when you're ready."

**"We need to think about it"**
→ "Of course. What specifically do you need to think through? Maybe I can help clarify."

**"Can you send more info?"**
→ "Absolutely. Is there something specific you want to see? I can tailor what I send."

**"What's the price?"**
→ "Depends on scope, but typically $X-Y per month for a team your size. I'd rather understand your needs first and put together something that actually fits."

**"We're talking to other vendors"**
→ "Smart to shop around. What are you comparing against? Happy to help you think through the trade-offs."

## Red Flags (Consider Disqualifying)

- Won't commit to a next step
- No budget or budget way too low
- Decision maker not on call and can't get them
- Timeline is "someday"
- Already committed to another vendor
- Asking for free work / extensive pilot
- Company seems unstable (layoffs, no funding, founder drama)
