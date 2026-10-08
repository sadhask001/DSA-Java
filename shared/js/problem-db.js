/**
 * DSA-Java Platform - Comprehensive Verified Problem Database
 * Real LeetCode & GeeksforGeeks problems with verified URLs, patterns, and asymptotic complexities.
 */

const PROBLEM_DATABASE = [
  // ================= COMPLEXITY =================
  {
    id: "lc-704",
    title: "Binary Search",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Complexity",
    pattern: "Binary Search",
    url: "https://leetcode.com/problems/binary-search/",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    description: "Search for target value in a sorted integer array in logarithmic time."
  },
  {
    id: "lc-1",
    title: "Two Sum",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Complexity",
    pattern: "Hashing / Two Pointers",
    url: "https://leetcode.com/problems/two-sum/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Find indices of two numbers that add up to target. Compare O(n²) brute force vs O(n) hash map."
  },
  {
    id: "lc-217",
    title: "Contains Duplicate",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Complexity",
    pattern: "Hashing / Sorting",
    url: "https://leetcode.com/problems/contains-duplicate/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Check for duplicates. Compare O(n²) nested loop vs O(n log n) sorting vs O(n) HashSet."
  },
  {
    id: "lc-53",
    title: "Maximum Subarray",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Complexity",
    pattern: "Kadane's Algorithm / DP",
    url: "https://leetcode.com/problems/maximum-subarray/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find maximum subarray sum. Demonstrates reduction from O(n³) brute force to O(n) Kadane's algorithm."
  },
  {
    id: "lc-509",
    title: "Fibonacci Number",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Complexity",
    pattern: "Recursion / DP",
    url: "https://leetcode.com/problems/fibonacci-number/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Calculate F(n). Classic O(2ⁿ) naive recursion optimized to O(n) DP and O(1) space."
  },
  {
    id: "lc-46",
    title: "Permutations",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Complexity",
    pattern: "Backtracking",
    url: "https://leetcode.com/problems/permutations/",
    timeComplexity: "O(n! * n)",
    spaceComplexity: "O(n)",
    description: "Generate all permutations of distinct integers. Canonical O(n!) factorial complexity example."
  },

  // ================= ARRAYS =================
  {
    id: "lc-121",
    title: "Best Time to Buy and Sell Stock",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Arrays",
    pattern: "Sliding Window / Greedy",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Maximize single transaction profit by tracking min price and max profit in one pass."
  },
  {
    id: "lc-26",
    title: "Remove Duplicates from Sorted Array",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Arrays",
    pattern: "Two Pointers",
    url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Remove duplicate values in-place such that each unique element appears once."
  },
  {
    id: "lc-189",
    title: "Rotate Array",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Arrays",
    pattern: "Array Manipulation",
    url: "https://leetcode.com/problems/rotate-array/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Rotate the array to the right by k steps in-place using 3 reverse passes."
  },
  {
    id: "lc-88",
    title: "Merge Sorted Array",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Arrays",
    pattern: "Two Pointers",
    url: "https://leetcode.com/problems/merge-sorted-array/",
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    description: "Merge two sorted arrays in-place starting from the back to avoid shifting."
  },
  {
    id: "lc-283",
    title: "Move Zeroes",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Arrays",
    pattern: "Two Pointers",
    url: "https://leetcode.com/problems/move-zeroes/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Move all 0's to the end of array while maintaining relative order of non-zero elements."
  },
  {
    id: "lc-238",
    title: "Product of Array Except Self",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Arrays",
    pattern: "Prefix & Suffix Array",
    url: "https://leetcode.com/problems/product-of-array-except-self/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Compute product of all elements except current without using the division operator."
  },
  {
    id: "lc-169",
    title: "Majority Element",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Arrays",
    pattern: "Boyer-Moore Voting",
    url: "https://leetcode.com/problems/majority-element/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find the element appearing more than n/2 times using Boyer-Moore Voting algorithm."
  },
  {
    id: "lc-268",
    title: "Missing Number",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Arrays",
    pattern: "Bit Manipulation / Gauss Sum",
    url: "https://leetcode.com/problems/missing-number/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find the missing number in range [0, n] using Gauss summation or XOR."
  },

  // ================= ARRAYLIST =================
  {
    id: "lc-118",
    title: "Pascal's Triangle",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "ArrayList",
    pattern: "2D Dynamic Array",
    url: "https://leetcode.com/problems/pascals-triangle/",
    timeComplexity: "O(numRows²)",
    spaceComplexity: "O(numRows²)",
    description: "Generate Pascal's triangle rows dynamically using List<List<Integer>>."
  },
  {
    id: "lc-119",
    title: "Pascal's Triangle II",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "ArrayList",
    pattern: "Dynamic Array Optimization",
    url: "https://leetcode.com/problems/pascals-triangle-ii/",
    timeComplexity: "O(k²)",
    spaceComplexity: "O(k)",
    description: "Return the kth row of Pascal's triangle optimizing memory to a single List."
  },
  {
    id: "lc-56",
    title: "Merge Intervals",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "ArrayList",
    pattern: "Sorting / Interval Merging",
    url: "https://leetcode.com/problems/merge-intervals/",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Merge overlapping intervals using dynamic lists and custom sorting."
  },

  // ================= LINKED LIST =================
  {
    id: "lc-206",
    title: "Reverse Linked List",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "In-place Reversal",
    url: "https://leetcode.com/problems/reverse-linked-list/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Reverse a singly linked list iteratively and recursively."
  },
  {
    id: "lc-21",
    title: "Merge Two Sorted Lists",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "Two Pointers",
    url: "https://leetcode.com/problems/merge-two-sorted-lists/",
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(1)",
    description: "Merge two sorted linked lists into one sorted list using dummy head."
  },
  {
    id: "lc-141",
    title: "Linked List Cycle",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "Fast & Slow Pointers (Floyd's)",
    url: "https://leetcode.com/problems/linked-list-cycle/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Detect cycle in linked list using Tortoise and Hare algorithm."
  },
  {
    id: "lc-19",
    title: "Remove Nth Node From End of List",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Linked List",
    pattern: "Two Pointers (Fast & Slow)",
    url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Remove nth node from end in a single pass with two pointers separated by n steps."
  },
  {
    id: "lc-876",
    title: "Middle of the Linked List",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "Fast & Slow Pointers",
    url: "https://leetcode.com/problems/middle-of-the-linked-list/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find the middle node using slow pointer moving 1 step and fast pointer moving 2 steps."
  },
  {
    id: "lc-234",
    title: "Palindrome Linked List",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "Fast & Slow + In-place Reversal",
    url: "https://leetcode.com/problems/palindrome-linked-list/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Check if list is palindrome by reversing the second half and comparing."
  },
  {
    id: "lc-160",
    title: "Intersection of Two Linked Lists",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Linked List",
    pattern: "Two Pointers Length Alignment",
    url: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(1)",
    description: "Find node where two singly linked lists intersect using dual pointer switching."
  },
  {
    id: "lc-2",
    title: "Add Two Numbers",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Linked List",
    pattern: "Pointer Traversal with Carry",
    url: "https://leetcode.com/problems/add-two-numbers/",
    timeComplexity: "O(max(n, m))",
    spaceComplexity: "O(max(n, m))",
    description: "Add two numbers represented by linked lists in reverse order digit-by-digit."
  },

  // ================= STACK =================
  {
    id: "lc-20",
    title: "Valid Parentheses",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Stack",
    pattern: "Stack Matching",
    url: "https://leetcode.com/problems/valid-parentheses/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Determine if parentheses string is valid using LIFO stack balance checking."
  },
  {
    id: "lc-155",
    title: "Min Stack",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Stack",
    pattern: "Dual Stack / Encoded Value",
    url: "https://leetcode.com/problems/min-stack/",
    timeComplexity: "O(1) all ops",
    spaceComplexity: "O(n)",
    description: "Design stack retrieving minimum element in constant O(1) time."
  },
  {
    id: "lc-150",
    title: "Evaluate Reverse Polish Notation",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Stack",
    pattern: "Postfix Expression Evaluation",
    url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Evaluate arithmetic value in Reverse Polish Notation using an operand stack."
  },
  {
    id: "lc-739",
    title: "Daily Temperatures",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Stack",
    pattern: "Monotonic Stack",
    url: "https://leetcode.com/problems/daily-temperatures/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Find number of days to wait for a warmer temperature using monotonic decreasing stack."
  },
  {
    id: "lc-84",
    title: "Largest Rectangle in Histogram",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Stack",
    pattern: "Monotonic Stack",
    url: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Find largest rectangle area in histogram using monotonic increasing stack."
  },

  // ================= QUEUE =================
  {
    id: "lc-225",
    title: "Implement Stack using Queues",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Queue",
    pattern: "Queue Manipulation",
    url: "https://leetcode.com/problems/implement-stack-using-queues/",
    timeComplexity: "Push O(n), Pop O(1)",
    spaceComplexity: "O(n)",
    description: "Implement LIFO stack using FIFO queues."
  },
  {
    id: "lc-232",
    title: "Implement Queue using Stacks",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Queue",
    pattern: "Dual Stack Amortization",
    url: "https://leetcode.com/problems/implement-queue-using-stacks/",
    timeComplexity: "Amortized O(1)",
    spaceComplexity: "O(n)",
    description: "Implement FIFO queue using two stacks with in/out buffer transfer."
  },
  {
    id: "lc-239",
    title: "Sliding Window Maximum",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Queue",
    pattern: "Monotonic Deque",
    url: "https://leetcode.com/problems/sliding-window-maximum/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    description: "Find max element in each sliding window of size k using monotonic double-ended queue."
  },

  // ================= TREES =================
  {
    id: "lc-94",
    title: "Binary Tree Inorder Traversal",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Trees",
    pattern: "Tree Traversal",
    url: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "Traverse tree in Inorder (Left, Root, Right) recursively and iteratively."
  },
  {
    id: "lc-102",
    title: "Binary Tree Level Order Traversal",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Trees",
    pattern: "BFS Traversal",
    url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Return level-by-level node values using queue BFS."
  },
  {
    id: "lc-104",
    title: "Maximum Depth of Binary Tree",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Trees",
    pattern: "DFS Tree Height",
    url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "Find number of nodes along longest root-to-leaf path using 1 + max(left, right)."
  },
  {
    id: "lc-543",
    title: "Diameter of Binary Tree",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Trees",
    pattern: "DFS Bottom-Up",
    url: "https://leetcode.com/problems/diameter-of-binary-tree/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "Find length of longest path between any two nodes updating max(left + right)."
  },
  {
    id: "lc-226",
    title: "Invert / Mirror Binary Tree",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Trees",
    pattern: "Tree Transformation",
    url: "https://leetcode.com/problems/invert-binary-tree/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "Invert binary tree by swapping left and right subtrees recursively."
  },
  {
    id: "lc-236",
    title: "Lowest Common Ancestor of Binary Tree",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Trees",
    pattern: "DFS Lowest Common Ancestor",
    url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "Find lowest common ancestor of two nodes in binary tree."
  },

  // ================= BINARY SEARCH TREE (BST) =================
  {
    id: "lc-700",
    title: "Search in a Binary Search Tree",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "BST",
    pattern: "BST Search",
    url: "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    timeComplexity: "O(h)",
    spaceComplexity: "O(h)",
    description: "Find node in BST where node.val == target utilizing BST property."
  },
  {
    id: "lc-701",
    title: "Insert into a Binary Search Tree",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "BST",
    pattern: "BST Insertion",
    url: "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
    timeComplexity: "O(h)",
    spaceComplexity: "O(h)",
    description: "Insert new value into BST maintaining ordering properties."
  },
  {
    id: "lc-450",
    title: "Delete Node in a BST",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "BST",
    pattern: "BST Deletion with Successor",
    url: "https://leetcode.com/problems/delete-node-in-a-bst/",
    timeComplexity: "O(h)",
    spaceComplexity: "O(h)",
    description: "Delete node from BST handling 3 cases: leaf, 1 child, and 2 children via inorder successor."
  },
  {
    id: "lc-98",
    title: "Validate Binary Search Tree",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "BST",
    pattern: "Range Bounds Checking",
    url: "https://leetcode.com/problems/validate-binary-search-tree/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "Validate BST using min/max range boundaries (low < node.val < high)."
  },
  {
    id: "lc-230",
    title: "Kth Smallest Element in a BST",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "BST",
    pattern: "Inorder Traversal",
    url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    timeComplexity: "O(h + k)",
    spaceComplexity: "O(h)",
    description: "Find kth smallest element by leveraging BST inorder sorted traversal."
  },

  // ================= HEAP =================
  {
    id: "lc-215",
    title: "Kth Largest Element in an Array",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Heap",
    pattern: "Min Heap of Size K / Quickselect",
    url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    description: "Find kth largest element using min-heap priority queue maintaining k top elements."
  },
  {
    id: "lc-347",
    title: "Top K Frequent Elements",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Heap",
    pattern: "Frequency Map + Min Heap",
    url: "https://leetcode.com/problems/top-k-frequent-elements/",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(n + k)",
    description: "Return k most frequent elements using frequency map and min-heap."
  },
  {
    id: "lc-295",
    title: "Find Median from Data Stream",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Heap",
    pattern: "Two Heaps (Max Heap & Min Heap)",
    url: "https://leetcode.com/problems/find-median-from-data-stream/",
    timeComplexity: "Add O(log n), Median O(1)",
    spaceComplexity: "O(n)",
    description: "Maintain rolling median using max-heap for lower half and min-heap for upper half."
  },

  // ================= GRAPH =================
  {
    id: "lc-200",
    title: "Number of Islands",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Graph",
    pattern: "Grid DFS / BFS",
    url: "https://leetcode.com/problems/number-of-islands/",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    description: "Count number of connected 1s islands using 4-directional DFS grid flooding."
  },
  {
    id: "lc-133",
    title: "Clone Graph",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Graph",
    pattern: "DFS / BFS with HashMap",
    url: "https://leetcode.com/problems/clone-graph/",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    description: "Deep clone undirected graph using node map tracking visited vertices."
  },
  {
    id: "lc-207",
    title: "Course Schedule (Cycle Detection)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Graph",
    pattern: "Topological Sort / Kahn's Algo",
    url: "https://leetcode.com/problems/course-schedule/",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    description: "Detect cycle in directed prerequisites graph using Kahn's in-degree BFS."
  },
  {
    id: "lc-743",
    title: "Network Delay Time",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Graph",
    pattern: "Dijkstra's Shortest Path",
    url: "https://leetcode.com/problems/network-delay-time/",
    timeComplexity: "O(E log V)",
    spaceComplexity: "O(V + E)",
    description: "Calculate time for all nodes to receive signal using Dijkstra's with PriorityQueue."
  },

  // ================= HASHING =================
  {
    id: "lc-1-h",
    title: "Two Sum",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Hashing",
    pattern: "Hash Map Complement Lookup",
    url: "https://leetcode.com/problems/two-sum/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Store complement (target - num) in HashMap for O(1) instantaneous lookup."
  },
  {
    id: "lc-217-h",
    title: "Contains Duplicate",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Hashing",
    pattern: "HashSet Membership",
    url: "https://leetcode.com/problems/contains-duplicate/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Insert elements into HashSet; detect duplicates when set.add() returns false."
  },
  {
    id: "lc-49",
    title: "Group Anagrams",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Hashing",
    pattern: "Sorted Key / Frequency Hash",
    url: "https://leetcode.com/problems/group-anagrams/",
    timeComplexity: "O(n * k log k)",
    spaceComplexity: "O(n * k)",
    description: "Group strings by sorting characters as a canonical HashMap key."
  },
  {
    id: "lc-128",
    title: "Longest Consecutive Sequence",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Hashing",
    pattern: "HashSet Sequence Expansion",
    url: "https://leetcode.com/problems/longest-consecutive-sequence/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Identify streak starters (where num - 1 is absent) and count consecutive integers in O(n) total time."
  },
  {
    id: "lc-560",
    title: "Subarray Sum Equals K",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Hashing",
    pattern: "Prefix Sum + Frequency Map",
    url: "https://leetcode.com/problems/subarray-sum-equals-k/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Track cumulative prefix sum frequencies to count subarrays summing to k in a single pass."
  },
  {
    id: "lc-242",
    title: "Valid Anagram",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Hashing",
    pattern: "Frequency Array / Map",
    url: "https://leetcode.com/problems/valid-anagram/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Count character frequencies across both strings using an integer frequency table."
  },
  {
    id: "lc-454",
    title: "4Sum II",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Hashing",
    pattern: "Two-Sum HashMap Decomposition",
    url: "https://leetcode.com/problems/4sum-ii/",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n²)",
    description: "Store pairwise sums of A and B in HashMap, then query negations -(c + d) from C and D."
  },
  {
    id: "lc-380",
    title: "Insert Delete GetRandom O(1)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Hashing",
    pattern: "HashMap + Dynamic Array Swap",
    url: "https://leetcode.com/problems/insert-delete-getrandom-o1/",
    timeComplexity: "O(1) all ops",
    spaceComplexity: "O(n)",
    description: "Achieve O(1) random access via ArrayList and O(1) removal by swapping target with the last element."
  },
  {
    id: "lc-387",
    title: "First Unique Character in a String",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Hashing",
    pattern: "Two-Pass Frequency Counting",
    url: "https://leetcode.com/problems/first-unique-character-in-a-string/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Count frequencies in pass 1; return the index of the first character with frequency 1 in pass 2."
  },
  {
    id: "lc-205",
    title: "Isomorphic Strings",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Hashing",
    pattern: "Bijective Character Mapping",
    url: "https://leetcode.com/problems/isomorphic-strings/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Ensure 1-to-1 two-way bijection mapping between characters of both strings."
  },

  // ================= SORTING =================
  {
    id: "lc-912",
    title: "Sort an Array",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Sorting",
    pattern: "Merge Sort / Quick Sort / Heap Sort",
    url: "https://leetcode.com/problems/sort-an-array/",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Sort array with O(n log n) time complexity without built-in library functions."
  },
  {
    id: "lc-75",
    title: "Sort Colors (Dutch National Flag)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Sorting",
    pattern: "Three-way Partitioning",
    url: "https://leetcode.com/problems/sort-colors/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Sort 0s, 1s, and 2s in a single pass using low, mid, and high pointers."
  },
  {
    id: "lc-215-sort",
    title: "Kth Largest Element in an Array",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Sorting",
    pattern: "Quickselect / Heap Sort",
    url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    timeComplexity: "O(n) avg, O(n log n) worst",
    spaceComplexity: "O(1)",
    description: "Find the kth largest element using Lomuto or Hoare Quickselect partitioning."
  },
  {
    id: "lc-56-sort",
    title: "Merge Intervals",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Sorting",
    pattern: "Interval Sorting by Start Time",
    url: "https://leetcode.com/problems/merge-intervals/",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Sort intervals by start coordinate and merge overlapping boundaries sequentially."
  },
  {
    id: "lc-347-sort",
    title: "Top K Frequent Elements",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Sorting",
    pattern: "Bucket Sort / Frequency Count",
    url: "https://leetcode.com/problems/top-k-frequent-elements/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Sort elements by frequency using an O(n) bucket array indexed by frequency counts."
  },
  {
    id: "lc-147",
    title: "Insertion Sort List",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Sorting",
    pattern: "Linked List Insertion Sort",
    url: "https://leetcode.com/problems/insertion-sort-list/",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Sort a singly linked list using insertion sort with dummy head traversal."
  },
  {
    id: "lc-148",
    title: "Sort List (Merge Sort on Linked List)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Sorting",
    pattern: "Divide & Conquer Merge Sort",
    url: "https://leetcode.com/problems/sort-list/",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n) / O(1)",
    description: "Sort linked list in O(n log n) time using fast/slow pointer split and sorted merge."
  },
  {
    id: "lc-169-sort",
    title: "Majority Element",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Sorting",
    pattern: "Median Property / Boyer-Moore",
    url: "https://leetcode.com/problems/majority-element/",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    description: "In a sorted array, the majority element (> n/2 occurrences) always sits at index n/2."
  },
  {
    id: "lc-179",
    title: "Largest Number",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Sorting",
    pattern: "Custom Comparator Sorting",
    url: "https://leetcode.com/problems/largest-number/",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Sort string integers using custom comparator: (s2 + s1).compareTo(s1 + s2)."
  },
  {
    id: "lc-164",
    title: "Maximum Gap",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Sorting",
    pattern: "Bucket Sort / Radix Sort",
    url: "https://leetcode.com/problems/maximum-gap/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Find maximum difference between successive elements in sorted form in linear O(n) time."
  },

  // ================= SEARCHING =================
  {
    id: "lc-704-s",
    title: "Binary Search",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Searching",
    pattern: "Standard Binary Search",
    url: "https://leetcode.com/problems/binary-search/",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    description: "Canonical binary search dividing search space in half with low <= high bounds."
  },
  {
    id: "lc-33",
    title: "Search in Rotated Sorted Array",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Searching",
    pattern: "Modified Binary Search",
    url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    description: "Search target in rotated sorted array identifying sorted half at each step."
  },
  {
    id: "lc-153",
    title: "Find Minimum in Rotated Sorted Array",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Searching",
    pattern: "Binary Search Inflection Point",
    url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    description: "Find minimum element in rotated array comparing mid against right bound."
  },
  {
    id: "lc-875",
    title: "Koko Eating Bananas",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Searching",
    pattern: "Binary Search on Answer",
    url: "https://leetcode.com/problems/koko-eating-bananas/",
    timeComplexity: "O(n log(max))",
    spaceComplexity: "O(1)",
    description: "Find minimum eating speed k using binary search on answer range [1, maxPile]."
  },
  {
    id: "lc-162",
    title: "Find Peak Element",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Searching",
    pattern: "Binary Search on Gradient",
    url: "https://leetcode.com/problems/find-peak-element/",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    description: "Locate any local peak element by climbing the ascending slope via binary search."
  },
  {
    id: "lc-74",
    title: "Search a 2D Matrix",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Searching",
    pattern: "Virtual 1D Binary Search",
    url: "https://leetcode.com/problems/search-a-2d-matrix/",
    timeComplexity: "O(log(m * n))",
    spaceComplexity: "O(1)",
    description: "Treat row-major sorted 2D matrix as a virtual 1D array using row = mid / n, col = mid % n."
  },
  {
    id: "lc-240",
    title: "Search a 2D Matrix II",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Searching",
    pattern: "Top-Right / Bottom-Left Pruning",
    url: "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    description: "Step through matrix starting from top-right corner, pruning rows and columns in O(m + n)."
  },
  {
    id: "lc-1011",
    title: "Capacity To Ship Packages Within D Days",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Searching",
    pattern: "Binary Search on Monotonic Predicate",
    url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    timeComplexity: "O(n log(sum))",
    spaceComplexity: "O(1)",
    description: "Find minimum ship conveyor capacity within D days using monotonic predicate binary search."
  },
  {
    id: "lc-4",
    title: "Median of Two Sorted Arrays",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Searching",
    pattern: "Binary Search on Partition Cut",
    url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    timeComplexity: "O(log(min(m, n)))",
    spaceComplexity: "O(1)",
    description: "Partition both sorted arrays such that left half and right half are equal size and valid."
  },
  {
    id: "lc-278",
    title: "First Bad Version",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Searching",
    pattern: "Binary Search Boundary",
    url: "https://leetcode.com/problems/first-bad-version/",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    description: "Find the boundary where boolean API transitions from false to true minimizing API calls."
  },

  // ================= DYNAMIC PROGRAMMING =================
  {
    id: "lc-70",
    title: "Climbing Stairs",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "DP",
    pattern: "1D DP / Fibonacci",
    url: "https://leetcode.com/problems/climbing-stairs/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Count distinct ways to reach top using dp[i] = dp[i-1] + dp[i-2]."
  },
  {
    id: "lc-198",
    title: "House Robber",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "DP",
    pattern: "Linear DP (Include / Exclude)",
    url: "https://leetcode.com/problems/house-robber/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Maximize robbed amount without robbing adjacent houses: max(rob, skip)."
  },
  {
    id: "lc-322",
    title: "Coin Change",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "DP",
    pattern: "Unbounded Knapsack DP",
    url: "https://leetcode.com/problems/coin-change/",
    timeComplexity: "O(amount * coins)",
    spaceComplexity: "O(amount)",
    description: "Find minimum coins needed to make up amount using 1D tabulation."
  },
  {
    id: "lc-300",
    title: "Longest Increasing Subsequence (LIS)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "DP",
    pattern: "DP with Binary Search / Patience Sort",
    url: "https://leetcode.com/problems/longest-increasing-subsequence/",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Find longest strictly increasing subsequence using binary search tails array."
  },
  {
    id: "lc-1143",
    title: "Longest Common Subsequence (LCS)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "DP",
    pattern: "2D Grid DP",
    url: "https://leetcode.com/problems/longest-common-subsequence/",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    description: "Find longest common subsequence between two strings using 2D matrix DP."
  },
  {
    id: "lc-416",
    title: "Partition Equal Subset Sum (0/1 Knapsack)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "DP",
    pattern: "0/1 Knapsack DP",
    url: "https://leetcode.com/problems/partition-equal-subset-sum/",
    timeComplexity: "O(n * target)",
    spaceComplexity: "O(target)",
    description: "Determine if array can be partitioned into two subsets with equal sum via 0/1 knapsack."
  },
  {
    id: "lc-72",
    title: "Edit Distance (Levenshtein Distance)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "DP",
    pattern: "2D String Transformation DP",
    url: "https://leetcode.com/problems/edit-distance/",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    description: "Find minimum operations (insert, delete, replace) to convert word1 to word2."
  },
  {
    id: "lc-139",
    title: "Word Break",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "DP",
    pattern: "1D String Partition DP",
    url: "https://leetcode.com/problems/word-break/",
    timeComplexity: "O(n² * k)",
    spaceComplexity: "O(n)",
    description: "Determine if string can be segmented into space-separated dictionary words."
  },
  {
    id: "lc-62",
    title: "Unique Paths",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "DP",
    pattern: "2D Grid Path Counting DP",
    url: "https://leetcode.com/problems/unique-paths/",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(n)",
    description: "Count total unique paths from top-left to bottom-right of m x n grid using dp[r][c] = dp[r-1][c] + dp[r][c-1]."
  },
  {
    id: "lc-53-dp",
    title: "Maximum Subarray (Kadane's DP)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "DP",
    pattern: "Kadane's Optimal Substructure",
    url: "https://leetcode.com/problems/maximum-subarray/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find largest contiguous subarray sum via max(nums[i], current_sum + nums[i])."
  },

  // ================= BACKTRACKING & RECURSION =================
  {
    id: "lc-78",
    title: "Subsets (Power Set)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Backtracking",
    pattern: "Combinatorial Backtracking",
    url: "https://leetcode.com/problems/subsets/",
    timeComplexity: "O(2ⁿ * n)",
    spaceComplexity: "O(n)",
    description: "Generate all 2ⁿ possible subsets of distinct integers using choose/explore/unchoose."
  },
  {
    id: "lc-90",
    title: "Subsets II (Handling Duplicates)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Backtracking",
    pattern: "Sorting + Duplicate Pruning",
    url: "https://leetcode.com/problems/subsets-ii/",
    timeComplexity: "O(2ⁿ * n)",
    spaceComplexity: "O(n)",
    description: "Generate subsets for collection with duplicates by sorting and skipping identical adjacent candidates."
  },
  {
    id: "lc-46-bt",
    title: "Permutations",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Backtracking",
    pattern: "State Tree Traversal",
    url: "https://leetcode.com/problems/permutations/",
    timeComplexity: "O(n! * n)",
    spaceComplexity: "O(n)",
    description: "Generate all n! permutations of distinct integers tracking visited elements with boolean array."
  },
  {
    id: "lc-47",
    title: "Permutations II (With Duplicates)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Backtracking",
    pattern: "Sorting + Duplicate Pruning",
    url: "https://leetcode.com/problems/permutations-ii/",
    timeComplexity: "O(n! * n)",
    spaceComplexity: "O(n)",
    description: "Generate unique permutations skipping duplicate elements when previous duplicate is unvisited."
  },
  {
    id: "lc-39",
    title: "Combination Sum",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Backtracking",
    pattern: "Unbounded Combinatorial Backtracking",
    url: "https://leetcode.com/problems/combination-sum/",
    timeComplexity: "O(2^target)",
    spaceComplexity: "O(target)",
    description: "Find all unique combinations adding to target where candidate numbers can be picked repeatedly."
  },
  {
    id: "lc-40",
    title: "Combination Sum II",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Backtracking",
    pattern: "Bounded Backtracking + Pruning",
    url: "https://leetcode.com/problems/combination-sum-ii/",
    timeComplexity: "O(2ⁿ)",
    spaceComplexity: "O(n)",
    description: "Find all unique combinations where each number is used at most once, pruning duplicate tree branches."
  },
  {
    id: "lc-51",
    title: "N-Queens",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Backtracking",
    pattern: "Diagonal & Column Bitmask Pruning",
    url: "https://leetcode.com/problems/n-queens/",
    timeComplexity: "O(n!)",
    spaceComplexity: "O(n)",
    description: "Place n queens on n x n chessboard with zero conflicting rows, columns, or diagonals."
  },
  {
    id: "lc-37",
    title: "Sudoku Solver",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Backtracking",
    pattern: "Constraint Satisfaction Backtracking",
    url: "https://leetcode.com/problems/sudoku-solver/",
    timeComplexity: "O(9^(m))",
    spaceComplexity: "O(81)",
    description: "Solve 9x9 Sudoku puzzle filling cells 1-9 satisfying row, col, and 3x3 box uniqueness."
  },
  {
    id: "lc-79",
    title: "Word Search",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Backtracking",
    pattern: "Grid DFS Backtracking",
    url: "https://leetcode.com/problems/word-search/",
    timeComplexity: "O(m * n * 4^L)",
    spaceComplexity: "O(L)",
    description: "Determine if word exists in 2D character grid using 4-directional DFS in-place grid marking."
  },
  {
    id: "lc-131",
    title: "Palindrome Partitioning",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Backtracking",
    pattern: "String Partitioning + Palindrome Check",
    url: "https://leetcode.com/problems/palindrome-partitioning/",
    timeComplexity: "O(2ⁿ * n)",
    spaceComplexity: "O(n)",
    description: "Partition string such that every substring of the partition is a palindrome."
  },

  // ================= GREEDY =================
  {
    id: "lc-55",
    title: "Jump Game",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Greedy",
    pattern: "Maximum Reachable Index Tracking",
    url: "https://leetcode.com/problems/jump-game/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Determine if last index is reachable by greedily expanding maxReach = max(maxReach, i + nums[i])."
  },
  {
    id: "lc-45",
    title: "Jump Game II",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Greedy",
    pattern: "BFS Range Greediness",
    url: "https://leetcode.com/problems/jump-game-ii/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find minimum jumps to reach end advancing current jump end boundary when index reaches currentMax."
  },
  {
    id: "lc-134",
    title: "Gas Station",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Greedy",
    pattern: "Circular Subarray Balance",
    url: "https://leetcode.com/problems/gas-station/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find starting station where circular tour is possible: if current tank < 0, reset start to next station."
  },
  {
    id: "lc-135",
    title: "Candy",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Greedy",
    pattern: "Two-Pass Slope Matching",
    url: "https://leetcode.com/problems/candy/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Distribute minimum candies to children satisfying rating neighbors with left-to-right and right-to-left passes."
  },
  {
    id: "lc-455",
    title: "Assign Cookies",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Greedy",
    pattern: "Dual Sorted Pointer Matching",
    url: "https://leetcode.com/problems/assign-cookies/",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    description: "Maximize content children by greedily satisfying smallest greed factors with smallest sufficient cookies."
  },
  {
    id: "lc-435",
    title: "Non-overlapping Intervals",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Greedy",
    pattern: "Interval Scheduling by End Time",
    url: "https://leetcode.com/problems/non-overlapping-intervals/",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    description: "Find minimum intervals to remove for disjoint set by greedily picking intervals that finish earliest."
  },
  {
    id: "lc-452",
    title: "Minimum Number of Arrows to Burst Balloons",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Greedy",
    pattern: "Interval Intersection Greediness",
    url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    description: "Find minimum arrows by sorting by end coordinate and shooting arrow at current interval's end."
  },
  {
    id: "lc-621",
    title: "Task Scheduler",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Greedy",
    pattern: "Frequency Max-Idle Slots",
    url: "https://leetcode.com/problems/task-scheduler/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Schedule CPU tasks with cooldown n greedily grouping around highest frequency tasks."
  },
  {
    id: "lc-763",
    title: "Partition Labels",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Greedy",
    pattern: "Last Occurrence Interval Expansion",
    url: "https://leetcode.com/problems/partition-labels/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Partition string into maximal parts such that each character appears in at most one part."
  },
  {
    id: "lc-122",
    title: "Best Time to Buy and Sell Stock II",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Greedy",
    pattern: "Every Positive Upward Slope",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Capture total profit by greedily accumulating all positive day-to-day price increases."
  },

  // ================= STRINGS =================
  {
    id: "lc-3",
    title: "Longest Substring Without Repeating Characters",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Strings",
    pattern: "Sliding Window / Hash Map",
    url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m, n))",
    description: "Find length of longest substring without duplicates using sliding window character index tracking."
  },
  {
    id: "lc-5",
    title: "Longest Palindromic Substring",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Strings",
    pattern: "Expand Around Center / Manacher's",
    url: "https://leetcode.com/problems/longest-palindromic-substring/",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Find longest palindromic substring expanding around each of the 2n - 1 center pivots."
  },
  {
    id: "lc-28",
    title: "Find the Index of the First Occurrence in a String (KMP)",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Strings",
    pattern: "Knuth-Morris-Pratt (KMP) LPS Array",
    url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(m)",
    description: "Locate needle in haystack without backtracking using the KMP Longest Prefix Suffix (LPS) table."
  },
  {
    id: "lc-242-str",
    title: "Valid Anagram",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Strings",
    pattern: "Frequency Count Array",
    url: "https://leetcode.com/problems/valid-anagram/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Verify anagrams using 26-element character frequency difference count."
  },
  {
    id: "lc-49-str",
    title: "Group Anagrams",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Strings",
    pattern: "Sorted Key / Frequency Hash",
    url: "https://leetcode.com/problems/group-anagrams/",
    timeComplexity: "O(n * k log k)",
    spaceComplexity: "O(n * k)",
    description: "Group strings by sorting characters as a canonical HashMap key."
  },
  {
    id: "lc-76",
    title: "Minimum Window Substring",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Strings",
    pattern: "Sliding Window with Frequency Map",
    url: "https://leetcode.com/problems/minimum-window-substring/",
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(k)",
    description: "Find minimum substring window containing all characters of pattern string using contractible window."
  },
  {
    id: "lc-208",
    title: "Implement Trie (Prefix Tree)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Strings",
    pattern: "Trie Node Architecture",
    url: "https://leetcode.com/problems/implement-trie-prefix-tree/",
    timeComplexity: "O(L) all ops",
    spaceComplexity: "O(total characters)",
    description: "Design 26-way tree for efficient dictionary word insertion, lookup, and prefix matching."
  },
  {
    id: "lc-212",
    title: "Word Search II",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Strings",
    pattern: "Trie + Grid DFS Backtracking",
    url: "https://leetcode.com/problems/word-search-ii/",
    timeComplexity: "O(m * n * 4^L)",
    spaceComplexity: "O(total Trie chars)",
    description: "Find all dictionary words in character grid simultaneously leveraging prefix pruning via Trie."
  },
  {
    id: "lc-336",
    title: "Palindrome Pairs",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Strings",
    pattern: "Trie / Reverse Hashing",
    url: "https://leetcode.com/problems/palindrome-pairs/",
    timeComplexity: "O(n * k²)",
    spaceComplexity: "O(n * k)",
    description: "Find all pairs (i, j) whose concatenation forms a palindrome using word prefix/suffix matching."
  },
  {
    id: "lc-187",
    title: "Repeated DNA Sequences",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Strings",
    pattern: "Rabin-Karp Rolling Hash / Bitmask",
    url: "https://leetcode.com/problems/repeated-dna-sequences/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Identify all 10-letter substrings occurring multiple times using rolling 20-bit mask hash."
  },

  // ================= BIT MANIPULATION =================
  {
    id: "lc-191",
    title: "Number of 1 Bits (Hamming Weight)",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    pattern: "Brian Kernighan's Algorithm",
    url: "https://leetcode.com/problems/number-of-1-bits/",
    timeComplexity: "O(set bits)",
    spaceComplexity: "O(1)",
    description: "Count set bits using n & (n - 1) to clear lowest set bit in each iteration."
  },
  {
    id: "lc-136",
    title: "Single Number",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    pattern: "XOR Cancellation",
    url: "https://leetcode.com/problems/single-number/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find the single non-duplicate element using XOR properties: a ^ a = 0."
  },
  {
    id: "lc-231",
    title: "Power of Two",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    pattern: "Bit Masking",
    url: "https://leetcode.com/problems/power-of-two/",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    description: "Check if integer is power of two using n > 0 && (n & (n - 1)) == 0."
  },
  {
    id: "lc-338",
    title: "Counting Bits",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    pattern: "DP Bit Transition",
    url: "https://leetcode.com/problems/counting-bits/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Compute set bits for all numbers [0..n] in O(n) time via dp[i] = dp[i >> 1] + (i & 1)."
  },
  {
    id: "lc-190",
    title: "Reverse Bits",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    pattern: "Bit Reversal Shifting",
    url: "https://leetcode.com/problems/reverse-bits/",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    description: "Reverse bits of 32-bit unsigned integer using running shift and bitmasking."
  },
  {
    id: "lc-268-bit",
    title: "Missing Number",
    platform: "LeetCode",
    difficulty: "Easy",
    topic: "Bit Manipulation",
    pattern: "XOR Cancellation Property",
    url: "https://leetcode.com/problems/missing-number/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find missing integer in range [0..n] by XOR-ing all indices and elements together."
  },
  {
    id: "lc-137",
    title: "Single Number II (Element Appearing Once, Others 3 Times)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Bit Manipulation",
    pattern: "Modulo 3 Bit Counting / Digital Logic",
    url: "https://leetcode.com/problems/single-number-ii/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Track bit states using digital logic counters (ones and twos) modulo 3."
  },
  {
    id: "lc-260",
    title: "Single Number III (Two Unique Elements)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Bit Manipulation",
    pattern: "Rightmost Set Bit Partitioning",
    url: "https://leetcode.com/problems/single-number-iii/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find two unique elements by isolating lowest set bit diff = xor & (-xor) to divide array into two groups."
  },
  {
    id: "lc-371",
    title: "Sum of Two Integers (Without + or -)",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Bit Manipulation",
    pattern: "Half Adder Circuit (XOR + AND)",
    url: "https://leetcode.com/problems/sum-of-two-integers/",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    description: "Add two integers using XOR for sum without carry and AND left-shifted for carry propagation."
  },
  {
    id: "lc-78-bit",
    title: "Subsets via Bitmasking",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Bit Manipulation",
    pattern: "Binary State Bitmask [0..2ⁿ-1]",
    url: "https://leetcode.com/problems/subsets/",
    timeComplexity: "O(2ⁿ * n)",
    spaceComplexity: "O(1)",
    description: "Generate all subsets by mapping bitmask integer (0 <= mask < 2ⁿ) to element inclusion."
  },

  // ================= PATTERNS =================
  {
    id: "lc-15",
    title: "3Sum",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Patterns",
    pattern: "Two Pointers (Converging)",
    url: "https://leetcode.com/problems/3sum/",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description: "Find all unique triplets summing to zero by fixing one element and using two pointers converging from both ends."
  },
  {
    id: "lc-42",
    title: "Trapping Rain Water",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Patterns",
    pattern: "Two Pointers / Monotonic Stack",
    url: "https://leetcode.com/problems/trapping-rain-water/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Compute trapped water volume in linear time maintaining leftMax and rightMax with two inward pointers."
  },
  {
    id: "lc-424",
    title: "Longest Repeating Character Replacement",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Patterns",
    pattern: "Dynamic Sliding Window",
    url: "https://leetcode.com/problems/longest-repeating-character-replacement/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find longest substring with at most k replacements keeping track of max frequency in the current window."
  },
  {
    id: "lc-209",
    title: "Minimum Size Subarray Sum",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Patterns",
    pattern: "Contracting Sliding Window",
    url: "https://leetcode.com/problems/minimum-size-subarray-sum/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find minimal contiguous subarray length whose sum >= target by contracting left pointer whenever valid."
  },
  {
    id: "lc-560-pat",
    title: "Subarray Sum Equals K",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Patterns",
    pattern: "Prefix Sum + Frequency Map",
    url: "https://leetcode.com/problems/subarray-sum-equals-k/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Track cumulative prefix sum counts in HashMap to locate previous subarrays satisfying currentSum - k."
  },
  {
    id: "lc-438",
    title: "Find All Anagrams in a String",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Patterns",
    pattern: "Fixed-Size Sliding Window",
    url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Slide a fixed window of size pattern.length() maintaining character match counts."
  },
  {
    id: "lc-904",
    title: "Fruit Into Baskets",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Patterns",
    pattern: "Sliding Window with At Most 2 Types",
    url: "https://leetcode.com/problems/fruit-into-baskets/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Find longest contiguous subsegment containing at most 2 distinct elements."
  },
  {
    id: "lc-739-pat",
    title: "Daily Temperatures",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Patterns",
    pattern: "Monotonic Decreasing Stack",
    url: "https://leetcode.com/problems/daily-temperatures/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Find days to wait for warmer temperature popping elements smaller than current from monotonic stack."
  },
  {
    id: "lc-239-pat",
    title: "Sliding Window Maximum",
    platform: "LeetCode",
    difficulty: "Hard",
    topic: "Patterns",
    pattern: "Monotonic Decreasing Deque",
    url: "https://leetcode.com/problems/sliding-window-maximum/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    description: "Maintain indices in monotonic deque keeping maximum of current window of size k at the front."
  },
  {
    id: "lc-523",
    title: "Continuous Subarray Sum",
    platform: "LeetCode",
    difficulty: "Medium",
    topic: "Patterns",
    pattern: "Prefix Sum Modulo K",
    url: "https://leetcode.com/problems/continuous-subarray-sum/",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, k))",
    description: "Detect subarray of size >= 2 with sum multiple of k by storing prefix sum modulo k indices in HashMap."
  }
];

