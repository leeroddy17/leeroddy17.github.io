/* ============================================================
   posts.js — BLOG POST REGISTRY
   
   To add a new post:
   1. Create a new HTML file in the posts/ folder
      (copy posts/template.html as a starting point)
   2. Add an entry to the POSTS array below

   Fields:
     id        — unique number
     title     — post title
     date      — "YYYY-MM-DD"
     tags      — array of strings
     thumbnail — image URL string, or null
     excerpt   — short summary shown on the card
     file      — path to the post's HTML file (relative to index.html)
============================================================ */

/* ============================================================
   TAG COLORS — add entries here for any new tag names
============================================================ */
const TAG_COLORS = {
  algorithms:      { bg: "rgba(37,99,235,0.1)",   fg: "#2563eb" },
  fundamentals:    { bg: "rgba(124,58,237,0.1)",  fg: "#7c3aed" },
  networking:      { bg: "rgba(5,150,105,0.1)",   fg: "#059669" },
  systems:         { bg: "rgba(217,119,6,0.1)",   fg: "#d97706" },
  complexity:      { bg: "rgba(219,39,119,0.1)",  fg: "#db2777" },
  default:         { bg: "rgba(107,114,128,0.1)", fg: "#6b7280" },
};

function tagColor(tag) {
  return TAG_COLORS[tag] || TAG_COLORS.default;
}

/* ============================================================
   UTILITIES
============================================================ */
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(str) {
  return new Date(str + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });
}

function buildTagsHtml(tags) {
  return tags.map(tag => {
    const c = tagColor(tag);
    return `<span class="tag" style="background:${c.bg};color:${c.fg};">${escHtml(tag)}</span>`;
  }).join("");
}

/* ============================================================
   RENDER CARD LIST
============================================================ */
function renderList(posts) {
  const grid = document.getElementById("card-grid");
  const countEl = document.getElementById("post-count");
  countEl.textContent = `${posts.length} post${posts.length !== 1 ? "s" : ""}`;

  if (posts.length === 0) {
    grid.innerHTML = `<p class="empty-msg">No posts match your search.</p>`;
    return;
  }

  grid.innerHTML = posts.map((post, idx) => `
    <article class="card" data-id="${post.id}" style="animation-delay:${idx * 60}ms">
      ${post.thumbnail
        ? `<div class="card-thumb"><img src="${escHtml(post.thumbnail)}" alt="${escHtml(post.title)}" loading="lazy"/></div>`
        : ""}
      <div class="card-body">
        <div class="card-meta">
          <span class="card-date">${formatDate(post.date)}</span>
          <div class="tag-row">${buildTagsHtml(post.tags)}</div>
        </div>
        <h2 class="card-title">${escHtml(post.title)}</h2>
        <p class="card-excerpt">${escHtml(post.excerpt)}</p>
        <span class="card-cta">Read more →</span>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      const post = POSTS.find(p => p.id === Number(card.dataset.id));
      if (post) showPost(post);
    });
  });
}

/* ============================================================
   SHOW / HIDE VIEWS
============================================================ */
async function showPost(post) {
  document.getElementById("list-view").style.display = "none";

  const pv = document.getElementById("post-view");
  pv.style.display = "block";
  pv.style.animation = "none";
  pv.offsetHeight; // force reflow to restart animation
  pv.style.animation = "";

  document.getElementById("pv-date").textContent = formatDate(post.date);
  document.getElementById("pv-tags").innerHTML = buildTagsHtml(post.tags);
  document.getElementById("pv-title").textContent = post.title;
  document.getElementById("pv-excerpt").textContent = post.excerpt;

  // Load the post's HTML file
  const body = document.getElementById("post-body");
  body.innerHTML = `<p class="loading">Loading…</p>`;

  try {
    const res = await fetch(post.file);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    body.innerHTML = await res.text();
  } catch (err) {
    body.innerHTML = `<p class="empty-msg">Could not load post content. (${escHtml(err.message)})</p>`;
  }

  history.pushState({ postId: post.id }, "", `#post-${post.id}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showList() {
  document.getElementById("post-view").style.display = "none";
  document.getElementById("list-view").style.display = "block";
  history.pushState({}, "", window.location.pathname);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   SEARCH
============================================================ */
document.getElementById("search").addEventListener("input", function () {
  const q = this.value.toLowerCase().trim();
  const filtered = q
    ? POSTS.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      )
    : [...POSTS];
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  renderList(filtered);
});

/* ============================================================
   NAVIGATION
============================================================ */
document.getElementById("back-btn").addEventListener("click", showList);

document.getElementById("logo-link").addEventListener("click", () => {
  document.getElementById("search").value = "";
  showList();
  renderList([...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date)));
});

window.addEventListener("popstate", (e) => {
  if (e.state && e.state.postId) {
    const post = POSTS.find(p => p.id === e.state.postId);
    if (post) { showPost(post); return; }
  }
  showList();
});

/* ============================================================
   INIT
============================================================ */
(function init() {
  const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
  renderList(sorted);

  const hash = window.location.hash;
  if (hash.startsWith("#post-")) {
    const id = Number(hash.replace("#post-", ""));
    const post = POSTS.find(p => p.id === id);
    if (post) showPost(post);
  }
})();
