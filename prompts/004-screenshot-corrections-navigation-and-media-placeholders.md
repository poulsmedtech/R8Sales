# Dev Agent Prompt 4: Screenshot Corrections, Header Refinement, and Founder Placeholders

Continue work on the R8 Sales Group website in:

`/Users/samanthapouls/Desktop/R8Sales`

Current baseline:

- Commit: `be6b31b`
- Branch: `main`
- Remote: `https://github.com/poulsmedtech/R8Sales.git`
- Hosting: DigitalOcean App Platform Static Site with automatic deployment from `main`

Work autonomously through implementation, verification, commit, push, and deployment handoff. The owner is not a coder and should not be asked to run commands or edit files.

## Safety checks

Before editing:

1. Confirm `git rev-parse --show-toplevel` is exactly `/Users/samanthapouls/Desktop/R8Sales`.
2. Confirm `origin` is exactly `https://github.com/poulsmedtech/R8Sales.git`.
3. Confirm local `main` tracks `origin/main`.
4. Do not modify the unrelated parent repository.
5. Preserve `MockUp1.png` and all prompt files.

## Visual references

Use the original mockup as the primary source of truth:

`/Users/samanthapouls/Desktop/R8Sales/MockUp1.png`

Review these screenshots of the current deployed result and correct the visible problems:

- `/Users/samanthapouls/.cursor/projects/Users-samanthapouls-Desktop-R8Sales/assets/Screenshot_2026-08-20_at_8.41.49_pm-70ba5a51-af76-48e1-a480-c2c52d024f9a.png`
- `/Users/samanthapouls/.cursor/projects/Users-samanthapouls-Desktop-R8Sales/assets/Screenshot_2026-08-20_at_8.42.02_pm-b9a4f660-5c16-4f71-bba9-6f3744421f93.png`
- `/Users/samanthapouls/.cursor/projects/Users-samanthapouls-Desktop-R8Sales/assets/Screenshot_2026-08-20_at_8.42.38_pm-cfe6f373-9860-4492-b7d0-7d2b6f69fae2.png`

The screenshots reveal three priority problems:

1. The desktop header and menu are undersized and do not match the mockup’s visual hierarchy.
2. The founder photo creates awkward crops in the video and About sections.
3. The About Hao section becomes excessively tall with a narrow, stretched face crop and a large area of empty white space before the CTA.

Implement every requirement below.

## 1. Remove the supplied founder image and every derivative

The image `/Users/samanthapouls/Desktop/R8Sales/1571948035854.jpg` must not appear anywhere in the site or repository.

It was previously copied/converted into committed assets. Remove all of these:

- `/Users/samanthapouls/Desktop/R8Sales/1571948035854.jpg`, if present
- `public/images/hao-zhang.jpg`
- `public/images/hao-zhang.webp`
- Any other resized, converted, cached, embedded, or renamed derivative of that same photograph
- Every JSX, CSS, metadata, preload, or documentation reference to those assets

Do not replace it with a stock person, generated person, silhouette presented as Hao, or another real person.

Before finishing, search the entire project for:

- `1571948035854`
- `hao-zhang.jpg`
- `hao-zhang.webp`
- Any remaining reference to the removed image filenames

The searches must return no references. Confirm with `git ls-files` that the committed derivative files are deleted.

## 2. Add image-free founder media placeholders

Replace both former uses of the founder photo with intentionally designed, image-free placeholders that can later be swapped for approved generated assets.

### Founder video placeholder

- Keep a 16:9 media area on desktop.
- Use a restrained navy/charcoal gradient, subtle framing, and a centered play control.
- Include a small visible label such as “Founder video coming soon” or “Video placeholder.”
- Do not create a fake room, fake person, face, avatar, or photographic silhouette.
- Keep the entire media area clickable and connected to the existing contextual video modal.
- On mobile, preserve 16:9 proportions without excessive minimum height.

### About Hao portrait placeholder

