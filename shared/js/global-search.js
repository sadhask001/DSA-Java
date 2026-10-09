/**
 * DSA-Java Platform - Global Search Engine (Ctrl + K)
 * Accessible, keyboard-navigable spotlight modal indexing topics, visualizers, patterns, and verified problems.
 */

(function () {
  const SEARCH_ITEMS = [
    // Topics
    { title: "Complexity Analysis", type: "Topic", url: "Complexity/index.html", keywords: "big o time space asymptotic notation omega theta bounds" },
    { title: "1D Array Architecture", type: "Topic", url: "Array/index.html", keywords: "array memory ram index traversal access insert delete contiguous" },
    { title: "2D Matrix Theory", type: "Topic", url: "Array/array2D_theory.html", keywords: "matrix 2d multidimensional row column offset jagged row major" },
    { title: "ArrayList Internal Mechanics", type: "Topic", url: "Collection/ArrayList/index.html", keywords: "arraylist dynamic array resizing capacity size generics amortized" },
    { title: "Linked List (SLL, DLL, CLL)", type: "Topic", url: "Collection/LinkedList/index.html", keywords: "linked list singly doubly circular head node pointer cycle sentinel" },
    { title: "Stack Architecture", type: "Topic", url: "Collection/Stack/index.html", keywords: "stack lifo push pop peek parentheses infix postfix monotonic" },
    { title: "Queue & Deque Systems", type: "Topic", url: "Collection/Queue/index.html", keywords: "queue fifo enqueue dequeue circular priority deque ring buffer" },
    { title: "Hierarchical Trees & BST", type: "Topic", url: "Trees/index.html", keywords: "tree binary search bst avl traversal inorder preorder postorder balance" },
    { title: "Heap & PriorityQueue", type: "Topic", url: "Heap/index.html", keywords: "heap min max priority queue heapify heapsort complete binary binary heap" },
    { title: "Graphs & Network Topologies", type: "Topic", url: "Graph/index.html", keywords: "graph bfs dfs dijkstra shortest path adjacency matrix list topological cycle" },
    { title: "Hashing & HashMap Internals", type: "Topic", url: "Hashing/index.html", keywords: "hash hashing map collision chaining buckets load factor table open addressing" },
    { title: "Sorting Engines (Merge, Quick, Heap)", type: "Topic", url: "Sorting/index.html", keywords: "sorting bubble selection insertion merge quick heap count radix timsort" },
    { title: "Searching Routines", type: "Topic", url: "Searching/index.html", keywords: "searching linear binary jump interpolation exponential bounds lower upper" },
    { title: "Recursion & Backtracking", type: "Topic", url: "Recursion/index.html", keywords: "recursion backtracking call stack n queens sudoku subsets permutations" },
    { title: "Dynamic Programming", type: "Topic", url: "DP/index.html", keywords: "dp dynamic programming memoization tabulation knapsack fibonacci lcs lis state transition" },
    { title: "Greedy Algorithms", type: "Topic", url: "Greedy/index.html", keywords: "greedy interval scheduling activity selection huffman fractional knapsack optimal substructure" },
    { title: "String Algorithms", type: "Topic", url: "Strings/index.html", keywords: "strings kmp rabin karp rolling hash lps anagram palindrome trie suffix" },
    { title: "Bit Manipulation Mastery", type: "Topic", url: "BitManipulation/index.html", keywords: "bits bit manipulation xor and or not shift power of two mask hamming" },
    { title: "Algorithmic Patterns (10 Models)", type: "Topic", url: "Patterns/index.html", keywords: "patterns two pointers sliding window fast slow monotonic stack heaps prefix sum" },
    { title: "Problem Solving Frameworks (UMPIRE)", type: "Topic", url: "ProblemSolving/index.html", keywords: "problem solving umpire framework edge cases optimization communication interview rubric" },
    { title: "Interview Prep & Curated Sheets", type: "Topic", url: "InterviewPrep/index.html", keywords: "interview prep blind 75 neetcode 150 striver sde google amazon meta microsoft rubric" },
    
    // Visualizers
    { title: "Complexity Simulator", type: "Visualizer", url: "Complexity/visualizer.html", keywords: "complexity visualizer graph asymptotic curves runtime comparison" },
    { title: "1D Array Visualizer", type: "Visualizer", url: "Array/visualizer_array1D.html", keywords: "array visualizer insert delete search ram address contiguous layout" },
    { title: "2D Matrix Visualizer", type: "Visualizer", url: "Array/visualizer_array2D.html", keywords: "matrix visualizer 2d row column coordinate grid" },
    { title: "ArrayList Growth Engine", type: "Visualizer", url: "Collection/ArrayList/visualizer_arraylist.html", keywords: "arraylist visualizer capacity growth resize stack heap allocation" },
    { title: "Linked List Visualizer", type: "Visualizer", url: "Collection/LinkedList/visualizer_linkedlist.html", keywords: "linked list visualizer sll dll cll pointers node animation" },
    { title: "Stack Visualizer", type: "Visualizer", url: "Collection/Stack/visualizer_stack.html", keywords: "stack visualizer push pop expression conversion call stack" },
    { title: "Queue & Deque Visualizer", type: "Visualizer", url: "Collection/Queue/visualizer_queue.html", keywords: "queue visualizer circular priority deque front rear" },
    { title: "Binary Tree & BST Visualizer", type: "Visualizer", url: "Trees/visualizer_tree.html", keywords: "tree visualizer bst avl insert rotate traverse preorder inorder postorder" },
    { title: "Heap & PriorityQueue Visualizer", type: "Visualizer", url: "Heap/visualizer_heap.html", keywords: "heap visualizer priority queue heapify extract max min heap tree" },
    { title: "Graph Network Visualizer", type: "Visualizer", url: "Graph/visualizer_graph.html", keywords: "graph visualizer bfs dfs dijkstra path traversal vertices edges" },
    { title: "HashMap Engine Visualizer", type: "Visualizer", url: "Hashing/visualizer_hashmap.html", keywords: "hashmap visualizer hash buckets chaining linked list collisions" },
    { title: "Sorting Algorithms Visualizer", type: "Visualizer", url: "Sorting/visualizer_sorting.html", keywords: "sorting visualizer bubble selection insertion merge quick heap bars comparisons swaps" },
    { title: "Searching Algorithms Visualizer", type: "Visualizer", url: "Searching/visualizer_searching.html", keywords: "searching visualizer linear binary search bounds interval" },
    { title: "Recursion Stack Visualizer", type: "Visualizer", url: "Recursion/visualizer_recursion.html", keywords: "recursion visualizer call stack frames fibonacci factorial base case" },
    { title: "Dynamic Programming Visualizer", type: "Visualizer", url: "DP/visualizer_dp.html", keywords: "dp visualizer grid memoization knapsack coin change table lookup" },
    { title: "Greedy Algorithms Visualizer", type: "Visualizer", url: "Greedy/visualizer_greedy.html", keywords: "greedy visualizer intervals scheduling timeline choice" },
    { title: "String Algorithms Visualizer", type: "Visualizer", url: "Strings/visualizer_strings.html", keywords: "string visualizer kmp lps table pattern matching char window" },
    { title: "Bit Manipulation Visualizer", type: "Visualizer", url: "BitManipulation/visualizer_bits.html", keywords: "bit visualizer binary representation shifts gates masks twocomplement" },
    { title: "Algorithmic Patterns Visualizer", type: "Visualizer", url: "Patterns/visualizer_patterns.html", keywords: "patterns visualizer two pointers sliding window prefix sum cycle fast slow" }
  ];

  let activeResultIndex = -1;
  let currentResults = [];

  // Inject search modal markup if not already present
  function ensureSearchModal() {
    if (document.getElementById('global-search-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'global-search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Global Documentation & Problem Search');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(8, 11, 18, 0.82); backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 100000; display: none; justify-content: center; align-items: flex-start;
      padding-top: 80px; padding-bottom: 40px;
    `;

    modal.innerHTML = `
      <div id="global-search-card" style="
        background: #121622; border: 1px solid #252e42;
        border-radius: 14px; width: 640px; max-width: 92%;
        box-shadow: 0 20px 50px rgba(0,0,0,0.6); overflow: hidden;
        display: flex; flex-direction: column;
      " onclick="event.stopPropagation()">
        
        <div style="display:flex; align-items:center; padding:14px 18px; border-bottom:1px solid #1e2538; gap:12px;">
          <i class="fa-solid fa-magnifying-glass" style="color:#818cf8; font-size:15px;" aria-hidden="true"></i>
          <input type="text" id="global-search-input" aria-label="Search curriculum, visualizers, and problems" placeholder="Search topics, visualizers, problems... (ESC to close)" style="
            background: transparent; border: none; outline: none; color: #f8fafc;
            font-size: 14.5px; width: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          ">
          <button id="global-search-close-btn" aria-label="Close search" style="
            background: rgba(255,255,255,0.05); border: 1px solid #252e42; color: #94a3b8;
            border-radius: 5px; padding: 4px 8px; font-size: 11px; cursor: pointer; font-family: 'JetBrains Mono', monospace;
          ">ESC</button>
        </div>

        <div id="global-search-results" style="max-height: 420px; overflow-y: auto; padding: 10px;" role="listbox" aria-label="Search Results">
          <!-- Results injected dynamically -->
        </div>

        <div style="padding:10px 18px; background:#0b0f19; border-top:1px solid #1e2538; font-size:11.5px; color:#94a3b8; display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px;">
          <span><kbd style="background:#181f30; border:1px solid #252e42; padding:2px 5px; border-radius:3px; font-family:monospace; color:#cbd5e1;">&uarr;&darr;</kbd> Navigate &nbsp; <kbd style="background:#181f30; border:1px solid #252e42; padding:2px 5px; border-radius:3px; font-family:monospace; color:#cbd5e1;">ENTER</kbd> Select</span>
          <span>Shortcut: <kbd style="background:#181f30; border:1px solid #252e42; padding:2px 5px; border-radius:3px; font-family:monospace; color:#cbd5e1;">Ctrl + K</kbd></span>
        </div>
      </div>
    `;

    modal.addEventListener('click', closeSearchModal);
    document.body.appendChild(modal);

    const input = document.getElementById('global-search-input');
    input.addEventListener('input', handleSearchQuery);
    input.addEventListener('keydown', handleKeyNavigation);

    const closeBtn = document.getElementById('global-search-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeSearchModal);
  }

  function openSearchModal() {
    ensureSearchModal();
    const modal = document.getElementById('global-search-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Lock background scrolling
    const input = document.getElementById('global-search-input');
    input.value = '';
    activeResultIndex = -1;
    input.focus();
    renderResults(SEARCH_ITEMS.slice(0, 8));
  }

  function closeSearchModal() {
    const modal = document.getElementById('global-search-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Unlock background scrolling
    }
  }

  function handleSearchQuery(e) {
    const q = e.target.value.toLowerCase().trim();
    activeResultIndex = -1;

    if (!q) {
      renderResults(SEARCH_ITEMS.slice(0, 8));
      return;
    }

    // Combine static items with problem database if available
    let allItems = [...SEARCH_ITEMS];
    if (typeof window.PROBLEM_DATABASE !== 'undefined' && Array.isArray(window.PROBLEM_DATABASE)) {
      window.PROBLEM_DATABASE.forEach(p => {
        allItems.push({
          title: `${p.title}`,
          difficulty: p.difficulty,
          type: `Problem · ${p.topic}`,
          url: p.url,
          isExternal: true,
          keywords: `${p.title} ${p.pattern || ''} ${p.topic} ${p.difficulty} leetcode ${p.timeComplexity || ''}`
        });
      });
    }

    const matches = allItems.filter(item => {
      return item.title.toLowerCase().includes(q) ||
             item.type.toLowerCase().includes(q) ||
             item.keywords.toLowerCase().includes(q);
    });

    renderResults(matches.slice(0, 12));
  }

  function getPathPrefix() {
    let prefix = '';
    try {
      const scripts = document.getElementsByTagName('script');
      for (let s of scripts) {
        const srcAttr = s.getAttribute('src');
        if (srcAttr && srcAttr.includes('global-search.js')) {
          prefix = srcAttr.replace('shared/js/global-search.js', '');
          break;
        }
      }
    } catch (e) {
      prefix = '';
    }

    if (!prefix) {
      const p = window.location.pathname.replace(/\\/g, '/');
      if (p.includes('/Collection/ArrayList/') ||
          p.includes('/Collection/LinkedList/') ||
          p.includes('/Collection/Stack/') ||
          p.includes('/Collection/Queue/') ||
          p.includes('/Collection/Vector/')) {
        prefix = '../../';
      } else if (p.includes('/Array/') ||
                 p.includes('/BitManipulation/') ||
                 p.includes('/Collection/') ||
                 p.includes('/Complexity/') ||
                 p.includes('/DP/') ||
                 p.includes('/Graph/') ||
                 p.includes('/Greedy/') ||
                 p.includes('/Hashing/') ||
                 p.includes('/Heap/') ||
                 p.includes('/InterviewPrep/') ||
                 p.includes('/Patterns/') ||
                 p.includes('/ProblemSolving/') ||
                 p.includes('/Recursion/') ||
                 p.includes('/Searching/') ||
                 p.includes('/Sorting/') ||
                 p.includes('/Strings/') ||
                 p.includes('/Trees/')) {
        prefix = '../';
      }
    }
    return prefix;
  }

  function renderResults(items) {
    const container = document.getElementById('global-search-results');
    if (!container) return;
    currentResults = items;

    if (items.length === 0) {
      container.innerHTML = `<div style="padding:24px; text-align:center; color:#94a3b8; font-size:13px;">No matching topics or problems found. Try another query.</div>`;
      return;
    }

    const prefix = getPathPrefix();

    container.innerHTML = items.map((item, index) => {
      const finalUrl = item.isExternal ? item.url : (item.url.startsWith('http') ? item.url : prefix + item.url);
      const targetAttr = item.isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';      
      let typeBadge = '';
      if (item.type.includes('Problem')) {
        const diffColor = item.difficulty === 'Easy' ? '#10b981' : (item.difficulty === 'Medium' ? '#f59e0b' : '#ef4444');
        typeBadge = `<span style="font-size:11px; font-family:'JetBrains Mono', monospace; padding:2px 7px; border-radius:4px; color:${diffColor}; background:${diffColor}18; border:1px solid ${diffColor}33;">${item.type}</span>`;
      } else if (item.type === 'Visualizer') {
        typeBadge = `<span style="font-size:11px; font-family:'JetBrains Mono', monospace; padding:2px 7px; border-radius:4px; color:#f59e0b; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.25);"><i class="fa-solid fa-play" style="font-size:9px;"></i> Visualizer</span>`;
      } else {
        typeBadge = `<span style="font-size:11px; font-family:'JetBrains Mono', monospace; padding:2px 7px; border-radius:4px; color:#818cf8; background:rgba(99,102,241,0.12); border:1px solid rgba(99,102,241,0.25);">Topic</span>`;
      }

      return `
        <a href="${finalUrl}" ${targetAttr} class="search-result-row ${index === activeResultIndex ? 'active' : ''}" data-index="${index}" role="option" style="
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px; border-radius: 7px; text-decoration: none;
          color: #f1f5f9; font-size: 13.5px; transition: background 0.15s;
          margin-bottom: 3px; border: 1px solid transparent;
          background: ${index === activeResultIndex ? '#181f30' : 'transparent'};
        " onmouseover="window.__setSearchActiveIndex(${index})">
          <span style="font-weight: 500; display:flex; align-items:center; gap:8px;">
            ${item.isExternal ? '<i class="fa-solid fa-arrow-up-right-from-square" style="font-size:11px; color:#94a3b8;"></i>' : '<i class="fa-solid fa-file-code" style="font-size:12px; color:#818cf8;"></i>'}
            ${item.title}
          </span>
          ${typeBadge}
        </a>
      `;
    }).join('');
  }

  const rootSearch = typeof window !== 'undefined' ? window : global;
  rootSearch.__setSearchActiveIndex = function (index) {
    activeResultIndex = index;
    if (typeof document !== 'undefined') {
      const rows = document.querySelectorAll('.search-result-row');
      rows.forEach((r, i) => {
        r.style.background = i === index ? '#181f30' : 'transparent';
        r.style.borderColor = i === index ? '#252e42' : 'transparent';
      });
    }
  };

  function handleKeyNavigation(e) {
    if (currentResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeResultIndex = (activeResultIndex + 1) % currentResults.length;
      window.__setSearchActiveIndex(activeResultIndex);
      scrollToActive();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeResultIndex = (activeResultIndex - 1 + currentResults.length) % currentResults.length;
      window.__setSearchActiveIndex(activeResultIndex);
      scrollToActive();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeResultIndex >= 0 && activeResultIndex < currentResults.length) {
        const item = currentResults[activeResultIndex];
        const prefix = getPathPrefix();
        const finalUrl = item.isExternal ? item.url : (item.url.startsWith('http') ? item.url : prefix + item.url);
        if (item.isExternal) {
          window.open(finalUrl, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = finalUrl;
        }
        closeSearchModal();
      }
    }
  }

  function scrollToActive() {
    const rows = document.querySelectorAll('.search-result-row');
    if (rows[activeResultIndex]) {
      rows[activeResultIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  // Keyboard shortcut listener: Ctrl + K or Cmd + K or ESC
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const modal = document.getElementById('global-search-modal');
        if (modal && modal.style.display === 'flex') {
          closeSearchModal();
        } else {
          openSearchModal();
        }
      } else if (e.key === 'Escape') {
        closeSearchModal();
      }
    });

    window.openGlobalSearch = openSearchModal;
    window.closeGlobalSearch = closeSearchModal;
  }
})();
