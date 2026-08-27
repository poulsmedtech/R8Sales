# Dev Agent Prompt 8: Modal, About Layout, Navigation, and Footer Refinement

Continue work on the R8 Sales Group website in:

`/Users/samanthapouls/Desktop/R8Sales`

Current baseline:

- Commit: `055bcb5`
- Branch: `main`
- Remote: `https://github.com/poulsmedtech/R8Sales.git`
- Production domain: `https://r8salesgroup.com`
- Hosting: DigitalOcean App Platform Static Site with automatic deployment from `main`

Work autonomously through implementation, verification, commit, push, and deployment handoff. The owner is not a coder and must not be asked to run commands or edit files.

## Safety checks

Before editing:

1. Confirm `git rev-parse --show-toplevel` is exactly `/Users/samanthapouls/Desktop/R8Sales`.
2. Confirm `origin` is exactly `https://github.com/poulsmedtech/R8Sales.git`.
3. Confirm local `main` tracks `origin/main`.
4. Fetch safely if needed, but do not force-push or rewrite history.
5. Do not modify the unrelated parent repository.
6. Preserve `MockUp1.png`, the selected Hao portrait, and all prompt files.

## Visual references

Use the original mockup as the general source of truth:

`/Users/samanthapouls/Desktop/R8Sales/MockUp1.png`

Also review these screenshots showing the current modal and About Hao layout:

- `/Users/samanthapouls/.cursor/projects/Users-samanthapouls-Desktop-R8Sales/assets/Screenshot_2026-08-27_at_11.27.36_am-91ecc32d-c0a1-41d8-b7d7-22e1e3025065.png`
- `/Users/samanthapouls/.cursor/projects/Users-samanthapouls-Desktop-R8Sales/assets/Screenshot_2026-08-27_at_11.28.16_am-8f972804-d3e7-4dc4-be9c-0c686550fb22.png`

The content updates from Prompt 6 and the generated founder portrait from Prompt 7 must remain intact.

## 1. Redesign the Learn More popups

Improve the visual quality of all opportunity Learn More dialogs while preserving the client-approved wording exactly.

### Remove “Coming Soon”

Remove `Coming soon`, `COMING SOON`, and equivalent wording from:

- Every opportunity popup
- Contact popup
- Join popup
- Privacy and Terms popups
- Any generic popup fallback
- Any other visible site location

The only permitted use is the founder-video placeholder and/or founder-video popup, because that video has not yet been supplied.

Implementation requirements:

- Change the reusable modal’s default eyebrow from `Coming soon` to no eyebrow.
- Explicitly opt the founder video into a small `Coming soon` label if desired.
- Do not depend on each caller remembering to pass `null`.
- Search current runtime source, tests, metadata, and production output case-insensitively for `coming soon`.
- Excluding historical prompt files, every match must belong exclusively to the founder video experience.

### Professional modal styling

Redesign the reusable modal with a clean corporate presentation:

- Use a wider but readable desktop dialog, approximately 620–680px for long opportunity copy.
- Keep the mobile width constrained to the viewport with appropriate edge spacing.
- Add a subtle navy/blue accent, such as a narrow top border or restrained header treatment.
- For opportunity dialogs, show the program’s existing colored icon badge beside the title.
- Keep the title prominent without oversized typography.
- Use comfortable body line height and paragraph spacing.
- Keep paragraph width readable and left aligned.
- Use a softly blurred/dimmed backdrop.
- Give the close icon a clear hover/focus state and sufficiently large touch target.
- Keep the footer visually separated from the scrolling body.
- Use a restrained secondary-style Close button rather than making it compete with the content.
- Avoid excessive shadows, gradients, rounded corners, or consumer-app styling.

The modal must continue to:

- Render every approved paragraph in the correct order
- Keep long content internally scrollable
- Keep the title and close control reachable
- Trap keyboard focus
- Close with Escape
- Close by clicking the backdrop
- Restore focus and page scroll position
- Work at 320×568 without clipped content or controls

Refactor modal data as needed so an opportunity’s icon and tone can be passed without duplicating the opportunity content.

Acceptance criteria:

