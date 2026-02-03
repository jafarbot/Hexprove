# Hexprove Skills & Commands Guide

This guide covers the custom Claude Code skills and commands created for the Hexprove project.

## Available Skills

**These skills are project-specific** - they only work when you're in the Hexprove directory.

Use these skills by typing `/skill-name` in Claude Code:

### 1. `/hexprove-status`
**Quick health check of the Hexprove website**

Checks:
- Coming soon mode status
- Dependencies installation
- Git status and recent commits
- TypeScript errors

Use this when:
- Starting work on the project
- Debugging issues
- Checking project state before making changes

---

### 2. `/deploy-preview`
**Pre-deployment checklist and validation**

Validates:
- Environment variables (especially NEXT_PUBLIC_COMING_SOON)
- Production build succeeds
- TypeScript compilation
- Git status (uncommitted changes)
- Critical files present
- Image optimization
- SEO metadata
- Contact form presence

Use this when:
- Preparing to deploy to production
- Before pushing to Vercel
- Validating a major feature is ready

---

### 3. `/content-audit`
**Audit website content for SEO and messaging**

Analyzes:
- SEO metadata from layout.tsx
- Homepage content
- Key messaging and keywords (crypto, QA, Web3, testing, etc.)
- Contact information
- Social media links
- Call-to-action buttons
- Component structure
- Branding assets (logos, icons)
- Image accessibility (alt text)

Use this when:
- Updating website copy
- Optimizing for SEO
- Preparing for launch
- Checking brand consistency

---

### 4. `/env-setup`
**Initialize and validate environment variables**

Manages:
- Creates .env.example if missing
- Checks for .env file
- Validates NEXT_PUBLIC_COMING_SOON setting
- Verifies .env is in .gitignore
- Shows current configuration

Use this when:
- Setting up the project for the first time
- Toggling between coming soon and full site
- Troubleshooting environment issues
- Onboarding team members

---

## Custom Commands

These are project-specific commands stored in `.claude/commands/`. Reference them by name:

### `toggle-coming-soon`
Instructions for toggling the coming soon page on/off

### `check-animations`
Comprehensive checklist for verifying Framer Motion animations

### `update-seo`
Guide for updating SEO metadata and optimization

### `optimize-images`
Instructions for optimizing images for performance

---

## Project Settings

The `.claude/settings.json` file pre-approves common commands:
- `npm run *` (build, dev, lint, etc.)
- `npm install *`
- `npx *` (TypeScript, formatters, etc.)
- `vercel *` (deployment)
- Git commands (status, diff, log)

This means Claude can run these without asking for permission each time.

---

## Typical Workflows

### Starting a Work Session
1. Run `/hexprove-status` to see project state
2. Check git status and recent commits
3. Start development server: `npm run dev`

### Before Deploying
1. Run `/deploy-preview` to check readiness
2. Fix any issues identified
3. Toggle coming soon if needed: `/env-setup`
4. Deploy to Vercel

### Content Updates
1. Edit components or pages
2. Run `/content-audit` to check SEO
3. Ask Claude to "optimize images" or "check animations"
4. Commit changes

### SEO Optimization
1. Run `/content-audit` for current state
2. Use custom command: "update-seo"
3. Make improvements
4. Validate with another `/content-audit`

---

## Tips

- Skills output raw data that Claude then analyzes - the real power is in the AI's interpretation
- You can combine skills: "Run /hexprove-status and /deploy-preview, then summarize"
- Custom commands are references - mention them to get Claude's guidance
- Project settings mean fewer permission prompts for common tasks

---

## Troubleshooting

**Skill not found?**
- Skills are in `/Users/sino/Documents/Hexprove/.claude/skills/`
- Make sure you're in the Hexprove directory when using them
- Check that `skill.json` and `.sh` files exist
- Verify scripts are executable: `chmod +x script.sh`

**Skill fails?**
- Check the script runs manually: `/Users/sino/Documents/Hexprove/.claude/skills/hexprove-status/status.sh`
- Verify paths in scripts point to `/Users/sino/Documents/Hexprove`
- Check dependencies (npm, git, etc.) are installed

**Commands not showing up?**
- Commands are in `/Users/sino/Documents/Hexprove/.claude/commands/`
- Must be `.md` files
- Must be in the project directory when working

---

## Extending These Skills

To modify a skill:
1. Edit the `.sh` script in `/Users/sino/Documents/Hexprove/.claude/skills/skill-name/`
2. Test it manually in terminal first
3. Update the description in `skill.json` if needed

To create a new skill:
1. Copy an existing skill directory as a template
2. Update `skill.json` with new name and description
3. Write your bash script
4. Make it executable: `chmod +x script.sh`
5. Test with `/your-skill-name`

---

## Files Created

**All files are project-specific** (only available when working in the Hexprove directory):

```
/Users/sino/Documents/Hexprove/.claude/
├── settings.json
├── SKILLS_GUIDE.md (this file)
├── skills/
│   ├── hexprove-status/
│   │   ├── skill.json
│   │   └── status.sh
│   ├── deploy-preview/
│   │   ├── skill.json
│   │   └── deploy.sh
│   ├── content-audit/
│   │   ├── skill.json
│   │   └── audit.sh
│   └── env-setup/
│       ├── skill.json
│       └── setup.sh
└── commands/
    ├── toggle-coming-soon.md
    ├── check-animations.md
    ├── update-seo.md
    └── optimize-images.md
```

---

## Next Steps

1. **Test the skills**: Try `/hexprove-status` right now
2. **Run deploy preview**: Use `/deploy-preview` to see what needs work before launch
3. **Audit content**: Run `/content-audit` to check SEO and messaging
4. **Set up environment**: Use `/env-setup` to verify configuration

The skills are designed to gather information and let Claude analyze it for you - think of them as specialized data collectors that make Claude's assistance more powerful and context-aware.
