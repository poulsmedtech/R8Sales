# Dev Agent Prompt 3: Comprehensive Visual Polish and Production Hardening

Continue work on the R8 Sales Group website in:

`/Users/samanthapouls/Desktop/R8Sales`

The current production baseline is commit:

`278865e48081361b0f643c4282455ea26f3a7457`

The repository is:

`https://github.com/poulsmedtech/R8Sales.git`

Branch `main` is connected to a DigitalOcean App Platform **Static Site** with automatic deployment enabled. Work autonomously through implementation, verification, commit, push, and deployment handoff. The owner is not a coder; do not ask them to run commands or edit files.

## Safety and scope

Before editing:

1. Confirm `git rev-parse --show-toplevel` returns exactly `/Users/samanthapouls/Desktop/R8Sales`.
2. Confirm `origin` is exactly `https://github.com/poulsmedtech/R8Sales.git`.
3. Confirm `main` tracks `origin/main`.
4. Do not touch the unrelated parent repository.
5. Preserve `MockUp1.png` and the `prompts` directory.

This remains a React/Vite single-page static site. Do not add a backend, server runtime, database, authentication system, analytics, or paid service. Preserve the current opportunity content, accessible modal, responsive layout, smooth in-page navigation, active-section indication, local image policy, and DigitalOcean Static Site configuration.

Use `/Users/samanthapouls/Desktop/R8Sales/MockUp1.png` as the visual source of truth.

## Review findings to address

The current implementation is structurally sound and passes lint/build checks, but it still has several production and fidelity gaps:

- The text-built R8 logo and generic favicon do not closely match the supplied brand mark.
- The hero photograph is a bright daytime skyline, while the mockup uses a dark blue business/city scene with people.
- The same square founder selfie is stretched into both the portrait and wide video placements, which does not match the professional compositions in the mockup.
- The mobile menu can exceed a short viewport when the eight opportunity links are expanded while body scrolling is locked.
- Navigation dropdown semantics use `role="menu"` without implementing the specialized keyboard behavior that ARIA menus imply.
- “Skip to content” targets the hero rather than the `<main>` landmark.
- Images lack explicit intrinsic dimensions and optimized loading priorities.
- Google Fonts are loaded from third-party servers despite the project’s local-asset policy.
- Search/social metadata is incomplete.
- Placeholder modals use the same generic message for every action and provide little review value.

Implement all improvements below.

## 1. Recreate the R8 brand mark more faithfully

Create a clean local SVG R8 Sales logo based on the supplied mockup’s visual treatment:

- Blue geometric “R8” mark
- “SALES” lettering beneath or aligned as shown
- “Right Opportunities. Right People.” lockup where space permits
- Compact logo variant for narrow mobile widths

Use the local SVG in the header and footer instead of constructing the logo from plain text. Create coordinated local favicon assets from the mark. Keep the logo accessible with an appropriate text alternative. Do not use a random third-party company logo.

Acceptance criteria:

- Header/footer branding visibly resembles the mockup at desktop size.
- The logo remains crisp at high-DPI and mobile sizes.
- Favicon references work in a production build with no missing files.

## 2. Improve hero fidelity without sacrificing readability

Replace or substantially improve the current bright daytime skyline treatment so it resembles the mockup’s dark navy city/business scene:

- Use a legally reusable, locally stored image with a darker urban/business atmosphere, ideally including tasteful people/silhouettes in the foreground.
- Do not hotlink the image.
- Add source/license attribution to the README when required.
- Tune cropping and overlays independently for desktop and mobile.
- Preserve strong text contrast and the two-column desktop composition.
- Match the mockup’s compact hero height, three-line headline, blue emphasis, and right-side Why R8 panel.

Acceptance criteria:

- No bright white sky competes with the header or text.
- The city remains recognizable through the overlay.
- Hero copy and panel are both visible without excessive vertical height at 1280–1440px desktop widths.
- The hero stacks cleanly on mobile with no clipped text or panel content.

## 3. Make founder imagery look intentional and professional

The current square founder image is reused in incompatible aspect ratios. Improve both placements while preserving the approved identity:

- Do not generate or substitute a different person for Hao Zhang.
- Do not falsely create a different likeness.
- Use the existing approved image unless another approved local Hao asset already exists.
- For the wide video placeholder, create a deliberate composition using the approved portrait, a restrained dark office-style background treatment, gradients, framing, and overlay—not a distorted full-bleed crop.
- For the biography portrait, use a natural crop that does not cut the face awkwardly.
- Keep both image treatments sharp and responsive.
- Keep the play control opening the shared placeholder modal.

Acceptance criteria:

- Neither founder placement stretches or distorts the image.
- The wide video thumbnail reads as a designed video placeholder.
- The portrait and video treatments are visually distinct and closer to the mockup’s proportions.

## 4. Fix mobile navigation overflow and focus behavior

Make the expanded mobile navigation robust on short and narrow screens:

- Give the open menu a maximum height based on the viewport below the sticky header.
- Allow the menu itself to scroll vertically while background page scrolling remains locked.
- Ensure all eight opportunity links, Agent Login, and Contact Us remain reachable at 320px width and short landscape heights.
- When the menu opens, move focus to the first navigation control or link.
- Trap focus within the open menu, or provide equivalently robust focus containment.
- Escape must close the menu and return focus to the menu toggle.
- Clicking any navigation target must close the menu.
- Close the menu automatically if the viewport returns to desktop width.
- Keep touch targets at least approximately 44px high on mobile.
- Raise the mobile-navigation breakpoint if necessary so the logo, seven desktop controls, and Contact button never crowd, overlap, or become clipped around 961–1100px.

Acceptance criteria:

- No menu item becomes unreachable at 320×568 or 667×375.
- Keyboard focus never moves invisibly behind the open menu.
- Scroll locking is fully restored after closing.
- All header controls remain visible and usable at 961px, 1000px, and 1100px.

## 5. Correct navigation and landmark semantics

Improve accessibility without changing the visible design:

- Give `<main>` a stable ID and point “Skip to content” directly to it.
- Ensure skip-link focus produces a meaningful visible landing position below the sticky header.
- Replace the desktop opportunity dropdown’s inappropriate ARIA menu pattern with ordinary navigation/list semantics, unless complete arrow-key menu behavior is intentionally implemented.
- Add useful expanded/controlled relationships where needed.
- Make the desktop Opportunities disclosure operable by click/touch as well as hover and keyboard, including touch-oriented tablets at 1024px.
- Ensure active-section announcements do not misuse `aria-current`.
- Verify heading order and landmark labels.
- Verify footer legal text and all small text meet WCAG AA contrast; darken muted colors where necessary.
- Preserve modal focus trapping, Escape close, backdrop close, and focus restoration.

Acceptance criteria:

- Keyboard-only navigation can reach and operate every control.
- Automated accessibility checks report no serious landmark, name, role, or contrast violations.

## 6. Improve image and font performance

Keep all runtime presentation assets local:

- Remove the live Google Fonts requests.
- Self-host the required font files with their license, or use a carefully chosen local/system stack that preserves the mockup’s typography.
- Add explicit image width/height or aspect-ratio metadata to prevent layout shift.
- Prioritize the hero image appropriately as the likely LCP asset.
- Lazy-load below-the-fold images.
- Use sensible `decoding` and responsive image behavior.
- Optimize oversized image files while preserving visual quality.

Acceptance criteria:

- The deployed page makes no runtime request to Google Fonts.
- No image visibly shifts surrounding layout while loading.
- The mobile hero image payload should be approximately 150KB or less where practical, using WebP/AVIF and responsive sources rather than sending the current 2400×1600 JPEG to every device.
- Target a mobile Lighthouse LCP below 2.5 seconds under its standard throttling profile, or document the measured result and remaining limitation.
- Production build assets remain local and all resolve successfully.
- Do not preload unnecessary below-the-fold media.

## 7. Add complete search and social metadata

Expand `index.html` and public assets with production-ready metadata:

- Canonical URL only if the actual DigitalOcean or custom-domain URL is available; do not invent one.
- Open Graph title, description, type, and a local share image.
- Twitter/X card metadata.
- Theme color.
- Robots metadata.
- `robots.txt`.
- A minimal `sitemap.xml` only when the actual production URL is known; otherwise document it as awaiting the final domain instead of inserting a fake URL.
- JSON-LD for the organization only using facts already present in the site. Do not invent an address, legal entity name, social profile URL, or other business claim.

Create a polished local social-preview image based on the R8 brand and hero styling without embedding private information.

Acceptance criteria:

- Metadata appears in the production `dist/index.html`.
- All referenced preview/favicon assets exist.
- No placeholder domains or invented organization data are committed.

## 8. Make placeholder popups more useful and contextual

Keep the shared modal architecture, but stop showing identical copy for every action:

- “Explore Our Opportunities” in the hero and “View All Opportunities” in the final CTA must scroll to and focus the Opportunities section rather than opening a placeholder modal; their labels promise navigation.
- Opportunity Learn More actions should show the selected program title, subtitle, and existing short description, followed by a clear “full details coming soon” note.
- Contact Us, Agent Login, Join R8, founder video, social links, legal links, FAQ, and Training & Resources should each have concise action-specific placeholder copy.
- Do not add forms, external destinations, fake policy text, credentials, or unsupported program claims.
- Keep one reusable data-driven modal component.
- Ensure long modal content remains scrollable on short mobile screens.

Acceptance criteria:

- Every action either performs the navigation promised by its label or opens the correct contextual content.
- Modal titles are unique and useful.
- The dialog remains keyboard accessible and never overflows the viewport.

## 9. Perform a final visual-fidelity pass

After the functional changes, compare a fresh desktop rendering directly against `MockUp1.png` and refine the remaining visible differences:

- Header height and logo proportions
- Hero height, column widths, background crop, and panel padding
- Founder-message proportions
- Opportunity-card density and equal heights
- Why R8 intro width, separators, and eight-column alignment without forcing body copy into unreadably narrow columns; at 1280–1440px, each benefit must remain legible with reasonable wrapping
- Hao biography’s three-column balance
- Navy CTA band height and button alignment
- Compact footer spacing