- No opportunity modal displays “Coming Soon.”
- Each opportunity modal has a polished branded header with the correct title and icon.
- The supplied long copy is easier to scan and read.
- The longest modal remains fully usable on a small phone.

## 2. Rebuild the About Hao section spacing

The current About Hao section is too cramped. Improve it using professional editorial spacing while preserving all approved copy, the generated portrait, partner history, and audience content.

### Desktop layout

Use a balanced three-column composition:

1. Hao portrait
2. Biography and partner history
3. Navy audience card

Recommended starting proportions inside the existing approximately 1200px container:

- Portrait column: approximately 220–240px
- Main copy: flexible remaining width
- Audience card: approximately 240–260px
- Column gaps: approximately 30–36px

Tune these values by visual inspection rather than treating them as rigid.

### Equal side-column height

The portrait and the rightmost navy audience card must have the same visible vertical height at desktop widths.

Requirements:

- Use one shared grid row and stretch the portrait frame and audience card to the same row height.
- Make the portrait image fill its frame with `object-fit: cover`.
- Tune `object-position` to preserve Hao’s full head and a natural upper-body crop.
- The central copy should determine the natural minimum content height.
- Do not introduce a large fixed height, viewport-relative height, or excessive blank space.
- Do not distort the portrait.

### Improve copy spacing

- Increase space between the eyebrow, main heading, introductory paragraph, partner history, and closing paragraph.
- Increase body line height slightly.
- Give each partner item enough horizontal and vertical breathing room.
- Add subtle vertical separators or other restrained grouping between the three partner histories on desktop.
- Keep partner names visually distinct from their descriptions.
- Prevent the heading from colliding visually with the intro copy.
- Keep the closing paragraph clearly separated from the partner row.
- Align the portrait and navy card with the top of the content.

### Responsive behavior

- At intermediate widths, allow the biography to use the full available width without becoming cramped.
- Stack the three areas in a logical order on mobile: portrait, biography, audience card.
- Once stacked, the portrait and audience card do not need equal heights.
- Keep the portrait at a sensible mobile width rather than stretching edge to edge.
- Remove desktop-only separators when the partner items stack.

Acceptance criteria:

- Portrait and navy audience card are exactly the same visible height at desktop widths.
- Copy no longer appears compressed.
- No large blank region appears below any column.
- The generated portrait remains naturally framed.
- The section looks polished at 1024, 1280, and 1440px and stacks cleanly at 320–768px.

## 3. Reorder the top navigation

Change the desktop and mobile top-menu order to:

1. Home
2. Why R8
3. Opportunities
4. About Hao
5. Join R8
6. Contact Us

Requirements:

- Move Why R8 immediately after Home and before Opportunities.
- Preserve the Opportunities disclosure and all eight deep links.
- Preserve scrollspy/active-section behavior.
- Preserve keyboard, touch, focus, and Escape behavior.
- Update any navigation-order tests.
- Consider matching the footer Quick Links order to the top navigation where applicable.

Do not restore Agent Login.

## 4. Change the contact phone number everywhere

Replace the existing phone number with:

`6268880845`

Use professional display formatting:

`(626) 888-0845`

Use this telephone URI:

`tel:+16268880845`

Update:

- Footer
- Contact popup
- Call action
- Central contact data
- JSON-LD structured metadata
- Tests
- README/current documentation if the old number appears
- Any other current runtime, metadata, accessibility, or generated-output reference

Search current runtime source, metadata, tests, documentation, and `dist` for:

- `(626) 389-2168`
- `+16263892168`
- `6263892168`

Excluding historical prompt files, none of the old values may remain.

Do not change `hao@r8salesgroup.com`.

## 5. Remove the For Agents footer section

Remove the entire footer column headed `For Agents`, including:

- Join R8 Network footer link
- Training & Resources footer link
- FAQ footer link
- The `For Agents` heading
- The footer-only data structure that supplies those links

Because agent-resource pages will not exist, also remove:

- Unused `Training & Resources` action configuration
- Unused `FAQ` action configuration
- Tests that expect those resource actions
- CSS or imports used only by the removed footer section

Do not remove:

