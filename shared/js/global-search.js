/**
 * DSA-Java Platform - Global Search Engine (Ctrl + K)
 * Fast spotlight search modal indexing topics, visualizers, patterns, and verified problems.
 */

(function () {
  const SEARCH_ITEMS = [
    // Topics
    { title: "Complexity Analysis", type: "Topic", url: "Complexity/index.html", keywords: "big o time space asymptotic notation omega theta bounds" },
    { title: "1D Array Architecture", type: "Topic", url: "Array/index.html", keywords: "array memory ram index traversal access insert delete" },
    { title: "2D Matrix Theory", type: "Topic", url: "Array/array2D_theory.html", keywords: "matrix 2d multidimensional row column offset jagged" },
    { title: "ArrayList Internal Mechanics", type: "Topic", url: "Collection/ArrayList/index.html", keywords: "arraylist dynamic array resizing capacity size generics" },
    { title: "Linked List (SLL, DLL, CLL)", type: "Topic", url: "Collection/LinkedList/index.html", keywords: "linked list singly doubly circular head node pointer cycle" },
    { title: "Stack Architecture", type: "Topic", url: "Collection/Stack/index.html", keywords: "stack lifo push pop peek parentheses infix postfix" },
    { title: "Queue & Deque Systems", type: "Topic", url: "Collection/Queue/index.html", keywords: "queue fifo enqueue dequeue circular priority deque" },
    { title: "Hierarchical Trees & BST", type: "Topic", url: "Trees/index.html", keywords: "tree binary search bst avl traversal inorder preorder postorder" },
    { title: "Heap & PriorityQueue", type: "Topic", url: "Heap/index.html", keywords: "heap min max priority queue heapify heapsort complete binary" },
    { title: "Graphs & Network Topologies", type: "Topic", url: "Graph/index.html", keywords: "graph bfs dfs dijkstra shortest path adjacency matrix list topological" },
    { title: "Hashing & HashMap Internals", type: "Topic", url: "Hashing/index.html", keywords: "hash hashing map collision chaining buckets load factor table" },
    { title: "Sorting Engines (Merge, Quick, Heap)", type: "Topic", url: "Sorting/index.html", keywords: "sorting bubble selection insertion merge quick heap count radix" },
    { title: "Searching Routines", type: "Topic", url: "Searching/index.html", keywords: "searching linear binary jump interpolation exponential bounds" },
    { title: "Recursion & Backtracking", type: "Topic", url: "Recursion/index.html", keywords: "recursion backtracking call stack n queens sudoku subsets permutations" },
    { title: "Dynamic Programming", type: "Topic", url: "DP/index.html", keywords: "dp dynamic programming memoization tabulation knapsack fibonacci lcs lis" },
    { title: "Greedy Algorithms", type: "Topic", url: "Greedy/index.html", keywords: "greedy interval scheduling activity selection huffman fractional knapsack" },
    { title: "String Algorithms", type: "Topic", url: "Strings/index.html", keywords: "strings kmp rabin karp rolling hash lps anagram palindrome trie" },
    { title: "Bit Manipulation Mastery", type: "Topic", url: "BitManipulation/index.html", keywords: "bits bit manipulation xor and or not shift power of two mask" },
    { title: "Algorithmic Patterns (10 Models)", type: "Topic", url: "Patterns/index.html", keywords: "patterns two pointers sliding window fast slow monotonic stack heaps" },
    { title: "Problem Solving Frameworks (UMPIRE)", type: "Topic", url: "ProblemSolving/index.html", keywords: "problem solving umpire framework edge cases optimization communication" },
    { title: "Interview Prep & Curated Sheets", type: "Topic", url: "InterviewPrep/index.html", keywords: "interview prep blind 75 neetcode 150 striver sde google amazon meta" },
    
    // Visualizers
    { title: "Complexity Simulator", type: "Visualizer", url: "Complexity/visualizer.html", keywords: "complexity visualizer graph asymptotic curves" },
    { title: "1D Array Visualizer", type: "Visualizer", url: "Array/visualizer_array1D.html", keywords: "array visualizer insert delete search ram address" },
    { title: "2D Matrix Visualizer", type: "Visualizer", url: "Array/visualizer_array2D.html", keywords: "matrix visualizer 2d row column" },
    { title: "ArrayList Engine", type: "Visualizer", url: "Collection/ArrayList/visualizer_arraylist.html", keywords: "arraylist visualizer capacity growth resize stack heap" },
    { title: "Linked List Engine", type: "Visualizer", url: "Collection/LinkedList/visualizer_linkedlist.html", keywords: "linked list visualizer sll dll cll pointers" },
    { title: "Stack Visualizer", type: "Visualizer", url: "Collection/Stack/visualizer_stack.html", keywords: "stack visualizer push pop expression conversion" },
    { title: "Queue & Deque Visualizer", type: "Visualizer", url: "Collection/Queue/visualizer_queue.html", keywords: "queue visualizer circular priority deque" },
    { title: "Tree & BST Visualizer", type: "Visualizer", url: "Trees/visualizer_tree.html", keywords: "tree visualizer bst avl insert rotate traverse" },
    { title: "Heap & PriorityQueue Visualizer", type: "Visualizer", url: "Heap/visualizer_heap.html", keywords: "heap visualizer priority queue heapify extract max min" },
    { title: "Graph Visualizer", type: "Visualizer", url: "Graph/visualizer_graph.html", keywords: "graph visualizer bfs dfs dijkstra path" },
    { title: "HashMap Visualizer", type: "Visualizer", url: "Hashing/visualizer_hashmap.html", keywords: "hashmap visualizer hash buckets chaining linked list collisions" },
    { title: "Sorting Algorithms Visualizer", type: "Visualizer", url: "Sorting/visualizer_sorting.html", keywords: "sorting visualizer bubble selection insertion merge quick heap" },
    { title: "Searching Algorithms Visualizer", type: "Visualizer", url: "Searching/visualizer_searching.html", keywords: "searching visualizer linear binary search bounds" },
    { title: "Recursion Visualizer", type: "Visualizer", url: "Recursion/visualizer_recursion.html", keywords: "recursion visualizer call stack frames fibonacci factorial" },
    { title: "Dynamic Programming Visualizer", type: "Visualizer", url: "DP/visualizer_dp.html", keywords: "dp visualizer grid memoization knapsack coin change" },
    { title: "Greedy Algorithms Visualizer", type: "Visualizer", url: "Greedy/visualizer_greedy.html", keywords: "greedy visualizer intervals scheduling timeline" },
    { title: "String Algorithms Visualizer", type: "Visualizer", url: "Strings/visualizer_strings.html", keywords: "string visualizer kmp lps table pattern matching" },
    { title: "Bit Manipulation Visualizer", type: "Visualizer", url: "BitManipulation/visualizer_bits.html", keywords: "bit visualizer binary representation shifts gates" },
    { title: "Algorithmic Patterns Visualizer", type: "Visualizer", url: "Patterns/visualizer_patterns.html", keywords: "patterns visualizer two pointers sliding window prefix sum cycle" }
  ];

  // Inject search modal markup if not already present
  function ensureSearchModal() {
    if (document.getElementById('global-search-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'global-search-modal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(6, 5, 15, 0.85); backdrop-filter: blur(12px);
      z-index: 99999; display: none; justify-content: center; align-items: flex-start;
      padding-top: 100px;
    `;

    modal.innerHTML = `
      <div style="
        background: #110e28; border: 1px solid rgba(167, 139, 250, 0.3);
        border-radius: 18px; width: 620px; max-width: 92%;
        box-shadow: 0 25px 60px rgba(0,0,0,0.6); overflow: hidden;
      " onclick="event.stopPropagation()">
        
        <div style="display:flex; align-items:center; padding:16px 20px; border-bottom:1px solid rgba(255,255,255,0.06); gap:12px;">
          <i class="fa-solid fa-magnifying-glass" style="color:#A78BFA; font-size:16px;"></i>
          <input type="text" id="global-search-input" placeholder="Search topics, visualizers, problems... (Press ESC to close)" style="
            background: transparent; border: none; outline: none; color: #FFF;
            font-size: 15px; width: 100%; font-family: 'Poppins', sans-serif;
          ">
          <kbd style="background:rgba(255,255,255,0.08); padding:3px 8px; border-radius:6px; font-size:11px; color:#94A3B8; font-family:'JetBrains Mono';">ESC</kbd>
        </div>

        <div id="global-search-results" style="max-height: 400px; overflow-y: auto; padding: 12px;">
          <!-- Results injected here -->
        </div>

        <div style="padding:10px 20px; background:rgba(255,255,255,0.02); border-top:1px solid rgba(255,255,255,0.05); font-size:11px; color:#64748B; display:flex; justify-content:space-between;">
          <span>Navigation: <kbd>&uarr;&darr;</kbd> to navigate, <kbd>ENTER</kbd> to select</span>
          <span>Shortcut: <kbd>Ctrl + K</kbd></span>
        </div>
      </div>
    `;

    modal.addEventListener('click', closeSearchModal);
    document.body.appendChild(modal);

    const input = document.getElementById('global-search-input');
    input.addEventListener('input', handleSearchQuery);
  }

  function openSearchModal() {
    ensureSearchModal();
    const modal = document.getElementById('global-search-modal');
    modal.style.display = 'flex';
    const input = document.getElementById('global-search-input');
    input.value = '';
    input.focus();
    renderResults(SEARCH_ITEMS.slice(0, 7));
  }

  function closeSearchModal() {
    const modal = document.getElementById('global-search-modal');
    if (modal) modal.style.display = 'none';
  }

  function handleSearchQuery(e) {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      renderResults(SEARCH_ITEMS.slice(0, 7));
      return;
    }

    // Combine static items with problem database
    let allItems = [...SEARCH_ITEMS];
    if (typeof window.PROBLEM_DATABASE !== 'undefined') {
      window.PROBLEM_DATABASE.forEach(p => {
        allItems.push({
          title: `${p.title} (${p.difficulty})`,
          type: `Problem · ${p.topic}`,
          url: p.url,
          isExternal: true,
          keywords: `${p.title} ${p.pattern} ${p.topic} ${p.difficulty} leetcode`
        });
      });
    }

    const matches = allItems.filter(item => {
      return item.title.toLowerCase().includes(q) ||
             item.type.toLowerCase().includes(q) ||
             item.keywords.toLowerCase().includes(q);
    });

    renderResults(matches.slice(0, 10));
  }

  function renderResults(items) {
    const container = document.getElementById('global-search-results');
    if (!container) return;

    if (items.length === 0) {
      container.innerHTML = `<div style="padding:20px; text-align:center; color:#64748B; font-size:13px;">No matching results found.</div>`;
      return;
    }

    // Determine current root relative path dynamically
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

    // Fallback if not resolved
    if (!prefix) {
      if (window.location.pathname.includes('/Collection/ArrayList/') ||
          window.location.pathname.includes('/Collection/LinkedList/') ||
          window.location.pathname.includes('/Collection/Stack/') ||
          window.location.pathname.includes('/Collection/Queue/')) {
        prefix = '../../';
      } else if (window.location.pathname.includes('/') && !window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('DSA-Java/')) {
        prefix = '../';
      }
    }

    container.innerHTML = items.map(item => {
      const finalUrl = item.isExternal ? item.url : (item.url.startsWith('http') ? item.url : prefix + item.url);
      const targetAttr = item.isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
      const typeColor = item.type.includes('Problem') ? '#34D399' : (item.type === 'Visualizer' ? '#F59E0B' : '#A78BFA');

      return `
        <a href="${finalUrl}" ${targetAttr} class="search-result-row" style="
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px; border-radius: 8px; text-decoration: none;
          color: #E2E8F0; font-size: 13px; transition: all 0.2s;
          margin-bottom: 4px;
        " onmouseover="this.style.background='rgba(139,92,246,0.18)'" onmouseout="this.style.background='transparent'">
          <span style="font-weight: 500;">${item.title}</span>
          <span style="
            font-size: 10.5px; font-family: 'JetBrains Mono', monospace;
            padding: 2px 8px; border-radius: 4px; color: ${typeColor};
            background: ${typeColor}15; border: 1px solid ${typeColor}33;
          ">${item.type}</span>
        </a>
      `;
    }).join('');
  }

  // Keyboard listener: Ctrl + K or Cmd + K or ESC
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
})();
