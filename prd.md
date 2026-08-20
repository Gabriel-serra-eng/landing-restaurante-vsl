# Product Requirements Document (PRD)

## 1. Executive Summary
The goal is to build a high-conversion landing page functioning as a restaurant acquisition machine. The page will sell a combined marketing package (Video Production + Paid Traffic for R$2.700/month) to restaurant owners. It uses a dynamic narrative, a VSL, and a multi-step qualification form before revealing the price.

## 2. Product Goal
To transform paid traffic into qualified leads for the agency's premium restaurant marketing service. The page must filter out unqualified leads while compelling the right audience through high-end visual storytelling and logical problem-solving copy.

## 3. Target Audience
Restaurant owners and decision-makers who have a great product/environment but struggle to attract customers from their local region using Instagram effectively.

## 4. Offer
- **Service:** Video Production (R$1.500) + Paid Traffic Management (R$1.200) = R$2.700/month.
- **Value Prop:** "Conteúdo que desperta desejo + tráfego que coloca o restaurante na frente das pessoas certas."

## 5. Positioning
We do not sell "social media" or generic "ads". We sell a complete acquisition system where content and distribution work together. Content without distribution is invisible; distribution without good content is weak.

## 6. User Journey
1. **Ad Click:** User clicks a Meta Ad targeting local business owners.
2. **Hero & VSL:** User lands on a high-impact first fold. They watch a 45-60s VSL explaining the core problem and solution.
3. **Narrative Scroll:** As they scroll, they are educated on why "content alone" or "traffic alone" fails, and why the combination works.
4. **Social Proof & Portfolio:** User sees high-quality examples (editable gallery) and testimonials.
5. **Qualification Form:** User enters a multi-step form to see if they qualify.
6. **Price Reveal & Final CTA:** Only after form completion is the R$2.700/month price revealed, protecting the premium positioning.
7. **CRM/WhatsApp:** Qualified lead is passed to sales.

## 7. Conversion Strategy
- **Frictionless Entry:** No top navigation. A single primary CTA leading to the form.
- **Commitment Escalation:** The multi-step form starts with easy questions (Instagram, City) before moving to high-friction questions (Revenue, Budget, Decision Power).
- **Price Protection:** Keeping the price hidden until post-qualification anchors the value first and uses the "sunk cost fallacy" of completing the form to increase price acceptance.

## 8. UX Strategy
- **Progress Indicators:** The multi-step form will use a clear progress bar (e.g., Step 1 of 8).
- **Conditional Feedback:** Clear inline validation for form fields.
- **Clickable Options:** Most form steps will use clickable cards instead of text inputs to reduce cognitive load, especially on mobile.