Do not make the text so small that readability suffers. Preserve the current responsive breakpoints where they work, but correct any overflow, awkward wrapping, or excessive whitespace discovered at desktop, tablet, and mobile widths. Fix the actual sources of horizontal overflow and remove the global `body { overflow-x: hidden; }` masking rule once the page is confirmed not to overflow.

Acceptance criteria:

- No horizontal overflow at 320, 375, 768, 1024, 1280, or 1440px widths.
- Repeated cards align consistently.
- The desktop page retains the compact corporate density of the mockup.
- Mobile remains readable rather than merely shrinking the desktop composition.

## 10. Add a lightweight production error fallback

Add a small React error boundary around the application:

- Show a branded, plain-language fallback if an unexpected render error occurs.
- Include a safe reload/retry action.
- Do not expose stack traces or internal details to visitors.
- Keep the implementation local and dependency-free.
- Ensure ordinary rendering and the static build are unchanged.

Acceptance criteria:

- A deliberately simulated render error during verification shows the fallback instead of a blank page.
- Remove the simulated error before committing.
- Reloading from the fallback can recover when the underlying error is no longer present.

## 11. Correct the remaining mockup-specific styling details

Apply these concrete fidelity corrections while preserving the existing component structure:

- In the hero headline, keep “One Network.” and “Multiple Opportunities.” white; only “Unlimited Potential.” should be blue.
- In the hero Why R8 panel, make “Right Opportunities. Right People.” blue and give “Your success.” a matching blue accent.
- Give the founder-message section and Why R8 benefits band the mockup’s very light gray-blue background instead of pure white.
- Center the primary desktop navigation within the header using a stable three-zone layout: brand, centered navigation, and right-side actions.
- Add the trailing arrow shown in the mockup to the hero CTA and both final CTA buttons.
- Make the final “Join the R8 Network” button transparent with a white border and white text instead of solid white.
- Replace the CTA’s generic network icon with a people/team icon matching the reference.
- Use the primary blue for the eight benefit icons instead of dark navy.
- Add restrained white icons to the three audience items in the navy About Hao panel.
- Replace text approximations of partner marks with faithful local SVG/image treatments only when they can be recreated from known branding without inventing assets or claims.
- Adjust the footer toward the reference’s compact four-column organization, grouping social controls with contact details where practical.
- Match the mockup’s social set by using Facebook, LinkedIn, and YouTube; remove Instagram unless the owner later supplies an official Instagram URL.
- Increase About-section top spacing to align with neighboring bands.
- Use a subtle off-white/light gray-blue footer surface.
- Tune the desktop content width toward approximately 1200px at a 1440px viewport where this improves fidelity without creating cramped layouts.
- Preserve the benefits intro-plus-eight-columns layout and three-column About composition through typical 1024px laptop/tablet-landscape widths when readable; stack only when space truly requires it.

Acceptance criteria:

- A desktop comparison clearly shows the same white/blue headline hierarchy as the mockup.
- The founder and Why R8 bands are visibly separated by their pale backgrounds.
- The secondary CTA is outlined, not filled.
- Header navigation is visually centered at 1440px.
- About audience entries include consistent icons, and the footer contains the expected three social platforms.
- No correction introduces horizontal overflow, unreadably small benefit text, or false business information.

## Verification

Before committing:

1. Run `npm run lint`.
2. Run `npm run build`.
3. Preview the production build, not only the Vite development server.
4. Review at 320×568, 375×812, 768×1024, 1024×768, 1280×800, and 1440×900.
5. Test all desktop and mobile navigation links.
6. Test every placeholder action and modal close method.
7. Test keyboard-only operation, focus restoration, reduced motion, and short-viewport menu scrolling.
8. Confirm there are no console errors, broken images, missing favicon/share assets, or external font requests.
9. Confirm DigitalOcean requirements remain:
   - Static Site
   - Build command `npm run build`
   - Output directory `dist`
   - No run command
   - No environment variables
   - No rewrite/catch-all rule
10. Confirm the Git root and origin again.

## Commit, push, and deployment

1. Commit all completed work, including this prompt and documentation updates, with a clear commit message.
2. Push `main` to `origin` without force.
3. Verify local `main` is synchronized with `origin/main`.
4. The push should trigger the existing DigitalOcean automatic deployment.
5. If a live DigitalOcean URL is available in the repository or environment, verify it returns a successful response and that the deployed HTML references the new build assets.
6. If the live URL is not available to you, do not invent one. State that the verified push triggered deployment and identify the one deployment-status check that remains for the owner.

## Final report

Provide a concise, nontechnical handoff with:

- Improvements completed
- Lint/build/accessibility and responsive-review results
- Commit hash
- Push confirmation
- DigitalOcean deployment status or the exact remaining status check
- Any item intentionally deferred because an approved asset or final production domain is genuinely required

Do not stop after planning, local edits, or a local commit. Complete the implementation, verification, push, and deployment handoff.
