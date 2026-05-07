# KaamSetu: UI/UX Guidelines

This document serves as the single source of truth for the design system and UX patterns used across the KaamSetu application. Following these guidelines ensures consistency, maintainability, and a premium, mobile-first experience.

---

## 1. Core Principles
*   **Mobile-First Native Feel**: The web application must feel like a native iOS/Android app on mobile devices. Use bottom navigation, touch-friendly cards, and eliminate horizontal scrolling.
*   **Premium Aesthetics**: Avoid generic, flat designs. Use subtle borders (`border-gray-100`), soft shadows (`shadow-sm`), and intentional whitespace.
*   **Clear Hierarchy**: Use typography weight (`font-bold`, `font-medium`) and color contrast to guide the user's eye to the most important information first.

---

## 2. Color Palette
We use Tailwind CSS standard colors with specific semantic meanings:

| Color Family | Usage & Semantic Meaning | Tailwind Classes |
| :--- | :--- | :--- |
| **Indigo** | Primary brand color, main calls to action, active states. | `bg-indigo-600`, `text-indigo-600`, `bg-indigo-50` |
| **Gray/Slate** | Backgrounds, text hierarchy, borders. | `bg-gray-50` (app bg), `text-gray-900` (headings), `text-gray-500` (secondary) |
| **Green** | Success, Active status, WhatsApp engagement. | `bg-green-100`, `text-green-700` |
| **Orange** | Pending actions, warnings, unverified status. | `bg-orange-500`, `text-orange-700`, `bg-orange-50` |
| **Red** | Destructive actions (Delete, Logout), errors. | `bg-red-50`, `text-red-600` |
| **Blue** | Informational, Phone call engagement. | `bg-blue-50`, `text-blue-600` |

---

## 3. Typography
*   **Headings**: Use `text-gray-900` and `font-bold`. 
    *   Page Titles: `text-xl md:text-2xl`
    *   Section Titles: `text-lg md:text-xl`
*   **Body Text**: Standard text should be `text-gray-700` or `text-gray-500` for secondary information.
*   **Labels/Tags**: Use `text-xs` or `text-[10px]` with `font-semibold` or `font-bold` for pills and badges.

---

## 4. Component Patterns

### Buttons
*   **Primary Action**: `bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-5 py-2.5 transition`
*   **Secondary/Ghost Action**: `bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl`
*   **Destructive Icon Button**: `bg-red-50 text-red-600 hover:bg-red-100 rounded-lg p-2 transition`
*   *Note: Always include `transition` for smooth hover states.*

### Cards (Containers)
*   **Desktop**: `bg-white rounded-2xl shadow-sm border border-gray-100 p-6`
*   **Mobile**: Reduce padding and rounding to save space: `rounded-xl p-3` or `p-4`.

### Tables vs. Mobile Lists
**NEVER force a desktop table onto a mobile screen.**
*   **Desktop (`hidden md:block`)**: Use a standard `table` with a `bg-gray-50 text-gray-500 text-sm uppercase` header row.
*   **Mobile (`md:hidden flex flex-col`)**: Hide the table and render the data as a stacked list of Cards. Use a `divide-y divide-gray-100` wrapper to separate items cleanly.

---

## 5. Responsive Design Rules

### Breakpoints
We rely primarily on Tailwind's `md:` (768px) breakpoint to switch between Mobile and Desktop layouts.

### Mobile Optimization (The "Clutter" Rule)
When designing for mobile (`< 768px`):
1.  **Reduce Padding**: Change `p-6` to `p-3` or `p-4`.
2.  **Reduce Fonts**: Shift `text-lg` down to `text-[15px]` or `text-base`. Shift secondary text to `text-xs` or `text-[11px]`.
3.  **Action Placement**: Move primary actions (like "Add New") to the top header area rather than inline with content filters to prevent flexbox wrapping/overflow.
4.  **Navigation**: Use a fixed Bottom Navigation Bar (`fixed bottom-0 pb-safe`) instead of a sidebar or complex header dropdowns.

---

## 6. Iconography
*   Use the **Lucide React** (`lucide-react`) icon library.
*   Standard icon size is `w-5 h-5` for buttons/nav, and `w-4 h-4` for inline text accents.

---

## Example Checklist for New Screens
- [ ] Does it have a `bg-gray-50` root background?
- [ ] Are primary containers using `bg-white rounded-2xl shadow-sm border-gray-100`?
- [ ] Does it adapt gracefully to mobile without horizontal scrolling?
- [ ] If there is tabular data, is there a Card-based mobile fallback?
- [ ] Are buttons using the correct semantic colors and hover transitions?
