# Sapphire Device Finance — Device Catalog

A production-oriented device financing catalog built with Next.js App Router, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, and Zod. Designed for a Nigerian fintech device financing workflow where customers browse hardware priced in Naira (₦), inspect availability and specifications, and submit an Express Financing Interest request.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with custom UI primitives (no external UI component library)
- **Data Fetching & Caching:** TanStack Query v5 (`@tanstack/react-query`)
- **Forms & Validation:** React Hook Form + Zod (`@hookform/resolvers/zod`)
- **Icons & Motion:** `lucide-react` and `motion/react`

## Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Run the development server**

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

3. **Build and lint checks**

```bash
npm run lint
npm run build
```

## Project Structure

```text
app/
  globals.css          # Tailwind v4 setup and font token definitions
  layout.tsx           # Root layout, Google Fonts, metadata, QueryProvider
  page.tsx             # Landing + catalog page composition
components/
  devices/             # DeviceCatalog, DeviceCard, DeviceFilters, DeviceDetailModal, states
  forms/               # FinancingInterestForm with Zod validation & receipt state
  layout/              # Header, HeroSection, HowItWorksSection, Footer, QueryProvider
  ui/                  # Reusable primitives (Button, Input, Select, Badge, Card, Modal, Skeleton)
hooks/
  use-debounce.ts      # Generic debounce hook for search input
  use-devices.ts       # TanStack Query hook for catalog fetching
constandts/
  index.ts             # Currency rate, financing rate, category/sort/repayment options
lib/
  api.ts               # Typed fetch wrapper for DummyJSON products
  utils.ts             # NGN formatting, stock derivation, monthly installment math
  validators.ts        # Zod schemas for financing form validation
types/
  device.ts            # API response and catalog filter types
  financing.ts         # Form values and submission receipt types
```

## Design & Architecture Decisions

- **Custom UI Primitives:** `Button`, `Input`, `Select`, `Badge`, `Card`, `Modal`, and `Skeleton` are implemented directly with Tailwind CSS and `clsx`/`tailwind-merge`, keeping bundle size small and styling consistent across the catalog and modal flows.
- **Modal Detail View vs. Dedicated Route:** Clicking a device card opens an accessible dialog modal (`DeviceDetailModal`) instead of navigating away from the catalog. Users keep their scroll position, search query, and category selection intact when comparing multiple devices.
- **Debounced Search, Filtering & Pagination:** Fetching `https://dummyjson.com/products?limit=0` once and caching via TanStack Query (`staleTime: 5 minutes`, `keepPreviousData`) enables instantaneous category switching, sorting, debounced name/brand search (`300ms`), and deterministic pagination (`8` devices per page, auto-resetting to page 1 on filter changes) without redundant network round-trips or DummyJSON's limitation around combining search and multi-category filters server-side.
- **Accessibility:** Semantic landmarks, explicit `<label>` bindings, `aria-invalid` / `aria-describedby` / `role="alert"` validation errors, keyboard Escape dismissal and scroll-lock in the modal, and non-color-only stock badges (pairing icons and labels).

## Assumptions & Trade-Offs

- **Currency Conversion (`USD -> NGN`):** DummyJSON returns prices in USD. Prices are converted to Naira using a configurable static rate (`USD_TO_NGN_RATE = 1400` in `lib/constants.ts`) and rounded to the nearest `₦100` for clean display. In production, this would be replaced by backend NGN pricing or a live FX feed.
- **Monthly Repayment Estimate:** Installments shown on cards and in the financing form use a transparent 3.5% flat monthly service fee across 3, 6, 9, or 12 months (`calculateMonthlyInstallment` in `lib/utils.ts`).
- **Default Category Scope:** DummyJSON's full catalog spans non-tech items (groceries, furniture, cosmetics). The catalog defaults to `"All Devices"` (`smartphones`, `laptops`, `tablets`, `mobile-accessories`) so the storefront immediately presents relevant financeable hardware, while still allowing users to switch to `"Full Storefront"` in the category dropdown.
- **Client-Only Submission:** Per project scope, submitting the Express Financing Interest form validates client-side and renders a confirmation receipt with a generated reference ID (`SPH-XXXXXX`) without persisting to a backend API.
