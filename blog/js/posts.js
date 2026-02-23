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
    title: "Reading Notes: Apache Ray",
    date: "2026-02-22",
    tags: ["networking", "systems"],
    thumbnail: null,
    excerpt:
      "Notes while reading the original paper for Apache Ray distributed computing framework",
    file: "posts/01-apache-ray.html",
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
];
