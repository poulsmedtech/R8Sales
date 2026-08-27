# Dev Agent Prompt 7: Generate Founder Headshot and Update Contact Details

Continue work on the R8 Sales Group website in:

`/Users/samanthapouls/Desktop/R8Sales`

Current baseline:

- Latest completed content commit: `b016b8a`
- Branch: `main`
- Remote: `https://github.com/poulsmedtech/R8Sales.git`
- Production domain: `https://r8salesgroup.com`
- Hosting: DigitalOcean App Platform Static Site with automatic deployment from `main`

Work autonomously through image generation, implementation, verification, commit, push, and deployment handoff. The owner is not a coder and must not be asked to run commands or edit files.

## Safety checks

Before editing:

1. Confirm `git rev-parse --show-toplevel` is exactly `/Users/samanthapouls/Desktop/R8Sales`.
2. Confirm `origin` is exactly `https://github.com/poulsmedtech/R8Sales.git`.
3. Confirm local `main` tracks `origin/main`.
4. Fetch safely if necessary, but do not force-push or rewrite history.
5. Do not modify the unrelated parent repository.
6. Preserve `MockUp1.png`, all prompt files, and all source images in `HaoImages`.

## Reference-image privacy and handling

The owner created this local reference directory:

`/Users/samanthapouls/Desktop/R8Sales/HaoImages`

It currently contains reference photographs of Hao Zhang, including JPG and HEIC files. Use all clear reference images to understand Hao’s identity and generate the new portrait.

These files are private source references:

- Do not display them directly on the website.
- Do not copy them into `public`.
- Do not commit them to GitHub.
- Do not delete, rename, edit, convert in place, or otherwise modify the originals.
- Add `/HaoImages/` to the project `.gitignore` before staging files.
- If temporary conversions are required to inspect HEIC references, place them in a temporary ignored directory and delete those temporary copies after generation.
- Verify with `git status` and `git ls-files` that no source reference image is staged or committed.

Prompt 4 prohibited direct website use of the old source photograph. That remains true. For this task, the photographs may be used only as private identity references for generating a new approved-style headshot.

## Generate the professional founder portrait

Use the available image-generation capability with the files in `HaoImages` as image references.

Generate several candidate portraits, then select and deploy the candidate that:

- Most accurately preserves Hao Zhang’s recognizable facial identity
- Looks natural and photorealistic
- Has correct facial anatomy, eyes, ears, teeth, skin texture, clothing, and lighting
- Avoids excessive retouching, plastic skin, face reshaping, or an artificial glamour effect
- Avoids text, logos, badges, watermarks, jewelry artifacts, malformed clothing, or distracting objects
- Looks suitable for an established corporate founder and sales executive

### Required visual direction

- Professional executive headshot
- Navy suit jacket
- Crisp white shirt
- No tie
- Approachable, confident expression with a subtle natural smile
- Head-and-shoulders or upper-torso crop
- Upright posture, facing the camera
- Soft, flattering but realistic key light
- Warm, softly blurred executive-office background
- Subtle depth of field
- Neutral, credible corporate color grading
- Vertical 3:4 composition
- Sufficient space around the head and shoulders for responsive cropping
- No other people

The result should feel compatible with the professional portrait position shown in `MockUp1.png`, while preserving Hao’s actual likeness from the supplied references.

### Generation workflow

1. Inspect all usable reference images rather than relying on only one angle.
2. Generate at least three candidate variations.
3. Reject candidates with identity drift, anatomy problems, implausible skin, asymmetrical glasses/accessories, malformed clothing, or obvious generation artifacts.
4. Select the strongest natural likeness.
5. If no candidate is credible, refine the prompt and regenerate rather than deploying a poor result.
6. Do not commit rejected candidates or a contact sheet.

### Output requirements

- Target source resolution: at least 1200×1600
- Final aspect ratio: 3:4
- Save the selected production asset as an optimized local WebP, for example:
  `public/images/hao-zhang-founder.webp`
- Preserve enough quality for high-DPI displays.
- Keep the optimized production file reasonably sized, preferably under approximately 250 KB when that can be achieved without visible degradation.
- Do not embed the image as base64.
- Do not hotlink an external generated-image URL.

## Place the portrait on the website

Replace only the **About Hao founder portrait placeholder** with the generated image.

Requirements:

- Keep the founder video area as its existing image-free placeholder. Do not use the new headshot as a video thumbnail.
- Use descriptive alt text such as:
  `Professional portrait of Hao Zhang, founder of R8 Sales Group`
- Include explicit intrinsic width and height.
- Use responsive sizing, `loading="lazy"`, and `decoding="async"`.
- Maintain the compact three-column About Hao composition on desktop.
- Keep the portrait’s 3:4 aspect ratio.
- Use `object-fit: cover` and tune `object-position` so the entire face and head remain naturally framed.
- Do not stretch the image to match the biography column’s height.
- Preserve the existing stacking order on tablet and mobile.
- Remove the obsolete visible “Founder portrait coming soon” label.
- Do not remove the reusable media-placeholder component if it remains necessary for the founder video.

Acceptance criteria:

- Hao’s portrait looks natural at desktop and mobile sizes.
- His head, chin, and shoulders are not clipped awkwardly.
- The About section does not regain the excessive whitespace fixed in Prompt 4.
- The generated image is the only committed founder portrait asset.

## Update the email address everywhere

Replace every current use of:

`hao@r8marketing.com`

with:

`hao@r8salesgroup.com`

Update:

