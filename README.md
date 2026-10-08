# 🚀 DSA-Java — Interactive Data Structures & Algorithms Learning Platform

> A comprehensive, interactive, production-grade learning platform for mastering **Data Structures & Algorithms** using **Pure Java**, featuring an interactive learning roadmap inspired by [roadmap.sh](https://roadmap.sh/), 19 live step-by-step visualizers, 190+ verified LeetCode problems with progress tracking, and battle-tested interview frameworks.

[![Platform Status](https://img.shields.io/badge/Status-100%25%20Complete-brightgreen?style=for-the-badge)](index.html)
[![Visualizers](https://img.shields.io/badge/Visualizers-19%20Live%20Engines-blueviolet?style=for-the-badge)](InterviewPrep/index.html#visualizers-hub)
[![Verified Problems](https://img.shields.io/badge/Problems-190%2B%20LeetCode-amber?style=for-the-badge)](shared/js/problem-db.js)
[![Zero Dependency](https://img.shields.io/badge/Stack-Vanilla%20JS%20%7C%20CSS3%20%7C%20HTML5-cyan?style=for-the-badge)](index.html)

---

## 🌟 Platform Highlights

1. **Interactive Roadmap Homepage (`index.html`)**:
   - Visual step-by-step learning path connecting 20 sequential curriculum stations.
   - Real-time analytics dashboard tracking overall progress, Data Structures %, Algorithms %, and solved problems via `localStorage`.
   - Milestone checkpoints (Foundations, Linear Structures, Hierarchical, Algorithmic Mastery, Placement Ready).

2. **19 Live Interactive Algorithm Visualizers**:
   - Real animated executions with **Step Forward**, **Play/Pause**, **Reset**, **Custom Data Input**, and **Speed Control** sliders.
   - Synchronized line-by-line Java code highlighting and real-time state variable monitors.

3. **Curated Problem Database (`shared/js/problem-db.js`)**:
   - 190+ verified LeetCode problems categorized by topic, difficulty (Easy, Medium, Hard), algorithmic pattern, time/space complexity, and direct platform links.
   - Interactive checkboxes allowing students to mark problems solved and retain progress across browser sessions.

4. **Global Spotlight Search (`Ctrl + K`)**:
   - Instant fuzzy search modal indexing all platform topics, visualizers, and LeetCode problems with keyboard arrow navigation.

5. **Engineering Problem Solving Framework (`ProblemSolving/index.html`)**:
   - The industry-standard **UMPIRE Method** (Understand, Match, Plan, Implement, Review, Evaluate).
   - Universal Edge Case Diagnostic Matrix with an interactive real-time test vector audit tool.

6. **Interview Preparation Hub (`InterviewPrep/index.html`)**:
   - Curated problem tracks: **Blind 75**, **NeetCode 150**, and **Striver SDE Sheet**.
   - Company-specific interview playbooks for **Google**, **Amazon**, **Meta**, and **Microsoft**.
   - Interactive 6-point Technical Mock Interview Readiness Rubric.

---

## 🗺️ Master Curriculum & Interactive Modules

| # | Topic / Module | Theory & Implementation | Interactive Visualizer | Key Algorithmic Mechanics |
|---|----------------|--------------------------|------------------------|---------------------------|
| **01** | **Time & Space Complexity** | [Complexity Guide](Complexity/index.html) | [Complexity Simulator](Complexity/visualizer.html) | Asymptotic bounds ($O, \Omega, \Theta$), growth ladder, memory models |
| **02** | **1D & 2D Arrays** | [Array Theory](Array/index.html) & [2D Matrix](Array/array2D_theory.html) | [1D Visualizer](Array/visualizer_array1D.html) / [2D Visualizer](Array/visualizer_array2D.html) | Physical contiguous RAM addresses, cache locality, row-major offset |
| **03** | **ArrayList & Hierarchy** | [ArrayList Guide](Collection/ArrayList/index.html) | [ArrayList Engine](Collection/ArrayList/visualizer_arraylist.html) | Dynamic capacity doubling (1.5x), element shift overhead, memory allocations |
| **04** | **Linked Lists (SLL, DLL, CLL)** | [Linked List Notes](Collection/LinkedList/index.html) | [Linked List Engine](Collection/LinkedList/visualizer_linkedlist.html) | Pointer rewiring, in-place reversal, Floyd's cycle detection |
| **05** | **Stack Architecture** | [Stack Notes](Collection/Stack/index.html) | [Stack Visualizer](Collection/Stack/visualizer_stack.html) | LIFO semantics, recursion call stack frame push/pop, parentheses validation |
| **06** | **Queue & Deque Systems** | [Queue Notes](Collection/Queue/index.html) | [Queue Visualizer](Collection/Queue/visualizer_queue.html) | FIFO semantics, circular buffer wrap-around, sliding window deque |
| **07** | **Trees & BST** | [Tree Notes](Trees/index.html) | [Tree Visualizer](Trees/visualizer_tree.html) | Binary Tree traversals (Inorder, Preorder, Postorder, BFS), BST balancing |
| **08** | **Heap & PriorityQueue** | [Heap Notes](Heap/index.html) | [Heap Visualizer](Heap/visualizer_heap.html) | Complete binary tree in array, sift-up/down heapify in $O(N)$, HeapSort |
| **09** | **Graphs & Topologies** | [Graph Notes](Graph/index.html) | [Graph Visualizer](Graph/visualizer_graph.html) | Adjacency List/Matrix, BFS queue traversal, DFS recursive, Dijkstra |
| **10** | **Hashing & HashMaps** | [Hashing Notes](Hashing/index.html) | [HashMap Visualizer](Hashing/visualizer_hashmap.html) | Hash codes, bucket arrays, collision chaining, load factor rehashing |
| **11** | **Sorting Algorithms** | [Sorting Notes](Sorting/index.html) | [Sorting Engine](Sorting/visualizer_sorting.html) | Merge Sort, Quick Sort (partitioning), HeapSort, Insertion, Selection, Bubble |
| **12** | **Searching Routines** | [Searching Notes](Searching/index.html) | [Searching Engine](Searching/visualizer_searching.html) | Linear vs Binary Search, lower_bound, upper_bound, answer range search |
| **13** | **Recursion & Backtracking** | [Recursion Notes](Recursion/index.html) | [Recursion Visualizer](Recursion/visualizer_recursion.html) | Call stack frames, State Space Trees, N-Queens, Subsets, Permutations |
| **14** | **Dynamic Programming** | [DP Notes](DP/index.html) | [DP Grid Visualizer](DP/visualizer_dp.html) | Memoization vs Tabulation, Knapsack, Longest Common Subsequence (LCS) |
| **15** | **Greedy Algorithms** | [Greedy Notes](Greedy/index.html) | [Greedy Visualizer](Greedy/visualizer_greedy.html) | Exchange argument, Activity Selection, Interval Scheduling, Huffman Coding |
| **16** | **String Algorithms** | [Strings Notes](Strings/index.html) | [Strings Visualizer](Strings/visualizer_strings.html) | KMP prefix function (LPS array), Rabin-Karp polynomial rolling hash |
| **17** | **Bit Manipulation** | [Bits Notes](BitManipulation/index.html) | [Bits Visualizer](BitManipulation/visualizer_bits.html) | Bitwise gates, shifts, Brian Kernighan bit counter, bitmasks |
| **18** | **Algorithmic Patterns** | [Patterns Guide](Patterns/index.html) | [Patterns Visualizer](Patterns/visualizer_patterns.html) | 10 Canonical models (Two Pointers, Sliding Window, Prefix Sum, Fast/Slow) |
| **19** | **Problem Solving Frameworks** | [Framework Notes](ProblemSolving/index.html) | [Edge Case Diagnostic Tool](ProblemSolving/index.html#checker) | UMPIRE method, Edge Case Diagnostic Matrix, 45-min interview timeline |
| **20** | **Interview Prep & Curated Sheets** | [Interview Prep Hub](InterviewPrep/index.html) | [Visualizers Directory](InterviewPrep/index.html#visualizers-hub) | Blind 75, NeetCode 150, Striver SDE, Company Tracks (Google, Amazon, Meta) |

---

## 💻 Tech Stack & Architecture

- **Frontend:** Pure HTML5, Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Cyber Dark Glow Theme `#06050f`), Vanilla ES6+ JavaScript.
- **State Management:** Browser `localStorage` via [`shared/js/progress-manager.js`](shared/js/progress-manager.js).
- **Typography & Icons:** Google Fonts (`Poppins`, `JetBrains Mono`), FontAwesome 6.6.0.
- **Portability:** Zero runtime dependencies, zero build step. Fully compatible with **GitHub Pages** or direct local offline browsing by double-clicking `index.html`.

---

## 🏃 Quick Start / How to Run

### Method 1: Local Offline Browsing
Simply double click `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

### Method 2: Local HTTP Server (Optional)
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```
Then open `http://localhost:8000` in your browser.

---

## 🚀 GitHub Pages Deployment

This repository is pre-configured for GitHub Pages:
1. Push this repository to GitHub.
2. In your repository settings, navigate to **Settings** &rarr; **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**.
4. Choose branch `main` (or `master`) and folder `/(root)`.
5. Click **Save**. The interactive platform will be live globally in seconds!

---

## 👨‍💻 Author & Credits

- **Curriculum Architecture & Engineering:** Built with precision for aspiring and senior software engineers preparing for Tier-1 and FAANG technical interviews.
- © 2026 DSA-Java Platform. All rights reserved.