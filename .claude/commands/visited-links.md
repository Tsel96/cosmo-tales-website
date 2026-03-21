Add `:visited` link styling so users can tell which links they've already clicked.

## What to do

1. **Add a color token** — add `--color-visited` to the `@theme` block in the main CSS file. Choose a muted purple/lavender (e.g. `#9083C4`) that is clearly distinct from the default link color but not jarring on the site's color palette.

2. **Add a base CSS rule** — inside `@layer base`, add:
   ```css
   a:visited {
     color: var(--color-visited);
   }
   ```
   This covers plain `<a>` elements that inherit their color from the base layer.

3. **Update Tailwind-styled links** — for any `<a>` element that uses Tailwind color utilities (e.g. `text-[#8A95B0]`), append `visited:text-[var(--color-visited)]` to ensure the visited state overrides the utility class. Find all such links and update them.

4. **Handle SVG icons inside links** — if a link contains an inline SVG icon, the icon will NOT inherit the `:visited` color even if it uses `fill: currentColor` or `stroke: currentColor`. This is a browser security restriction: the browser intentionally prevents SVG children from inheriting `:visited` styles (to block JavaScript from reading visited state via `getComputedStyle`), while text color is safe because the browser lies to scripts about it.

   The fix is to render the icon as a CSS **mask** instead of inline SVG, then change the `background-color` in `:visited` (background-color is allowed):

   ```html
   <!-- Before: inline SVG (icon stays unvisited color) -->
   <a href="...">
     <svg>...</svg>
     Label
   </a>

   <!-- After: mask-based icon (background-color responds to :visited) -->
   <a href="...">
     <span class="icon-arrow"></span>
     Label
   </a>
   ```

   ```css
   .icon-arrow {
     display: inline-block;
     width: 1em;
     height: 1em;
     background-color: currentColor;          /* unvisited: inherits link color */
     mask: url('/icons/arrow.svg') center / contain no-repeat;
     -webkit-mask: url('/icons/arrow.svg') center / contain no-repeat;
   }

   a:visited .icon-arrow {
     background-color: var(--color-visited);  /* visited: set explicitly */
   }
   ```

   In Tailwind with the `visited:` variant this is not directly possible for child elements, so use a plain CSS rule or a `group-visited` pattern:

   ```html
   <a href="..." class="group">
     <span class="icon-arrow bg-current group-visited:bg-[var(--color-visited)]"></span>
     Label
   </a>
   ```

## UX principles to follow

- Visited color must be perceivably different from both the unvisited and hover states.
- On dark backgrounds, muted purple/lavender is the conventional and accessible choice.
- Do not hide the visited indicator — it helps users navigate and avoids re-clicking known content.
- Only change `color`, `background-color`, `border-color`, `outline-color`, `fill`, `stroke` in `:visited` — browsers restrict all other CSS changes for privacy reasons.
- Text inherits `:visited` color automatically. SVG icons do not — always use the mask technique for icons inside links.

## Scope

Search for all `<a` elements in the codebase. For each:
- Skip image-only links (no text, no icon — e.g. a logo wrapped in `<a>`).
- Add `visited:` color variant to text links.
- For links with an adjacent SVG icon, convert the icon to a mask-based element and add an explicit `a:visited .icon-class` rule.