- The main top-navigation `Join R8` link
- The primary page CTA band
- The `Join the R8 Network` CTA button and its current placeholder behavior
- Existing page copy addressed to agents

The instruction is to remove the footer’s agent-resource navigation, not the website’s overall agent audience.

### Footer reflow

Rebuild the desktop footer as a balanced three-column layout:

1. R8 Sales Group branding and copyright
2. Quick Links
3. Contact Us with phone and email

Keep Privacy Policy and Terms of Use in the legal row.

Requirements:

- Remove the empty space left by the deleted column.
- Keep the footer compact and visually aligned with the mockup.
- Ensure phone/email remain easy to find.
- Stack cleanly on mobile.

Acceptance criteria:

- No `For Agents`, `Training & Resources`, or footer FAQ link remains.
- Footer has three intentional columns on desktop.
- No dead action configuration remains for removed resource links.

## Tests

Update or add coverage verifying:

- Navigation order is Home, Why R8, Opportunities, About Hao, Join R8.
- Opportunities disclosure and program links still work.
- Opportunity popups do not show `Coming Soon`.
- Founder video is the only experience allowed to show `Coming soon`.
- Opportunity modal receives the correct title, icon, tone, and approved paragraphs.
- Long modal content remains in a scrollable body.
- Modal Escape close, backdrop close, focus trap, and focus restoration continue to work.
- Portrait and audience panel receive the intended equal-height desktop layout classes/structure.
- Footer and Contact modal show `(626) 888-0845`.
- Call links use `tel:+16268880845`.
- Old phone values are absent from current UI.
- Footer has no For Agents heading, Training & Resources link, or FAQ link.
- Join R8 remains available in the main navigation/CTA.
- Existing program copy, TruConnect 140,000 figure, founder image, email, branding, canonical metadata, and Agent Login absence tests continue to pass.

Avoid brittle full-page pixel snapshots.

## Verification

Before committing:

1. Run `npm test`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Preview the production build.
5. Review every popup and the About Hao section at:
   - 320×568
   - 375×812
   - 768×1024
   - 1024×768
   - 1280×800
   - 1440×900
6. Capture fresh screenshots of:
   - One long opportunity popup on desktop and mobile
   - About Hao section at 1440px
   - Footer at desktop and mobile widths
7. Confirm:
   - No unauthorized Coming Soon label remains.
   - Approved opportunity copy is unchanged.
   - Portrait and right audience card have equal desktop height.
   - About copy has comfortable spacing.
   - Menu order is correct.
   - Phone number is correct everywhere.
   - Footer agent-resource section is gone.
   - No console errors, broken links, clipped modal controls, or horizontal overflow exist.
8. Inspect generated `dist` for old phone values and unauthorized `coming soon` text.
9. Confirm DigitalOcean remains:
   - Static Site
   - Build command: `npm run build`
   - Output directory: `dist`
   - No run command
   - No environment variables

## Commit, push, and deploy

1. Commit all completed code, CSS, tests, documentation, and this prompt.
2. Push `main` to `origin` without force.
3. Verify local `main` is synchronized with `origin/main`.
4. The push must trigger the existing DigitalOcean automatic deployment.
5. Wait for deployment when status access is available.
6. Verify `https://r8salesgroup.com` after deployment:
   - Returns successfully over HTTPS
   - Uses the new navigation order
   - Shows the revised About Hao layout
   - Shows `(626) 888-0845`
   - Has no For Agents footer column
   - Shows no Coming Soon wording outside the founder-video experience
7. If DNS, TLS, or deployment status is unavailable, report the exact remaining owner check without treating it as a code failure.

## Final report

Provide a concise, nontechnical handoff containing:

- Modal aesthetic improvements
- Confirmation of Coming Soon removal and the video-only exception
- About Hao layout and spacing changes
- Navigation order confirmation
- Phone-number replacement confirmation
- Footer resource-removal confirmation
- Test, lint, build, and responsive-review results
- Screenshot paths
- Commit hash and push confirmation
- DigitalOcean/live-domain deployment status
- Any genuine blocker requiring owner action

Do not stop after planning, editing, or a local commit. Implement, verify, push, and complete the deployment handoff.