// Helper functions for UI rendering
function getProblemsByTopic(topicName) {
  return PROBLEM_DATABASE.filter(p => p.topic.toLowerCase() === topicName.toLowerCase());
}

function renderProblemCards(containerId, topicName) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const problems = getProblemsByTopic(topicName);
  if (problems.length === 0) {
    container.innerHTML = `<p style="color:#94a3b8; font-style:italic;">No problems registered yet for this topic.</p>`;
    return;
  }

  container.innerHTML = problems.map(prob => {
    const isSolved = typeof window.isProblemSolved === 'function' ? window.isProblemSolved(prob.id) : false;
    const diffColor = prob.difficulty === 'Easy' ? '#34D399' : (prob.difficulty === 'Medium' ? '#FBBF24' : '#F87171');
    const diffBg = prob.difficulty === 'Easy' ? 'rgba(52, 211, 153, 0.12)' : (prob.difficulty === 'Medium' ? 'rgba(251, 191, 36, 0.12)' : 'rgba(248, 113, 113, 0.12)');

    return `
      <div class="problem-card ${isSolved ? 'solved' : ''}" id="prob-card-${prob.id}" style="
        background: rgba(20, 18, 40, 0.7);
        border: 1px solid ${isSolved ? 'rgba(52, 211, 153, 0.4)' : 'rgba(255, 255, 255, 0.08)'};
        border-radius: 16px;
        padding: 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(15px);
      ">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; gap:10px;">
            <h3 style="font-size:16.5px; font-weight:600; color:#F1F5F9; margin:0; line-height:1.4;">${prob.title}</h3>
            <span style="
              font-size: 11px;
              font-weight: 600;
              padding: 3px 8px;
              border-radius: 6px;
              color: ${diffColor};
              background: ${diffBg};
              border: 1px solid ${diffColor}33;
              white-space: nowrap;
            ">${prob.difficulty}</span>
          </div>
          
          <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
            <span style="font-size:11px; color:#A78BFA; background:rgba(167,139,250,0.1); padding:2px 8px; border-radius:4px; font-family:'JetBrains Mono', monospace;">
              <i class="fa-solid fa-code-branch"></i> ${prob.pattern}
            </span>
            <span style="font-size:11px; color:#F59E0B; background:rgba(245,158,11,0.1); padding:2px 8px; border-radius:4px; font-family:'JetBrains Mono', monospace;">
              <i class="fa-regular fa-clock"></i> ${prob.timeComplexity}
            </span>
            <span style="font-size:11px; color:#60A5FA; background:rgba(96,165,250,0.1); padding:2px 8px; border-radius:4px; font-family:'JetBrains Mono', monospace;">
              <i class="fa-solid fa-microchip"></i> ${prob.spaceComplexity}
            </span>
          </div>

          <p style="font-size:13px; color:#94A3B8; line-height:1.6; margin:0;">${prob.description}</p>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.05); padding-top:14px; margin-top:6px;">
          <label style="display:flex; align-items:center; gap:8px; font-size:12px; color:#CBD5E1; cursor:pointer;">
            <input type="checkbox" id="chk-${prob.id}" ${isSolved ? 'checked' : ''} onchange="handleProblemCheck('${prob.id}')" style="accent-color:#10B981; width:15px; height:15px; cursor:pointer;">
            <span>Mark Solved</span>
          </label>
          <a href="${prob.url}" target="_blank" rel="noopener noreferrer" style="
            display:inline-flex;
            align-items:center;
            gap:6px;
            font-size:12px;
            font-weight:600;
            color:#C4B5FD;
            text-decoration:none;
            padding:6px 12px;
            background:rgba(139, 92, 246, 0.15);
            border:1px solid rgba(167, 139, 250, 0.3);
            border-radius:6px;
            transition:all 0.2s;
          " onmouseover="this.style.background='rgba(139,92,246,0.3)'; this.style.color='#FFF';" onmouseout="this.style.background='rgba(139,92,246,0.15)'; this.style.color='#C4B5FD';">
            <span>Solve on ${prob.platform}</span>
            <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:10px;"></i>
          </a>
        </div>
      </div>
    `;
  }).join('');
}

function handleProblemCheck(problemId) {
  if (typeof window.toggleProblemSolved === 'function') {
    const isNowSolved = window.toggleProblemSolved(problemId);
    const card = document.getElementById(`prob-card-${problemId}`);
    if (card) {
      if (isNowSolved) {
        card.classList.add('solved');
        card.style.borderColor = 'rgba(52, 211, 153, 0.4)';
      } else {
        card.classList.remove('solved');
        card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      }
    }
  }
}

const rootDb = typeof window !== 'undefined' ? window : global;
rootDb.PROBLEM_DATABASE = PROBLEM_DATABASE;
rootDb.getProblemsByTopic = getProblemsByTopic;
rootDb.renderProblemCards = renderProblemCards;
rootDb.handleProblemCheck = handleProblemCheck;
