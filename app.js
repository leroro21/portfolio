(() => {
  "use strict";

  const photo = document.querySelector("#profile-photo");
  const fallback = document.querySelector("#avatar-fallback");
  photo.addEventListener("load", () => {
    photo.hidden = false;
    fallback.hidden = true;
  });
  photo.addEventListener("error", () => {
    photo.hidden = true;
    fallback.hidden = false;
  });
  photo.src = photo.dataset.src;

  const entries = window.readingJournal || [];
  const escape = value => String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));

  function sourceUrl(value) {
    try {
      const url = new URL(value);
      return ["https:", "http:"].includes(url.protocol) ? escape(url.href) : "#";
    } catch {
      return "#";
    }
  }

  function getTags(entry) {
    if (!Array.isArray(entry.tags)) return [];
    return [...new Set(entry.tags.filter(tag => typeof tag === "string").map(tag => tag.trim()).filter(Boolean))];
  }

  function renderEntry(entry) {
    const rated = typeof entry.rating === "number" && entry.rating >= 1 && entry.rating <= 5;
    const meta = [entry.author, entry.year];
    if (entry.status === "read" && entry.finishedOn) {
      const monthOnly = /^\d{4}-\d{2}$/.test(entry.finishedOn);
      const date = new Date(`${entry.finishedOn}${monthOnly ? "-01" : ""}T12:00:00`);
      if (!Number.isNaN(date.getTime())) {
        const options = { year: "numeric", month: "long" };
        if (!monthOnly) options.day = "numeric";
        meta.push(`Finished ${date.toLocaleDateString("en", options)}`);
      }
    }
    return `<li class="entry">
      <div class="entry-top"><span class="entry-kind"><svg class="paper-icon" viewBox="0 0 20 22" fill="none" aria-hidden="true"><path d="M4 2h8l4 4v14H4V2Z M12 2v5h4 M7 11h6 M7 15h6"/></svg>${escape(entry.type || "Article")}${entry.publisher ? ` <span aria-hidden="true">·</span> ${escape(entry.publisher)}` : ""}</span><span class="status"><span aria-hidden="true">✓</span> ${entry.understanding === "understood" ? "Understood" : "Read"}</span></div>
      <h3><a href="${sourceUrl(entry.url)}" target="_blank" rel="noopener noreferrer">${escape(entry.title)}</a></h3>
      <p class="entry-meta">${meta.filter(Boolean).map(escape).join(" · ")}</p>
      ${entry.summary ? `<p class="entry-description">${escape(entry.summary)}</p>` : ""}
      <div class="entry-footer"><div class="entry-tags">${getTags(entry).map(tag => `<span class="tag">${escape(tag)}</span>`).join("")}</div><div class="entry-actions">${rated ? `<span class="rating" aria-label="Rating: ${entry.rating} out of 5">${entry.rating}/5</span>` : ""}<a class="source-link" href="${sourceUrl(entry.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escape(entry.title)} in a new tab">Open ${escape((entry.type || "article").toLowerCase())} <span aria-hidden="true">↗</span></a></div></div>
      ${entry.notes ? `<details class="notes"><summary>Notes</summary><p>${escape(entry.notes)}</p></details>` : ""}
    </li>`;
  }

  const completed = entries.filter(entry => entry.status === "read");
  const planned = entries.filter(entry => ["reading", "planned"].includes(entry.status));
  const topics = [...new Set(completed.map(entry => entry.topic || "General"))];
  const tags = [...new Set(completed.flatMap(getTags))].sort((a, b) => a.localeCompare(b, "en"));

  const selectedTags = new Set();

  function renderLibrary() {
    const visible = completed.filter(entry => !selectedTags.size || [...selectedTags].some(tag => getTags(entry).includes(tag)));
    document.querySelector("#read-list").innerHTML = visible.map(renderEntry).join("");
    document.querySelector("#read-count").textContent = visible.length;
    document.querySelector("#read-empty").hidden = visible.length > 0;
    document.querySelector("#filter-status").textContent = `${visible.length} ${visible.length === 1 ? "read" : "reads"} shown${selectedTags.size ? ` tagged ${[...selectedTags].join(", ")}` : ""}`;
  }

  const picker = document.querySelector("#tag-picker");
  const input = document.querySelector("#tag-search");
  const dropdown = document.querySelector("#tag-dropdown");
  const options = document.querySelector("#tag-options");
  const toggle = document.querySelector("#toggle-tags");
  const clear = document.querySelector("#clear-tags");
  let activeIndex = -1;
  let matchingTags = [];
  let suppressFocusOpen = false;

  function renderOptions() {
    matchingTags = tags.filter(tag => tag.toLowerCase().includes(input.value.trim().toLowerCase()));
    if (activeIndex >= matchingTags.length) activeIndex = matchingTags.length - 1;
    options.innerHTML = matchingTags.map((tag, index) => `<li id="tag-option-${index}" class="tag-option${index === activeIndex ? " is-active" : ""}" role="option" aria-selected="${selectedTags.has(tag)}" data-index="${index}"><span class="option-check" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="m3.5 8 3 3 6-6"/></svg></span><span>${escape(tag)}</span></li>`).join("");
    document.querySelector("#no-tags").hidden = matchingTags.length > 0;
    input.removeAttribute("aria-activedescendant");
    if (!dropdown.hidden && activeIndex >= 0) {
      input.setAttribute("aria-activedescendant", `tag-option-${activeIndex}`);
      options.children[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }

  function setOpen(open) {
    dropdown.hidden = !open;
    input.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Hide tags" : "Show tags");
    activeIndex = -1;
    renderOptions();
  }

  function updateSelection() {
    document.querySelector("#selected-tags").innerHTML = [...selectedTags].map(tag => `<span class="selected-tag"><span>${escape(tag)}</span><button type="button" data-tag="${escape(tag)}" aria-label="Remove ${escape(tag)}">×</button></span>`).join("");
    clear.hidden = !selectedTags.size;
    document.querySelector("#tag-hint").hidden = !selectedTags.size;
    input.placeholder = selectedTags.size ? "Add tags…" : "Search or select tags…";
    renderOptions();
    renderLibrary();
  }

  function toggleTag(tag) {
    if (selectedTags.has(tag)) selectedTags.delete(tag);
    else selectedTags.add(tag);
    input.value = "";
    activeIndex = -1;
    updateSelection();
  }

  function restoreInputFocus(open) {
    suppressFocusOpen = true;
    input.focus({ preventScroll: true });
    suppressFocusOpen = false;
    setOpen(open);
  }

  input.addEventListener("focus", () => {
    if (!suppressFocusOpen) setOpen(true);
  });
  input.addEventListener("click", () => { if (dropdown.hidden) setOpen(true); });
  input.addEventListener("input", () => setOpen(true));
  input.addEventListener("keydown", event => {
    if (event.isComposing) return;
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      if (dropdown.hidden) setOpen(true);
      if (matchingTags.length) {
        activeIndex = event.key === "ArrowDown" ? (activeIndex + 1) % matchingTags.length : (activeIndex <= 0 ? matchingTags.length : activeIndex) - 1;
        renderOptions();
      }
    } else if (event.key === "Enter" && !dropdown.hidden) {
      event.preventDefault();
      if (activeIndex >= 0) toggleTag(matchingTags[activeIndex]);
      else if (matchingTags.length === 1) toggleTag(matchingTags[0]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Backspace" && !input.value && selectedTags.size) {
      selectedTags.delete([...selectedTags].at(-1));
      updateSelection();
    }
  });
  options.addEventListener("pointerdown", event => event.preventDefault());
  options.addEventListener("click", event => {
    const option = event.target.closest("[data-index]");
    if (option) {
      toggleTag(matchingTags[Number(option.dataset.index)]);
      input.focus();
    }
  });
  document.querySelector("#selected-tags").addEventListener("click", event => {
    const button = event.target.closest("button[data-tag]");
    if (button) {
      const wasOpen = !dropdown.hidden;
      selectedTags.delete(button.dataset.tag);
      updateSelection();
      restoreInputFocus(wasOpen);
    }
  });
  clear.addEventListener("click", () => {
    const wasOpen = !dropdown.hidden;
    selectedTags.clear();
    input.value = "";
    updateSelection();
    restoreInputFocus(wasOpen);
  });
  toggle.addEventListener("click", () => {
    const open = dropdown.hidden;
    input.focus();
    setOpen(open);
  });
  document.querySelector("#tag-field").addEventListener("click", event => {
    if (event.target.id === "tag-field") {
      input.focus();
      setOpen(true);
    }
  });
  document.addEventListener("pointerdown", event => {
    if (!picker.contains(event.target)) setOpen(false);
  });
  picker.addEventListener("focusout", event => {
    if (!picker.contains(event.relatedTarget)) setOpen(false);
  });
  document.querySelector("#stat-read").textContent = completed.length;
  document.querySelector("#stat-topics").textContent = topics.length;
  document.querySelector("#stat-planned").textContent = planned.length;
  document.querySelector("#planned-count").textContent = planned.length;
  document.querySelector("#planned-empty").hidden = planned.length > 0;
  document.querySelector("#planned-list").innerHTML = planned.map(entry => `<li class="queue-entry">${entry.status === "reading" ? '<span class="queue-status">Reading now</span>' : ""}<h3><a href="${sourceUrl(entry.url)}" target="_blank" rel="noopener noreferrer">${escape(entry.title)} ↗</a></h3><p class="entry-meta">${[entry.author, entry.type].filter(Boolean).map(escape).join(" · ")}</p></li>`).join("");
  renderLibrary();
})();

