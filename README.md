# Cancellation Flow with Deterministic A/B Testing

This project implements a subscription cancellation flow built with **Next.js (App Router)**. It includes structured UI steps, mock backend logic, and a deterministic A/B testing framework for evaluating user experience with or without downsell offers.

---

## Architecture Decisions

- **Framework:**  
  Built on **Next.js (15.3.5) App Router** with React Server Components and Client Components where interactivity is required (e.g., form handling, navigation, variant assignment).

- **Page Flow:**  
  The cancellation journey is split into three primary steps:
  1. **Reason/Feedback Collection** – gathers structured input from the user.  
  2. **Immigration/Final Step** – captures contextual details (e.g., visa or employment).  
  3. **Confirmation** – final success state.  

  An optional **Downsell Offer** step is inserted conditionally based on A/B test assignment.

- **Routing:**  
  Each step is represented by its own file in `app/cancellation/...`. Navigation between steps uses `next/navigation`’s `useRouter`.

- **Backend Mocking:**  
  For local development, API routes under `app/api/...` use simple **in-memory mocks** instead of a real database. This ensures the app runs without external dependencies (e.g., Supabase). The mocked API contract mirrors what a production database call would look like, making future integration straightforward.

---

## Security Implementation

- **Client/Server Separation:**  
  Sensitive logic (e.g., assigning A/B variants to users) is handled inside **API routes** rather than directly in the client. This ensures the client never directly controls variant assignment.

- **Authentication Stub:**  
  A helper `getCurrentUser()` currently returns a mock user ID. In production, this would be replaced with an actual authentication session (e.g., JWT, NextAuth, or Supabase Auth). This prevents malicious users from tampering with assignments.

- **Deterministic Assignment:**  
  Variant assignment is tied to a unique `user.id`, ensuring a consistent experience across sessions. A secure RNG (`crypto.getRandomValues`) is used when no prior assignment exists.

- **Error Handling:**  
  API routes catch all exceptions and default to **Variant A** if anything fails. This guarantees a graceful fallback path.

- **Data Privacy:**  
  Since no real PII or billing is processed in the demo, no sensitive data is exposed. In a real deployment, API calls would enforce:
  - Parameter validation
  - Role-based authorization
  - Audit logging

---

## A/B Testing Approach

- **Goal:**  
  Measure user response to a **downsell offer** during cancellation:
  - **Variant A** – no downsell screen, continue directly to feedback/confirmation.  
  - **Variant B** – display a special offer (e.g., “50% off until you find a job” or “$10 discount”). Users can accept (stay subscribed at reduced price) or decline (proceed with cancellation).  

- **Deterministic Assignment:**  
  On first interaction, the API assigns a variant using a **cryptographically secure random generator**.  
  - If a record for the user already exists, the stored variant is reused (ensuring consistency).  
  - Otherwise, a new variant is generated, stored (mock in memory for local dev), and returned.

- **Persistence Options:**  
  - **Local Development**: In-memory store ensures API stability without external dependencies.  
  - **Production**: Persist to a real database (Supabase/Postgres/Prisma) by replacing the mock `variantStore`.  

- **Analytics & Logging:**  
  - Accept/Decline actions are logged to the console in the mock version.  
  - In production, these would be persisted to an analytics table for experiment evaluation.  

- **Fail-Safe Defaults:**  
  If variant determination fails, the system defaults to **Variant A**, preserving the core cancellation flow without interruption.

---

## Future Improvements

- Integrate real authentication and user sessions.  
- Replace the in-memory store with a durable DB.  
- Add experiment analytics dashboards (conversion, retention).  
- Expand test conditions (multi-variant or percentage splits beyond 50/50).  

---

## Summary

This project demonstrates how to implement a **robust, secure, and testable cancellation flow** with deterministic A/B testing. The architecture favors clarity and modularity, the security model enforces server-side control of sensitive logic, and the testing framework ensures consistent variant assignments with fail-safe fallbacks.