- Footer display text
- Footer `mailto:` link
- Contact Us modal display text
- Contact Us modal Email action
- Central contact-data constants
- JSON-LD organization metadata
- Automated tests
- README or other current documentation if the old address appears
- Any other current runtime, metadata, accessibility, or test reference

Do not add a contact form or Resend integration in this task. Google Workspace and any future form-delivery system will be configured separately. The new `mailto:` link should be deployed now even if mailbox provisioning is still in progress.

Before finishing, search current runtime source, metadata, tests, README, and built output for `hao@r8marketing.com`. It must be absent. Historical prompt files may retain old instructions and should not be rewritten.

## Simplify the footer

Remove the following footer elements completely:

- The map/location icon
- The `Nationwide` text row
- Facebook control
- LinkedIn control
- YouTube control
- The entire social-icon row beneath the contact details

Also remove:

- Unused icon imports
- Unused social-action configuration entries
- Obsolete modal copy for Facebook, LinkedIn, and YouTube if nothing else uses it
- CSS that exists only for the removed social row
- Tests that expect those controls, replacing them with tests that confirm they are absent

Keep:

- R8 Sales Group brand
- Copyright
- Quick Links
- For Agents links
- Contact heading
- Phone number
- New email address
- Privacy Policy
- Terms of Use

Rebalance the footer columns and spacing after removal so it still looks intentional and professional rather than leaving an empty gap.

Acceptance criteria:

- Footer contains only phone and email under Contact Us.
- No map pin, `Nationwide`, Facebook, LinkedIn, or YouTube control remains.
- Footer alignment remains polished at desktop, tablet, and mobile widths.

## Additional required correction: configure the production domain metadata

The production domain is now known. Replace the previous “domain pending” state with:

`https://r8salesgroup.com`

Update:

- Add or correct `<link rel="canonical" href="https://r8salesgroup.com/" />`
- Set `og:url` to `https://r8salesgroup.com/`
- Use an absolute Open Graph image URL on that domain
- Use an absolute Twitter/X image URL on that domain
- Add the organization `url` to JSON-LD
- Add or update `public/sitemap.xml` using the canonical homepage URL
- Reference the sitemap from `public/robots.txt`
- Update README production/deployment documentation with the live domain

Use the apex domain as canonical. Do not make `www.r8salesgroup.com` canonical.

Do not change Cloudflare or DigitalOcean settings from code. The owner is configuring DNS separately.

## Tests

Update or add automated coverage verifying:

- The generated founder image renders in About Hao with the correct alt text.
- The founder video remains an image-free placeholder.
- The old portrait-placeholder text is absent from About Hao.
- `hao@r8salesgroup.com` appears in the footer and Contact modal with the correct `mailto:` link.
- `hao@r8marketing.com` is absent from current rendered UI.
- `Nationwide` and its map icon are absent from the footer.
- Facebook, LinkedIn, and YouTube controls are absent.
- Canonical and metadata source values use `https://r8salesgroup.com`.
- Existing program-content, modal, navigation, branding, accessibility, and Agent Login absence tests continue to pass.

Avoid brittle pixel snapshots.

## Verification

Before committing:

1. Run `npm test`.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Preview the production build.
5. Inspect the generated portrait and About section at:
   - 320×568
   - 375×812
   - 768×1024
   - 1024×768
   - 1280×800
   - 1440×900
6. Confirm:
   - The chosen portrait accurately resembles the supplied reference images.
   - No visible generation artifacts remain.
   - No reference image from `HaoImages` is served or committed.
   - Founder video remains a placeholder.
   - About-section spacing remains compact.
   - New email works in both footer and Contact modal.
   - Nationwide and all three social controls are gone.
   - Footer has no empty column or awkward spacing.
   - Canonical, sitemap, robots, Open Graph, Twitter/X, and JSON-LD values use the apex production domain correctly.
   - No console errors, missing assets, or horizontal overflow exist.
7. Inspect the generated `dist` output for the new portrait, email, and production metadata.
8. Confirm DigitalOcean remains:
   - Static Site
   - Build command: `npm run build`
   - Output directory: `dist`
   - No run command
   - No environment variables

## Commit, push, and deploy

1. Stage only intended website files and the selected generated portrait. Never stage `HaoImages`.
2. Commit all completed code, asset, test, README, and Prompt 7 changes with a clear message.
3. Push `main` to `origin` without force.
4. Verify local `main` is synchronized with `origin/main`.
5. The push must trigger the existing DigitalOcean automatic deployment.
6. Wait for the deployment when status access is available.
7. Verify `https://r8salesgroup.com` after deployment:
   - Returns successfully over HTTPS
   - Displays the generated About Hao portrait
   - Shows `hao@r8salesgroup.com`
   - Does not show Nationwide or social icons
   - Serves the updated canonical metadata
8. Also verify `https://www.r8salesgroup.com` redirects to or resolves consistently with the canonical apex domain if DNS is active.
9. If DNS or TLS is still propagating, do not treat that as a code failure. Report the exact domain status and confirm that the GitHub push triggered deployment.

## Final report

Provide a concise, nontechnical handoff containing:

- A description of the selected generated portrait
- Confirmation that private reference images were not committed
- Production portrait path and optimized file size
- Confirmation that the founder video remains a placeholder
- Confirmation of the email replacement
- Confirmation that Nationwide and social controls were removed
- Production-domain metadata updates
- Test, lint, build, and responsive-review results
- Commit hash and push confirmation
- DigitalOcean/domain deployment status
- Any genuine blocker requiring owner action

Do not stop after planning, generating candidates, editing, or making a local commit. Select the best portrait, implement it, verify it, push it, and complete the deployment handoff.
