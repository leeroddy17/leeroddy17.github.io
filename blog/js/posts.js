/* ============================================================
   posts.js — ADD YOUR POSTS HERE
   
   This is the only file you need to edit to register a new post.
   The actual content lives in the posts/ folder as HTML files.

   Steps to add a new post:
     1. Duplicate posts/template.html → posts/your-post-slug.html
     2. Write your content in that file
     3. Add an entry to the POSTS array below
============================================================ */

const POSTS = [
  {
    id: 1,
    title: "How Binary Search Actually Works",
    date: "2025-02-10",
    tags: ["algorithms", "fundamentals"],
    thumbnail: null,
    excerpt:
      "Binary search is one of those algorithms that seems obvious once you understand it, but has surprising depth when you dig into its invariants.",
    file: "posts/binary-search.html",
  },
  {
    id: 2,
    title: "Understanding Big-O Notation",
    date: "2025-01-28",
    tags: ["complexity", "fundamentals"],
    thumbnail: null,
    excerpt:
      "Big-O is the language we use to talk about algorithmic efficiency. Here's how to think about it intuitively before the formal definitions.",
    file: "posts/big-o-notation.html",
  },
  {
    id: 3,
    title: "TCP vs UDP: When Reliability Costs Too Much",
    date: "2025-01-15",
    tags: ["networking", "systems"],
    thumbnail: null,
    excerpt:
      "TCP guarantees delivery and ordering. UDP doesn't. Here's why you'd ever choose the unreliable option — and when it's actually the right call.",
    file: "posts/tcp-vs-udp.html",
  },
];
