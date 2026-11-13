// Edit this file to maintain your journal. No build step is needed.
// status: "read" | "reading" | "planned"
// understanding: "read" | "understood" (for completed materials)
// rating: null, or a number from 1 to 5
// finishedOn: null, "YYYY-MM", or "YYYY-MM-DD"; notes: your own text, or ""
// Entries appear in array order. Add new entries at the beginning.
window.readingJournal = [
  {
    id: "dapper",
    title: "Dapper, a Large-Scale Distributed Systems Tracing Infrastructure",
    author: "Benjamin H. Sigelman et al.",
    publisher: "Google Research",
    year: 2010,
    type: "Paper",
    topic: "Distributed systems",
    tags: ["Tracing", "Observability"],
    summary: "How Google tracks requests across services and finds performance problems.",
    url: "https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/",
    status: "read",
    understanding: "read",
    rating: null,
    finishedOn: "2026-09",
    notes: "",
    artwork: "tracing"
  },
  {
    id: "aqs",
    title: "The java.util.concurrent Synchronizer Framework",
    author: "Doug Lea",
    publisher: "SUNY Oswego",
    year: 2004,
    type: "Paper",
    topic: "Concurrency",
    tags: ["Java", "Synchronization"],
    summary: "How Java’s AbstractQueuedSynchronizer manages waiting threads and provides a common basis for locks and other synchronizers.",
    url: "https://gee.cs.oswego.edu/dl/papers/aqs.pdf",
    status: "read",
    understanding: "read",
    rating: null,
    finishedOn: "2026-10",
    notes: "",
    artwork: "queue"
  }
];
