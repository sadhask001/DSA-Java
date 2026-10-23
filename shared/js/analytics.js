/**
 * DSA-Java Platform - Reusable Website Usage Analytics Engine
 * Privacy-focused, cookieless, zero external dependencies.
 * Tracks meaningful learning activity while protecting visitor privacy.
 */

(function(root) {
  'use strict';

  // In-memory fallback if localStorage/sessionStorage is blocked
  const memoryStore = {
    local: {},
    session: {}
  };

  function getStorage(type) {
    try {
      const storage = type === 'session' ? window.sessionStorage : window.localStorage;
      const testKey = '__dsa_storage_test__';
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
      return storage;
    } catch (e) {
      return {
        getItem: (k) => memoryStore[type][k] || null,
        setItem: (k, v) => { memoryStore[type][k] = String(v); },
        removeItem: (k) => { delete memoryStore[type][k]; },
        clear: () => { memoryStore[type] = {}; }
      };
    }
  }

  const localStorageSafe = typeof window !== 'undefined' ? getStorage('local') : null;
  const sessionStorageSafe = typeof window !== 'undefined' ? getStorage('session') : null;

  // Generate anonymous ephemeral session ID (v4-like string)
  function generateSessionId() {
    return 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
  }

  function getOrCreateSessionId(key) {
    if (!sessionStorageSafe) return 'node_session';
    let sid = sessionStorageSafe.getItem(key);
    if (!sid) {
      sid = generateSessionId();
      sessionStorageSafe.setItem(key, sid);
    }
    return sid;
  }

  // Sanitize path by removing query parameters & hash tokens
  function sanitizePath(urlPath) {
    if (!urlPath) return '/';
    try {
      const u = new URL(urlPath, 'https://dummy.local');
      return u.pathname;
    } catch (e) {
      return urlPath.split('?')[0].split('#')[0];
    }
  }

  const DSA_Analytics = {
    _initialized: false,
    _config: null,
    _sessionId: null,
    _pageViewTracked: false,
    _searchDebounceTimer: null,

    init: function(customConfig) {
      if (this._initialized && !customConfig) return this;

      // Merge config
      const globalConfig = (typeof window !== 'undefined' && window.DSA_ANALYTICS_CONFIG) ? window.DSA_ANALYTICS_CONFIG : {};
      this._config = Object.assign({
        enabled: true,
        mode: 'local',
        requireConsent: false,
        sessionStorageKey: 'dsa_analytics_session_id',
        localStorageKey: 'dsa_analytics_events_log',
        maxLocalEvents: 1000,
        privacy: {
          stripQueryParameters: true,
          collectIpAddress: false,
          honorDoNotTrack: true,
          cookieless: true
        },
        supabase: { url: '', anonKey: '', tableName: 'website_activity_events' },
        customEndpoint: { url: '', headers: {} },
        debug: false
      }, globalConfig, customConfig || {});

      // Check DNT
      if (this._config.privacy.honorDoNotTrack && typeof navigator !== 'undefined') {
        const dnt = navigator.doNotTrack || (typeof window !== 'undefined' ? window.doNotTrack : null) || navigator.msDoNotTrack;
        if (dnt === '1' || dnt === 'yes') {
          if (this._config.debug) console.log('[DSA-Analytics] Do-Not-Track honored. Telemetry suppressed.');
          this._config.enabled = false;
        }
      }

      this._sessionId = getOrCreateSessionId(this._config.sessionStorageKey);
      this._initialized = true;

      // Automatically track page view on window load if in browser
      if (typeof window !== 'undefined' && typeof window.addEventListener === 'function' && typeof document !== 'undefined' && !this._pageViewTracked) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          this.trackPageView();
        } else {
          window.addEventListener('DOMContentLoaded', () => {
            this.trackPageView();
          }, { once: true });
        }

        // Listen to global progress events to track question completion
        window.addEventListener('dsa-progress-updated', (e) => {
          if (e.detail && e.detail.problemId) {
            if (e.detail.solved) {
              this.trackQuestionCompleted(e.detail.problemId);
            } else {
              this.trackQuestionUncompleted(e.detail.problemId);
            }
          }
        });

        // Auto-detect visualizer page view
        const currentPath = (window.location && window.location.pathname) ? sanitizePath(window.location.pathname) : '/';
        if (currentPath.toLowerCase().includes('visualizer')) {
          const parts = currentPath.split('/');
          const fileName = parts[parts.length - 1];
          const topicName = parts.length > 2 ? parts[parts.length - 2] : '';
          this.trackVisualizerOpen(fileName, topicName);
        }

        // Event delegation for visualizer buttons and external links
        document.addEventListener('click', (e) => {
          try {
            const a = e.target.closest('a');
            if (a && a.href) {
              const href = a.href.toLowerCase();
              if (href.includes('leetcode.com') && !a.dataset.tracked) {
                a.dataset.tracked = '1';
                this.trackExternalProblemClick('LeetCode', a.dataset.probId || '', (a.innerText || '').trim().substring(0, 50) || 'LeetCode Link', a.href);
              } else if (href.includes('geeksforgeeks.org') && !a.dataset.tracked) {
                a.dataset.tracked = '1';
                this.trackExternalProblemClick('GeeksforGeeks', a.dataset.probId || '', (a.innerText || '').trim().substring(0, 50) || 'GFG Link', a.href);
              }
            }

            if (currentPath.toLowerCase().includes('visualizer')) {
              const btn = e.target.closest('button, .btn, .control-btn');
              if (btn) {
                const btnText = (btn.innerText || btn.getAttribute('title') || btn.id || btn.className || '').trim().toLowerCase();
                const actionKeywords = ['play', 'step', 'next', 'prev', 'pause', 'reset', 'clear', 'run', 'start', 'generate', 'insert', 'delete', 'search'];
                const matched = actionKeywords.find(k => btnText.includes(k));
                if (matched) {
                  this.trackVisualizerInteraction(currentPath.split('/').pop(), matched, btnText.substring(0, 30));
                }
              }
            }
          } catch (err) {}
        }, { passive: true });
      }

      return this;
    },

    getConsentStatus: function() {
      if (!localStorageSafe) return 'granted';
      return localStorageSafe.getItem('dsa_analytics_consent') || 'pending';
    },

    setConsent: function(granted) {
      if (localStorageSafe) {
        localStorageSafe.setItem('dsa_analytics_consent', granted ? 'granted' : 'denied');
      }
      if (!granted && this._config) {
        this._config.enabled = false;
      } else if (granted && this._config) {
        this._config.enabled = true;
      }
    },

    trackEvent: function(eventType, metadata) {
      if (!this._initialized) this.init();
      if (!this._config || !this._config.enabled) return null;

      // Consent check if required
      if (this._config.requireConsent && this.getConsentStatus() !== 'granted') {
        if (this._config.debug) console.log('[DSA-Analytics] Event suppressed pending user consent:', eventType);
        return null;
      }

      const meta = metadata || {};
      const currentPath = (typeof window !== 'undefined' && window.location) ? sanitizePath(window.location.pathname) : (meta.path || '/');

      // Construct clean, minimal event record conforming to strict privacy standards
      const event = {
        id: 'evt_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36),
        type: eventType,
        timestamp: new Date().toISOString(),
        timestampMs: Date.now(),
        path: currentPath,
        pageTitle: (typeof document !== 'undefined' && document.title) ? document.title.substring(0, 100) : '',
        sessionId: this._sessionId,
        topic: meta.topic || null,
        questionId: meta.questionId || null,
        questionTitle: meta.questionTitle || null,
        difficulty: meta.difficulty || null,
        platform: meta.platform || null,
        details: meta.details || null
      };

      if (this._config.debug) {
        console.log('[DSA-Analytics Event]', event);
      }

      // 1. Local Storage Buffer (Local Mode)
      if (this._config.mode === 'local' || !this._config.supabase.url) {
        this._saveLocalEvent(event);
      }

      // 2. Supabase Integration (if configured with public anon key and URL)
      if (this._config.mode === 'supabase' && this._config.supabase.url && this._config.supabase.anonKey) {
        this._dispatchSupabaseEvent(event);
      }

      // 3. Custom REST Endpoint (if configured)
      if (this._config.mode === 'custom' && this._config.customEndpoint.url) {
        this._dispatchCustomEndpoint(event);
      }

      // Fire custom event for live dashboard listeners
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('dsa-analytics-logged', { detail: event }));
      }

      return event;
    },

    _saveLocalEvent: function(event) {
      if (!localStorageSafe) return;
      try {
        let events = [];
        const raw = localStorageSafe.getItem(this._config.localStorageKey);
        if (raw) {
          events = JSON.parse(raw);
        }
        events.push(event);

        // Cap buffer to maxLocalEvents
        if (events.length > this._config.maxLocalEvents) {
          events = events.slice(events.length - this._config.maxLocalEvents);
        }
        localStorageSafe.setItem(this._config.localStorageKey, JSON.stringify(events));
      } catch (e) {
        console.warn('[DSA-Analytics] Failed to save local event log:', e);
      }
    },

    _dispatchSupabaseEvent: function(event) {
      if (typeof fetch !== 'function') return;
      const endpoint = `${this._config.supabase.url.replace(/\/$/, '')}/rest/v1/${this._config.supabase.tableName || 'website_activity_events'}`;

      // Public insert payload with anon token
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this._config.supabase.anonKey,
          'Authorization': `Bearer ${this._config.supabase.anonKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          event_type: event.type,
          page_path: event.path,
          page_title: event.pageTitle,
          session_id: event.sessionId,
          topic: event.topic,
          question_id: event.questionId,
          difficulty: event.difficulty,
          platform: event.platform,
          details: event.details ? JSON.stringify(event.details) : null
        })
      }).catch(err => {
        if (this._config.debug) console.warn('[DSA-Analytics] Supabase dispatch failed:', err);
      });
    },

    _dispatchCustomEndpoint: function(event) {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        try {
          navigator.sendBeacon(this._config.customEndpoint.url, JSON.stringify(event));
          return;
        } catch (e) {}
      }
      if (typeof fetch === 'function') {
        fetch(this._config.customEndpoint.url, {
          method: 'POST',
          headers: Object.assign({ 'Content-Type': 'application/json' }, this._config.customEndpoint.headers || {}),
          body: JSON.stringify(event),
          keepalive: true
        }).catch(() => {});
      }
    },

    // Specific Action Event Tracking Helpers
    trackPageView: function(customPath) {
      if (this._pageViewTracked && !customPath) return null;
      this._pageViewTracked = true;
      return this.trackEvent('page_view', {
        path: customPath || (typeof window !== 'undefined' ? sanitizePath(window.location.pathname) : '/')
      });
    },

    trackQuestionSearch: function(query, resultCount) {
      if (!query || !query.trim()) return null;
      return this.trackEvent('question_search', {
        details: { query: query.trim().substring(0, 50), resultCount: resultCount || 0 }
      });
    },

    trackQuestionFilter: function(filterType, filterValue) {
      return this.trackEvent('question_filter', {
        details: { filterType: String(filterType), filterValue: String(filterValue) }
      });
    },

    trackQuestionOpen: function(questionId, title, topic, difficulty) {
      return this.trackEvent('question_open', {
        questionId: questionId,
        questionTitle: title,
        topic: topic,
        difficulty: difficulty
      });
    },

    trackExternalProblemClick: function(platform, questionId, questionTitle, url) {
      return this.trackEvent('external_problem_click', {
        platform: platform,
        questionId: questionId,
        questionTitle: questionTitle,
        details: { url: url, intent: 'navigate_to_platform_editor' }
      });
    },

    trackQuestionCompleted: function(questionId, topic, difficulty) {
      return this.trackEvent('question_completed', {
        questionId: questionId,
        topic: topic,
        difficulty: difficulty
      });
    },

    trackQuestionUncompleted: function(questionId, topic, difficulty) {
      return this.trackEvent('question_uncompleted', {
        questionId: questionId,
        topic: topic,
        difficulty: difficulty
      });
    },

    trackVisualizerOpen: function(visualizerName, topic) {
      return this.trackEvent('visualizer_open', {
        topic: topic,
        details: { visualizer: visualizerName }
      });
    },

    trackVisualizerInteraction: function(visualizerName, actionType, detail) {
      return this.trackEvent('visualizer_interaction', {
        details: { visualizer: visualizerName, action: actionType, detail: detail || null }
      });
    },

    trackRoadmapOpen: function(topicId) {
      return this.trackEvent('roadmap_open', {
        topic: topicId
      });
    },

    trackGlobalSearchUsed: function(query, resultCount) {
      return this.trackEvent('global_search_used', {
        details: { query: (query || '').substring(0, 50), resultCount: resultCount || 0 }
      });
    },

    trackNavigationClick: function(destination, label) {
      return this.trackEvent('navigation_click', {
        details: { destination: sanitizePath(destination), label: label }
      });
    },

    // Data Accessors for Analytics Dashboard
    getEvents: function(filters) {
      if (!localStorageSafe) return [];
      try {
        const raw = localStorageSafe.getItem(this._config ? this._config.localStorageKey : 'dsa_analytics_events_log');
        let events = raw ? JSON.parse(raw) : [];

        if (!filters) return events;

        return events.filter(evt => {
          if (filters.type && filters.type !== 'ALL' && evt.type !== filters.type) return false;
          if (filters.topic && filters.topic !== 'ALL' && evt.topic !== filters.topic) return false;
          if (filters.path && filters.path !== 'ALL' && !evt.path.includes(filters.path)) return false;
          if (filters.search) {
            const q = filters.search.toLowerCase();
            const text = `${evt.type} ${evt.path} ${evt.topic || ''} ${evt.questionTitle || ''} ${JSON.stringify(evt.details || '')}`.toLowerCase();
            if (!text.includes(q)) return false;
          }
          if (filters.startDate) {
            const startMs = new Date(filters.startDate).getTime();
            if (evt.timestampMs < startMs) return false;
          }
          if (filters.endDate) {
            const endMs = new Date(filters.endDate).getTime() + 86400000;
            if (evt.timestampMs > endMs) return false;
          }
          return true;
        });
      } catch (e) {
        console.error('[DSA-Analytics] getEvents error:', e);
        return [];
      }
    },

    getStats: function() {
      const events = this.getEvents();
      const sessions = new Set();
      const pageViewsByPath = {};
      const topicActivity = {};
      const diffActivity = { Easy: 0, Medium: 0, Hard: 0 };
      const platformClicks = { LeetCode: 0, GeeksforGeeks: 0 };
      const dailyTrend = {};
      let totalPageViews = 0;
      let totalSearches = 0;
      let totalLinkClicks = 0;
      let totalCompletions = 0;
      let totalVisualizerInteractions = 0;

      events.forEach(evt => {
        if (evt.sessionId) sessions.add(evt.sessionId);

        // Date grouping (YYYY-MM-DD)
        const dateKey = evt.timestamp ? evt.timestamp.substring(0, 10) : 'unknown';
        dailyTrend[dateKey] = (dailyTrend[dateKey] || 0) + 1;

        if (evt.type === 'page_view') {
          totalPageViews++;
          pageViewsByPath[evt.path] = (pageViewsByPath[evt.path] || 0) + 1;
        } else if (evt.type === 'question_search') {
          totalSearches++;
        } else if (evt.type === 'external_problem_click') {
          totalLinkClicks++;
          if (evt.platform === 'LeetCode') platformClicks.LeetCode++;
          else if (evt.platform === 'GeeksforGeeks' || evt.platform === 'GFG') platformClicks.GeeksforGeeks++;
        } else if (evt.type === 'question_completed') {
          totalCompletions++;
        } else if (evt.type === 'visualizer_interaction' || evt.type === 'visualizer_open') {
          totalVisualizerInteractions++;
        }

        if (evt.topic) {
          topicActivity[evt.topic] = (topicActivity[evt.topic] || 0) + 1;
        }
        if (evt.difficulty && diffActivity[evt.difficulty] !== undefined) {
          diffActivity[evt.difficulty]++;
        }
      });

      // Sort pages by views
      const sortedPages = Object.keys(pageViewsByPath)
        .map(path => ({ path, views: pageViewsByPath[path] }))
        .sort((a, b) => b.views - a.views);

      // Sort topics by activity
      const sortedTopics = Object.keys(topicActivity)
        .map(topic => ({ topic, count: topicActivity[topic] }))
        .sort((a, b) => b.count - a.count);

      return {
        totalEvents: events.length,
        totalSessions: sessions.size,
        totalPageViews: totalPageViews,
        totalSearches: totalSearches,
        totalLinkClicks: totalLinkClicks,
        totalCompletions: totalCompletions,
        totalVisualizerInteractions: totalVisualizerInteractions,
        platformClicks: platformClicks,
        difficultyActivity: diffActivity,
        popularPages: sortedPages,
        popularTopics: sortedTopics,
        dailyTrend: dailyTrend
      };
    },

    clearLocalEvents: function() {
      if (localStorageSafe && this._config) {
        localStorageSafe.removeItem(this._config.localStorageKey);
        return true;
      }
      return false;
    },

    exportEventsAsCsv: function(eventsToExport) {
      const list = eventsToExport || this.getEvents();
      if (!list.length) return '';

      const headers = ['ID', 'Timestamp', 'Event Type', 'Page Path', 'Session ID', 'Topic', 'Question ID', 'Question Title', 'Difficulty', 'Platform', 'Details'];
      const rows = list.map(e => [
        e.id,
        e.timestamp,
        e.type,
        e.path,
        e.sessionId,
        e.topic || '',
        e.questionId || '',
        e.questionTitle || '',
        e.difficulty || '',
        e.platform || '',
        e.details ? JSON.stringify(e.details).replace(/"/g, '""') : ''
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.map(f => `"${String(f || '').replace(/"/g, '""')}"`).join(','))].join('\r\n');
      return csvContent;
    }
  };

  // Auto-initialize when loaded
  if (typeof window !== 'undefined') {
    window.DSA_Analytics = DSA_Analytics;
    DSA_Analytics.init();
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DSA_Analytics;
  }
})(typeof window !== 'undefined' ? window : global);
