# leroro — Reading journal

A static personal reading journal with a short introduction, reading statistics, a library of completed materials, and an upcoming reading list. Open `index.html` in a browser; no installation or build is needed.

## Photo

Place your JPEG photo at `assets/avatar.jpg`. It appears next to the nickname. If the image is missing, an initial is shown instead. To use PNG or WebP, update `data-src` on `#profile-photo` in `index.html`.

## Reading list

Edit `data.js`. Copy an entry and change its title, author, publication year, and URL. Entries are displayed in file order.

- `status: "read"` places it under **Read**.
- `status: "planned"` or `"reading"` places it under **To read**.
- `summary` provides the short description on each library card.
- `tags`, for example `["Java", "Synchronization"]`, appear on the card and automatically populate the searchable tag selector. Select multiple tags to show materials containing **at least one** selected tag. With no tags selected, all materials are shown. Remove a tag with its × button or use **Clear all**. Arrow keys and Enter select tags, Escape closes the dropdown, and Backspace in an empty search removes the last selected tag.
- `topic` is used for the topic statistic. Statistics always include all completed materials, regardless of the selected tag.
- `rating: null` hides the rating. Set a number from 1 to 5 to show it.
- `notes: ""` hides notes. Add your text to show an expandable **Notes** section.
- `understanding: "understood"` marks a completed deep dive.
- `finishedOn: "YYYY-MM"` shows the completion month (for example, `"2026-09"` → **Finished September 2026**). Use `"YYYY-MM-DD"` when the exact day is known, or `null` to hide it.

Counts are calculated automatically. Publication year is separate from completion date. Artwork metadata remains in the data file for reference but is not displayed.

## GitHub Pages

Upload `index.html`, `styles.css`, `app.js`, `data.js`, `favicon.svg`, `.nojekyll`, and `assets/` to the repository root. In **Settings → Pages**, select **Deploy from a branch**, your branch, and **/(root)**. Save. Relative paths work with repository sites too.

The page uses system fonts and has no external runtime dependencies.