- Replace the portrait with a clean 3:4 or 4:5 placeholder.
- Use a neutral light-gray/navy branded treatment and a simple non-human image icon.
- Include a small visible label such as “Founder portrait coming soon.”
- The placeholder must have a controlled width and aspect ratio and must never stretch to the height of adjacent content.

Create a small reusable component for these placeholders if that reduces duplication. Add clear code comments or README notes specifying replacement asset recommendations:

- Founder video: 1600×900 or equivalent 16:9
- Founder portrait: approximately 1200×1600, 3:4

Do not add temporary raster images merely to represent the placeholders.

## 3. Rebuild the desktop header to match the mockup

The current deployed header looks too small and sparse compared with `MockUp1.png`. Rework its proportions and alignment.

Required desktop composition:

1. Larger R8 Sales logo/brand lockup on the left
2. “Right Opportunities. Right People.” tagline immediately beside it
3. Centered navigation group
4. Contact Us button aligned on the far right

Navigation order must be:

- Home
- Opportunities, with the existing disclosure/down chevron
- About Hao
- Why R8
- Join R8
- Contact Us

### Remove Agent Login entirely

Remove every user-facing “Agent Login” control from:

- Desktop header
- Mobile navigation
- Footer or any other navigation/action list
- Placeholder action data if it becomes unused
- README wording that says Agent Login is available

There must be no visible Agent Login link, button, menu item, or modal trigger anywhere on the site.

### Header styling requirements

- Use a white background.
- Increase desktop header height and logo scale so they visually match the mockup rather than appearing miniature.
- Target a desktop header height around 68–76px, then tune by direct screenshot comparison.
- The R8 logo should have a clear blue mark, “SALES” treatment, and readable tagline.
- Use dark navy uppercase navigation text at a legible size.
- Keep the active Home/section underline blue and close to the bottom of the link.
- Use a compact rectangular navy Contact Us button similar to the mockup.
- Ensure the center navigation is genuinely centered rather than shifted by unequal left/right columns.
- Remove any unintended dark strip, margin, or border above the white header.
- Keep the sticky behavior and subtle shadow after scrolling.
- Preserve accessible click, touch, keyboard, and Escape behavior for the Opportunities disclosure.

Acceptance criteria at 1440px:

- The header is visually substantial and proportionate to the mockup.
- The logo/tagline is readable without zooming.
- Navigation is centered within the viewport to within approximately 40px.
- Contact Us remains right-aligned.
- No controls overlap or clip.

## 4. Preserve and refine the mobile header

- Use the same improved brand mark at a suitable compact size.
- Keep a single menu toggle and Contact Us inside the opened mobile menu.
- Do not include Agent Login.
- Keep all links and eight opportunity sublinks reachable in short viewports.
- Preserve focus containment, Escape close, focus restoration, background scroll locking, and internal menu scrolling.
- Keep touch targets approximately 44px high.
- Ensure the brand and toggle fit at 320px without clipping.

## 5. Correct the hero headline wrapping and proportions

The deployed screenshots show the desktop headline breaking “Multiple Opportunities.” across separate lines. The mockup uses exactly three deliberate lines:

1. `One Network.`
2. `Multiple Opportunities.`
3. `Unlimited Potential.`

Keep only the third line blue. On normal desktop widths, prevent the second line from wrapping by widening the copy column and/or adjusting the heading size. Do not use nonresponsive fixed widths that break mobile.

Also:

- Retain the current dark skyline and business-silhouette treatment.
- Keep the Why R8 panel on the right.
- Match the mockup’s balanced left/right proportions.
- Ensure the headline, paragraphs, and CTA do not look undersized at 1280–1440px.
- Preserve the compact overall hero height.

Acceptance criteria:

- At 1280px and 1440px, the heading is exactly three lines.
- At mobile widths it may wrap naturally without clipping.
- Only “Unlimited Potential.” uses the blue accent.

## 6. Make the founder-message section compact

After replacing the photo with the video placeholder:

- Keep text left and video placeholder right on desktop.
- Match the mockup’s approximate 36/64 column balance.
- Reduce any excess height or whitespace.
- Keep the section’s pale gray-blue background.
- Align the video placeholder vertically with the text block.
- Preserve the existing button and placeholder modal behavior.

