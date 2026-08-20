# Dev Agent Prompt: Build the Initial R8 Sales Group Website

You are the implementation and deployment agent for a new client website. Work autonomously from start to finish. The project owner is not a coder; do not ask them to run commands, edit files, or perform technical steps unless an external account permission or missing credential makes that absolutely unavoidable.

## Working directory and repository safety

- Work only inside `/Users/samanthapouls/Desktop/R8Sales`.
- The parent directory is part of an unrelated Git repository named PoulsMedTech. Do not stage, commit, push, or modify anything in that parent repository.
- Initialize a new, independent Git repository directly inside `/Users/samanthapouls/Desktop/R8Sales` before committing the website.
- Preserve the `prompts` directory and the supplied reference image.
- Use `/Users/samanthapouls/Desktop/R8Sales/MockUp1.png` as the primary visual reference.

## Goal

Build a polished, production-ready, responsive single-page website for **R8 Sales Group** that reproduces the supplied mockup as closely as practical. This first implementation should be complete enough for the owner to connect the repository to a new DigitalOcean App Platform app and review it in a browser.

The mockup is the source of truth for:

- Overall layout and section order
- Dark navy, royal blue, white, and light-gray visual palette
- Typography hierarchy, spacing, cards, borders, buttons, and icon treatments
- Visible wording and labels
- Desktop composition and visual density

Transcribe all legible copy from the mockup. Closely reconstruct any wording that cannot be read perfectly while keeping the meaning and approximate text length consistent.

## Required technology

- React with Vite
- A static client-side site with no backend
- Modern, maintainable CSS; avoid an unnecessary UI framework
- Production output in `dist`
- A committed lockfile
- A current supported Node.js version

## Required page structure

Recreate the major areas shown in the mockup:

1. Sticky or fixed-style top navigation with the R8 Sales brand, menu links, Agent Login, and Contact Us.
2. Hero section with the “One Network. Multiple Opportunities. Unlimited Potential.” message, city/business imagery, primary call to action, and the “Why R8?” panel.
3. Founder message section featuring Hao Zhang, supporting text, and a video-thumbnail treatment.
4. “Our Opportunities” section with the six opportunity/program cards visible in the mockup:
   - Wave Energy
   - Community Solar
   - Medi-Cal Health Education
   - Bridge Link
   - Lifeline
   - Mobile Health Testing
   - Customer Rewards & Travel Incentives
   - New Opportunities
   
   Match the actual number and arrangement of cards shown in the reference, including all eight listed offerings.
5. “Why R8?” benefits section with eight numbered/icon-based benefits.
6. Founder/company credibility section with Hao Zhang’s profile, customer/agent scale messaging, partner marks, and the dark audience panel.
7. Final dark call-to-action band.
8. Footer with branding, grouped links, contact details, and social links.

Use semantic section IDs and make all top navigation links smoothly scroll to the corresponding page location. Since this is a single page, navigation must not lead to missing routes.

## Images and visual assets

- Recreate the design closely using CSS and legally usable replacement imagery where separate source assets are unavailable.
- Do not hotlink fragile third-party image URLs. Download permitted assets into the project or use stable local assets.
- Do not extract or crop the supplied mockup as a substitute for building page sections.
- Recreate simple logos, partner-name treatments, icons, and the R8 wordmark with styled text, CSS, or an appropriate open-source icon package where exact source files are unavailable.
- Add useful alt text to meaningful images and hide decorative imagery from assistive technology.
- Prioritize a coherent, credible business website over obviously generic placeholder boxes.

## Interactions

- Every navigation item should smoothly autoscroll to its matching section.
- All “Learn More,” “Explore,” “Contact,” “Join,” “Agent Login,” video, and other action controls are placeholders for now.
- Implement one reusable, accessible modal component.
- Clicking any placeholder action should open that modal with the clicked action or item title and concise placeholder copy.
- The founder video thumbnail/play button should open the same placeholder modal; do not embed a generic video.
- The modal must support keyboard use, Escape-to-close, backdrop close, focus management, and a visible close control.
- Do not use browser `alert()` dialogs.

## Responsive and quality requirements

- Match the supplied desktop mockup closely at its intended proportions.
- Provide polished tablet and mobile layouts with sensible stacking, readable text, touch-friendly controls, and a functional collapsible mobile menu.
- Avoid horizontal overflow at common viewport widths.
- Use reusable data-driven components for repeated opportunity and benefit cards.
- Provide clear hover, focus, and active states.
- Respect `prefers-reduced-motion` for smooth scrolling and animation.
- Meet practical WCAG accessibility expectations for contrast, landmarks, headings, keyboard controls, and form-free interactive elements.
- Avoid console errors, broken links, missing assets, and dead controls.
- Keep dependencies minimal and do not add a backend, database, authentication service, or analytics.

## DigitalOcean readiness

Prepare the repository for a DigitalOcean App Platform **Static Site**:

- Build command: `npm run build`
- Output directory: `dist`
- Include an appropriate Node version declaration if needed.
- Include a concise `README.md` with local setup, build commands, project structure, and exact DigitalOcean App Platform configuration.
- Add an app spec only if it is accurate and does not require invented repository/account details.
- Ensure client-side behavior does not require rewrite rules or a server.

There is no DigitalOcean app yet, so an actual DigitalOcean deployment is not possible in this first pass. The required handoff is a deployment-ready repository:

1. Install dependencies.
2. Run all available linting/checks.
3. Run a clean production build.
4. Fix all errors introduced by the implementation.
5. Initialize the independent R8Sales Git repository.
6. Commit the completed, verified implementation with a clear commit message.
7. If a remote is configured, push the branch and verify the push.
8. If no remote exists, do not create an unrelated remote or touch the parent PoulsMedTech remote. Report clearly that the local commit is ready and pushing is blocked only until the owner creates or supplies the R8Sales remote/DigitalOcean app.

## Acceptance criteria

Before finishing, verify that:

- The site runs locally and builds successfully for production.
- The result visibly follows `MockUp1.png`, including all major sections and the dense corporate-sales aesthetic.
- Navigation scrolls to the correct sections.
- Every action button opens the reusable placeholder modal with relevant context.
- The mobile navigation and modal work with keyboard and touch input.
- The layout is polished at desktop, tablet, and mobile widths.
- Assets load locally without broken references.
- The repository contains no secrets, generated dependency directories, or build output that should be ignored.
- The new Git repository root is exactly `/Users/samanthapouls/Desktop/R8Sales`.

## Final report

Give the owner a concise, nontechnical handoff containing:

- What was built
- The verification/build results
- The commit hash
- Whether a push occurred and, if so, the remote/branch
- The exact DigitalOcean settings they will need when creating the app
- Any true blocker requiring owner action

Do not stop at a plan or partial scaffold. Implement, verify, commit, and push when a safe R8Sales remote is available.
