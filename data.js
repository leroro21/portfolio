// Edit this file to maintain your journal. No build step is needed.
// status: "read" | "reading" | "planned"
// type: "Book" | "Paper"
// understanding: "read" | "understood" (for completed materials)
// rating: null, or a number from 1 to 5
// finishedOn: null, "YYYY-MM", or "YYYY-MM-DD"; notes: your own text, or ""
// Entries appear in array order. Add new entries at the beginning.
window.readingJournal = [
  {
    id: "java-fork-join",
    title: "A Java Fork/Join Framework",
    author: "Doug Lea",
    type: "Paper",
    topic: "Concurrency",
    tags: ["Java", "Parallelism"],
    url: "https://gee.cs.oswego.edu/dl/papers/fj.pdf",
    status: "planned"
  },
  {
    id: "dynamodb",
    title: "Amazon DynamoDB: A Scalable, Predictably Performant, and Fully Managed NoSQL Database Service",
    author: "Mostafa Elhemali et al.",
    type: "Paper",
    topic: "Databases",
    tags: ["NoSQL", "Distributed systems"],
    url: "https://cdn.amazon.science/33/9d/b77f13fe49a798ece85cf3f9be6d/amazon-dynamodb-a-scalable-predictably-performant-and-fully-managed-nosql-database-service.pdf",
    status: "planned"
  },
  {
    id: "google-monorepo",
    title: "Why Google Stores Billions of Lines of Code in a Single Repository",
    author: "Rachel Potvin and Josh Levenberg",
    type: "Paper",
    topic: "Software engineering",
    tags: ["Monorepo", "Version control"],
    url: "https://research.google/pubs/why-google-stores-billions-of-lines-of-code-in-a-single-repository/",
    status: "planned"
  },
  {
    id: "monarch",
    title: "Monarch: Google's Planet-Scale In-Memory Time Series Database",
    author: "Colin Adams et al.",
    type: "Paper",
    topic: "Databases",
    tags: ["Time series", "Monitoring"],
    url: "https://research.google/pubs/monarch-googles-planet-scale-in-memory-time-series-database/",
    status: "planned"
  },
  {
    id: "garbage-first",
    title: "Garbage-First Garbage Collection",
    author: "David Detlefs et al.",
    type: "Paper",
    topic: "Memory management",
    tags: ["Java", "Garbage collection"],
    url: "https://dl.acm.org/doi/epdf/10.1145/1029873.1029879",
    status: "planned"
  },
  {
    id: "sql-performance-explained",
    title: "SQL Performance Explained",
    author: "Markus Winand",
    type: "Book",
    topic: "Databases",
    tags: ["SQL", "Performance", "Indexing"],
    url: "https://www.scribd.com/document/359709554/SQL-Performance-Explained-pdf#page=53",
    status: "reading",
    rating: null,
    finishedOn: null,
    notes: ""
  },
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
