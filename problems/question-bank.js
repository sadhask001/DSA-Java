/**
 * DSA-Java Platform - Question Bank Controller
 * Multi-filter, instant search, pagination, and progress tracking.
 */

(function() {
  'use strict';

  // State
  let allQuestions = [];
  let filteredQuestions = [];
  let currentPage = 1;
  let pageSize = 50;
  let searchDebounceTimer = null;

  // DOM Elements
  const tbody = document.getElementById('questions-tbody');
  const emptyState = document.getElementById('empty-state');
  const resultsCountEl = document.getElementById('results-count');
  const searchInput = document.getElementById('filter-search');
  const clearSearchBtn = document.getElementById('btn-clear-search');
  const topicSelect = document.getElementById('filter-topic');
  const diffSelect = document.getElementById('filter-difficulty');
  const impSelect = document.getElementById('filter-importance');
  const companySelect = document.getElementById('filter-company');
  const statusSelect = document.getElementById('filter-status');
  const sortSelect = document.getElementById('sort-by');
  const resetBtn = document.getElementById('btn-reset-filters');
  const pageNav = document.getElementById('page-nav-controls');

  // Initialize
  function init() {
    if (typeof window.DSA_QUESTIONS !== 'undefined' && Array.isArray(window.DSA_QUESTIONS)) {
      allQuestions = window.DSA_QUESTIONS;
    } else {
      console.error('DSA_QUESTIONS dataset not found!');
      return;
    }

    populateFilterDropdowns();
    checkUrlParams();
    applyFilters();
    updateStats();

    // Bind event listeners
    if (searchInput) searchInput.addEventListener('input', handleSearchInput);
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        applyFilters();
      });
    }

    if (topicSelect) {
      topicSelect.addEventListener('change', () => {
        trackFilter('topic', topicSelect.value);
        applyFilters();
      });
    }
    if (diffSelect) {
      diffSelect.addEventListener('change', () => {
        trackFilter('difficulty', diffSelect.value);
        applyFilters();
      });
    }
    if (impSelect) {
      impSelect.addEventListener('change', () => {
        trackFilter('importance', impSelect.value);
        applyFilters();
      });
    }
    if (companySelect) {
      companySelect.addEventListener('change', () => {
        trackFilter('company', companySelect.value);
        applyFilters();
      });
    }
    if (statusSelect) {
      statusSelect.addEventListener('change', () => {
        trackFilter('status', statusSelect.value);
        applyFilters();
      });
    }
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        applyFilters();
      });
    }
    if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);

    // Listen for progress updates
    window.addEventListener('dsa-progress-updated', (e) => {
      updateStats();
      if (e.detail && e.detail.problemId) {
        const chk = document.getElementById(`chk-${e.detail.problemId}`);
        const row = document.getElementById(`row-${e.detail.problemId}`);
        if (chk) chk.checked = e.detail.solved;
        if (row) {
          if (e.detail.solved) row.classList.add('is-solved');
          else row.classList.remove('is-solved');
        }
      }
    });
  }

  // Populate filter dropdowns from actual dataset
  function populateFilterDropdowns() {
    if (!topicSelect || !companySelect) return;

    // Topics (Use TOPIC_ROADMAP if available for study order)
    if (typeof window.TOPIC_ROADMAP !== 'undefined') {
      window.TOPIC_ROADMAP.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.topic;
        opt.textContent = `${t.topic} (${t.totalCount})`;
        topicSelect.appendChild(opt);
      });
    } else {
      const topicCounts = {};
      allQuestions.forEach(q => {
        topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
      });
      Object.keys(topicCounts).sort().forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = `${t} (${topicCounts[t]})`;
        topicSelect.appendChild(opt);
      });
    }

    // Top Companies
    const companyCounts = {};
    allQuestions.forEach(q => {
      q.companies.forEach(c => {
        companyCounts[c] = (companyCounts[c] || 0) + 1;
      });
    });
    const sortedCompanies = Object.keys(companyCounts)
      .sort((a, b) => companyCounts[b] - companyCounts[a]);

    sortedCompanies.forEach(c => {
      if (companyCounts[c] >= 2) {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = `${c} (${companyCounts[c]})`;
        companySelect.appendChild(opt);
      }
    });
  }

  // Check URL query parameters (e.g. ?topic=Arrays or ?difficulty=Hard)
  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const urlTopic = params.get('topic');
    const urlDiff = params.get('difficulty');
    const urlCompany = params.get('company');

    if (urlTopic && topicSelect) {
      for (let i = 0; i < topicSelect.options.length; i++) {
        if (topicSelect.options[i].value.toLowerCase() === urlTopic.toLowerCase()) {
          topicSelect.selectedIndex = i;
          break;
        }
      }
    }
    if (urlDiff && diffSelect) {
      for (let i = 0; i < diffSelect.options.length; i++) {
        if (diffSelect.options[i].value.toLowerCase() === urlDiff.toLowerCase()) {
          diffSelect.selectedIndex = i;
          break;
        }
      }
    }
    if (urlCompany && companySelect) {
      for (let i = 0; i < companySelect.options.length; i++) {
        if (companySelect.options[i].value.toLowerCase() === urlCompany.toLowerCase()) {
          companySelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // Handle search input with debouncing & analytics
  function handleSearchInput() {
    const val = searchInput.value.trim();
    if (clearSearchBtn) clearSearchBtn.style.display = val ? 'block' : 'none';

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      if (val.length >= 2 && window.DSA_Analytics) {
        window.DSA_Analytics.trackQuestionSearch(val, filteredQuestions.length);
      }
      applyFilters();
    }, 250);
  }

  function trackFilter(type, value) {
    if (window.DSA_Analytics && value !== 'ALL') {
      window.DSA_Analytics.trackQuestionFilter(type, value);
    }
  }

  // Filter and Sort Engine
  function applyFilters() {
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();
    const selectedTopic = topicSelect.value;
    const selectedDiff = diffSelect.value;
    const selectedImp = impSelect.value;
    const selectedCompany = companySelect.value;
    const selectedStatus = statusSelect.value;
    const sortBy = sortSelect.value;

    filteredQuestions = allQuestions.filter(q => {
      // Search query (title or company)
      if (query) {
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchCompany = (q.companiesRaw || '').toLowerCase().includes(query);
        if (!matchTitle && !matchCompany) return false;
      }

      // Topic
      if (selectedTopic !== 'ALL' && q.topic !== selectedTopic) return false;

      // Difficulty
      if (selectedDiff !== 'ALL' && q.difficulty !== selectedDiff) return false;

      // Importance
      if (selectedImp !== 'ALL' && q.importance !== selectedImp) return false;

      // Company
      if (selectedCompany !== 'ALL') {
        const hasCompany = q.companies.some(c => c.toLowerCase() === selectedCompany.toLowerCase());
        if (!hasCompany) return false;
      }

      // Status (Solved / Unsolved)
      if (selectedStatus !== 'ALL') {
        const isSolved = typeof window.isProblemSolved === 'function' ? window.isProblemSolved(q.id, q.legacyId) : false;
        if (selectedStatus === 'SOLVED' && !isSolved) return false;
        if (selectedStatus === 'UNSOLVED' && isSolved) return false;
      }

      return true;
    });

    // Sorting
    filteredQuestions.sort((a, b) => {
      if (sortBy === 'order') return a.order - b.order;
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
      if (sortBy === 'diff-asc') {
        const weight = { Easy: 1, Medium: 2, Hard: 3 };
        return (weight[a.difficulty] || 0) - (weight[b.difficulty] || 0) || a.order - b.order;
      }
      if (sortBy === 'diff-desc') {
        const weight = { Easy: 1, Medium: 2, Hard: 3 };
        return (weight[b.difficulty] || 0) - (weight[a.difficulty] || 0) || a.order - b.order;
      }
      if (sortBy === 'imp-desc') {
        const weight = { High: 3, Medium: 2, Low: 1 };
        return (weight[b.importance] || 0) - (weight[a.importance] || 0) || a.order - b.order;
      }
      return 0;
    });

    currentPage = 1;
    renderQuestions();
  }

  // Render Questions
  function renderQuestions() {
    if (resultsCountEl) {
      resultsCountEl.innerHTML = `Showing <strong>${filteredQuestions.length}</strong> of <strong>${allQuestions.length}</strong> questions`;
    }

    if (filteredQuestions.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (pageNav) pageNav.innerHTML = '';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const totalItems = filteredQuestions.length;
    const totalPages = pageSize === 'ALL' ? 1 : Math.ceil(totalItems / pageSize);
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = pageSize === 'ALL' ? 0 : (currentPage - 1) * pageSize;
    const endIndex = pageSize === 'ALL' ? totalItems : Math.min(startIndex + pageSize, totalItems);

    const pageSlice = filteredQuestions.slice(startIndex, endIndex);

    let html = '';
    pageSlice.forEach(q => {
      const isSolved = typeof window.isProblemSolved === 'function' ? window.isProblemSolved(q.id, q.legacyId) : false;

      let diffClass = 'qb-diff-medium';
      if (q.difficulty === 'Easy') diffClass = 'qb-diff-easy';
      else if (q.difficulty === 'Hard') diffClass = 'qb-diff-hard';

      let impClass = 'qb-imp-medium';
      if (q.importance === 'High') impClass = 'qb-imp-high';
      else if (q.importance === 'Low') impClass = 'qb-imp-low';

      // Build company tags
      let companyChips = '';
      if (q.companies.length > 0) {
        const maxShow = 3;
        const shown = q.companies.slice(0, maxShow);
        companyChips = shown.map(c => `<span class="qb-company-tag" onclick="filterByCompany('${escapeHtml(c)}')">${escapeHtml(c)}</span>`).join('');
        if (q.companies.length > maxShow) {
          companyChips += `<span class="qb-company-tag" title="${escapeHtml(q.companiesRaw)}">+${q.companies.length - maxShow}</span>`;
        }
      } else {
        companyChips = '<span style="color:var(--color-text-muted); font-size:11.5px;">-</span>';
      }

      // Video button if available
      let videoBtn = '';
      if (q.videoUrl) {
        videoBtn = '<a href="' + escapeHtml(q.videoUrl) + '" target="_blank" rel="noopener noreferrer" class="qb-btn-solve qb-btn-video" title="Watch Video Solution" onclick="trackAction(\'video\', \'' + q.id + '\', \'' + escapeHtml(q.title) + '\')"><i class="fa-solid fa-play"></i> Video</a>';
      }

      const lcLink = '<a href="' + escapeHtml(q.leetcodeUrl) + '" target="_blank" rel="noopener noreferrer" class="qb-btn-solve qb-btn-lc" onclick="trackAction(\'LeetCode\', \'' + q.id + '\', \'' + escapeHtml(q.title) + '\', \'' + escapeHtml(q.leetcodeUrl) + '\')"><i class="fa-solid fa-code"></i> LeetCode</a>';
      const gfgLink = '<a href="' + escapeHtml(q.gfgUrl) + '" target="_blank" rel="noopener noreferrer" class="qb-btn-solve qb-btn-gfg" onclick="trackAction(\'GeeksforGeeks\', \'' + q.id + '\', \'' + escapeHtml(q.title) + '\', \'' + escapeHtml(q.gfgUrl) + '\')"><i class="fa-solid fa-terminal"></i> GFG</a>';

      html += `
        <tr id="row-${q.id}" class="${isSolved ? 'is-solved' : ''}">
          <td class="col-check">
            <input type="checkbox" id="chk-${q.id}" class="qb-checkbox" ${isSolved ? 'checked' : ''} onchange="handleToggleSolve('${q.id}', '${q.legacyId || ''}', '${escapeHtml(q.topic)}', '${q.difficulty}')" aria-label="Mark ${escapeHtml(q.title)} as solved">
          </td>
          <td class="col-order">${q.order}</td>
          <td class="col-title">
            <span style="display:inline-block; line-height:1.4;">${escapeHtml(q.title)}</span>
          </td>
          <td class="col-topic">
            <span class="qb-topic-badge" onclick="filterByTopic('${escapeHtml(q.topic)}')">${escapeHtml(q.topic)}</span>
          </td>
          <td class="col-diff">
            <span class="qb-diff-badge ${diffClass}">${q.difficulty}</span>
          </td>
          <td class="col-imp">
            <span class="qb-imp-badge ${impClass}">
              <i class="fa-solid fa-bolt" style="font-size:9px;"></i> ${q.importance}
            </span>
          </td>
          <td class="col-companies">
            ${companyChips}
          </td>
          <td class="col-actions">
            <div style="display:inline-flex; gap:6px; align-items:center;">
              ${lcLink}
              ${gfgLink}
              ${videoBtn}
            </div>
          </td>
        </tr>
      `;
    });

    if (tbody) tbody.innerHTML = html;
    renderPagination(totalPages);
  }

  // Render Pagination controls
  function renderPagination(totalPages) {
    if (!pageNav) return;
    if (pageSize === 'ALL' || totalPages <= 1) {
      pageNav.innerHTML = '';
      return;
    }

    let navHtml = '';
    navHtml += `<button class="qb-page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})"><i class="fa-solid fa-chevron-left"></i> Prev</button>`;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      navHtml += `<button class="qb-page-btn" onclick="changePage(1)">1</button>`;
      if (startPage > 2) navHtml += `<span style="color:var(--color-text-muted); padding:0 4px;">...</span>`;
    }

    for (let p = startPage; p <= endPage; p++) {
      navHtml += `<button class="qb-page-btn ${p === currentPage ? 'active' : ''}" onclick="changePage(${p})">${p}</button>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) navHtml += `<span style="color:var(--color-text-muted); padding:0 4px;">...</span>`;
      navHtml += `<button class="qb-page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }

    navHtml += `<button class="qb-page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next <i class="fa-solid fa-chevron-right"></i></button>`;

    pageNav.innerHTML = navHtml;
  }

  // Global Handlers
  window.changePage = function(page) {
    currentPage = page;
    renderQuestions();
    const table = document.getElementById('questions-table');
    if (table) table.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  window.handlePageSizeChange = function(newSize) {
    pageSize = newSize === 'ALL' ? 'ALL' : parseInt(newSize, 10);
    currentPage = 1;
    renderQuestions();
  };

  window.handleToggleSolve = function(problemId, legacyId, topic, difficulty) {
    if (typeof window.toggleProblemSolved === 'function') {
      const isSolved = window.toggleProblemSolved(problemId, legacyId);
      const row = document.getElementById(`row-${problemId}`);
      if (row) {
        if (isSolved) row.classList.add('is-solved');
        else row.classList.remove('is-solved');
      }
      if (window.DSA_Analytics) {
        if (isSolved) {
          window.DSA_Analytics.trackQuestionCompleted(problemId, topic, difficulty);
        } else {
          window.DSA_Analytics.trackQuestionUncompleted(problemId, topic, difficulty);
        }
      }
      updateStats();
    }
  };

  window.trackAction = function(platform, questionId, title, url) {
    if (window.DSA_Analytics) {
      window.DSA_Analytics.trackExternalProblemClick(platform, questionId, title, url);
    }
  };

  window.filterByTopic = function(topic) {
    if (topicSelect) topicSelect.value = topic;
    trackFilter('topic', topic);
    applyFilters();
  };

  window.filterByCompany = function(company) {
    if (companySelect) companySelect.value = company;
    trackFilter('company', company);
    applyFilters();
  };

  window.resetAllFilters = function() {
    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    if (topicSelect) topicSelect.value = 'ALL';
    if (diffSelect) diffSelect.value = 'ALL';
    if (impSelect) impSelect.value = 'ALL';
    if (companySelect) companySelect.value = 'ALL';
    if (statusSelect) statusSelect.value = 'ALL';
    if (sortSelect) sortSelect.value = 'order';
    applyFilters();
  };

  // Summary Stats Calculation
  function updateStats() {
    let solved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    allQuestions.forEach(q => {
      if (typeof window.isProblemSolved === 'function' && window.isProblemSolved(q.id, q.legacyId)) {
        solved++;
        if (q.difficulty === 'Easy') easySolved++;
        else if (q.difficulty === 'Medium') mediumSolved++;
        else if (q.difficulty === 'Hard') hardSolved++;
      }
    });

    const total = allQuestions.length;
    const remaining = total - solved;
    const pct = Math.round((solved / total) * 100);

    const totalEl = document.getElementById('stat-total-q');
    const easyEl = document.getElementById('stat-easy-q');
    const medEl = document.getElementById('stat-medium-q');
    const hardEl = document.getElementById('stat-hard-q');
    const solvedEl = document.getElementById('stat-solved-q');
    const barEl = document.getElementById('stat-solved-bar');
    const remEl = document.getElementById('stat-remaining-q');

    if (totalEl) totalEl.innerText = total;
    if (easyEl) easyEl.innerText = 124;
    if (medEl) medEl.innerText = 236;
    if (hardEl) hardEl.innerText = 82;
    if (solvedEl) solvedEl.innerText = `${solved} / ${total}`;
    if (barEl) barEl.style.width = pct + '%';
    if (remEl) remEl.innerText = remaining;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Start on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