Acceptance criteria:

- The desktop founder-message band reads as one compact row.
- The placeholder does not resemble the split face/empty-room composition visible in the supplied screenshots.
- The section stacks cleanly on mobile.

## 7. Fix the About Hao section’s excessive height

The screenshot shows the About section with a tall narrow face crop and hundreds of pixels of unnecessary white space. Rebuild this area so it follows the compact mockup composition:

- Portrait placeholder on the left
- Biography and partner history in the center
- Navy audience panel on the right
- All three columns top-aligned
- Section height determined by actual content, not by an image, viewport, inherited height, or stretched grid track

Specific requirements:

- The portrait placeholder should be approximately 180–220px wide on large desktop.
- Its height must come only from its 3:4 or 4:5 aspect ratio.
- Do not apply `height: 100%`, a large `min-height`, stretching, or absolute positioning to the placeholder.
- Remove any grid/flex rule that forces the left column or section to match an unintended tall height.
- Keep the biography text and three partner summaries readable and evenly spaced.
- Keep the audience panel compact and aligned with the top of the biography.
- Reduce the vertical gap between the end of About content and the navy CTA band.

Acceptance criteria:

- At 1440×900, the About section is compact and contains no large empty white field.
- The portrait placeholder is fully visible without cropping.
- The CTA follows shortly after the tallest actual About column, using only normal section padding.
- At tablet/mobile widths, content stacks without an oversized blank region.

## 8. Correct visual scale throughout the supplied screenshots

Perform a focused visual pass against `MockUp1.png` after the structural corrections:

- Increase typography that currently appears unusually tiny in the header and hero.
- Keep opportunities and Why R8 cards dense, but do not use text below a comfortably readable size.
- Ensure section titles preserve normal word spacing; no words should visually run together.
- Keep content centered in an approximately 1200px desktop container.
- Verify the CTA band is fully visible and not visually crowded by preceding empty space.
- Preserve the existing navy, royal blue, white, and pale gray-blue palette.

Do not redesign unrelated working sections. Preserve:

- Opportunity deep links
- Contextual modals
- Active section highlighting
- Accessibility fixes
- Local fonts/assets
- Search/social metadata
- Error boundary
- Reduced-motion support

## Verification

Before committing:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Preview the production build.
4. Inspect at:
   - 320×568
   - 375×812
   - 768×1024
   - 1024×768
   - 1280×800
   - 1440×900
5. Capture fresh desktop screenshots of:
   - Header + hero + founder-message section
   - Why R8 + About Hao + CTA section
6. Compare those screenshots directly with `MockUp1.png` and the three problem screenshots.
7. Confirm:
   - No Agent Login UI remains
   - No removed founder image or derivative remains
   - Hero headline is three lines at desktop widths
   - About section has no excessive blank space
   - Mobile menu remains fully keyboard/touch accessible
   - There are no console errors, missing assets, or horizontal overflow
8. Confirm DigitalOcean remains configured as a Static Site:
   - Build command: `npm run build`
   - Output directory: `dist`
   - No run command

## Commit, push, and deploy

1. Commit all changes, including this prompt and any documentation corrections.
2. Push `main` to `origin` without force.
3. Verify local `main` is synchronized with `origin/main`.
4. The push must trigger the existing DigitalOcean automatic deployment.
5. If the live URL is available, verify the deployed build and confirm the removed founder photo is not served by any old path.
6. If the URL is unavailable, report that the verified push triggered deployment and state the single remaining deployment-status check for the owner.

## Final report

Provide a concise, nontechnical handoff containing:

- Corrections completed
- Confirmation that Agent Login was removed
- Confirmation that all copies/derivatives of `1571948035854.jpg` were removed
- Lint/build and responsive review results
- New screenshot paths
- Commit hash and push confirmation
- DigitalOcean deployment status
- Exact recommended dimensions for the future founder video and portrait assets

Do not stop after planning, local edits, or a local commit. Implement, verify, push, and complete the deployment handoff.
