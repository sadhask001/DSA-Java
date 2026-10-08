/**
 * DSA-Java Platform - Global Progress & State Manager
 * Tracks learning milestones and problems solved using browser localStorage.
 */

const TOPIC_STATUS_KEY_PREFIX = 'dsa_topic_status_';
const PROBLEM_SOLVED_KEY_PREFIX = 'dsa_prob_solved_';

// Registered platform topics with category classification
const ALL_TOPICS = [
  // Fundamentals
  { id: 'complexity', name: 'Complexity Analysis', category: 'Fundamentals', route: 'Complexity/index.html' },
  
  // Data Structures
  { id: 'arrays', name: 'Arrays (1D & 2D)', category: 'Data Structures', route: 'Array/index.html' },
  { id: 'arraylist', name: 'ArrayList', category: 'Data Structures', route: 'Collection/ArrayList/index.html' },
  { id: 'linked-list', name: 'Linked List', category: 'Data Structures', route: 'Collection/LinkedList/index.html' },
  { id: 'stack', name: 'Stack', category: 'Data Structures', route: 'Collection/Stack/index.html' },
  { id: 'queue', name: 'Queue & Deque', category: 'Data Structures', route: 'Collection/Queue/index.html' },
  { id: 'trees', name: 'Trees (Binary, BST, AVL)', category: 'Data Structures', route: 'Trees/index.html' },
  { id: 'heap', name: 'Heap & PriorityQueue', category: 'Data Structures', route: 'Heap/index.html' },
  { id: 'graph', name: 'Graphs & Topologies', category: 'Data Structures', route: 'Graph/index.html' },
  { id: 'hashing', name: 'Hashing & HashMaps', category: 'Data Structures', route: 'Hashing/index.html' },

  // Algorithms
  { id: 'sorting', name: 'Sorting Engines', category: 'Algorithms', route: 'Sorting/index.html' },
  { id: 'searching', name: 'Searching Routines', category: 'Algorithms', route: 'Searching/index.html' },
  { id: 'recursion', name: 'Recursion & Backtracking', category: 'Algorithms', route: 'Recursion/index.html' },
  { id: 'dp', name: 'Dynamic Programming', category: 'Algorithms', route: 'DP/index.html' },
  { id: 'greedy', name: 'Greedy Algorithms', category: 'Algorithms', route: 'Greedy/index.html' },
  { id: 'strings', name: 'String Algorithms', category: 'Algorithms', route: 'Strings/index.html' },
  { id: 'bit', name: 'Bit Manipulation', category: 'Algorithms', route: 'BitManipulation/index.html' },

  // Patterns & Preparation
  { id: 'patterns', name: 'Algorithmic Patterns', category: 'Patterns', route: 'Patterns/index.html' },
  { id: 'problemsolving', name: 'Problem Solving Frameworks', category: 'Preparation', route: 'ProblemSolving/index.html' },
  { id: 'interviewprep', name: 'Interview Prep & Sheets', category: 'Preparation', route: 'InterviewPrep/index.html' }
];

function getTopicStatus(topicId) {
  try {
    return localStorage.getItem(TOPIC_STATUS_KEY_PREFIX + topicId) || 'NOT_STARTED';
  } catch (e) {
    return 'NOT_STARTED';
  }
}

function setTopicStatus(topicId, status) {
  try {
    localStorage.setItem(TOPIC_STATUS_KEY_PREFIX + topicId, status);
    window.dispatchEvent(new CustomEvent('dsa-progress-updated', { detail: { topicId, status } }));
  } catch (e) {
    console.error('LocalStorage write failed:', e);
  }
}

function toggleTopicComplete(topicId) {
  const current = getTopicStatus(topicId);
  const next = current === 'COMPLETED' ? 'NOT_STARTED' : 'COMPLETED';
  setTopicStatus(topicId, next);
  return next;
}

function isProblemSolved(problemId) {
  try {
    return localStorage.getItem(PROBLEM_SOLVED_KEY_PREFIX + problemId) === 'true';
  } catch (e) {
    return false;
  }
}

function toggleProblemSolved(problemId) {
  const current = isProblemSolved(problemId);
  const next = !current;
  try {
    localStorage.setItem(PROBLEM_SOLVED_KEY_PREFIX + problemId, next ? 'true' : 'false');
    window.dispatchEvent(new CustomEvent('dsa-progress-updated', { detail: { problemId, solved: next } }));
  } catch (e) {
    console.error('LocalStorage write failed:', e);
  }
  return next;
}

function getProgressStats() {
  let completedTopics = 0;
  let dsCompleted = 0;
  let dsTotal = 0;
  let algoCompleted = 0;
  let algoTotal = 0;

  ALL_TOPICS.forEach(t => {
    const status = getTopicStatus(t.id);
    const isDone = status === 'COMPLETED';
    if (isDone) completedTopics++;

    if (t.category === 'Data Structures') {
      dsTotal++;
      if (isDone) dsCompleted++;
    } else if (t.category === 'Algorithms') {
      algoTotal++;
      if (isDone) algoCompleted++;
    }
  });

  // Calculate problems solved
  let solvedProblems = 0;
  const totalProblemsCount = (typeof window !== 'undefined' && window.PROBLEM_DATABASE) ? window.PROBLEM_DATABASE.length : 190;

  if (typeof window !== 'undefined' && window.PROBLEM_DATABASE) {
    window.PROBLEM_DATABASE.forEach(p => {
      if (isProblemSolved(p.id)) solvedProblems++;
    });
  } else {
    // Count from localStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(PROBLEM_SOLVED_KEY_PREFIX) && localStorage.getItem(key) === 'true') {
          solvedProblems++;
        }
      }
    } catch (e) {}
  }

  const overallPercent = Math.round((completedTopics / ALL_TOPICS.length) * 100);
  const dsPercent = dsTotal > 0 ? Math.round((dsCompleted / dsTotal) * 100) : 0;
  const algoPercent = algoTotal > 0 ? Math.round((algoCompleted / algoTotal) * 100) : 0;

  return {
    completedTopics,
    totalTopics: ALL_TOPICS.length,
    overallPercent,
    dsCompleted,
    dsTotal,
    dsPercent,
    algoCompleted,
    algoTotal,
    algoPercent,
    solvedProblems,
    totalProblems: totalProblemsCount
  };
}

// Expose globally for browser and node environments
const rootContext = typeof window !== 'undefined' ? window : global;
rootContext.ALL_TOPICS = ALL_TOPICS;
rootContext.getTopicStatus = getTopicStatus;
rootContext.setTopicStatus = setTopicStatus;
rootContext.toggleTopicComplete = toggleTopicComplete;
rootContext.isProblemSolved = isProblemSolved;
rootContext.toggleProblemSolved = toggleProblemSolved;
rootContext.getProgressStats = getProgressStats;
