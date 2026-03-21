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

## UX principles to follow

- Visited color must be perceivably different from both the unvisited and hover states.
- On dark backgrounds, muted purple/lavender is the conventional and accessible choice.
- Do not hide the visited indicator — it helps users navigate and avoids re-clicking known content.
- Only change `color` (and related paint properties) in `:visited` — browsers restrict other CSS changes for privacy reasons.

## Scope

Search for all `<a` elements in the codebase, skip image-only links (no text), and apply `visited:` variants as needed.
