# leroro — Reading journal

A static personal reading journal with a short introduction, reading statistics, a library of completed materials, and an upcoming reading list. Open `index.html` in a browser; no installation or build is needed.

## Photo

Place your JPEG photo at `assets/avatar.jpg`. It appears next to the nickname. If the image is missing, an initial is shown instead. To use PNG or WebP, update `data-src` on `#profile-photo` in `index.html`.

## Reading list

Edit `data.js`. Copy an entry and change its title, author, publication year, and URL. Entries are displayed in file order.

- `status: "read"` places it under **Read**.
- `status: "reading"` places it under **Reading now**; `"planned"` places it under **To read**.
- `type: "Book"` or `"Paper"` labels the material. The **All / Books / Papers** buttons filter only the library and combine with the selected topic tags. **Reading now** and **To read** always show all their materials, with a type badge on each entry.
- `summary` provides the short description on each library card.
- `tags`, for example `["Java", "Synchronization"]`, appear on the card and automatically populate the searchable tag selector from completed materials. Select multiple tags to show materials containing **at least one** selected tag within the chosen type. Remove a tag with its × button or use **Clear tags**. Arrow keys and Enter select tags, Escape closes the dropdown, and Backspace in an empty search removes the last selected tag.
- Reading statistics show **Read**, **Reading now**, and **To read** totals, regardless of the selected filters. `topic` is optional metadata.
- `rating: null` hides the rating. Set a number from 1 to 5 to show it.
- `notes: ""` hides notes. Add your text to show an expandable **Notes** section.
- `understanding: "understood"` marks a completed deep dive.
- `finishedOn: "YYYY-MM"` shows the completion month (for example, `"2026-09"` → **Finished September 2026**). Use `"YYYY-MM-DD"` when the exact day is known, or `null` to hide it.

Counts are calculated automatically. Publication year is separate from completion date. Artwork metadata remains in the data file for reference but is not displayed.

**Reading now** and **To read** each have independent pagination with two materials per page. Navigation appears only when there is more than one page. Counts show the full list totals; library filters do not affect these lists or their current pages.

## GitHub Pages

Upload `index.html`, `styles.css`, `app.js`, `data.js`, `favicon.svg`, `.nojekyll`, and `assets/` to the repository root. In **Settings → Pages**, select **Deploy from a branch**, your branch, and **/(root)**. Save. Relative paths work with repository sites too.

The page uses system fonts and has no external runtime dependencies.