## 9. Visual Direction
- **Style:** Premium, sophisticated, gastronomic. 
- **Typography:** `Inter` (Body) + `Playfair Display` (Headings) for a mix of modern clarity and premium elegance, based on UI/UX Pro Max recommendations.
- **Colors:** Deep, high-contrast palette (e.g., dark mode default with vibrant accent colors to make food imagery pop). Dark backgrounds (#0F172A or #000000) with sophisticated accents.

## 10. Page Architecture
1. Hero (Headline + VSL Player)
2. The Problem Transition ("Seu restaurante não precisa apenas aparecer.")
3. Content Pillar ("Conteúdo que dá vontade de conhecer.")
4. Traffic Pillar ("Tráfego que coloca seu restaurante na frente das pessoas certas.")
5. The Synergy ("Não é só fazer vídeo...")
6. Portfolio Gallery
7. Benefits
8. Proof
9. Pre-Form CTA
10. Multi-Step Form (Inline or Modal)
11. Qualification & Price Reveal

## 11. VSL Specification
- **Duration:** 45-60 seconds.
- **Player:** Custom UI built over standard HTML5 `<video>` or optimized player library.
- **Features:** Editable poster, title, video URL. No auto-play by default (to respect UX guidelines and save bandwidth), but highly prominent "Play" button.
- **Tracking:** Events fired at 0%, 25%, 50%, 75%, 100%.

## 12. Copy Direction
Direct, problem-focused, logical. Avoid hype words. Focus on the mechanism: Content + Distribution.

## 13. Form Specification
Multi-step wizard:
1. Instagram handle (Text)
2. City (Text)
3. Main goal (Radio Cards)
4. Estimated Monthly Revenue (Radio Cards)
5. Marketing Budget (Radio Cards)
6. Willingness to invest in Ads (Radio Cards)
7. Decision Maker (Radio Cards)
8. WhatsApp (Phone Input)

## 14. Qualification Model
- **Hot/Qualified:** Revenue > R$40k, Budget > R$2.5k, Decision Maker = Yes, Ads = Yes.
- **Warm/Evaluating:** Revenue R$20k-40k, Budget R$1.5k-2.5k.
- **Cold:** Revenue < R$20k, No Budget, Not a decision maker.
The score is calculated on the client/edge before submission, sent to CRM, but hidden from the user.

## 15. CRM Architecture
- **Layer:** Decoupled. A Next.js Server Action or API Route will receive the form data, format it into a standardized JSON payload, and forward it via Webhook/REST to any CRM (e.g., ActiveCampaign, HubSpot, or Zapier/Make).

## 16. Tracking Architecture
- **Events:** `PageView`, `ViewContent`, `VSLStart`, `VSL25`, `VSL50`, `VSL75`, `VSLComplete`, `FormStart`, `FormStepComplete`, `Lead` (Any submission), `QualifiedLead` (Only if score meets threshold).
- **Setup:** DataLayer implementation mapped to Meta Pixel and Google Analytics.

## 17. Meta/CAPI Architecture
- **Deduplication:** Generate a UUID (`event_id`) on the client when the form starts. Pass this `event_id` to both the browser pixel (`fbq('track', 'Lead', {...}, {eventID: id})`) and the server (Next.js API -> Meta Graph API).
- **Identifiers:** Capture `fbp`, `fbc`, and UTM parameters from cookies/URL and send them via CAPI.

## 18. Content Editing Architecture
- **Approach:** JSON or Markdown-based content files (`content/data.json`) or a headless CMS if preferred. For simplicity and no recurring costs, a local JSON configuration file that the Videomaker can edit (URLs, text, image paths) without touching React code.

## 19. Video Management
- Videos hosted externally (Vimeo/YouTube/Mux) or optimized MP4s in public/ CDN. Editable via the config file.

## 20. Animation System
- **Library:** Framer Motion.
- **Usage:** Scroll-triggered storytelling (fade-ins, slight upward translations). 
- **Accessibility:** Respect `prefers-reduced-motion` to disable animations.

## 21. Mobile Strategy
- **Mobile-First:** Single column layout, touch targets >44px, bottom-anchored or easily reachable CTAs. Sticky CTA banner on scroll.

## 22. Performance
- **Framework:** Next.js App Router (Static Generation where possible).
- **Assets:** `next/image` for WebP/AVIF auto-conversion. Lazy load portfolio images. `preload="none"` on the VSL video to save initial bandwidth.

## 23. Accessibility
- **Standards:** WCAG 2.1 AA.
- **Implementation:** Contrast ratios >4.5:1. Aria-labels on all form inputs and video controls. Keyboard navigability for the multi-step form.

## 24. Privacy/Security
- Data validation via `Zod` on both client and server.
- No sensitive PII stored directly on the frontend.
- CAPI token stored safely in `.env`.

## 25. Technical Stack
- **Framework:** Next.js (App Router) - For SEO, performance, and server actions (CAPI/CRM).
- **Language:** TypeScript - For type safety across the form and API.
- **Styling:** Tailwind CSS - Rapid UI development and maintainability.
- **Animations:** Framer Motion - Smooth scroll and form transitions.
- **Forms:** React Hook Form + Zod - Efficient, re-render optimized multi-step form with strict validation.
- **Icons:** Lucide React.
- **Justification:** This stack represents the industry standard for high-performance marketing pages. It allows for secure server-side processing of Meta CAPI and CRM webhooks without exposing API keys, while delivering a lightning-fast static frontend.

## 26. Research Findings

### A. ui-ux-pro-max Skill
- **URL/Source:** Local `ui-ux-pro-max` design system generation.
- **Observed:** Recommended "Scroll-Triggered Storytelling", Brutalism/High-End typography (`Inter` + `Playfair Display`), and strict accessibility guidelines (no auto-play media, 44px touch targets).
- **Relevance:** Sets the baseline for a premium, trustworthy visual identity.
- **Decision:** Adopt the typography and layout principles, but soften the "Brutalism" into a "Premium Gastronomic" dark mode to better fit restaurants. Adopt all UX/Accessibility guidelines (e.g., click-to-play video, progress indicators in forms).

### B. B2B Landing Page Principles (Search)
- **URL/Source:** Web search on B2B premium service landing pages.
- **Observed:** Focus on problem-centric messaging, removal of all navigation links, single clear CTA, and heavy reliance on social proof above the fold.
- **Relevance:** Essential for converting high-ticket services (R$2.700/mo).
- **Decision:** Remove standard website headers. The page will be a pure conversion funnel.

### C. Multi-Step Form UX (Search)
- **URL/Source:** Web search on lead qualification forms.
- **Observed:** "Commitment Escalation" (easy questions first, hard questions like budget/phone last), progress bars, and clickable cards instead of typing.
- **Relevance:** Directly addresses the 8-step form requirement.
- **Decision:** Implement Framer Motion slide transitions between steps, a clear "Step X of 8" progress bar, and clickable radio cards for questions 3-7.

### D. Meta Conversions API (Search)
- **URL/Source:** Meta Official Documentation / Best Practices.
- **Observed:** Deduplication requires identical `event_id` and `event_name` sent within a reasonable time window from both browser and server.
- **Relevance:** Crucial for accurate tracking and ROAS calculation.
- **Decision:** Generate a `crypto.randomUUID()` upon form initiation. Send it to Facebook Pixel via `fbq` and simultaneously to Next.js Server Action which forwards it to CAPI.

## 27. Implementation Plan
1. **Setup:** Initialize Next.js project with Tailwind and TypeScript.
2. **Design System:** Implement tokens (Colors, Fonts) in Tailwind config.
3. **Components:** Build reusable UI (Button, Card, Input, Video Player, Form Wizard).
4. **Content Layer:** Create `content.json` structure for easy Videomaker edits.
5. **Sections:** Assemble Hero, Narrative, Portfolio, and Social Proof sections.
6. **Form:** Implement the 8-step React Hook Form with Zod validation.
7. **Integration:** Build Server Action for Meta CAPI and generic CRM webhook payload.
8. **Tracking:** Add Pixel and Google Tag Manager.

## 28. Testing Plan
- **UX:** Manually verify scroll flow and mobile touch targets.
- **Form State:** Test forward/back navigation in the wizard, data persistence, and validation errors.
- **CAPI:** Use Meta Events Manager "Test Events" tab to verify deduplication of `Lead` and `QualifiedLead` events.
- **Performance:** Run Google Lighthouse to ensure >90 on Mobile Performance.

## 29. Acceptance Criteria
- Page looks premium and cinematic.
- VSL is playable and editable.
- Form successfully qualifies leads and reveals price only at the end.
- `event_id` deduplication works.
- Code is maintainable and content is decoupled (editable by non-devs).

## 30. Open Questions
- *For the user:* Do you have a preferred CRM endpoint (e.g., ActiveCampaign Webhook, Zapier URL) ready for us to send the payload to during development, or should we just mock the payload output for now?
- *For the user:* Should the VSL video be hosted on YouTube/Vimeo (embedded) or directly as an MP4 file on the server/CDN?

## 31. Future Improvements
- A/B testing of the VSL thumbnail and headline.
- Integration with a headless CMS (e.g., Sanity or Strapi) if the JSON configuration becomes too complex for the Videomaker to manage.
