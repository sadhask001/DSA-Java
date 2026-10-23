/**
 * DSA-Java Platform - Analytics Dashboard Controller
 * Computes metrics, renders SVG/CSS visual analytics, and manages the activity log.
 */

(function() {
  'use strict';

  let currentEvents = [];

  function init() {
    populateTopicFilter();
    refreshDashboard();

    // Listen for live events if on same page
    window.addEventListener('dsa-analytics-logged', () => {
      refreshDashboard();
    });

    // Filter listeners
    const searchInp = document.getElementById('log-filter-search');
    const typeSelect = document.getElementById('log-filter-type');
    const topicSelect = document.getElementById('log-filter-topic');
    const dateInp = document.getElementById('log-filter-date');

    if (searchInp) searchInp.addEventListener('input', debounce(applyLogFilters, 250));
    if (typeSelect) typeSelect.addEventListener('change', applyLogFilters);
    if (topicSelect) topicSelect.addEventListener('change', applyLogFilters);
    if (dateInp) dateInp.addEventListener('change', applyLogFilters);

    updateConsentButtonText();
  }

  function populateTopicFilter() {
    const sel = document.getElementById('log-filter-topic');
    if (!sel) return;

    if (typeof window.TOPIC_ROADMAP !== 'undefined') {
      window.TOPIC_ROADMAP.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.topic;
        opt.textContent = t.topic;
        sel.appendChild(opt);
      });
    }
  }

  function refreshDashboard() {
    if (!window.DSA_Analytics) return;

    const stats = window.DSA_Analytics.getStats();

    // 1. Update KPI Values
    setElText('kpi-page-views', stats.totalPageViews);
    setElText('kpi-sessions', stats.totalSessions);
    setElText('kpi-total-events', stats.totalEvents);
    setElText('kpi-searches', stats.totalSearches);
    setElText('kpi-problem-clicks', stats.totalLinkClicks);
    setElText('kpi-completions', stats.totalCompletions);
    setElText('kpi-visualizers', stats.totalVisualizerInteractions);

    // 2. Render Charts
    renderPopularPagesChart(stats.popularPages);
    renderPopularTopicsChart(stats.popularTopics);
    renderDifficultyChart(stats.difficultyActivity);
    renderPlatformsChart(stats.platformClicks);
    renderDailyTrendChart(stats.dailyTrend);

    // 3. Render Activity Log Table
    applyLogFilters();
  }

  function setElText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = String(text);
  }

  // --- CHART RENDERING (Pure CSS & SVG, zero external bloat) ---

  function renderPopularPagesChart(pages) {
    const container = document.getElementById('chart-popular-pages');
    if (!container) return;

    if (!pages || pages.length === 0) {
      container.innerHTML = '<div style="color:var(--color-text-muted); text-align:center; padding:30px;">No page views recorded yet.</div>';
      return;
    }

    const top5 = pages.slice(0, 5);
    const maxVal = Math.max(...top5.map(p => p.views), 1);

    let html = '';
    top5.forEach(p => {
      const pct = Math.round((p.views / maxVal) * 100);
      const displayPath = p.path.length > 25 ? '...' + p.path.slice(-22) : p.path;
      html += `
        <div class="bar-row">
          <span class="bar-label" title="${escapeHtml(p.path)}">${escapeHtml(displayPath)}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width:${pct}%; background:#38bdf8;"></div>
          </div>
          <span class="bar-count">${p.views}</span>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  function renderPopularTopicsChart(topics) {
    const container = document.getElementById('chart-popular-topics');
    if (!container) return;

    if (!topics || topics.length === 0) {
      container.innerHTML = '<div style="color:var(--color-text-muted); text-align:center; padding:30px;">No topic interactions logged yet.</div>';
      return;
    }

    const top5 = topics.slice(0, 5);
    const maxVal = Math.max(...top5.map(t => t.count), 1);

    let html = '';
    top5.forEach(t => {
      const pct = Math.round((t.count / maxVal) * 100);
      html += `
        <div class="bar-row">
          <span class="bar-label" title="${escapeHtml(t.topic)}">${escapeHtml(t.topic)}</span>
          <div class="bar-track">
            <div class="bar-fill" style="width:${pct}%; background:#a855f7;"></div>
          </div>
          <span class="bar-count">${t.count}</span>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  function renderDifficultyChart(diffActivity) {
    const container = document.getElementById('chart-difficulty');
    if (!container) return;

    const total = (diffActivity.Easy || 0) + (diffActivity.Medium || 0) + (diffActivity.Hard || 0);
    if (total === 0) {
      container.innerHTML = '<div style="color:var(--color-text-muted); text-align:center; padding:30px;">No question events with difficulty logged yet.</div>';
      return;
    }

    const easyPct = Math.round(((diffActivity.Easy || 0) / total) * 100);
    const medPct = Math.round(((diffActivity.Medium || 0) / total) * 100);
    const hardPct = Math.round(((diffActivity.Hard || 0) / total) * 100);

    container.innerHTML = `
      <div style="margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:12.5px;">
          <span style="color:var(--color-easy); font-weight:600;"><i class="fa-solid fa-circle" style="font-size:9px;"></i> Easy (${diffActivity.Easy || 0})</span>
          <span style="font-family:var(--font-mono);">${easyPct}%</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${easyPct}%; background:var(--color-easy);"></div></div>
      </div>

      <div style="margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:12.5px;">
          <span style="color:var(--color-medium); font-weight:600;"><i class="fa-solid fa-circle" style="font-size:9px;"></i> Medium (${diffActivity.Medium || 0})</span>
          <span style="font-family:var(--font-mono);">${medPct}%</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${medPct}%; background:var(--color-medium);"></div></div>
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:12.5px;">
          <span style="color:var(--color-hard); font-weight:600;"><i class="fa-solid fa-circle" style="font-size:9px;"></i> Hard (${diffActivity.Hard || 0})</span>
          <span style="font-family:var(--font-mono);">${hardPct}%</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${hardPct}%; background:var(--color-hard);"></div></div>
      </div>
    `;
  }

  function renderPlatformsChart(platformClicks) {
    const container = document.getElementById('chart-platforms');
    if (!container) return;

    const lc = platformClicks.LeetCode || 0;
    const gfg = platformClicks.GeeksforGeeks || 0;
    const total = lc + gfg;

    if (total === 0) {
      container.innerHTML = '<div style="color:var(--color-text-muted); text-align:center; padding:30px;">No external problem links clicked yet.</div>';
      return;
    }

    const lcPct = Math.round((lc / total) * 100);
    const gfgPct = Math.round((gfg / total) * 100);

    container.innerHTML = `
      <div style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:13px;">
          <span style="color:#f59e0b; font-weight:600;"><i class="fa-solid fa-code"></i> LeetCode Clicks</span>
          <span style="font-family:var(--font-mono); font-weight:700;">${lc} (${lcPct}%)</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${lcPct}%; background:#f59e0b;"></div></div>
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:13px;">
          <span style="color:#10b981; font-weight:600;"><i class="fa-solid fa-terminal"></i> GeeksforGeeks Clicks</span>
          <span style="font-family:var(--font-mono); font-weight:700;">${gfg} (${gfgPct}%)</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${gfgPct}%; background:#10b981;"></div></div>
      </div>
    `;
  }

  function renderDailyTrendChart(dailyTrend) {
    const container = document.getElementById('chart-daily-trend');
    if (!container) return;

    const dates = Object.keys(dailyTrend).sort();
    if (dates.length === 0) {
      container.innerHTML = '<div style="color:var(--color-text-muted); text-align:center; padding:30px;">No timeline activity recorded yet.</div>';
      return;
    }

    const maxVal = Math.max(...dates.map(d => dailyTrend[d]), 1);

    let barsHtml = '';
    dates.forEach(d => {
      const cnt = dailyTrend[d];
      const heightPct = Math.max(12, Math.round((cnt / maxVal) * 100));
      barsHtml += `
        <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px; min-width:40px;">
          <span style="font-size:11px; font-family:var(--font-mono); color:var(--color-text-muted);">${cnt}</span>
          <div style="width:24px; height:80px; background:var(--bg-subtle); border-radius:4px; display:flex; align-items:flex-end;">
            <div style="width:100%; height:${heightPct}%; background:var(--color-primary-light); border-radius:4px;" title="${d}: ${cnt} events"></div>
          </div>
          <span style="font-size:10.5px; font-family:var(--font-mono); color:var(--color-text-sub);">${d.slice(5)}</span>
        </div>
      `;
    });

    container.innerHTML = `<div style="display:flex; align-items:flex-end; gap:8px; overflow-x:auto; padding:10px 0;">${barsHtml}</div>`;
  }

  // --- ACTIVITY LOG TABLE ---

  function applyLogFilters() {
    if (!window.DSA_Analytics) return;

    const search = (document.getElementById('log-filter-search')?.value || '').trim();
    const type = document.getElementById('log-filter-type')?.value || 'ALL';
    const topic = document.getElementById('log-filter-topic')?.value || 'ALL';
    const date = document.getElementById('log-filter-date')?.value || '';

    const filters = {
      search: search,
      type: type,
      topic: topic,
      startDate: date || undefined,
      endDate: date || undefined
    };

    currentEvents = window.DSA_Analytics.getEvents(filters);
    renderLogTable(currentEvents);
  }

  function renderLogTable(events) {
    const tbody = document.getElementById('log-tbody');
    const emptyState = document.getElementById('log-empty-state');
    const countInfo = document.getElementById('log-count-info');

    if (countInfo) countInfo.innerText = `${events.length} events matching filters`;

    if (!events || events.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Show newest first
    const sorted = [...events].reverse();
    const slice = sorted.slice(0, 150); // limit to 150 rows in DOM

    let html = '';
    slice.forEach(evt => {
      const timeStr = evt.timestamp ? evt.timestamp.replace('T', ' ').substring(0, 19) : '-';
      const typeBadge = `<span class="evt-badge evt-${evt.type}">${escapeHtml(evt.type)}</span>`;

      let entity = '-';
      if (evt.questionTitle) {
        entity = `<strong>${escapeHtml(evt.questionTitle)}</strong>`;
        if (evt.topic) entity += `<br><span style="font-size:11px; color:var(--color-text-muted);">${escapeHtml(evt.topic)}</span>`;
      } else if (evt.topic) {
        entity = `<span class="qb-topic-badge">${escapeHtml(evt.topic)}</span>`;
      }

      let detailsStr = '-';
      if (evt.details) {
        if (typeof evt.details === 'object') {
          detailsStr = Object.keys(evt.details)
            .map(k => `<span style="color:var(--color-text-muted);">${escapeHtml(k)}:</span> ${escapeHtml(String(evt.details[k]))}`)
            .join(' &bull; ');
        } else {
          detailsStr = escapeHtml(String(evt.details));
        }
      }

      html += `
        <tr>
          <td style="font-family:var(--font-mono); font-size:11.5px; color:var(--color-text-muted);">${timeStr}</td>
          <td>${typeBadge}</td>
          <td style="font-family:var(--font-mono); font-size:12px; color:var(--color-text-sub);">${escapeHtml(evt.path)}</td>
          <td>${entity}</td>
          <td style="font-size:12px; color:var(--color-text-sub);">${detailsStr}</td>
        </tr>
      `;
    });

    if (tbody) tbody.innerHTML = html;
  }

  // --- ACTIONS ---

  window.refreshDashboard = refreshDashboard;

  window.resetLogFilters = function() {
    const s = document.getElementById('log-filter-search');
    const t = document.getElementById('log-filter-type');
    const top = document.getElementById('log-filter-topic');
    const d = document.getElementById('log-filter-date');
    if (s) s.value = '';
    if (t) t.value = 'ALL';
    if (top) top.value = 'ALL';
    if (d) d.value = '';
    applyLogFilters();
  };

  window.exportAnalyticsCsv = function() {
    if (!window.DSA_Analytics) return;
    const csvContent = window.DSA_Analytics.exportEventsAsCsv(currentEvents);
    if (!csvContent) {
      alert('No activity events available to export.');
      return;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `dsa_analytics_activity_log_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  window.clearLocalLogs = function() {
    if (confirm('Are you sure you want to clear your local activity log from this browser? This cannot be undone.')) {
      if (window.DSA_Analytics) {
        window.DSA_Analytics.clearLocalEvents();
        refreshDashboard();
      }
    }
  };

  // --- SETTINGS & PRIVACY MODAL ---

  window.openSettingsModal = function() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeSettingsModal = function() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  window.toggleConsentChoice = function() {
    if (!window.DSA_Analytics) return;
    const current = window.DSA_Analytics.getConsentStatus();
    const next = current === 'granted' ? false : true;
    window.DSA_Analytics.setConsent(next);
    updateConsentButtonText();
    alert(next ? 'Analytics tracking enabled.' : 'Analytics tracking disabled. No further events will be recorded.');
  };

  function updateConsentButtonText() {
    const btn = document.getElementById('btn-toggle-consent');
    if (!btn || !window.DSA_Analytics) return;
    const isGranted = window.DSA_Analytics.getConsentStatus() === 'granted';
    btn.innerHTML = isGranted
      ? '<i class="fa-solid fa-ban"></i> Opt-Out of Analytics Tracking'
      : '<i class="fa-solid fa-check"></i> Opt-In to Analytics Tracking';
    btn.className = isGranted ? 'btn-action btn-action-danger' : 'btn-action btn-action-primary';
  }

  function debounce(fn, wait) {
    let t;
    return function() {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
