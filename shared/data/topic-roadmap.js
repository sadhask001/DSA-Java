/**
 * DSA-Java Platform - Topic Roadmap (35 Topics)
 * Source: Topic Roadmap sheet from DSA_Study_Plan_Easy_Medium_Hard.xlsx
 */

(function(root) {
  'use strict';

  const TOPIC_ROADMAP = [
  {
    "order": 1,
    "topic": "DSA FUNDAMENTALS",
    "easyCount": 4,
    "mediumCount": 3,
    "hardCount": 1,
    "totalCount": 8,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Complexity/index.html"
  },
  {
    "order": 2,
    "topic": "SORTING",
    "easyCount": 4,
    "mediumCount": 6,
    "hardCount": 2,
    "totalCount": 12,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Sorting/index.html"
  },
  {
    "order": 3,
    "topic": "BINARY SEARCH",
    "easyCount": 1,
    "mediumCount": 9,
    "hardCount": 2,
    "totalCount": 12,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Searching/index.html"
  },
  {
    "order": 4,
    "topic": "SEARCHING",
    "easyCount": 4,
    "mediumCount": 2,
    "hardCount": 1,
    "totalCount": 7,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Searching/index.html"
  },
  {
    "order": 5,
    "topic": "ARRAYS",
    "easyCount": 10,
    "mediumCount": 19,
    "hardCount": 6,
    "totalCount": 35,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Array/index.html"
  },
  {
    "order": 6,
    "topic": "STRINGS",
    "easyCount": 4,
    "mediumCount": 6,
    "hardCount": 3,
    "totalCount": 13,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Strings/index.html"
  },
  {
    "order": 7,
    "topic": "JAVA COLLECTIONS",
    "easyCount": 3,
    "mediumCount": 2,
    "hardCount": 1,
    "totalCount": 6,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Collection/index.html"
  },
  {
    "order": 8,
    "topic": "ARRAYLIST",
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 1,
    "totalCount": 3,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Collection/ArrayList/index.html"
  },
  {
    "order": 9,
    "topic": "SET",
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 1,
    "totalCount": 3,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Collection/index.html"
  },
  {
    "order": 10,
    "topic": "MAP",
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 1,
    "totalCount": 3,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Hashing/index.html"
  },
  {
    "order": 11,
    "topic": "HASHING",
    "easyCount": 2,
    "mediumCount": 3,
    "hardCount": 2,
    "totalCount": 7,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Hashing/index.html"
  },
  {
    "order": 12,
    "topic": "LINKED LIST",
    "easyCount": 13,
    "mediumCount": 14,
    "hardCount": 3,
    "totalCount": 30,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Collection/LinkedList/index.html"
  },
  {
    "order": 13,
    "topic": "STACK & QUEUE",
    "easyCount": 11,
    "mediumCount": 14,
    "hardCount": 3,
    "totalCount": 28,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Collection/Stack/index.html"
  },
  {
    "order": 14,
    "topic": "BINARY TREES",
    "easyCount": 18,
    "mediumCount": 16,
    "hardCount": 6,
    "totalCount": 40,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Trees/index.html"
  },
  {
    "order": 15,
    "topic": "BST",
    "easyCount": 6,
    "mediumCount": 17,
    "hardCount": 5,
    "totalCount": 28,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Trees/index.html"
  },
  {
    "order": 16,
    "topic": "BALANCED TREES",
    "easyCount": 1,
    "mediumCount": 3,
    "hardCount": 1,
    "totalCount": 5,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Trees/index.html"
  },
  {
    "order": 17,
    "topic": "HEAPS",
    "easyCount": 4,
    "mediumCount": 9,
    "hardCount": 6,
    "totalCount": 19,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Heap/index.html"
  },
  {
    "order": 18,
    "topic": "TRIE",
    "easyCount": 0,
    "mediumCount": 7,
    "hardCount": 1,
    "totalCount": 8,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Trees/index.html"
  },
  {
    "order": 19,
    "topic": "GRAPH",
    "easyCount": 5,
    "mediumCount": 34,
    "hardCount": 6,
    "totalCount": 45,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Graph/index.html"
  },
  {
    "order": 20,
    "topic": "PATTERNS",
    "easyCount": 4,
    "mediumCount": 3,
    "hardCount": 1,
    "totalCount": 8,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Patterns/index.html"
  },
  {
    "order": 21,
    "topic": "STRING MATCHING",
    "easyCount": 2,
    "mediumCount": 3,
    "hardCount": 2,
    "totalCount": 7,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Strings/index.html"
  },
  {
    "order": 22,
    "topic": "BRUTE FORCE",
    "easyCount": 2,
    "mediumCount": 2,
    "hardCount": 1,
    "totalCount": 5,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "ProblemSolving/index.html"
  },
  {
    "order": 23,
    "topic": "DIVIDE AND CONQUER",
    "easyCount": 2,
    "mediumCount": 2,
    "hardCount": 1,
    "totalCount": 5,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Recursion/index.html"
  },
  {
    "order": 24,
    "topic": "GREEDY",
    "easyCount": 2,
    "mediumCount": 13,
    "hardCount": 3,
    "totalCount": 18,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Greedy/index.html"
  },
  {
    "order": 25,
    "topic": "RECURSION & BACKTRACKING",
    "easyCount": 1,
    "mediumCount": 15,
    "hardCount": 3,
    "totalCount": 19,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Recursion/index.html"
  },
  {
    "order": 26,
    "topic": "DP",
    "easyCount": 5,
    "mediumCount": 20,
    "hardCount": 9,
    "totalCount": 34,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "DP/index.html"
  },
  {
    "order": 27,
    "topic": "RANDOMIZED ALGORITHMS",
    "easyCount": 2,
    "mediumCount": 2,
    "hardCount": 1,
    "totalCount": 5,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "ProblemSolving/index.html"
  },
  {
    "order": 28,
    "topic": "JAVA MULTITHREADING",
    "easyCount": 4,
    "mediumCount": 2,
    "hardCount": 2,
    "totalCount": 8,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Complexity/index.html"
  },
  {
    "order": 29,
    "topic": "2D ARRAYS",
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 1,
    "totalCount": 3,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Array/array2D_theory.html"
  },
  {
    "order": 30,
    "topic": "AVL TREE",
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 1,
    "totalCount": 3,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Trees/index.html"
  },
  {
    "order": 31,
    "topic": "CIRCULAR LINKED LIST",
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 1,
    "totalCount": 3,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Collection/LinkedList/index.html"
  },
  {
    "order": 32,
    "topic": "PRIORITY QUEUE",
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 1,
    "totalCount": 3,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Heap/index.html"
  },
  {
    "order": 33,
    "topic": "QUEUE",
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 1,
    "totalCount": 3,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Collection/Queue/index.html"
  },
  {
    "order": 34,
    "topic": "RED-BLACK TREE",
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 1,
    "totalCount": 3,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Trees/index.html"
  },
  {
    "order": 35,
    "topic": "STACK",
    "easyCount": 1,
    "mediumCount": 1,
    "hardCount": 1,
    "totalCount": 3,
    "suggestedSequence": "Complete Easy → Medium → Hard; review High-importance questions first.",
    "route": "Collection/Stack/index.html"
  }
];

  if (typeof window !== 'undefined') {
    window.TOPIC_ROADMAP = TOPIC_ROADMAP;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      TOPIC_ROADMAP
    };
  }
})(typeof window !== 'undefined' ? window : global);
